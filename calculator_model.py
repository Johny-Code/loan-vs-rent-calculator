from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, List, Mapping


@dataclass(frozen=True)
class Params:
    property_value: float = 850_000.0
    loan_amount: float = 749_700.0
    down_payment: float = 100_300.0
    term_months: int = 360
    margin_pct: float = 2.15
    monthly_surplus: float = 2578.0
    home_growth_pct: float = 3.0
    entry_cost_pct: float = 2.0
    sale_cost_pct: float = 1.0
    owner_monthly_costs: float = 0.0
    renter_monthly_extras: float = 0.0
    investment_tax_rate_pct: float = 19.0
    rent_start: float = 4000.0
    rent_mode: str = "step"
    rent_step: float = 250.0
    rent_step_interval: int = 12
    invest_mode: str = "on"
    invest_rate_pct: float = 4.65
    wibor_low_pct: float = 3.5
    wibor_base_pct: float = 4.2
    wibor_high_pct: float = 4.7
    overpay_mode: str = "fixed"


@dataclass(frozen=True)
class MortgageRow:
    month: int
    interest: float
    principal: float
    overpay: float
    requested_overpay: float
    unused_overpay: float
    base_installment: float
    total_installment: float
    housing_cost: float
    end_balance: float
    cumulative_cash_out: float
    cumulative_overpay: float
    cumulative_owner_costs: float


@dataclass(frozen=True)
class RentCostRow:
    month: int
    rent: float
    total_rent_cost: float
    cumulative_rent_cost: float


@dataclass(frozen=True)
class TrackRow:
    month: int
    contribution: float
    cumulative_contribution: float
    investment_after_tax: float
    wealth: float
    rent: float = 0.0
    total_rent_cost: float = 0.0
    cumulative_rent_cost: float = 0.0
    home_value: float = 0.0
    net_sale_value: float = 0.0
    end_balance: float = 0.0
    sale_cost_amount: float = 0.0
    entry_cost_amount: float = 0.0
    equity_before_sale: float = 0.0


@dataclass(frozen=True)
class MortgageScenario:
    monthly_payment: float
    payoff_month: int
    rows: List[MortgageRow]


@dataclass(frozen=True)
class Model:
    rent_costs: List[RentCostRow]
    mortgages: Dict[str, MortgageScenario]
    rent_track: List[TrackRow]
    buy_tracks: Dict[str, List[TrackRow]]
    horizons: Dict[str, int]


DEFAULT_PARAMS = Params()


def calc_monthly_payment(principal: float, annual_rate: float, months: int) -> float:
    monthly_rate = annual_rate / 12
    if principal <= 0 or months <= 0:
        return 0.0
    if monthly_rate == 0:
        return principal / months
    return (principal * monthly_rate) / (1 - (1 + monthly_rate) ** (-months))


def get_after_tax_investment_value(gross_balance: float, contributions: float, tax_rate_pct: float) -> float:
    gains = max(gross_balance - contributions, 0.0)
    return contributions + gains * (1 - tax_rate_pct / 100)


def advance_investment_account(
    gross_balance: float,
    contributions: float,
    contribution: float,
    annual_rate_pct: float,
    tax_rate_pct: float,
) -> tuple[float, float, float]:
    new_gross_balance = gross_balance * (1 + annual_rate_pct / 100 / 12) + contribution
    new_contributions = contributions + contribution
    after_tax = get_after_tax_investment_value(new_gross_balance, new_contributions, tax_rate_pct)
    return new_gross_balance, new_contributions, after_tax


