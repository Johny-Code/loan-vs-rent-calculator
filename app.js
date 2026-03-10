const SUPPORTED_LANGS = ["pl", "en"];

const TRANSLATIONS = {
  pl: {
    "meta.title": "Kredyt vs Wynajem",
    "hero.title": "Kredyt vs Wynajem",
    "hero.subtitle": "Porownanie majatku netto po sprzedazy mieszkania dla scenariuszy WIBOR.",
    "section.params": "Parametry",
    "section.summary": "Podsumowanie",
    "section.results": "Wyniki porownania",
    "section.sensitivity": "Analiza wrazliwosci",
    "section.charts": "Wykresy",
    "section.amortization": "Harmonogram kredytu (WIBOR bazowy)",
    "group.property": "Nieruchomosc",
    "group.rates": "Stopa i WIBOR",
    "group.overpay": "Nadplaty",
    "group.buyCosts": "Zakup i utrzymanie",
    "group.rentInvest": "Najem i inwestycje",
    "params.explain1": "Parametry wejsciowe steruja obiema sciezkami. <code>Kwota kredytu = Wartosc * LTV</code>, <code>Wklad = Wartosc - Kredyt</code>, a <code>Kapital startowy najemcy = Wklad wlasny</code>, czyli srodki uzyte na zakup w scenariuszu najmu zostaja na starcie w portfelu inwestycyjnym.",
    "params.explain2": "Scenariusz kredytu: co miesiac liczona jest rata annuitetowa, do ktorej moga dojsc miesieczne nadwyzki finansowe i dodatkowe nadplaty z harmonogramu. Scenariusz najmu: najemca placi czynsz i koszty najmu, a inwestuje kapital startowy, miesieczne nadwyzki oraz dodatnia roznice miedzy kosztem kredytu bazowego a kosztem najmu.",
    "params.explain3": "Koszty wlasciciela to miesieczne koszty utrzymania po stronie kupujacego. Dodatkowe koszty najmu dzialaja analogicznie po stronie najemcy. Stopa inwestycji oraz podatek od zyskow dotycza obu portfeli inwestycyjnych.",
    "form.propertyValue": "Wartosc nieruchomosci (PLN)",
    "form.ltv": "LTV (%)",
    "form.loanAmount": "Kwota kredytu (PLN)",
    "form.downPayment": "Wklad wlasny (PLN)",
    "form.termMonths": "Okres splaty (miesiace)",
    "form.termYears": "Lata (pelne)",
    "form.margin": "Marza (%)",
    "form.referenceIndex": "Indeks referencyjny",
    "form.wiborSpread": "Odchylenie scenariusza low/high (pp)",
    "form.wibor6m": "WIBOR 6M start (%)",
    "form.wibor12m": "WIBOR 12M start (%)",
    "form.wiborSchedule6m": "Harmonogram WIBOR 6M (format: <code>miesiac:wartosc</code>, np. <code>13:4.1, 25:4.6</code>)",
    "form.wiborSchedule12m": "Harmonogram WIBOR 12M (format: <code>miesiac:wartosc</code>, np. <code>13:4.0, 25:4.5</code>)",
    "info.ltv": "LTV to Loan-to-Value: jaki procent wartosci nieruchomosci finansujesz kredytem.",
    "info.referenceIndex": "Wybierasz, czy baza stopy to WIBOR 6M czy WIBOR 12M.",
    "info.spread": "Spread (pp = punkty procentowe) tworzy dodatkowe scenariusze: low = base - spread, high = base + spread. Wykresy pokazuja wszystkie trzy scenariusze.",
    "info.wibor6m": "WIBOR 6M to stawka referencyjna dla okresu 6 miesiecy.",
    "info.wibor12m": "WIBOR 12M (1R) to stawka referencyjna dla okresu 12 miesiecy.",
    "info.investTaxMode": "Na wyjsciu = podatek liczony dopiero przy zamknieciu inwestycji. Od zrealizowanych = podatek potracany przy kazdej realizacji odsetek/kuponu.",
    "info.investCompounding": "Kapitalizacja okresla, jak czesto naliczany jest zysk: co miesiac, co rok albo na zapadalnosci.",
    "info.investMaturity": "Ustaw dlugosc okresu do wykupu, np. 36 miesiecy dla obligacji 3-letnich.",
    "form.wiborLow": "WIBOR niski (%)",
    "form.wiborBase": "WIBOR bazowy (aktualny 6M) (%)",
    "form.wiborHigh": "WIBOR wysoki (%)",
    "form.monthlySurplus": "Nadwyzki finansowe (PLN/mc)",
    "form.overpaySchedule": "Harmonogram dodatkowych nadplat (format: <code>miesiac:kwota</code>, np. <code>1:500, 24:2000</code>)",
    "form.homeGrowth": "Roczna zmiana wartosci mieszkania (%)",
    "form.entryCost": "Koszt wejscia w zakup (%)",
    "form.saleCost": "Koszt sprzedazy (%)",
    "form.ownerMonthlyCosts": "Koszty wlasciciela (PLN/mc)",
    "form.renterMonthlyExtras": "Dodatkowe koszty najmu (PLN/mc)",
    "form.investmentTaxRate": "Podatek od zyskow inwestycji (%)",
    "form.rentStart": "Najem startowy (PLN/mc)",
    "form.rentMode": "Model najmu",
    "form.rentModeFixed": "Staly",
    "form.rentModeStep": "Skokowy",
    "form.rentStep": "Skok najmu (PLN)",
    "form.rentStepInterval": "Skok najmu co ile miesiecy",
    "form.investMode": "Inwestowanie roznicy",
    "form.investRate": "Stopa inwestycji (%)",
    "form.investTaxMode": "Tryb rozliczenia podatku",
    "form.investTaxModeExit": "Na wyjsciu (sprzedaz/wykup)",
    "form.investTaxModeRealized": "Od zrealizowanych odsetek/kuponu",
    "form.investCompounding": "Kapitalizacja",
    "form.investCompoundingMonthly": "Miesieczna",
    "form.investCompoundingYearly": "Roczna",
    "form.investCompoundingMaturity": "Na zapadalnosci",
    "form.investMaturityMonths": "Termin wykupu (miesiace)",
    "form.startingCapital": "Kapital startowy najemcy (PLN)",
    "form.saleMonths": "Miesiace sprzedazy (CSV, np. <code>24,36,48</code>)",
    "button.recalc": "Przelicz",
    "button.fetchWibor": "Pobierz aktualny WIBOR",
    "lang.switch": "EN",
    "lang.aria": "Switch language",
    "scenario.low": "Niski",
    "scenario.base": "Bazowy",
    "scenario.high": "Wysoki",
    "status.calculating": "Przeliczanie...",
    "status.done": "Gotowe: {time}",
    "status.invalid": "Gotowe, ale pominieto bledne wpisy harmonogramu: {items}",
    "status.error": "Blad: {message}",
    "wibor.meta.default": "Brak pobrania online. Uzywane sa wartosci wpisane recznie.",
    "wibor.meta.loading": "Pobieranie WIBOR ze zrodla online...",
    "wibor.meta.ok": "Pobrano WIBOR (data: {date}) 6M: {six}% | 12M: {twelve}%",
    "wibor.meta.fallback": "Nie udalo sie pobrac WIBOR ({message}). Uzywane sa wartosci reczne.",
    "wibor.source": "Zrodlo: Bankier (dane: GPW Benchmark)",
    "term.years": "{years} lat",
    "unit.monthShort": "m-c",
    "summary.baseInstallment": "Rata bazowa (WIBOR bazowy)",
    "summary.rentWealth": "Majatek wynajmu (m-c {month})",
    "summary.buyWealth": "Majatek kupna (m-c {month})",
    "summary.baseDiff": "Roznica bazowa (m-c {month})",
    "summary.cross": "Przeciecie (bazowy)",
    "summary.cross.none": "brak w horyzoncie",
    "summary.monthValue": "{month} m-c",
    "summary.payoff": "Pelna splata kredytu",
    "summary.buyPortfolioPayoff": "Portfel kupna przy splacie",
    "summary.rentPortfolioPayoff": "Portfel wynajmu przy tej samej dacie",
    "summary.homeValue": "Mieszkanie warte (m-c {month})",
    "summary.mortgageOutflow": "Poszlo na kredyt (m-c {month})",
    "summary.ownerCosts": "Koszty wlasciciela (m-c {month})",
    "summary.rentOutflow": "Poszlo na wynajem (m-c {month})",
    "summary.totalOverpaid": "Nadplacono lacznie (m-c {month})",
    "summary.explain1": "Obie sciezki liczymy jako majatek netto. Kupno = wartosc sprzedazy mieszkania netto + inwestycje po stronie kupujacego - saldo kredytu - koszt wejscia. Wynajem = portfel inwestycyjny najemcy, bez nieruchomosci.",
    "summary.explain2": "Scenariusz wynajmu: najemca placi co miesiac czynsz i ewentualne dodatkowe koszty najmu, a rownolegle inwestuje kapital startowy rowny wkladowi wlasnemu. Do portfela trafiaja tez <code>Nadwyzki finansowe</code> oraz dodatnia roznica miedzy kosztem mieszkania przy kredycie bazowym a kosztem najmu.",
    "summary.explain3": "Jesli kredyt bazowy zostaje splacony, konczy sie horyzont porownania dla podsumowania, harmonogramu i toru inwestowania w tym modelu. To pozwala porownywac oba scenariusze na tym samym zamknietym horyzoncie.",
    "summary.previewMonth": "Miesiac podgladu:",
    "note.baseInstallment": "PMT: marza + WIBOR bazowy, rata annuitetowa do miesiaca splaty.",
    "note.rentWealth": "Portfel po podatku Belki, z kapitalem startowym i miesiecznymi doplatami.",
    "note.buyWealth": "Sprzedaz mieszkania netto + inwestycje po stronie kupna - saldo kredytu - koszt wejscia.",
    "note.baseDiff": "Kupno bazowe minus wynajem.",
    "note.cross": "Pierwszy miesiac, gdy kupno przebija wynajem.",
    "note.payoff": "Po tym miesiacu konczy sie harmonogram, wykres i dalsze inwestowanie w tym porownaniu.",
    "note.buyPortfolioPayoff": "Wartosc inwestycji po stronie kupujacego na moment pelnej splaty.",
    "note.rentPortfolioPayoff": "Wartosc portfela najemcy na moment splaty kredytu w scenariuszu bazowym.",
    "note.homeValue": "Wartosc nieruchomosci po zmianie rocznej.",
    "note.mortgageOutflow": "Suma rat i nadplat do wybranego miesiaca.",
    "note.ownerCosts": "Ubezpieczenie, drobne remonty, utrzymanie wlasciciela.",
    "note.rentOutflow": "Najem plus dodatkowe koszty najmu do wybranego miesiaca.",
    "note.totalOverpaid": "Miesieczne nadwyzki i harmonogram nadplat wykorzystane przez kredyt.",
    "diag.grossHome": "Wartosc mieszkania brutto",
    "diag.grossHome.note": "Wartosc nieruchomosci po rocznej zmianie ceny.",
    "diag.balance": "Saldo kredytu",
    "diag.balance.note": "Kapital pozostaly do splaty w scenariuszu bazowym.",
    "diag.equity": "Equity przed sprzedaza",
    "diag.equity.note": "Wartosc mieszkania minus pozostale saldo kredytu.",
    "diag.saleCost": "Koszt sprzedazy",
    "diag.saleCost.note": "Procent od aktualnej wartosci mieszkania.",
    "diag.entryCost": "Koszt wejscia",
    "diag.entryCost.note": "Jednorazowy koszt zakupu liczony od wartosci startowej.",
    "diag.buyPortfolio": "Portfel kupujacego",
    "diag.buyPortfolio.note": "Srodki inwestowane po stronie kupna: niewykorzystane nadplaty i dodatnia przewaga najmu nad kosztem kredytu.",
    "diag.rentPortfolio": "Portfel najemcy",
    "diag.rentPortfolio.note": "Kapital startowy = wklad wlasny, plus nadwyzki finansowe i dodatnia roznica kosztu kredytu nad najmem.",
    "diag.rentContrib": "Doplaty inwestycyjne najemcy",
    "diag.rentContrib.note": "Suma miesiecznych doplat do portfela najemcy, bez kapitalu startowego.",
    "diag.buyContrib": "Doplaty inwestycyjne kupujacego",
    "diag.buyContrib.note": "Suma miesiecznych doplat do portfela kupujacego.",
    "diag.mortgageOutflow": "Wydatki kredytowe",
    "diag.mortgageOutflow.note": "Suma rat i nadplat do wybranego miesiaca.",
    "diag.ownerCosts": "Koszty wlasciciela",
    "diag.ownerCosts.note": "Koszty utrzymania wlasciciela doliczane co miesiac.",
    "diag.rentOutflow": "Wydatki najmu",
    "diag.rentOutflow.note": "Suma najmu i dodatkowych kosztow najmu do wybranego miesiaca.",
    "diag.buyWealth": "Majatek netto kupna",
    "diag.buyWealth.note": "Sprzedaz mieszkania netto + portfel kupna - saldo kredytu - koszt wejscia.",
    "diag.rentWealth": "Majatek netto wynajmu",
    "diag.rentWealth.note": "Portfel najemcy po podatku, przy tych samych zalozeniach inwestycyjnych.",
    "diag.diff": "Roznica kupno - wynajem",
    "diag.diff.note": "Dodatnia wartosc oznacza przewage zakupu w wybranym miesiacu.",
    "diagnostics.title": "Jak powstal wynik",
    "diagnostics.explain": "Tabela rozklada wynik bazowy na skladniki. Dzieki temu widac, czy przewaga kupna albo wynajmu wynika z equity mieszkania, kosztow wejscia, wysokosci salda kredytu czy z portfela inwestycyjnego.",
    "diagnostics.col.item": "Element",
    "diagnostics.col.value": "Wartosc",
    "diagnostics.col.how": "Jak liczona",
    "results.explain": "Tabela pokazuje majatek netto dla wynajmu i kupna w scenariuszu bazowym. Kolumna roznicy to <code>kupno - wynajem</code>, wiec dodatnia wartosc oznacza przewage zakupu.",
    "results.col.month": "Miesiac sprzedazy",
    "results.col.rent": "Wynajem (PLN)",
    "results.col.buyLow": "Kupno niski WIBOR (PLN)",
    "results.col.buyBase": "Kupno (PLN)",
    "results.col.buyHigh": "Kupno wysoki WIBOR (PLN)",
    "results.col.diffLow": "Roznica niski (K-W)",
    "results.col.diffBase": "Roznica (K-W)",
    "results.col.diffHigh": "Roznica wysoki (K-W)",
    "sensitivity.explain": "Sprawdzamy wynik bazowy dla wybranego miesiaca przy zmianie wzrostu wartosci mieszkania oraz bazowego WIBOR. W komorce widzisz roznice: <code>kupno bazowe - wynajem</code>. To szybka analiza, jak wrazliwy jest wynik na zmiane rynku nieruchomosci i kosztu pieniadza.",
    "sensitivity.header": "Wzrost mieszkania / WIBOR bazowy",
    "charts.explain1": "Na osi X sa miesiace, na osi Y majatek netto. Domyslnie widok 5 lat (60 miesiecy), mozna oddalic do pelnego okresu kredytu, ale wykres i tak konczy sie w miesiacu pelnej splaty.",
    "charts.zoomIn": "Przybliz",
    "charts.zoomOut": "Oddal",
    "charts.range": "Zakres:",
    "charts.monthShort": "m-cy",
    "charts.explain2": "Os X: miesiac sprzedazy, os Y: majatek netto [PLN]. Czerwona linia oznacza pierwszy miesiac, gdy kupno > wynajem.",
    "charts.low": "WIBOR niski",
    "charts.base": "WIBOR bazowy",
    "charts.high": "WIBOR wysoki",
    "chart.nodata": "Brak danych.",
    "chart.cross.none": "Przeciecie: brak",
    "chart.cross": "Przeciecie: {month} m (Kupno > Wynajem)",
    "chart.legend.buy": "Kupno ({title})",
    "chart.legend.rent": "Wynajem",
    "chart.legend.x": "Os X: miesiac sprzedazy (numery pod wykresem).",
    "chart.legend.y": "Os Y: majatek netto [PLN] (numery po lewej).",
    "amortization.explain": "Rata = odsetki + kapital + nadplata. Tabela pokazuje wylacznie realny okres splaty kredytu bazowego. Po splacie nie ma juz kolejnych wierszy z zerowymi ratami.",
    "amortization.col.month": "Miesiac",
    "amortization.col.total": "Rata calkowita (PLN)",
    "amortization.col.interest": "Odsetki (PLN)",
    "amortization.col.principal": "Kapital w racie (PLN)",
    "amortization.col.overpay": "Nadplata (PLN)",
    "amortization.col.balance": "Pozostalo do splaty (PLN)"
  },
  en: {
    "meta.title": "Mortgage vs Rent",
    "hero.title": "Mortgage vs Rent",
    "hero.subtitle": "Compare net wealth after selling a property across WIBOR scenarios.",
    "section.params": "Parameters",
    "section.summary": "Summary",
    "section.results": "Comparison results",
    "section.sensitivity": "Sensitivity analysis",
    "section.charts": "Charts",
    "section.amortization": "Mortgage amortization (base WIBOR)",
    "group.property": "Property",
    "group.rates": "Rate and WIBOR",
    "group.overpay": "Overpayments",
    "group.buyCosts": "Purchase and ownership",
    "group.rentInvest": "Rent and investing",
    "params.explain1": "Input parameters drive both paths. <code>Loan amount = Property value * LTV</code>, <code>Down payment = Property value - Loan</code>, and <code>Renter starting capital = Down payment</code>, so funds used for purchase stay invested in the rent scenario.",
    "params.explain2": "Mortgage scenario: an annuity installment is calculated every month, with monthly surplus and extra schedule payments added on top. Rent scenario: the renter pays rent and rent-related costs, while investing starting capital, monthly surplus, and the positive difference between base mortgage cost and rent cost.",
    "params.explain3": "Owner costs are monthly maintenance costs on the buying side. Additional rent costs work analogously on the renter side. Investment rate and capital gains tax apply to both investment portfolios.",
    "form.propertyValue": "Property value (PLN)",
    "form.ltv": "LTV (%)",
    "form.loanAmount": "Loan amount (PLN)",
    "form.downPayment": "Down payment (PLN)",
    "form.termMonths": "Repayment period (months)",
    "form.termYears": "Years (full)",
    "form.margin": "Bank margin (%)",
    "form.referenceIndex": "Reference index",
    "form.wiborSpread": "Low/high scenario spread (pp)",
    "form.wibor6m": "WIBOR 6M start (%)",
    "form.wibor12m": "WIBOR 12M start (%)",
    "form.wiborSchedule6m": "WIBOR 6M schedule (format: <code>month:value</code>, e.g. <code>13:4.1, 25:4.6</code>)",
    "form.wiborSchedule12m": "WIBOR 12M schedule (format: <code>month:value</code>, e.g. <code>13:4.0, 25:4.5</code>)",
    "info.ltv": "LTV means Loan-to-Value: what share of the property price is financed by mortgage.",
    "info.referenceIndex": "Choose whether the base rate path uses WIBOR 6M or WIBOR 12M.",
    "info.spread": "Spread (pp = percentage points) builds extra scenarios: low = base - spread, high = base + spread. Charts display all three scenarios.",
    "info.wibor6m": "WIBOR 6M is the reference rate for a 6-month tenor.",
    "info.wibor12m": "WIBOR 12M (1R) is the reference rate for a 12-month tenor.",
    "info.investTaxMode": "At exit = tax is applied only when closing the investment. Realized coupon = tax is deducted whenever interest/coupon is realized.",
    "info.investCompounding": "Compounding defines how often gains are added: monthly, yearly, or at maturity.",
    "info.investMaturity": "For maturity compounding set the period length, e.g. 36 months for 3-year bonds.",
    "form.wiborLow": "WIBOR low (%)",
    "form.wiborBase": "WIBOR base (current 6M) (%)",
    "form.wiborHigh": "WIBOR high (%)",
    "form.monthlySurplus": "Monthly surplus (PLN/month)",
    "form.overpaySchedule": "Extra prepayment schedule (format: <code>month:amount</code>, e.g. <code>1:500, 24:2000</code>)",
    "form.homeGrowth": "Annual property value change (%)",
    "form.entryCost": "Purchase entry cost (%)",
    "form.saleCost": "Sale cost (%)",
    "form.ownerMonthlyCosts": "Owner monthly costs (PLN/month)",
    "form.renterMonthlyExtras": "Additional rent costs (PLN/month)",
    "form.investmentTaxRate": "Investment gains tax (%)",
    "form.rentStart": "Starting rent (PLN/month)",
    "form.rentMode": "Rent model",
    "form.rentModeFixed": "Fixed",
    "form.rentModeStep": "Stepwise",
    "form.rentStep": "Rent increase step (PLN)",
    "form.rentStepInterval": "Rent step every N months",
    "form.investMode": "Invest the difference",
    "form.investRate": "Investment rate (%)",
    "form.investTaxMode": "Tax settlement mode",
    "form.investTaxModeExit": "At exit (sale/redemption)",
    "form.investTaxModeRealized": "On realized interest/coupon",
    "form.investCompounding": "Compounding",
    "form.investCompoundingMonthly": "Monthly",
    "form.investCompoundingYearly": "Yearly",
    "form.investCompoundingMaturity": "At maturity",
    "form.investMaturityMonths": "Maturity (months)",
    "form.startingCapital": "Renter starting capital (PLN)",
    "form.saleMonths": "Sale months (CSV, e.g. <code>24,36,48</code>)",
    "button.recalc": "Recalculate",
    "button.fetchWibor": "Fetch current WIBOR",
    "lang.switch": "PL",
    "lang.aria": "Switch language",
    "scenario.low": "Low",
    "scenario.base": "Base",
    "scenario.high": "High",
    "status.calculating": "Calculating...",
    "status.done": "Done: {time}",
    "status.invalid": "Done, but skipped invalid schedule entries: {items}",
    "status.error": "Error: {message}",
    "wibor.meta.default": "No online fetch yet. Manual values are being used.",
    "wibor.meta.loading": "Fetching WIBOR from online source...",
    "wibor.meta.ok": "Fetched WIBOR (date: {date}) 6M: {six}% | 12M: {twelve}%",
    "wibor.meta.fallback": "Could not fetch WIBOR ({message}). Manual values are being used.",
    "wibor.source": "Source: Bankier (data: GPW Benchmark)",
    "term.years": "{years} years",
    "unit.monthShort": "m",
    "summary.baseInstallment": "Base installment (base WIBOR)",
    "summary.rentWealth": "Rent wealth (m {month})",
    "summary.buyWealth": "Buy wealth (m {month})",
    "summary.baseDiff": "Base difference (m {month})",
    "summary.cross": "Crossing (base)",
    "summary.cross.none": "none in horizon",
    "summary.monthValue": "m {month}",
    "summary.payoff": "Full mortgage payoff",
    "summary.buyPortfolioPayoff": "Buy portfolio at payoff",
    "summary.rentPortfolioPayoff": "Rent portfolio at the same date",
    "summary.homeValue": "Property value (m {month})",
    "summary.mortgageOutflow": "Total mortgage outflow (m {month})",
    "summary.ownerCosts": "Owner costs (m {month})",
    "summary.rentOutflow": "Total rent outflow (m {month})",
    "summary.totalOverpaid": "Total overpaid (m {month})",
    "summary.explain1": "Both paths are measured as net wealth. Buying = net sale value + buyer investments - mortgage balance - entry cost. Renting = renter investment portfolio, without property ownership.",
    "summary.explain2": "Rent scenario: renter pays monthly rent and optional additional rent costs, while investing starting capital equal to down payment. Portfolio contributions also include <code>Monthly surplus</code> and the positive difference between base mortgage housing cost and rent cost.",
    "summary.explain3": "When base mortgage is paid off, comparison horizon ends for summary, amortization and investment tracks in this model. This keeps both scenarios comparable on the same closed horizon.",
    "summary.previewMonth": "Preview month:",
    "note.baseInstallment": "PMT: margin + base WIBOR, annuity payment until payoff month.",
    "note.rentWealth": "After-tax investment portfolio with starting capital and monthly contributions.",
    "note.buyWealth": "Net sale proceeds + buy-side investments - remaining mortgage balance - entry cost.",
    "note.baseDiff": "Base buy result minus rent result.",
    "note.cross": "First month when buying outperforms renting.",
    "note.payoff": "After this month, schedule, chart horizon and further investing are frozen in this comparison.",
    "note.buyPortfolioPayoff": "Investment value on the buy side at full payoff.",
    "note.rentPortfolioPayoff": "Renter portfolio value at base mortgage payoff date.",
    "note.homeValue": "Property value after annual growth.",
    "note.mortgageOutflow": "Total installments and overpayments up to selected month.",
    "note.ownerCosts": "Insurance, minor repairs, owner maintenance.",
    "note.rentOutflow": "Rent plus additional rent costs up to selected month.",
    "note.totalOverpaid": "Monthly surplus and schedule-based overpayments used by mortgage.",
    "diag.grossHome": "Gross property value",
    "diag.grossHome.note": "Property value after annual growth.",
    "diag.balance": "Mortgage balance",
    "diag.balance.note": "Remaining principal balance in base scenario.",
    "diag.equity": "Equity before sale",
    "diag.equity.note": "Property value minus remaining mortgage balance.",
    "diag.saleCost": "Sale cost",
    "diag.saleCost.note": "Percent of current property value.",
    "diag.entryCost": "Entry cost",
    "diag.entryCost.note": "One-time purchase cost from starting property value.",
    "diag.buyPortfolio": "Buyer portfolio",
    "diag.buyPortfolio.note": "Buy-side invested funds: unused overpayments and positive rent advantage over mortgage cost.",
    "diag.rentPortfolio": "Renter portfolio",
    "diag.rentPortfolio.note": "Starting capital = down payment, plus monthly surplus and positive mortgage-over-rent cost difference.",
    "diag.rentContrib": "Renter investment contributions",
    "diag.rentContrib.note": "Total monthly renter contributions excluding starting capital.",
    "diag.buyContrib": "Buyer investment contributions",
    "diag.buyContrib.note": "Total monthly buyer contributions.",
    "diag.mortgageOutflow": "Mortgage cash outflow",
    "diag.mortgageOutflow.note": "Total installments and overpayments up to selected month.",
    "diag.ownerCosts": "Owner costs",
    "diag.ownerCosts.note": "Owner maintenance costs added monthly.",
    "diag.rentOutflow": "Rent cash outflow",
    "diag.rentOutflow.note": "Total rent and additional rent costs up to selected month.",
    "diag.buyWealth": "Buy net wealth",
    "diag.buyWealth.note": "Net property sale value + buyer portfolio - mortgage balance - entry cost.",
    "diag.rentWealth": "Rent net wealth",
    "diag.rentWealth.note": "After-tax renter portfolio under the same assumptions.",
    "diag.diff": "Difference buy - rent",
    "diag.diff.note": "Positive value means buying is better in selected month.",
    "diagnostics.title": "How the result is built",
    "diagnostics.explain": "This table breaks the base result into components. It shows whether buy vs rent advantage comes from home equity, entry/sale costs, mortgage balance, or investment portfolio.",
    "diagnostics.col.item": "Item",
    "diagnostics.col.value": "Value",
    "diagnostics.col.how": "How calculated",
    "results.explain": "This table shows net wealth for rent and buy in the base scenario. The difference column is <code>buy - rent</code>, so positive values mean buying is better.",
    "results.col.month": "Sale month",
    "results.col.rent": "Rent (PLN)",
    "results.col.buyLow": "Buy low WIBOR (PLN)",
    "results.col.buyBase": "Buy (PLN)",
    "results.col.buyHigh": "Buy high WIBOR (PLN)",
    "results.col.diffLow": "Diff low (B-R)",
    "results.col.diffBase": "Diff (B-R)",
    "results.col.diffHigh": "Diff high (B-R)",
    "sensitivity.explain": "Base result for selected month is stress-tested against home growth and base WIBOR changes. Each cell shows <code>base buy - rent</code>. This is a quick sensitivity check for real-estate trend and cost of money.",
    "sensitivity.header": "Home growth / base WIBOR",
    "charts.explain1": "X axis shows months and Y axis shows net wealth. Default view is 5 years (60 months); you can zoom out to the full mortgage period, but the chart still ends at payoff month.",
    "charts.zoomIn": "Zoom in",
    "charts.zoomOut": "Zoom out",
    "charts.range": "Range:",
    "charts.monthShort": "mo",
    "charts.explain2": "X axis: sale month, Y axis: net wealth [PLN]. Red line marks first month where buying beats renting.",
    "charts.low": "WIBOR low",
    "charts.base": "WIBOR base",
    "charts.high": "WIBOR high",
    "chart.nodata": "No data.",
    "chart.cross.none": "Crossing: none",
    "chart.cross": "Crossing: {month} m (Buy > Rent)",
    "chart.legend.buy": "Buy ({title})",
    "chart.legend.rent": "Rent",
    "chart.legend.x": "X axis: sale month (numbers below chart).",
    "chart.legend.y": "Y axis: net wealth [PLN] (numbers on the left).",
    "amortization.explain": "Installment = interest + principal + overpayment. Table shows only the actual payoff period for base mortgage. After payoff there are no extra zero-installment rows.",
    "amortization.col.month": "Month",
    "amortization.col.total": "Total installment (PLN)",
    "amortization.col.interest": "Interest (PLN)",
    "amortization.col.principal": "Principal in installment (PLN)",
    "amortization.col.overpay": "Overpayment (PLN)",
    "amortization.col.balance": "Remaining balance (PLN)"
  }
};

