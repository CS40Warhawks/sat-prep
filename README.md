# sat-prep

A web course for the digital SAT, covering Reading and Writing plus Math. Placeholder brand: **Peak Prep**.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run validate   # check question banks for structural mistakes
npm run build
```

## How content is organized

- `src/content/catalog.ts`: the course map (units and skills, following the College Board's content domains). A skill shows as "Coming soon" until `available: true`.
- `src/content/<section>/<skill>.lesson.tsx`: the lesson for a skill.
- `src/content/<section>/<skill>.questions.ts`: the question bank. Each question has four choices, an answer key, and an explanation for every choice (the correct one starts with "Correct").
- `src/content/registry.ts`: connects each available skill to its lesson and questions.

To add a skill, write its lesson and questions, register them, set `available: true`, and run `npm run validate`.

Progress is saved in the browser for now. Accounts (Supabase) and payments (Stripe) come in later milestones; see the course plan.

All questions are original. SAT is a trademark registered by the College Board, which is not affiliated with this site.
