const SCENARIOS = [
  { key: "low", label: "Niski", wiborField: "wiborLow" },
  { key: "base", label: "Bazowy", wiborField: "wiborBase" },
  { key: "high", label: "Wysoki", wiborField: "wiborHigh" },
];

const fmtMoney = new Intl.NumberFormat("pl-PL", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

function byId(id) {
  return document.getElementById(id);
}

function readNumber(id, fallback, opts = {}) {
  const raw = Number(byId(id).value);
  let value = Number.isFinite(raw) ? raw : fallback;
  if (typeof opts.min === "number") value = Math.max(opts.min, value);
  if (typeof opts.max === "number") value = Math.min(opts.max, value);
  return value;
}

function parseSaleMonths(text, maxMonth) {
  return [...new Set(
    text
      .split(",")
      .map((x) => Number(x.trim()))
      .filter((x) => Number.isFinite(x) && x > 0 && x <= maxMonth)
      .map((x) => Math.round(x))
  )].sort((a, b) => a - b);
}

function parseOverpaySchedule(text) {
  const map = new Map();
  const invalid = [];
  if (!text.trim()) return { map, invalid };

  for (const part of text.split(",")) {
    const [m, v] = part.split(":").map((x) => x.trim());
    const month = Number(m);
    const value = Number(v);
    if (Number.isFinite(month) && month > 0 && Number.isFinite(value) && value >= 0) {
      map.set(Math.round(month), value);
    } else {
      invalid.push(part.trim());
    }
  }

  return { map, invalid };
}

function calcMonthlyPayment(principal, annualRate, months) {
  const r = annualRate / 12;
  if (principal <= 0 || months <= 0) return 0;
  if (r === 0) return principal / months;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}

function getAfterTaxInvestmentValue(grossBalance, contributions, taxRatePct) {
  const gains = Math.max(grossBalance - contributions, 0);
  return contributions + gains * (1 - taxRatePct / 100);
}

function advanceInvestmentAccount(state, contribution, annualRatePct, taxRatePct) {
  const grossBalance = state.grossBalance * (1 + annualRatePct / 100 / 12) + contribution;
  const contributions = state.contributions + contribution;
  const afterTax = getAfterTaxInvestmentValue(grossBalance, contributions, taxRatePct);
  return { grossBalance, contributions, afterTax };
}

function calcMortgageScenario(params, scenarioWiborPct, overpaySchedule) {
  const annualRate = (params.marginPct + scenarioWiborPct) / 100;
  const monthlyPayment = calcMonthlyPayment(params.loanAmount, annualRate, params.termMonths);

  const rows = [];
  let balance = params.loanAmount;
  let cumulativeCashOut = 0;
  let cumulativeOverpay = 0;
  let cumulativeOwnerCosts = 0;
  let payoffMonth = null;

  for (let month = 1; month <= params.termMonths; month++) {
    const baseOverpay = Math.max(params.monthlySurplus, 0);
    const scheduledExtra = Math.max(overpaySchedule.get(month) || 0, 0);
    const requestedOverpay = baseOverpay + scheduledExtra;

    let interest = 0;
    let principal = 0;
    let overpay = 0;
    let baseInstallment = 0;
    let totalInstallment = 0;
    let unusedOverpay = requestedOverpay;

    if (balance > 0) {
      interest = balance * (annualRate / 12);
      baseInstallment = monthlyPayment;
      principal = Math.min(Math.max(baseInstallment - interest, 0), balance);
      overpay = Math.min(requestedOverpay, Math.max(balance - principal, 0));
      totalInstallment = baseInstallment + overpay;
      unusedOverpay = Math.max(requestedOverpay - overpay, 0);
      balance = Math.max(balance - principal - overpay, 0);
      if (balance === 0 && payoffMonth === null) payoffMonth = month;
    }

    cumulativeCashOut += totalInstallment;
    cumulativeOverpay += overpay;
    cumulativeOwnerCosts += params.ownerMonthlyCosts;

    rows.push({
      month,
      interest,
      principal,
      overpay,
      requestedOverpay,
      unusedOverpay,
      baseInstallment,
      totalInstallment,
      housingCost: totalInstallment + params.ownerMonthlyCosts,
      endBalance: balance,
      cumulativeCashOut,
      cumulativeOverpay,
      cumulativeOwnerCosts,
    });
  }

  return { monthlyPayment, payoffMonth: payoffMonth || params.termMonths, rows };
}

function calcRentCosts(params) {
  const rows = [];
  let cumulativeRentCost = 0;

  for (let month = 1; month <= params.termMonths; month++) {
    const baseRent = params.rentMode === "fixed"
      ? params.rentStart
      : params.rentStart + Math.floor((month - 1) / params.rentStepInterval) * params.rentStep;
    const totalRentCost = baseRent + params.renterMonthlyExtras;
    cumulativeRentCost += totalRentCost;
    rows.push({ month, rent: baseRent, totalRentCost, cumulativeRentCost });
  }

  return rows;
}

function calcRentTrack(params, rentCosts, referenceMortgageRows, endMonth) {
  const rows = [];
  let investment = {
    grossBalance: params.downPayment,
    contributions: params.downPayment,
    afterTax: params.downPayment,
  };
  let cumulativeContribution = 0;
  let frozenWealth = params.downPayment;
  let frozenRentCost = 0;
  let frozenContribution = 0;

  for (let month = 1; month <= params.termMonths; month++) {
    if (month > endMonth) {
      rows.push({
        month,
        contribution: 0,
        cumulativeContribution: frozenContribution,
        rent: 0,
        totalRentCost: 0,
        cumulativeRentCost: frozenRentCost,
        investmentAfterTax: frozenWealth,
        wealth: frozenWealth,
      });
      continue;
    }

    const rentRow = rentCosts[month - 1];
    const mortgageRow = referenceMortgageRows[month - 1];
    const diffContribution = Math.max(mortgageRow.housingCost - rentRow.totalRentCost, 0);
    const contribution = Math.max(params.monthlySurplus, 0) + diffContribution;

    investment = advanceInvestmentAccount(
      investment,
      contribution,
      params.investMode === "on" ? params.investRatePct : 0,
      params.investmentTaxRatePct,
    );
    cumulativeContribution += contribution;

    rows.push({
      month,
      contribution,
      cumulativeContribution,
      rent: rentRow.rent,
      totalRentCost: rentRow.totalRentCost,
      cumulativeRentCost: rentRow.cumulativeRentCost,
      investmentAfterTax: investment.afterTax,
      wealth: investment.afterTax,
    });

    frozenWealth = investment.afterTax;
    frozenRentCost = rentRow.cumulativeRentCost;
    frozenContribution = cumulativeContribution;
  }

  return rows;
}

function calcBuyTrack(params, mortgageRows, rentCosts, endMonth) {
  const rows = [];
  let investment = { grossBalance: 0, contributions: 0, afterTax: 0 };
  let cumulativeContribution = 0;
  let frozen = null;

  for (let month = 1; month <= params.termMonths; month++) {
    if (month > endMonth && frozen) {
      rows.push({ ...frozen, month, contribution: 0 });
      continue;
    }

    const mortgageRow = mortgageRows[month - 1];
    const rentRow = rentCosts[month - 1];
    const contribution = Math.max(rentRow.totalRentCost - mortgageRow.housingCost, 0) + mortgageRow.unusedOverpay;

    investment = advanceInvestmentAccount(
      investment,
      contribution,
      params.investMode === "on" ? params.investRatePct : 0,
      params.investmentTaxRatePct,
    );
    cumulativeContribution += contribution;

    const homeValue = params.propertyValue * Math.pow(1 + params.homeGrowthPct / 100, month / 12);
    const saleCostAmount = homeValue * (params.saleCostPct / 100);
    const netSaleValue = homeValue - saleCostAmount;
    const entryCostAmount = params.propertyValue * (params.entryCostPct / 100);
    const equityBeforeSale = homeValue - mortgageRow.endBalance;
    const wealth = netSaleValue - mortgageRow.endBalance + investment.afterTax - entryCostAmount;

    const row = {
      month,
      contribution,
      cumulativeContribution,
      investmentAfterTax: investment.afterTax,
      homeValue,
      saleCostAmount,
      netSaleValue,
      equityBeforeSale,
      entryCostAmount,
      wealth,
      endBalance: mortgageRow.endBalance,
    };
    rows.push(row);
    frozen = { ...row, contribution: 0 };
  }

  return rows;
}

function safePoint(arr, month, field) {
  const row = arr[month - 1];
  return row ? row[field] : 0;
}

function safeRow(arr, month) {
  return arr[month - 1] || null;
}

function findCrossMonth(buySeries, rentSeries) {
  for (let i = 0; i < buySeries.length; i++) {
    const curr = buySeries[i].wealth - rentSeries[i].wealth;
    const prev = i > 0 ? buySeries[i - 1].wealth - rentSeries[i - 1].wealth : -Infinity;
    if (curr > 0 && prev <= 0) return buySeries[i].month;
  }
  return null;
}

function getViewMonths(maxMonths, preferredDefault = null) {
  const slider = byId("viewMonths");
  const fallbackDefault = Math.min(60, maxMonths);
  const defaultView = preferredDefault === null
    ? fallbackDefault
    : Math.min(maxMonths, Math.max(12, preferredDefault));
  slider.max = String(maxMonths);
  slider.min = "12";
  if (!slider.dataset.userTouched) slider.value = String(defaultView);
  const current = Math.min(maxMonths, Math.max(12, Number(slider.value) || defaultView));
  slider.value = String(current);
  byId("viewMonthsLabel").textContent = String(current);
  return current;
}

function getSummaryMonth(maxMonths) {
  const slider = byId("summaryMonth");
  const defaultMonth = Math.min(48, maxMonths);
  slider.max = String(maxMonths);
  slider.min = "1";
  if (!slider.value) slider.value = String(defaultMonth);
  const current = Math.min(maxMonths, Math.max(1, Number(slider.value) || defaultMonth));
  slider.value = String(current);
  byId("summaryMonthLabel").textContent = String(current);
  return current;
}

function collectParams() {
  const propertyValue = readNumber("propertyValue", 700000, { min: 1 });
  const ltvPct = readNumber("ltv", 80, { min: 0, max: 100 });
  const loanAmount = propertyValue * (ltvPct / 100);
  const downPayment = propertyValue - loanAmount;
  const termMonths = readNumber("termMonths", 360, { min: 1, max: 360 });

  byId("loanAmount").value = String(Math.round(loanAmount));
  byId("downPayment").value = String(Math.round(downPayment));
  byId("startingCapital").value = String(Math.round(downPayment));
  byId("termYearsInfo").value = termMonths % 12 === 0 ? `${termMonths / 12} lat` : "";

  return {
    propertyValue,
    loanAmount,
    downPayment,
    termMonths,
    marginPct: readNumber("margin", 1.8, { min: 0, max: 100 }),
    monthlySurplus: readNumber("monthlySurplus", 0, { min: 0 }),
    homeGrowthPct: readNumber("homeGrowth", 3, { min: -99, max: 100 }),
    entryCostPct: readNumber("entryCost", 3, { min: 0, max: 100 }),
    saleCostPct: readNumber("saleCost", 2, { min: 0, max: 100 }),
    ownerMonthlyCosts: readNumber("ownerMonthlyCosts", 350, { min: 0 }),
    renterMonthlyExtras: readNumber("renterMonthlyExtras", 0, { min: 0 }),
    investmentTaxRatePct: readNumber("investmentTaxRate", 19, { min: 0, max: 100 }),
    rentStart: readNumber("rentStart", 3000, { min: 0 }),
    rentMode: byId("rentMode").value,
    rentStep: readNumber("rentStep", 500, { min: 0 }),
    rentStepInterval: readNumber("rentStepInterval", 24, { min: 1, max: 360 }),
    investMode: byId("investMode").value,
    investRatePct: readNumber("investRate", 3.7, { min: 0, max: 100 }),
    wiborLowPct: readNumber("wiborLow", 3.0, { min: 0, max: 100 }),
    wiborBasePct: readNumber("wiborBase", 3.7, { min: 0, max: 100 }),
    wiborHighPct: readNumber("wiborHigh", 4.5, { min: 0, max: 100 }),
    saleMonths: [],
  };
}

function buildModel(params, scheduleMap) {
  const rentCosts = calcRentCosts(params);
  const mortgages = {
    low: calcMortgageScenario(params, params.wiborLowPct, scheduleMap),
    base: calcMortgageScenario(params, params.wiborBasePct, scheduleMap),
    high: calcMortgageScenario(params, params.wiborHighPct, scheduleMap),
  };

  const horizons = {
    low: mortgages.low.payoffMonth,
    base: mortgages.base.payoffMonth,
    high: mortgages.high.payoffMonth,
  };

  const rentTrack = calcRentTrack(params, rentCosts, mortgages.base.rows, horizons.base);
  const buyTracks = {
    low: calcBuyTrack(params, mortgages.low.rows, rentCosts, horizons.low),
    base: calcBuyTrack(params, mortgages.base.rows, rentCosts, horizons.base),
    high: calcBuyTrack(params, mortgages.high.rows, rentCosts, horizons.high),
  };

  return { rentCosts, mortgages, rentTrack, buyTracks, horizons };
}

function evaluateBaseDifferenceAtMonth(params, summaryMonth, wiborBasePct, homeGrowthPct, scheduleMap) {
  const model = buildModel({ ...params, wiborBasePct, homeGrowthPct }, scheduleMap);
  return safePoint(model.buyTracks.base, summaryMonth, "wealth") - safePoint(model.rentTrack, summaryMonth, "wealth");
}

function calculateAll() {
  const status = byId("status");
  status.textContent = "Przeliczanie...";

  const params = collectParams();
  const { map: scheduleMap, invalid } = parseOverpaySchedule(byId("overpaySchedule").value);

  params.saleMonths = parseSaleMonths(byId("saleMonths").value, params.termMonths);
  const model = buildModel(params, scheduleMap);
  const summaryMaxMonth = model.horizons.base;
  const chartMaxMonth = Math.max(model.horizons.low, model.horizons.base, model.horizons.high);
  const crossLow = findCrossMonth(model.buyTracks.low, model.rentTrack);
  const crossBase = findCrossMonth(model.buyTracks.base, model.rentTrack);
  const crossHigh = findCrossMonth(model.buyTracks.high, model.rentTrack);
  const crossCandidates = [crossLow, crossBase, crossHigh].filter((x) => Number.isFinite(x));
  const preferredView = crossCandidates.length > 0
    ? Math.min(chartMaxMonth, Math.max(60, Math.max(...crossCandidates) + 12))
    : Math.min(60, chartMaxMonth);

  if (params.saleMonths.length === 0) {
    params.saleMonths = [24, 36, 48].filter((m) => m <= summaryMaxMonth);
  } else {
    params.saleMonths = params.saleMonths.filter((m) => m <= summaryMaxMonth);
  }

  const viewMonths = getViewMonths(chartMaxMonth, preferredView);
  const summaryMonth = getSummaryMonth(summaryMaxMonth);

  const resultRows = params.saleMonths.map((month) => {
    const rent = safePoint(model.rentTrack, month, "wealth");
    const buyLow = safePoint(model.buyTracks.low, month, "wealth");
    const buyBase = safePoint(model.buyTracks.base, month, "wealth");
    const buyHigh = safePoint(model.buyTracks.high, month, "wealth");
    return {
      month,
      rent,
      buyLow,
      buyBase,
      buyHigh,
      diffLow: buyLow - rent,
      diffBase: buyBase - rent,
      diffHigh: buyHigh - rent,
    };
  });

  renderSummary(model, summaryMonth);
  renderDiagnostics(model, summaryMonth);
  renderTable(resultRows);
  renderSensitivityTable(params, summaryMonth, scheduleMap);
  renderAmortizationTable(model.mortgages.base.rows, model.horizons.base);
  renderChart("chartLow", "WIBOR niski", model.buyTracks.low, model.rentTrack, model.horizons.low, viewMonths);
  renderChart("chartBase", "WIBOR bazowy", model.buyTracks.base, model.rentTrack, model.horizons.base, viewMonths);
  renderChart("chartHigh", "WIBOR wysoki", model.buyTracks.high, model.rentTrack, model.horizons.high, viewMonths);

  status.textContent = invalid.length > 0
    ? `Gotowe, ale pominieto bledne wpisy harmonogramu: ${invalid.join(" | ")}`
    : `Gotowe: ${new Date().toLocaleTimeString("pl-PL")}`;
}

function renderSummary(model, summaryMonth) {
  const summary = byId("summary");
  const rentAtMonth = safePoint(model.rentTrack, summaryMonth, "wealth");
  const buyBaseAtMonth = safePoint(model.buyTracks.base, summaryMonth, "wealth");
  const diffBaseAtMonth = buyBaseAtMonth - rentAtMonth;
  const baseBuyRow = safeRow(model.buyTracks.base, summaryMonth);
  const rentRow = safeRow(model.rentTrack, summaryMonth);
  const mortgageBaseRow = safeRow(model.mortgages.base.rows, summaryMonth);
  const payoffMonth = model.horizons.base;
  const crossBase = findCrossMonth(model.buyTracks.base, model.rentTrack);
  const buyPortfolioAtPayoff = safePoint(model.buyTracks.base, payoffMonth, "investmentAfterTax");
  const rentPortfolioAtPayoff = safePoint(model.rentTrack, payoffMonth, "investmentAfterTax");

  summary.innerHTML = "";
  summary.appendChild(kpi("Rata bazowa (WIBOR bazowy)", `${fmtMoney.format(model.mortgages.base.monthlyPayment)} PLN`, "PMT: marza + WIBOR bazowy, rata annuitetowa do miesiaca splaty."));
  summary.appendChild(kpi(`Majatek wynajmu (m-c ${summaryMonth})`, `${fmtMoney.format(rentAtMonth)} PLN`, "Portfel po podatku Belki, z kapitalem startowym i miesiecznymi doplatami."));
  summary.appendChild(kpi(`Majatek kupna (m-c ${summaryMonth})`, `${fmtMoney.format(buyBaseAtMonth)} PLN`, "Sprzedaz mieszkania netto + inwestycje po stronie kupna - saldo kredytu - koszt wejscia."));
  summary.appendChild(kpi(`Roznica bazowa (m-c ${summaryMonth})`, `${fmtMoney.format(diffBaseAtMonth)} PLN`, "Kupno bazowe minus wynajem."));
  summary.appendChild(kpi("Przeciecie (bazowy)", crossBase ? `${crossBase} m-c` : "brak w horyzoncie", "Pierwszy miesiac, gdy kupno przebija wynajem."));
  summary.appendChild(kpi("Pelna splata kredytu", `${payoffMonth} m-c`, "Po tym miesiacu konczy sie harmonogram, wykres i dalsze inwestowanie w tym porownaniu."));
  summary.appendChild(kpi("Portfel kupna przy splacie", `${fmtMoney.format(buyPortfolioAtPayoff)} PLN`, "Wartosc inwestycji po stronie kupujacego na moment pelnej splaty."));
  summary.appendChild(kpi("Portfel wynajmu przy tej samej dacie", `${fmtMoney.format(rentPortfolioAtPayoff)} PLN`, "Wartosc portfela najemcy na moment splaty kredytu w scenariuszu bazowym."));
  summary.appendChild(kpi(`Mieszkanie warte (m-c ${summaryMonth})`, `${fmtMoney.format(baseBuyRow ? baseBuyRow.homeValue : 0)} PLN`, "Wartosc nieruchomosci po zmianie rocznej."));
  summary.appendChild(kpi(`Poszlo na kredyt (m-c ${summaryMonth})`, `${fmtMoney.format(mortgageBaseRow ? mortgageBaseRow.cumulativeCashOut : 0)} PLN`, "Suma rat i nadplat do wybranego miesiaca."));
  summary.appendChild(kpi(`Koszty wlasciciela (m-c ${summaryMonth})`, `${fmtMoney.format(mortgageBaseRow ? mortgageBaseRow.cumulativeOwnerCosts : 0)} PLN`, "Ubezpieczenie, drobne remonty, utrzymanie wlasciciela."));
  summary.appendChild(kpi(`Poszlo na wynajem (m-c ${summaryMonth})`, `${fmtMoney.format(rentRow ? rentRow.cumulativeRentCost : 0)} PLN`, "Najem plus dodatkowe koszty najmu do wybranego miesiaca."));
  summary.appendChild(kpi(`Nadplacono lacznie (m-c ${summaryMonth})`, `${fmtMoney.format(mortgageBaseRow ? mortgageBaseRow.cumulativeOverpay : 0)} PLN`, "Miesieczne nadwyzki i harmonogram nadplat wykorzystane przez kredyt."));
}

function renderDiagnostics(model, summaryMonth) {
  const tbody = byId("diagnosticsTable").querySelector("tbody");
  tbody.innerHTML = "";

  const buyRow = safeRow(model.buyTracks.base, summaryMonth);
  const rentRow = safeRow(model.rentTrack, summaryMonth);
  const mortgageRow = safeRow(model.mortgages.base.rows, summaryMonth);
  if (!buyRow || !rentRow || !mortgageRow) return;

  const rows = [
    ["Wartosc mieszkania brutto", buyRow.homeValue, "Wartosc nieruchomosci po rocznej zmianie ceny."],
    ["Saldo kredytu", mortgageRow.endBalance, "Kapital pozostaly do splaty w scenariuszu bazowym."],
    ["Equity przed sprzedaza", buyRow.equityBeforeSale, "Wartosc mieszkania minus pozostale saldo kredytu."],
    ["Koszt sprzedazy", buyRow.saleCostAmount, "Procent od aktualnej wartosci mieszkania."],
    ["Koszt wejscia", buyRow.entryCostAmount, "Jednorazowy koszt zakupu liczony od wartosci startowej."],
    ["Portfel kupujacego", buyRow.investmentAfterTax, "Srodki inwestowane po stronie kupna: niewykorzystane nadplaty i dodatnia przewaga najmu nad kosztem kredytu."],
    ["Portfel najemcy", rentRow.investmentAfterTax, "Kapital startowy = wklad wlasny, plus nadwyzki finansowe i dodatnia roznica kosztu kredytu nad najmem."],
    ["Doplaty inwestycyjne najemcy", rentRow.cumulativeContribution, "Suma miesiecznych doplat do portfela najemcy, bez kapitalu startowego."],
    ["Doplaty inwestycyjne kupujacego", buyRow.cumulativeContribution, "Suma miesiecznych doplat do portfela kupujacego."],
    ["Wydatki kredytowe", mortgageRow.cumulativeCashOut, "Suma rat i nadplat do wybranego miesiaca."],
    ["Koszty wlasciciela", mortgageRow.cumulativeOwnerCosts, "Koszty utrzymania wlasciciela doliczane co miesiac."],
    ["Wydatki najmu", rentRow.cumulativeRentCost, "Suma najmu i dodatkowych kosztow najmu do wybranego miesiaca."],
    ["Majatek netto kupna", buyRow.wealth, "Sprzedaz mieszkania netto + portfel kupna - saldo kredytu - koszt wejscia."],
    ["Majatek netto wynajmu", rentRow.wealth, "Portfel najemcy po podatku, przy tych samych zalozeniach inwestycyjnych."],
    ["Roznica kupno - wynajem", buyRow.wealth - rentRow.wealth, "Dodatnia wartosc oznacza przewage zakupu w wybranym miesiacu."],
  ];

  for (const [label, value, note] of rows) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${label}</td><td>${fmtMoney.format(value)} PLN</td><td>${note}</td>`;
    tbody.appendChild(tr);
  }
}

function kpi(title, value, note) {
  const box = document.createElement("div");
  box.className = "kpi";
  box.innerHTML = `<h4>${title}</h4><p>${value}</p><small>${note}</small>`;
  return box;
}

function renderTable(rows) {
  const tbody = byId("resultsTable").querySelector("tbody");
  tbody.innerHTML = "";
  for (const r of rows) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${r.month}</td>
      <td>${fmtMoney.format(r.rent)}</td>
      <td>${fmtMoney.format(r.buyLow)}</td>
      <td>${fmtMoney.format(r.buyBase)}</td>
      <td>${fmtMoney.format(r.buyHigh)}</td>
      <td class="${r.diffLow >= 0 ? "positive" : "negative"}">${fmtMoney.format(r.diffLow)}</td>
      <td class="${r.diffBase >= 0 ? "positive" : "negative"}">${fmtMoney.format(r.diffBase)}</td>
      <td class="${r.diffHigh >= 0 ? "positive" : "negative"}">${fmtMoney.format(r.diffHigh)}</td>
    `;
    tbody.appendChild(tr);
  }
}