def calc_mortgage_schedule(params: Params, scenario_wibor_pct: float, overpay_schedule: Mapping[int, float]) -> MortgageScenario:
    annual_rate = (params.margin_pct + scenario_wibor_pct) / 100
    monthly_payment = calc_monthly_payment(params.loan_amount, annual_rate, params.term_months)

    rows: List[MortgageRow] = []
    balance = params.loan_amount
    cumulative_cash_out = 0.0
    cumulative_overpay = 0.0
    cumulative_owner_costs = 0.0
    payoff_month: int | None = None

    for month in range(1, params.term_months + 1):
        base_overpay = max(params.monthly_surplus, 0.0)
        scheduled_extra = max(overpay_schedule.get(month, 0.0), 0.0)
        requested_overpay = base_overpay + scheduled_extra

        interest = 0.0
        principal = 0.0
        overpay = 0.0
        base_installment = 0.0
        total_installment = 0.0
        unused_overpay = requested_overpay

        if balance > 0:
            interest = balance * (annual_rate / 12)
            base_installment = monthly_payment
            principal = min(max(base_installment - interest, 0.0), balance)
            overpay = min(requested_overpay, max(balance - principal, 0.0))
            total_installment = base_installment + overpay
            unused_overpay = max(requested_overpay - overpay, 0.0)
            balance = max(balance - principal - overpay, 0.0)
            if balance == 0 and payoff_month is None:
                payoff_month = month

        cumulative_cash_out += total_installment
        cumulative_overpay += overpay
        cumulative_owner_costs += params.owner_monthly_costs

        rows.append(
            MortgageRow(
                month=month,
                interest=interest,
                principal=principal,
                overpay=overpay,
                requested_overpay=requested_overpay,
                unused_overpay=unused_overpay,
                base_installment=base_installment,
                total_installment=total_installment,
                housing_cost=total_installment + params.owner_monthly_costs,
                end_balance=balance,
                cumulative_cash_out=cumulative_cash_out,
                cumulative_overpay=cumulative_overpay,
                cumulative_owner_costs=cumulative_owner_costs,
            )
        )

    return MortgageScenario(monthly_payment=monthly_payment, payoff_month=payoff_month or params.term_months, rows=rows)


