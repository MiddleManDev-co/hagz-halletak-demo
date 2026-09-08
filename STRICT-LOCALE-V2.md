# Strict locale

Dawwar does not translate at runtime. There is no DOM purification, no
substring rewriting, and no `MutationObserver` watching for text to fix.

Every string is authored in both languages in `messages/ar.json` and
`messages/en.json`, and the correct catalog is resolved on the server while the
page is prerendered.

## Rules

- Arabic user-facing copy is authored in Arabic; English in English. Neither is
  derived from the other at runtime.
- Both catalogs define exactly the same keys. A key present in one and missing
  from the other fails the build.
- A missing key is a build failure, not a fallback — `onError` in
  `src/i18n/request.ts` throws rather than rendering the raw key as visible text.
- System identifiers such as `DWR-2031` and `RQ-8142` stay identifiers in both
  languages.
- Venue and brand names (`Royal Garden`, `VenueOS`, `Dawwar`) stay in Latin
  script inside Arabic copy; they are names, not copy.
- Demo couple: محمود وسلمى / Mahmoud & Salma.
- Product brand: دوّر / Dawwar.

## Enforcement

`tests/messages.test.ts` checks all of the above:

- both catalogs define the same keys, with no empty values;
- no Arabic script leaks into `en.json`;
- every Arabic value actually contains Arabic, except allowlisted proper nouns
  and values with no letters at all (`↑ 22%`).

`tests/message-usage.test.ts` additionally resolves every literal message key
used in `src/` against the catalog, so a typo fails in milliseconds instead of
after a full build.

## Known gaps

`messages/UNTRANSLATED.md` lists strings the original demo shipped identical in
both languages — English text that renders inside the Arabic UI. They are
carried as-is so nothing changed visually during the migration, and the test
holds their count as a ratchet that may only go down.