function getInitialLanguage() {
  const saved = localStorage.getItem("appLang");
  if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
  const browser = (navigator.language || "en").toLowerCase();
  return browser.startsWith("pl") ? "pl" : "en";
}

let currentLang = getInitialLanguage();
let fmtMoney = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
let appReady = false;

function t(key, vars = {}) {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.pl;
  const raw = dict[key] || TRANSLATIONS.pl[key] || key;
  return raw.replace(/\{(\w+)\}/g, (_, name) => (vars[name] ?? `{${name}}`));
}

function getFlagSvg(targetLang) {
  if (targetLang === "pl") {
    return `<svg viewBox="0 0 48 32" width="20" height="14" aria-hidden="true" focusable="false"><rect width="48" height="16" fill="#ffffff"></rect><rect y="16" width="48" height="16" fill="#dc143c"></rect><rect width="48" height="32" fill="none" stroke="#94a3b8" stroke-width="1"></rect></svg>`;
  }
  return `<svg viewBox="0 0 48 32" width="20" height="14" aria-hidden="true" focusable="false"><rect width="48" height="32" fill="#0a4ea3"></rect><path d="M0 0 L48 32 M48 0 L0 32" stroke="#ffffff" stroke-width="7"></path><path d="M0 0 L48 32 M48 0 L0 32" stroke="#d82b38" stroke-width="3.5"></path><rect x="20" width="8" height="32" fill="#ffffff"></rect><rect y="12" width="48" height="8" fill="#ffffff"></rect><rect x="22" width="4" height="32" fill="#d82b38"></rect><rect y="14" width="48" height="4" fill="#d82b38"></rect><rect width="48" height="32" fill="none" stroke="#94a3b8" stroke-width="1"></rect></svg>`;
}
function applyTranslations() {
  document.documentElement.lang = currentLang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.innerHTML = t(key);
  });
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const key = el.getAttribute("data-i18n-title");
    const tooltipText = t(key);
    el.setAttribute("title", tooltipText);
    el.setAttribute("data-tooltip", tooltipText);
    el.setAttribute("aria-label", tooltipText);
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "0");
  });
  const switchText = byId("langSwitchText");
  if (switchText) switchText.textContent = t("lang.switch");
  const switchFlag = byId("langSwitchFlag");
  if (switchFlag) {
    const targetLang = currentLang === "pl" ? "en" : "pl";
    switchFlag.innerHTML = getFlagSvg(targetLang);
  }
  const switchBtn = byId("langSwitch");
  if (switchBtn) switchBtn.setAttribute("aria-label", t("lang.aria"));
  document.title = t("meta.title");
}