def calc_rent_costs(params: Params) -> List[RentCostRow]:
    rows: List[RentCostRow] = []
    cumulative_rent_cost = 0.0
    for month in range(1, params.term_months + 1):
        if params.rent_mode == "fixed":
            rent = params.rent_start
        else:
            rent = params.rent_start + ((month - 1) // params.rent_step_interval) * params.rent_step
        total_rent_cost = rent + params.renter_monthly_extras
        cumulative_rent_cost += total_rent_cost
        rows.append(RentCostRow(month=month, rent=rent, total_rent_cost=total_rent_cost, cumulative_rent_cost=cumulative_rent_cost))
    return rows


def calc_rent_track(params: Params, rent_costs: List[RentCostRow], reference_mortgage_rows: List[MortgageRow], end_month: int) -> List[TrackRow]:
    rows: List[TrackRow] = []
    gross_balance = params.down_payment
    contributions = params.down_payment
    after_tax = params.down_payment
    cumulative_contribution = 0.0
    frozen_wealth = params.down_payment
    frozen_rent_cost = 0.0
    frozen_contribution = 0.0

    for month in range(1, params.term_months + 1):
        if month > end_month:
            rows.append(TrackRow(month=month, contribution=0.0, cumulative_contribution=frozen_contribution, investment_after_tax=frozen_wealth, wealth=frozen_wealth, cumulative_rent_cost=frozen_rent_cost))
            continue

        rent_row = rent_costs[month - 1]
        mortgage_row = reference_mortgage_rows[month - 1]
        diff_contribution = max(mortgage_row.housing_cost - rent_row.total_rent_cost, 0.0)
        contribution = max(params.monthly_surplus, 0.0) + diff_contribution
        annual_rate_pct = params.invest_rate_pct if params.invest_mode == "on" else 0.0
        gross_balance, contributions, after_tax = advance_investment_account(gross_balance, contributions, contribution, annual_rate_pct, params.investment_tax_rate_pct)
        cumulative_contribution += contribution

        rows.append(TrackRow(month=month, contribution=contribution, cumulative_contribution=cumulative_contribution, investment_after_tax=after_tax, wealth=after_tax, rent=rent_row.rent, total_rent_cost=rent_row.total_rent_cost, cumulative_rent_cost=rent_row.cumulative_rent_cost))

        frozen_wealth = after_tax
        frozen_rent_cost = rent_row.cumulative_rent_cost
        frozen_contribution = cumulative_contribution

    return rows


def calc_buy_track(params: Params, mortgage_rows: List[MortgageRow], rent_costs: List[RentCostRow], end_month: int) -> List[TrackRow]:
    rows: List[TrackRow] = []
    gross_balance = 0.0
    contributions = 0.0
    after_tax = 0.0
    cumulative_contribution = 0.0
    frozen: TrackRow | None = None

    for month in range(1, params.term_months + 1):
        if month > end_month and frozen is not None:
            rows.append(TrackRow(month=month, contribution=0.0, cumulative_contribution=frozen.cumulative_contribution, investment_after_tax=frozen.investment_after_tax, wealth=frozen.wealth, home_value=frozen.home_value, net_sale_value=frozen.net_sale_value, end_balance=frozen.end_balance, sale_cost_amount=frozen.sale_cost_amount, entry_cost_amount=frozen.entry_cost_amount, equity_before_sale=frozen.equity_before_sale))
            continue

        mortgage_row = mortgage_rows[month - 1]
        rent_row = rent_costs[month - 1]
        contribution = max(rent_row.total_rent_cost - mortgage_row.housing_cost, 0.0) + mortgage_row.unused_overpay
        annual_rate_pct = params.invest_rate_pct if params.invest_mode == "on" else 0.0
        gross_balance, contributions, after_tax = advance_investment_account(gross_balance, contributions, contribution, annual_rate_pct, params.investment_tax_rate_pct)
        cumulative_contribution += contribution

        home_value = params.property_value * (1 + params.home_growth_pct / 100) ** (month / 12)
        sale_cost_amount = home_value * (params.sale_cost_pct / 100)
        net_sale_value = home_value - sale_cost_amount
        entry_cost_amount = params.property_value * (params.entry_cost_pct / 100)
        equity_before_sale = home_value - mortgage_row.end_balance
        wealth = net_sale_value - mortgage_row.end_balance + after_tax - entry_cost_amount

        row = TrackRow(month=month, contribution=contribution, cumulative_contribution=cumulative_contribution, investment_after_tax=after_tax, wealth=wealth, home_value=home_value, net_sale_value=net_sale_value, end_balance=mortgage_row.end_balance, sale_cost_amount=sale_cost_amount, entry_cost_amount=entry_cost_amount, equity_before_sale=equity_before_sale)
        rows.append(row)
        frozen = row

    return rows


def build_model(params: Params = DEFAULT_PARAMS, overpay_schedule: Mapping[int, float] | None = None) -> Model:
    schedule = overpay_schedule or {}
    rent_costs = calc_rent_costs(params)
    mortgages = {
        "low": calc_mortgage_schedule(params, params.wibor_low_pct, schedule),
        "base": calc_mortgage_schedule(params, params.wibor_base_pct, schedule),
        "high": calc_mortgage_schedule(params, params.wibor_high_pct, schedule),
    }
    horizons = {key: scenario.payoff_month for key, scenario in mortgages.items()}
    rent_track = calc_rent_track(params, rent_costs, mortgages["base"].rows, horizons["base"])
    buy_tracks = {
        "low": calc_buy_track(params, mortgages["low"].rows, rent_costs, horizons["low"]),
        "base": calc_buy_track(params, mortgages["base"].rows, rent_costs, horizons["base"]),
        "high": calc_buy_track(params, mortgages["high"].rows, rent_costs, horizons["high"]),
    }
    return Model(rent_costs=rent_costs, mortgages=mortgages, rent_track=rent_track, buy_tracks=buy_tracks, horizons=horizons)


def difference_at_month(model: Model, month: int, scenario: str = "base") -> float:
    return model.buy_tracks[scenario][month - 1].wealth - model.rent_track[month - 1].wealth


def make_params(**overrides: float | int | str) -> Params:
    values = DEFAULT_PARAMS.__dict__.copy()
    values.update(overrides)
    return Params(**values)

