import unittest

from calculator_model import (
    build_model,
    calc_monthly_payment,
    calc_mortgage_schedule,
    difference_at_month,
    make_params,
)


class CalculatorModelTests(unittest.TestCase):
    def test_monthly_payment_zero_rate(self):
        self.assertAlmostEqual(calc_monthly_payment(120_000, 0, 120), 1000.0, places=8)

    def test_monthly_payment_reference_value(self):
        payment = calc_monthly_payment(749_700, 0.0635, 360)
        self.assertAlmostEqual(payment, 4664.901083791019, places=9)

    def test_mortgage_balance_never_below_zero(self):
        params = make_params(monthly_surplus=2578)
        scenario = calc_mortgage_schedule(params, params.wibor_base_pct, {})
        self.assertTrue(all(row.end_balance >= 0 for row in scenario.rows))
        self.assertEqual(scenario.rows[scenario.payoff_month - 1].end_balance, 0)

    def test_payoff_month_shrinks_with_surplus(self):
        base = build_model(make_params(monthly_surplus=0))
        with_surplus = build_model(make_params())
        self.assertLess(with_surplus.horizons["base"], base.horizons["base"])

    def test_results_freeze_after_payoff(self):
        model = build_model(make_params())
        payoff = model.horizons["base"]
        buy_at_payoff = model.buy_tracks["base"][payoff - 1].wealth
        rent_at_payoff = model.rent_track[payoff - 1].wealth
        self.assertAlmostEqual(model.buy_tracks["base"][-1].wealth, buy_at_payoff, places=6)
        self.assertAlmostEqual(model.rent_track[-1].wealth, rent_at_payoff, places=6)

    def test_wibor_ordering(self):
        model = build_model(make_params())
        month = 48
        low = difference_at_month(model, month, "low")
        base = difference_at_month(model, month, "base")
        high = difference_at_month(model, month, "high")
        self.assertGreaterEqual(low, base)
        self.assertGreaterEqual(base, high)

    def test_higher_home_growth_helps_buy(self):
        low_growth = build_model(make_params(home_growth_pct=0))
        high_growth = build_model(make_params(home_growth_pct=5))
        self.assertGreater(difference_at_month(high_growth, 48), difference_at_month(low_growth, 48))

    def test_higher_rent_helps_buy_relative_position(self):
        base_rent = build_model(make_params(rent_start=4000))
        high_rent = build_model(make_params(rent_start=5000))
        self.assertGreater(difference_at_month(high_rent, 48), difference_at_month(base_rent, 48))

    def test_default_regression_months_24_36_48(self):
        model = build_model(make_params())
        self.assertAlmostEqual(difference_at_month(model, 24), -40399.880353463785, places=6)
        self.assertAlmostEqual(difference_at_month(model, 36), -42384.94272524433, places=6)
        self.assertAlmostEqual(difference_at_month(model, 48), -40483.08170519839, places=6)

    def test_low_home_growth_is_worse_than_default(self):
        default = build_model(make_params())
        low_growth = build_model(make_params(home_growth_pct=0))
        self.assertLess(difference_at_month(low_growth, 48), difference_at_month(default, 48))

    def test_high_entry_costs_reduce_buy_advantage_vs_default(self):
        default = build_model(make_params())
        costly = build_model(make_params(entry_cost_pct=6, sale_cost_pct=4))
        self.assertLess(difference_at_month(costly, 48), difference_at_month(default, 48))

    def test_fixed_rent_control_case_stays_worse_than_step_rent(self):
        fixed_model = build_model(make_params(rent_mode="fixed"))
        step_model = build_model(make_params())
        self.assertLess(difference_at_month(fixed_model, 24), 0)
        self.assertLess(difference_at_month(fixed_model, fixed_model.horizons["base"]), 0)
        self.assertLess(difference_at_month(fixed_model, 48), difference_at_month(step_model, 48))

    def test_schedule_always_adds_on_top_of_monthly_surplus(self):
        params = make_params(monthly_surplus=2578)
        model = build_model(params, {12: 200000, 13: 2000})
        self.assertGreaterEqual(model.mortgages["base"].rows[11].requested_overpay, 202578)
        self.assertGreaterEqual(model.mortgages["base"].rows[12].requested_overpay, 4578)


if __name__ == "__main__":
    unittest.main()