function renderSensitivityTable(params, summaryMonth, scheduleMap) {
  const table = byId("sensitivityTable");
  const thead = table.querySelector("thead");
  const tbody = table.querySelector("tbody");
  const growthDeltas = [-2, 0, 2];
  const wiborDeltas = [-1, 0, 1];

  thead.innerHTML = "";
  tbody.innerHTML = "";

  const headerRow = document.createElement("tr");
  headerRow.innerHTML = `<th>Wzrost mieszkania / WIBOR bazowy</th>${wiborDeltas.map((d) => `<th>${(params.wiborBasePct + d).toFixed(1)}%</th>`).join("")}`;
  thead.appendChild(headerRow);

  for (const growthDelta of growthDeltas) {
    const tr = document.createElement("tr");
    const cells = [`<td>${(params.homeGrowthPct + growthDelta).toFixed(1)}%</td>`];
    for (const wiborDelta of wiborDeltas) {
      const value = evaluateBaseDifferenceAtMonth(params, summaryMonth, Math.max(0, params.wiborBasePct + wiborDelta), params.homeGrowthPct + growthDelta, scheduleMap);
      cells.push(`<td class="${value >= 0 ? "positive" : "negative"}">${fmtMoney.format(value)}</td>`);
    }
    tr.innerHTML = cells.join("");
    tbody.appendChild(tr);
  }
}

