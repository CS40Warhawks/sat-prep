// Lesson: Expression of Ideas › Transitions

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

export function TransitionsLesson() {
  return (
    <article className="lesson space-y-4">
      <p>
        Transitions questions give you a short text with a blank, usually at the start of a
        sentence, and ask for <strong>the most logical transition</strong>. Grammar isn&apos;t the
        issue here. Every choice fits the sentence. What matters is whether the word shows how the
        two ideas actually relate.
      </p>

      <h2>Step 1: Cover the choices</h2>
      <p>
        The choices are designed to sound good. Before you read them, read the sentence before the
        blank and the sentence with the blank. Then say in your own words how they connect: &quot;the
        second one disagrees,&quot; &quot;the second one is the result,&quot; &quot;the second one
        is an example.&quot;
      </p>

      <h2>Step 2: Sort the relationship into a group</h2>
      <p>Most transitions fall into a handful of groups. Find the group first, then the word.</p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>The second idea…</th>
              <th>Transitions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>pushes against the first</td>
              <td>however · by contrast · in contrast · on the other hand · in reality</td>
            </tr>
            <tr>
              <td>happens anyway, despite the first</td>
              <td>nevertheless · nonetheless · even so · still</td>
            </tr>
            <tr>
              <td>adds a new point in the same direction</td>
              <td>additionally · moreover · furthermore · also</td>
            </tr>
            <tr>
              <td>backs up the first more strongly</td>
              <td>indeed · in fact</td>
            </tr>
            <tr>
              <td>is caused by the first</td>
              <td>as a result · consequently · therefore · thus · for this reason · accordingly</td>
            </tr>
            <tr>
              <td>is a specific case of the first</td>
              <td>for example · for instance</td>
            </tr>
            <tr>
              <td>says the first again, more simply</td>
              <td>in other words · that is</td>
            </tr>
            <tr>
              <td>gives the details of the first</td>
              <td>specifically · in particular</td>
            </tr>
            <tr>
              <td>is alike, but about something else</td>
              <td>similarly · likewise · in the same way</td>
            </tr>
            <tr>
              <td>comes next in time or in a process</td>
              <td>next · then · subsequently · finally · meanwhile (at the same time)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Example
        wrong="Most marine mammals rely on blubber. Sea otters, similarly, have very little blubber."
        right="Most marine mammals rely on blubber. Sea otters, by contrast, have very little blubber."
        note="Sea otters are the exception, so the second idea is a turn, not a match."
      />

      <h2>Step 3: Don&apos;t assume cause and effect</h2>
      <p>
        <em>Therefore</em> and <em>as a result</em> are only right if the first idea really makes the
        second one happen. A prediction that doesn&apos;t come true is a contrast. A surprising
        success despite a setback is a &quot;happens anyway&quot; transition.
      </p>
      <Example
        wrong="The researchers expected higher yields. Therefore, yields stayed flat."
        right="The researchers expected higher yields. However, yields stayed flat."
        note="The expectation didn't cause the result. The result went against it."
      />

      <h2>Step 4: Example, restatement, or detail?</h2>
      <p>
        These three get mixed up a lot. <em>For example</em> picks out one case of a bigger idea.{" "}
        <em>In other words</em> repeats the same idea in simpler words. <em>Specifically</em> zooms
        in and spells out exactly what the earlier sentence meant.
      </p>
      <Example
        right="Bats listen for the echoes of their calls. In other words, they hunt by sound."
        note="Hunting by sound isn't a new example. It's the first sentence said more simply."
      />

      <h2>Step 5: Link sentence to sentence</h2>
      <p>
        On harder questions, the sentence with the blank may contain its own contrast (&quot;in dry
        regions… while in rainy regions…&quot;). That&apos;s a trap. The transition connects{" "}
        <strong>this sentence to the one before it</strong>, so judge that relationship only.
      </p>
      <Example
        wrong="She believed buildings should suit their climate. In contrast, her desert houses had thick walls, while her rainy-region houses had steep roofs."
        right="She believed buildings should suit their climate. Accordingly, her desert houses had thick walls, while her rainy-region houses had steep roofs."
        note="The designs carry out her belief, so the two sentences agree."
      />

      <h2>Test-day strategy</h2>
      <ol>
        <li>Read the sentence before the blank and the sentence with the blank. Sometimes read one more.</li>
        <li>Name the relationship in plain words before you look at the choices.</li>
        <li>
          Cross out every choice from the wrong group. Two choices from the same group (like{" "}
          <em>however</em> and <em>nevertheless</em>) usually can&apos;t both be right, so if two
          seem equal, look for the small difference in meaning.
        </li>
        <li>Plug your answer in and read both sentences together. It should sound like a clear thought.</li>
      </ol>
    </article>
  );
}
