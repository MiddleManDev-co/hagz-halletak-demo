# Strict locale v2

Dawwar no longer relies on broad substring/DOM language purification.

Rules:
- Arabic user-facing copy is authored in Arabic.
- English user-facing copy is authored in English.
- Pilot and guided-tour copy use explicit `L(ar, en)` pairs.
- Legacy screens use `locale-legacy-v2.js`, which translates exact text nodes and a small set of safe dynamic patterns only.
- System identifiers such as `DWR-2031` and `RQ-8142` remain identifiers in both languages.
- Demo couple: محمود وسلمى / Mahmoud & Salma.
- Product brand: دوّر / Dawwar.