function renderAmortizationTable(baseRows, payoffMonth) {
  const tbody = byId("amortizationTable").querySelector("tbody");
  tbody.innerHTML = "";
  for (const r of baseRows) {
    if (r.month > payoffMonth) break;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${r.month}</td>
      <td>${fmtMoney.format(r.totalInstallment)}</td>
      <td>${fmtMoney.format(r.interest)}</td>
      <td>${fmtMoney.format(r.principal)}</td>
      <td>${fmtMoney.format(r.overpay)}</td>
      <td>${fmtMoney.format(r.endBalance)}</td>
    `;
    tbody.appendChild(tr);
  }
}

function renderChart(containerId, title, buySeries, rentSeries, payoffMonth, viewMonths) {
  const container = byId(containerId);
  container.innerHTML = "";

  const horizon = Math.min(payoffMonth, viewMonths);
  const fullPoints = buySeries
    .map((b, i) => ({ x: b.month, buy: b.wealth, rent: rentSeries[i].wealth }))
    .filter((p) => p.x <= payoffMonth);
  const points = fullPoints.filter((p) => p.x <= horizon);

  if (!points.length) {
    container.textContent = "Brak danych.";
    return;
  }

  const W = 860;
  const H = 320;
  const pad = { top: 20, right: 20, bottom: 48, left: 96 };
  const ys = points.flatMap((p) => [p.buy, p.rent]);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const yPad = (maxY - minY || 1) * 0.08;
  const xScale = (x) => pad.left + ((x - 1) / Math.max(horizon - 1, 1)) * (W - pad.left - pad.right);
  const yScale = (y) => H - pad.bottom - ((y - (minY - yPad)) / (maxY - minY + 2 * yPad || 1)) * (H - pad.top - pad.bottom);

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  const add = (tag, attrs = {}, parent = svg) => {
    const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, String(v)));
    parent.appendChild(el);
    return el;
  };

  add("line", { x1: pad.left, y1: H - pad.bottom, x2: W - pad.right, y2: H - pad.bottom, stroke: "#64748b", "stroke-width": 1.5 });
  add("line", { x1: pad.left, y1: pad.top, x2: pad.left, y2: H - pad.bottom, stroke: "#64748b", "stroke-width": 1.5 });

  for (let i = 0; i <= 6; i++) {
    const val = (minY - yPad) + ((maxY - minY + 2 * yPad) * i) / 6;
    const y = yScale(val);
    add("line", { x1: pad.left, y1: y, x2: W - pad.right, y2: y, stroke: "#e2e8f0", "stroke-width": 1 });
    add("text", { x: pad.left - 8, y: y + 4, "text-anchor": "end", "font-size": 11, fill: "#475569" }).textContent = fmtMoney.format(val);
  }

  const xStep = horizon <= 60 ? 6 : horizon <= 120 ? 12 : 24;
  for (let m = 1; m <= horizon; m += xStep) {
    const x = xScale(m);
    add("line", { x1: x, y1: H - pad.bottom, x2: x, y2: H - pad.bottom + 5, stroke: "#64748b", "stroke-width": 1 });
    add("text", { x, y: H - pad.bottom + 18, "text-anchor": "middle", "font-size": 11, fill: "#475569" }).textContent = String(m);
  }

  const linePath = (arr, field) => arr.map((p, i) => `${i ? "L" : "M"} ${xScale(p.x)} ${yScale(p[field])}`).join(" ");
  add("path", { d: linePath(points, "buy"), fill: "none", stroke: "#1d4ed8", "stroke-width": 2.5 });
  add("path", { d: linePath(points, "rent"), fill: "none", stroke: "#d97706", "stroke-width": 2.5, "stroke-dasharray": "6 4" });

  const crossMonth = findCrossMonth(
    fullPoints.map((p) => ({ month: p.x, wealth: p.buy })),
    fullPoints.map((p) => ({ month: p.x, wealth: p.rent }))
  );

  if (crossMonth !== null && crossMonth <= horizon) {
    const x = xScale(crossMonth);
    add("line", { x1: x, y1: pad.top, x2: x, y2: H - pad.bottom, stroke: "#dc2626", "stroke-width": 1.8, "stroke-dasharray": "4 4" });
  }

  container.appendChild(svg);

  const legend = document.createElement("div");
  legend.className = "chart-legend-out";
  const crossText = crossMonth === null
    ? "Przeciecie: brak"
    : `Przeciecie: ${crossMonth} m (Kupno > Wynajem)`;
  legend.innerHTML = `
    <div class="legend-row"><span class="legend-line buy"></span><span>Kupno (${title})</span></div>
    <div class="legend-row"><span class="legend-line rent"></span><span>Wynajem</span></div>
    <div class="legend-row"><span class="legend-line cross"></span><span>${crossText}</span></div>
    <div class="legend-note">Os X: miesiac sprzedazy (numery pod wykresem).</div>
    <div class="legend-note">Os Y: majatek netto [PLN] (numery po lewej).</div>
  `;
  container.appendChild(legend);
}

function initBindings() {
  const recalc = () => {
    try {
      calculateAll();
    } catch (err) {
      byId("status").textContent = `Blad: ${err.message}`;
    }
  };

  byId("recalcBtn").addEventListener("click", recalc);
  const quickIds = [
    "propertyValue", "ltv", "termMonths", "margin", "wiborLow", "wiborBase", "wiborHigh",
    "monthlySurplus", "homeGrowth", "entryCost", "saleCost", "ownerMonthlyCosts",
    "renterMonthlyExtras", "investmentTaxRate", "rentStart", "rentMode", "rentStep",
    "rentStepInterval", "investMode", "investRate", "saleMonths", "overpaySchedule"
  ];
  for (const id of quickIds) byId(id).addEventListener("change", recalc);

  byId("viewMonths").addEventListener("input", () => { byId("viewMonths").dataset.userTouched = "1"; recalc(); });
  byId("summaryMonth").addEventListener("input", recalc);
  byId("zoomInBtn").addEventListener("click", () => {
    const slider = byId("viewMonths");
    slider.dataset.userTouched = "1";
    slider.value = String(Math.max(12, Number(slider.value) - 12));
    recalc();
  });
  byId("zoomOutBtn").addEventListener("click", () => {
    const slider = byId("viewMonths");
    slider.dataset.userTouched = "1";
    slider.value = String(Math.min(Number(slider.max), Number(slider.value) + 12));
    recalc();
  });

  recalc();
}

initBindings();











