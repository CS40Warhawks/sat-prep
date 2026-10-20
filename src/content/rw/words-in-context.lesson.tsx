// Lesson: Craft and Structure › Words in Context

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

export function WordsInContextLesson() {
  return (
    <article className="lesson space-y-4">
      <p>
        Words in Context questions give you a short text with one blank and ask for{" "}
        <strong>the most logical and precise word or phrase</strong>. They usually come first in each
        Reading and Writing module. You don&apos;t need a giant vocabulary to do well. You need to
        read the clues the text gives you.
      </p>

      <h2>Step 1: Predict your own word</h2>
      <p>
        Cover the choices. Read the whole text and fill the blank with a simple word of your own,
        even a rough one like &quot;good,&quot; &quot;small,&quot; or &quot;stop.&quot; Then look
        for the choice that means the same thing. This keeps fancy-sounding wrong answers from
        pulling you in.
      </p>
      <Example
        right="The town's population grew only modestly, by just a few hundred people in a century."
        note="&quot;Only&quot; and &quot;just a few hundred&quot; let you predict &quot;a little&quot; before you see any choices."
      />

      <h2>Step 2: Find the clue</h2>
      <p>The answer is always supported by something in the text. Common clues:</p>
      <ul>
        <li>
          <strong>A colon or dash</strong> followed by an explanation. What comes after it often
          defines the blank.
        </li>
        <li>
          <strong>A restatement</strong> later in the sentence (&quot;…without favoring any one
          group&quot; explains <em>evenhanded</em>).
        </li>
        <li>
          <strong>A result</strong> (&quot;which allows them to survive…&quot;) that only makes sense
          with one meaning.
        </li>
      </ul>
      <Example
        right="The library is flexible: its rooms can all be rearranged for different events."
        note="The part after the colon tells you exactly what kind of building it is."
      />

      <h2>Step 3: Follow the signal words</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Signal</th>
              <th>Examples</th>
              <th>The blank…</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Contrast</td>
              <td>but · although · though · however · rather than · instead of</td>
              <td>goes the opposite way from the other idea</td>
            </tr>
            <tr>
              <td>Support</td>
              <td>and · because · so · which allows · in fact</td>
              <td>goes the same way as the other idea</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Example
        wrong="Early reviewers dismissed her colors, but later critics confirmed that judgment."
        right="Early reviewers dismissed her colors, but later critics overturned that judgment."
        note="&quot;But&quot; tells you the later critics disagreed."
      />

      <h2>Step 4: Know the second meanings</h2>
      <p>
        The test often uses everyday words in a less common way. If a familiar word seems odd,
        think about its other meanings before you cross it out.
      </p>
      <ul>
        <li><em>arrest</em>: stop (arrest the spread of a disease)</li>
        <li><em>check</em>: hold back (keep a population in check)</li>
        <li><em>qualified</em>: limited, with conditions (qualified support)</li>
        <li><em>economical</em>: using no more than needed (economical writing)</li>
        <li><em>isolate</em>: separate out (isolate one cause from another)</li>
      </ul>

      <h2>Step 5: Match the strength</h2>
      <p>
        &quot;Precise&quot; means the word has the right intensity as well as the right direction.
        If the text says <em>only</em> or <em>just</em>, a strong word like <em>dramatic</em> or{" "}
        <em>enthusiastic</em> overshoots. If the text describes a warning, <em>neutral</em> is too
        weak.
      </p>
      <Example
        wrong="The committee gave the plan only enthusiastic support, demanding major revisions."
        right="The committee gave the plan only qualified support, demanding major revisions."
        note="Support that comes with demands is limited, not enthusiastic."
      />

      <h2>Test-day strategy</h2>
      <ol>
        <li>Read the whole text before thinking about the blank.</li>
        <li>Predict a simple word of your own.</li>
        <li>Find the clue that supports your prediction, and check for contrast or support signals.</li>
        <li>Cross out choices that go the wrong direction or have the wrong strength.</li>
        <li>Plug your choice back in and reread. It should fit every clue in the text.</li>
      </ol>
    </article>
  );
}
