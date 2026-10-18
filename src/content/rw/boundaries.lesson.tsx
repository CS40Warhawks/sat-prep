// Lesson: Standard English Conventions › Boundaries

function Example({ wrong, right, note }: { wrong?: string; right: string; note: string }) {
  return (
    <div className="my-3 rounded-2xl border-2 border-line p-4 text-sm">
      {wrong && (
        <p className="text-wrong-dark">
          <span className="font-semibold">✗ </span>
          {wrong}
        </p>
      )}
      <p className="text-brand-dark">
        <span className="font-semibold">✓ </span>
        {right}
      </p>
      <p className="mt-2 text-muted">{note}</p>
    </div>
  );
}

export function BoundariesLesson() {
  return (
    <article className="lesson space-y-4">
      <p>
        Boundaries questions ask one thing: <strong>what punctuation belongs here?</strong> Every
        choice uses the same words with different punctuation, so you can answer almost every one by
        checking a few rules. These questions usually show up near the end of each Reading and
        Writing module.
      </p>

      <h2>Step 1: Find the clauses</h2>
      <p>
        An <strong>independent clause</strong> has a subject and a verb and can stand alone as a
        sentence (<em>The bridge was designed to withstand earthquakes</em>). A{" "}
        <strong>dependent clause</strong> or <strong>phrase</strong> can&apos;t stand alone (
        <em>Although the recipe is short</em>, <em>Founded in 1891</em>).
      </p>
      <p>
        Read the words before the blank and after it. Ask yourself whether each side could be its
        own sentence. That answer decides most questions.
      </p>

      <h2>Step 2: Match the punctuation to the clauses</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Joining…</th>
              <th>Use</th>
              <th>Never use</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Independent + independent</td>
              <td>
                period · semicolon · comma + FANBOYS (for, and, nor, but, or, yet, so) · colon or
                dash if the second explains the first
              </td>
              <td>a comma alone (comma splice) · nothing (run-on)</td>
            </tr>
            <tr>
              <td>Dependent or phrase + independent</td>
              <td>comma (or nothing)</td>
              <td>period · semicolon · colon</td>
            </tr>
            <tr>
              <td>Independent + list or explanation</td>
              <td>colon or dash</td>
              <td>a colon after an incomplete clause</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Example
        wrong="Octopuses have three hearts, two pump blood through the gills."
        right="Octopuses have three hearts: two pump blood through the gills."
        note="Both sides are independent, so a comma alone is a splice. A colon works because the second part explains the first. A semicolon or period would also be correct."
      />
      <Example
        wrong="Although the recipe is short; it takes all day."
        right="Although the recipe is short, it takes all day."
        note="The first part is dependent, so it can't sit in front of a semicolon."
      />

      <h2>Step 3: Transition words aren&apos;t conjunctions</h2>
      <p>
        Words like <em>however</em>, <em>therefore</em>, <em>moreover</em>, and{" "}
        <em>for example</em> don&apos;t join sentences the way <em>but</em> does. Between two
        independent clauses, they need a semicolon or period before them and a comma after them.
      </p>
      <Example
        wrong="The cars were quiet, however, they had little range."
        right="The cars were quiet; however, they had little range."
        note="With only commas, this is a comma splice in disguise."
      />

      <h2>Step 4: Extra information takes matching marks</h2>
      <p>
        A <strong>nonessential</strong> element can be removed without changing what the sentence
        means. It&apos;s set off by a <em>matching pair</em> of commas, dashes, or parentheses. If
        it opens with a dash, it must close with a dash.
      </p>
      <Example
        wrong="The final chapter—which was rewritten eleven times, is the best."
        right="The final chapter—which was rewritten eleven times—is the best."
        note="Look at how the interruption opens, then close it the same way."
      />
      <p>
        An <strong>essential</strong> element identifies which one you mean, so it takes{" "}
        <strong>no</strong> punctuation.
      </p>
      <Example
        wrong="The poet, Gwendolyn Brooks, won the Pulitzer Prize in 1950."
        right="The poet Gwendolyn Brooks won the Pulitzer Prize in 1950."
        note="&quot;The poet&quot; alone doesn't tell us who, so the name is essential."
      />

      <h2>Step 5: Places punctuation never goes</h2>
      <ul>
        <li>Between a subject and its verb, however long the subject is.</li>
        <li>Between a verb and its object, or before a &quot;that&quot; clause that acts as the object.</li>
        <li>After &quot;such as&quot;, &quot;including&quot;, or a verb that starts a list (no colon there).</li>
        <li>Between a preposition and its object.</li>
      </ul>
      <Example
        wrong="The researchers who studied the reefs, concluded that…"
        right="The researchers who studied the reefs concluded that…"
        note="Long subjects tempt you to add a comma. Don't."
      />

      <h2>Lists with commas inside them</h2>
      <p>
        If the items in a list already contain commas (<em>Austin, Texas</em>), separate the items
        with semicolons so the reader can tell where each one ends.
      </p>

      <h2>Test-day strategy</h2>
      <ol>
        <li>Read the whole sentence, not just the words around the blank.</li>
        <li>Decide what each side of the blank is: independent, dependent, or a phrase.</li>
        <li>Check for an opening comma or dash earlier in the sentence that needs a match.</li>
        <li>
          Cross out choices that break a rule. If two choices are both correct (for example a
          period and a semicolon), the question is testing something else, so read again.
        </li>
        <li>When in doubt, fewer commas usually beats more commas.</li>
      </ol>
    </article>
  );
}