function setLanguage(lang) {
  currentLang = SUPPORTED_LANGS.includes(lang) ? lang : "pl";
  localStorage.setItem("appLang", currentLang);
  fmtMoney = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  applyTranslations();
  if (appReady) calculateAll();
}

function formatMoney(value) {
  const num = Number(value);
  return fmtMoney.format(Number.isFinite(num) ? Math.round(num) : 0);
}

function byId(id) {
  return document.getElementById(id);
}

function readNumber(id, fallback, opts = {}) {
  const raw = Number(String(byId(id).value).replace(",", "."));
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

function parseScheduleMap(text) {
  const map = new Map();
  const invalid = [];
  if (!text.trim()) return { map, invalid };
  for (const part of text.split(",")) {
    const [m, v] = part.split(":").map((x) => x.trim());
    const month = Number(m);
    const value = Number(String(v).replace(",", "."));
    if (Number.isFinite(month) && month > 0 && Number.isFinite(value) && value >= 0) {
      map.set(Math.round(month), value);
    } else if (part.trim()) {
      invalid.push(part.trim());
    }
  }
  return { map, invalid };
}

function parseOverpaySchedule(text) {
  return parseScheduleMap(text);
}

function parseRateSchedule(text) {
  return parseScheduleMap(text);
}

function formatScheduleAmount(value) {
  const num = Number(value);
  if (!Number.isFinite(num) || num <= 0) return "0";
  return Number(num.toFixed(2)).toString();
}

function setOverpayScheduleMonth(month, amount) {
  const scheduleInput = byId("overpaySchedule");
  if (!scheduleInput || !Number.isFinite(month) || month <= 0) return;
  const parsed = parseOverpaySchedule(scheduleInput.value);
  const map = parsed.map;
  if (!Number.isFinite(amount) || amount <= 0) map.delete(month);
  else map.set(month, amount);
  const text = [...map.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([m, v]) => `${m}:${formatScheduleAmount(v)}`)
    .join(", ");
  scheduleInput.value = text;
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

function getCompoundingIntervalMonths(params) {
  if (params.investmentCompounding === "yearly") return 12;
  if (params.investmentCompounding === "maturity") return Math.max(1, Math.round(params.investmentMaturityMonths || 36));
  return 1;
}

function advanceInvestmentAccount(state, contribution, annualRatePct, taxRatePct, month, params) {
  let grossBalance = state.grossBalance;
  const contributions = state.contributions + contribution;
  const safeAnnualRatePct = Math.max(annualRatePct, 0);
  const intervalMonths = getCompoundingIntervalMonths(params);
  const isCompoundingMonth = intervalMonths > 0 && month % intervalMonths === 0;

  if (isCompoundingMonth && safeAnnualRatePct > 0) {
    const eventRate = Math.pow(1 + safeAnnualRatePct / 100, intervalMonths / 12) - 1;
    const gain = grossBalance * eventRate;
    if (params.investmentTaxMode === "realized") {
      grossBalance += gain * (1 - taxRatePct / 100);
    } else {
      grossBalance += gain;
    }
  }

  grossBalance += contribution;
  const afterTax = params.investmentTaxMode === "realized"
    ? grossBalance
    : getAfterTaxInvestmentValue(grossBalance, contributions, taxRatePct);
  return { grossBalance, contributions, afterTax };
}

function calcMortgageScenario(params, ratePathPct, overpaySchedule) {
  const rows = [];
  let balance = params.loanAmount;
  let cumulativeCashOut = 0;
  let cumulativeOverpay = 0;
  let cumulativeOwnerCosts = 0;
  let payoffMonth = null;
  let initialMonthlyPayment = 0;

  for (let month = 1; month <= params.termMonths; month++) {
    const wiborPct = ratePathPct[Math.min(ratePathPct.length, month) - 1] ?? 0;
    const annualRate = (params.marginPct + wiborPct) / 100;
    const monthsLeft = params.termMonths - month + 1;
    const defaultOverpay = Math.max(params.monthlySurplus, 0);
    const hasScheduledOverpay = overpaySchedule.has(month);
    const scheduledOverpay = hasScheduledOverpay ? Math.max(overpaySchedule.get(month) || 0, 0) : 0;
    const requestedOverpay = hasScheduledOverpay ? scheduledOverpay : defaultOverpay;

    let interest = 0;
    let principal = 0;
    let overpay = 0;
    let baseInstallment = 0;
    let totalInstallment = 0;
    let unusedOverpay = requestedOverpay;

    if (balance > 0) {
      interest = balance * (annualRate / 12);
      baseInstallment = calcMonthlyPayment(balance, annualRate, monthsLeft);
      if (month === 1) initialMonthlyPayment = baseInstallment;
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
      defaultOverpay,
      hasScheduledOverpay,
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

  return { monthlyPayment: initialMonthlyPayment, payoffMonth: payoffMonth || params.termMonths, rows };
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
      month,
      params,
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
      month,
      params,
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

function buildWiborPath(termMonths, baseStartPct, scheduleMap) {
  const path = [];
  let current = Math.max(baseStartPct, 0);
  for (let month = 1; month <= termMonths; month++) {
    if (scheduleMap.has(month)) current = Math.max(Number(scheduleMap.get(month)) || 0, 0);
    path.push(current);
  }
  return path;
}

function getScenarioRatePath(basePath, deltaLowPct, deltaHighPct) {
  return {
    low: basePath.map((v) => Math.max(0, v - deltaLowPct)),
    base: [...basePath],
    high: basePath.map((v) => Math.max(0, v + deltaHighPct)),
  };
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
  byId("termYearsInfo").value = termMonths % 12 === 0 ? t("term.years", { years: termMonths / 12 }) : "";

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
    investmentTaxMode: byId("investmentTaxMode").value === "realized" ? "realized" : "exit",
    investmentCompounding: ["monthly", "yearly", "maturity"].includes(byId("investmentCompounding").value) ? byId("investmentCompounding").value : "monthly",
    investmentMaturityMonths: readNumber("investmentMaturityMonths", 36, { min: 1, max: 360 }),
    referenceIndex: byId("referenceIndex").value === "12M" ? "12M" : "6M",
    wiborSpreadPct: readNumber("wiborSpread", 0.5, { min: 0, max: 10 }),
    wibor6mStartPct: readNumber("wibor6m", 4.2, { min: 0, max: 100 }),
    wibor12mStartPct: readNumber("wibor12m", 4.4, { min: 0, max: 100 }),
    saleMonths: [],
  };
}

function buildModel(params, overpayScheduleMap, rateSchedules, opts = {}) {
  const startBase = params.referenceIndex === "12M" ? params.wibor12mStartPct : params.wibor6mStartPct;
  const selectedRateSchedule = params.referenceIndex === "12M" ? rateSchedules.schedule12 : rateSchedules.schedule6;
  const shiftedStart = Math.max(0, startBase + (opts.baseShiftPct || 0));
  const basePath = buildWiborPath(params.termMonths, shiftedStart, selectedRateSchedule);
  const scenarioRatePath = getScenarioRatePath(basePath, params.wiborSpreadPct, params.wiborSpreadPct);

  const rentCosts = calcRentCosts(params);
  const mortgages = {
    low: calcMortgageScenario(params, scenarioRatePath.low, overpayScheduleMap),
    base: calcMortgageScenario(params, scenarioRatePath.base, overpayScheduleMap),
    high: calcMortgageScenario(params, scenarioRatePath.high, overpayScheduleMap),
  };

  const horizons = {
    low: mortgages.low.payoffMonth,
    base: mortgages.base.payoffMonth,
    high: mortgages.high.payoffMonth,
  };

  const rentTrack = calcRentTrack(params, rentCosts, mortgages.base.rows, horizons.base);
  const modelParams = opts.homeGrowthPct === undefined ? params : { ...params, homeGrowthPct: opts.homeGrowthPct };
  const buyTracks = {
    low: calcBuyTrack(modelParams, mortgages.low.rows, rentCosts, horizons.low),
    base: calcBuyTrack(modelParams, mortgages.base.rows, rentCosts, horizons.base),
    high: calcBuyTrack(modelParams, mortgages.high.rows, rentCosts, horizons.high),
  };

  return { rentCosts, mortgages, rentTrack, buyTracks, horizons, basePath, scenarioRatePath };
}

function evaluateBaseDifferenceAtMonth(params, summaryMonth, wiborShiftPct, homeGrowthPct, overpayScheduleMap, rateSchedules) {
  const model = buildModel(params, overpayScheduleMap, rateSchedules, {
    baseShiftPct: wiborShiftPct,
    homeGrowthPct,
  });
  return safePoint(model.buyTracks.base, summaryMonth, "wealth") - safePoint(model.rentTrack, summaryMonth, "wealth");
}

function calculateAll() {
  const status = byId("status");
  status.textContent = t("status.calculating");

  const params = collectParams();
  const overpayParsed = parseOverpaySchedule(byId("overpaySchedule").value);
  const rate6Parsed = parseRateSchedule(byId("wiborSchedule6m").value);
  const rate12Parsed = parseRateSchedule(byId("wiborSchedule12m").value);
  const invalid = [...overpayParsed.invalid, ...rate6Parsed.invalid, ...rate12Parsed.invalid];
  const rateSchedules = { schedule6: rate6Parsed.map, schedule12: rate12Parsed.map };

  params.saleMonths = parseSaleMonths(byId("saleMonths").value, params.termMonths);
  const model = buildModel(params, overpayParsed.map, rateSchedules);
  const summaryMaxMonth = model.horizons.base;
  const chartMaxMonth = model.horizons.base;
  const crossBase = findCrossMonth(model.buyTracks.base, model.rentTrack);
  const preferredView = Number.isFinite(crossBase)
    ? Math.min(chartMaxMonth, Math.max(60, crossBase + 12))
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
  renderSensitivityTable(params, summaryMonth, overpayParsed.map, rateSchedules);
  renderAmortizationTable(model.mortgages.base.rows, model.horizons.base, params.monthlySurplus);
  renderChart("chartLow", t("scenario.low"), model.buyTracks.low, model.rentTrack, model.horizons.low, viewMonths);
  renderChart("chartBase", t("scenario.base"), model.buyTracks.base, model.rentTrack, model.horizons.base, viewMonths);
  renderChart("chartHigh", t("scenario.high"), model.buyTracks.high, model.rentTrack, model.horizons.high, viewMonths);

  status.textContent = invalid.length > 0
    ? t("status.invalid", { items: invalid.join(" | ") })
    : t("status.done", { time: new Date().toLocaleTimeString(currentLang === "pl" ? "pl-PL" : "en-US") });
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
  summary.appendChild(kpi(t("summary.baseInstallment"), `${formatMoney(model.mortgages.base.monthlyPayment)} PLN`, t("note.baseInstallment")));
  summary.appendChild(kpi(t("summary.rentWealth", { month: summaryMonth }), `${formatMoney(rentAtMonth)} PLN`, t("note.rentWealth")));
  summary.appendChild(kpi(t("summary.buyWealth", { month: summaryMonth }), `${formatMoney(buyBaseAtMonth)} PLN`, t("note.buyWealth")));
  summary.appendChild(kpi(t("summary.baseDiff", { month: summaryMonth }), `${formatMoney(diffBaseAtMonth)} PLN`, t("note.baseDiff")));
  summary.appendChild(kpi(t("summary.cross"), crossBase ? t("summary.monthValue", { month: crossBase }) : t("summary.cross.none"), t("note.cross")));
  summary.appendChild(kpi(t("summary.payoff"), t("summary.monthValue", { month: payoffMonth }), t("note.payoff")));
  summary.appendChild(kpi(t("summary.buyPortfolioPayoff"), `${formatMoney(buyPortfolioAtPayoff)} PLN`, t("note.buyPortfolioPayoff")));
  summary.appendChild(kpi(t("summary.rentPortfolioPayoff"), `${formatMoney(rentPortfolioAtPayoff)} PLN`, t("note.rentPortfolioPayoff")));
  summary.appendChild(kpi(t("summary.homeValue", { month: summaryMonth }), `${formatMoney(baseBuyRow ? baseBuyRow.homeValue : 0)} PLN`, t("note.homeValue")));
  summary.appendChild(kpi(t("summary.mortgageOutflow", { month: summaryMonth }), `${formatMoney(mortgageBaseRow ? mortgageBaseRow.cumulativeCashOut : 0)} PLN`, t("note.mortgageOutflow")));
  summary.appendChild(kpi(t("summary.ownerCosts", { month: summaryMonth }), `${formatMoney(mortgageBaseRow ? mortgageBaseRow.cumulativeOwnerCosts : 0)} PLN`, t("note.ownerCosts")));
  summary.appendChild(kpi(t("summary.rentOutflow", { month: summaryMonth }), `${formatMoney(rentRow ? rentRow.cumulativeRentCost : 0)} PLN`, t("note.rentOutflow")));
  summary.appendChild(kpi(t("summary.totalOverpaid", { month: summaryMonth }), `${formatMoney(mortgageBaseRow ? mortgageBaseRow.cumulativeOverpay : 0)} PLN`, t("note.totalOverpaid")));
}

function renderDiagnostics(model, summaryMonth) {
  const table = byId("diagnosticsTable");
  if (!table) return;
  const tbody = table.querySelector("tbody");
  if (!tbody) return;
  tbody.innerHTML = "";

  const buyRow = safeRow(model.buyTracks.base, summaryMonth);
  const rentRow = safeRow(model.rentTrack, summaryMonth);
  const mortgageRow = safeRow(model.mortgages.base.rows, summaryMonth);
  if (!buyRow || !rentRow || !mortgageRow) return;

  const rows = [
    [t("diag.grossHome"), buyRow.homeValue, t("diag.grossHome.note")],
    [t("diag.balance"), mortgageRow.endBalance, t("diag.balance.note")],
    [t("diag.equity"), buyRow.equityBeforeSale, t("diag.equity.note")],
    [t("diag.saleCost"), buyRow.saleCostAmount, t("diag.saleCost.note")],
    [t("diag.entryCost"), buyRow.entryCostAmount, t("diag.entryCost.note")],
    [t("diag.buyPortfolio"), buyRow.investmentAfterTax, t("diag.buyPortfolio.note")],
    [t("diag.rentPortfolio"), rentRow.investmentAfterTax, t("diag.rentPortfolio.note")],
    [t("diag.rentContrib"), rentRow.cumulativeContribution, t("diag.rentContrib.note")],
    [t("diag.buyContrib"), buyRow.cumulativeContribution, t("diag.buyContrib.note")],
    [t("diag.mortgageOutflow"), mortgageRow.cumulativeCashOut, t("diag.mortgageOutflow.note")],
    [t("diag.ownerCosts"), mortgageRow.cumulativeOwnerCosts, t("diag.ownerCosts.note")],
    [t("diag.rentOutflow"), rentRow.cumulativeRentCost, t("diag.rentOutflow.note")],
    [t("diag.buyWealth"), buyRow.wealth, t("diag.buyWealth.note")],
    [t("diag.rentWealth"), rentRow.wealth, t("diag.rentWealth.note")],
    [t("diag.diff"), buyRow.wealth - rentRow.wealth, t("diag.diff.note")],
  ];

  for (const [label, value, note] of rows) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${label}</td>
      <td>${formatMoney(value)} PLN</td>
      <td>${note}</td>
    `;
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
  const table = byId("resultsTable");
  if (!table) return;
  const tbody = table.querySelector("tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  for (const r of rows) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${r.month}</td>
      <td>${formatMoney(r.rent)}</td>
      <td>${formatMoney(r.buyBase)}</td>
      <td class="${r.diffBase >= 0 ? "positive" : "negative"}">${formatMoney(r.diffBase)}</td>
    `;
    tbody.appendChild(tr);
  }
}

function renderSensitivityTable(params, summaryMonth, overpayScheduleMap, rateSchedules) {
  const table = byId("sensitivityTable");
  if (!table) return;
  const thead = table.querySelector("thead");
  const tbody = table.querySelector("tbody");
  if (!thead || !tbody) return;
  const growthDeltas = [-2, 0, 2];
  const wiborDeltas = [-1, 0, 1];
  const startBase = params.referenceIndex === "12M" ? params.wibor12mStartPct : params.wibor6mStartPct;

  thead.innerHTML = "";
  tbody.innerHTML = "";

  const headerRow = document.createElement("tr");
  headerRow.innerHTML = `<th>${t("sensitivity.header")}</th>${wiborDeltas.map((d) => `<th>${(startBase + d).toFixed(1)}%</th>`).join("")}`;
  thead.appendChild(headerRow);

  for (const growthDelta of growthDeltas) {
    const tr = document.createElement("tr");
    const cells = [`<td>${(params.homeGrowthPct + growthDelta).toFixed(1)}%</td>`];
    for (const wiborDelta of wiborDeltas) {
      const value = evaluateBaseDifferenceAtMonth(
        params,
        summaryMonth,
        wiborDelta,
        params.homeGrowthPct + growthDelta,
        overpayScheduleMap,
        rateSchedules,
      );
      cells.push(`<td class="${value >= 0 ? "positive" : "negative"}">${formatMoney(value)}</td>`);
    }
    tr.innerHTML = cells.join("");
    tbody.appendChild(tr);
  }
}

function renderAmortizationTable(baseRows, payoffMonth, monthlySurplus) {
  const table = byId("amortizationTable");
  if (!table) return;
  const tbody = table.querySelector("tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  for (const r of baseRows) {
    if (r.month > payoffMonth) break;
    const tr = document.createElement("tr");
    const editableOverpay = Math.max(r.requestedOverpay || monthlySurplus || 0, 0);
    tr.innerHTML = `
      <td>${r.month}</td>
      <td>${formatMoney(r.totalInstallment)}</td>
      <td>${formatMoney(r.interest)}</td>
      <td>${formatMoney(r.principal)}</td>
      <td><input class="overpay-edit" type="number" min="0" step="100" data-month="${r.month}" value="${Math.round(editableOverpay)}" /></td>
      <td>${formatMoney(r.endBalance)}</td>
    `;
    tbody.appendChild(tr);
  }

  tbody.querySelectorAll(".overpay-edit").forEach((input) => {
    const applyChange = () => {
      const month = Number(input.getAttribute("data-month"));
      const value = Number(String(input.value).replace(",", "."));
      setOverpayScheduleMonth(month, Number.isFinite(value) ? Math.max(value, 0) : 0);
      calculateAll();
    };
    input.addEventListener("change", applyChange);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        applyChange();
      }
    });
  });
}

