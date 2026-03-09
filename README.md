# Kredyt vs Wynajem

Aplikacja przegladarkowa do porownania oplacalnosci **zakupu mieszkania na kredyt** vs **wynajmu**.

## Co zawiera repo

- `index.html` - interfejs aplikacji
- `styles.css` - style
- `app.js` - logika obliczen i wykresy
- `calculator_model.py` - testowalny model obliczeniowy (mirror logiki)
- `tests/test_calculator_model.py` - testy regresyjne i walidacyjne
- `run_tests.ps1` - szybkie uruchomienie testow
- `rebuild_venv.ps1` - odtworzenie srodowiska Python

## Najwazniejsze zalozenia modelu

- Co miesiac nadplata = `Nadwyzki finansowe`.
- Harmonogram nadplat (np. premie roczne) jest **dodatkiem** w wybranych miesiacach.
- Czyli w miesiacu z harmonogramem: `nadplata = nadwyzki finansowe + wpis z harmonogramu`.
- Wyniki sa porownywane na wspolnym horyzoncie, z zamrozeniem po pelnej splacie kredytu bazowego.

## Uruchomienie aplikacji

1. Otworz `index.html` w przegladarce.
2. Zmien parametry i kliknij `Przelicz`.

## Uruchomienie testow

```powershell
.\rebuild_venv.ps1
.\run_tests.ps1
```

Alternatywnie:

```powershell
python -m unittest discover -s tests -v
```

## Status

Projekt jest przygotowany do publikacji na GitHub jako czysty MVP web + testy modelu.
