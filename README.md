# sat-prep

A Duolingo-style course for the digital SAT, covering Reading and Writing plus Math: a learning path of 5-minute lessons with XP, streaks and a daily goal, built around small, steady score gains. Placeholder brand: **Peak Prep**.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run validate   # check question banks for structural mistakes
npm run build
```

## How content is organized

- `src/content/catalog.ts`: the course map (units and skills, following the College Board's content domains). A skill shows as "Coming soon" until `available: true`.
- `src/content/<section>/<skill>.lesson.tsx`: the skill's guidebook, a one-page written lesson.
- `src/content/<section>/<skill>.path.ts`: the skill's short lessons on the path. Each one has a few tip cards and a handful of questions. A `review` lesson draws a random mix from the whole bank.
- `src/content/<section>/<skill>.questions.ts`: the question bank. Each question has four choices, an answer key, and an explanation for every choice (the correct one starts with "Correct").
- `src/content/registry.ts`: connects each available skill to its guidebook, path lessons and questions.

To add a skill, write its guidebook, path and questions, register them, set `available: true`, and run `npm run validate`.

Progress (XP, streak, daily goal, finished lessons) is saved in the browser for now. Accounts (Supabase) and payments (Stripe) come in later milestones; see the course plan.

All questions are original. SAT is a trademark registered by the College Board, which is not affiliated with this site.