function renderChart(containerId, title, buySeries, rentSeries, payoffMonth, viewMonths) {
  const container = byId(containerId);
  if (!container) return;
  container.innerHTML = "";

  const horizon = Math.min(payoffMonth, viewMonths);
  const fullPoints = buySeries
    .map((b, i) => ({ x: b.month, buy: b.wealth, rent: rentSeries[i].wealth }))
    .filter((p) => p.x <= payoffMonth);
  const points = fullPoints.filter((p) => p.x <= horizon);

  if (!points.length) {
    container.textContent = t("chart.nodata");
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
    add("text", { x: pad.left - 8, y: y + 4, "text-anchor": "end", "font-size": 11, fill: "#475569" }).textContent = formatMoney(val);
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
    ? t("chart.cross.none")
    : t("chart.cross", { month: crossMonth });
  legend.innerHTML = `
    <div class="legend-row"><span class="legend-line buy"></span><span>${t("chart.legend.buy", { title })}</span></div>
    <div class="legend-row"><span class="legend-line rent"></span><span>${t("chart.legend.rent")}</span></div>
    <div class="legend-row"><span class="legend-line cross"></span><span>${crossText}</span></div>
    <div class="legend-note">${t("chart.legend.x")}</div>
    <div class="legend-note">${t("chart.legend.y")}</div>
  `;
  container.appendChild(legend);
}

function initBindings() {
  const recalc = () => {
    try {
      calculateAll();
    } catch (err) {
      byId("status").textContent = t("status.error", { message: err.message });
    }
  };

  byId("recalcBtn").addEventListener("click", recalc);
  const quickIds = [
    "propertyValue", "ltv", "termMonths", "margin", "referenceIndex", "wiborSpread", "wibor6m", "wibor12m",
    "monthlySurplus", "homeGrowth", "entryCost", "saleCost", "ownerMonthlyCosts",
    "renterMonthlyExtras", "investmentTaxRate", "rentStart", "rentMode", "rentStep",
    "rentStepInterval", "investMode", "investRate", "investmentTaxMode", "investmentCompounding", "investmentMaturityMonths", "saleMonths", "overpaySchedule", "wiborSchedule6m", "wiborSchedule12m"
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

  byId("langSwitch").addEventListener("click", () => {
    setLanguage(currentLang === "pl" ? "en" : "pl");
  });


  setLanguage(getInitialLanguage());
  appReady = true;
  recalc();
}

initBindings();






































































