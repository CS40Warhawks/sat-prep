// Lesson: Standard English Conventions › Form, Structure, and Sense

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

export function FormStructureSenseLesson() {
  return (
    <article className="lesson space-y-4">
      <p>
        Form, Structure, and Sense questions ask whether the <strong>words themselves</strong> are in
        the right form: the verb matches its subject, the pronoun matches its noun, the tense fits
        the time, and a describing phrase sits next to the thing it describes. The four choices are
        usually the same word in different forms (<em>offer</em>, <em>offers</em>,{" "}
        <em>have offered</em>), so your job is to find the clue in the sentence that picks one.
      </p>

      <h2>Step 1: Match the verb to its real subject</h2>
      <p>
        A singular subject takes a singular verb (<em>the box is</em>), and a plural subject takes a
        plural verb (<em>the boxes are</em>). The test hides the subject by putting other nouns
        between it and the verb.
      </p>
      <ul>
        <li>
          <strong>Cross out prepositional phrases.</strong> The subject is never inside a phrase like{" "}
          <em>of the letters</em> or <em>in the attic</em>.
        </li>
        <li>
          <strong>Skip extra information</strong> set off by commas or dashes.
        </li>
        <li>
          <strong>Two subjects joined by <em>and</em></strong> are plural.
        </li>
        <li>
          With <strong><em>either…or</em></strong> and <strong><em>neither…nor</em></strong>, match
          the verb to the noun closest to it.
        </li>
      </ul>
      <Example
        wrong="The collection of rare maps, gathered over many years, are now online."
        right="The collection of rare maps, gathered over many years, is now online."
        note="Cross out &quot;of rare maps&quot; and the extra info between commas: &quot;The collection is…&quot;"
      />
      <Example
        wrong="Neither the director nor the actors was happy with the ending."
        right="Neither the director nor the actors were happy with the ending."
        note="&quot;Actors&quot; is closer to the verb, so the verb is plural."
      />
      <p>
        Also watch for <strong>flipped sentences</strong> that start with a place or a description.
        The subject comes <em>after</em> the verb, so turn the sentence around to check.
      </p>
      <Example
        wrong="Behind the old barn stands two enormous oak trees."
        right="Behind the old barn stand two enormous oak trees."
        note="Flip it: &quot;Two enormous oak trees stand behind the old barn.&quot;"
      />

      <h2>Step 2: Match pronouns to the nouns they replace</h2>
      <p>
        Find the noun the pronoun points back to. If that noun is singular, use <em>it</em>,{" "}
        <em>its</em>, <em>he</em>, or <em>she</em>. If it&apos;s plural, use <em>they</em>,{" "}
        <em>them</em>, or <em>their</em>. Group words like <em>team</em>, <em>committee</em>,{" "}
        <em>company</em>, and <em>council</em> count as singular on the SAT.
      </p>
      <Example
        wrong="The company released their first product in 2015."
        right="The company released its first product in 2015."
        note="One company, so the singular &quot;its.&quot;"
      />
      <p>
        Pick the right <strong>case</strong>, too: <em>they</em> and <em>she</em> are subjects;{" "}
        <em>them</em> and <em>her</em> are objects.
      </p>

      <h2>Step 3: Get apostrophes right</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>You mean…</th>
              <th>Write</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>More than one, nothing owned</td>
              <td>-s</td>
              <td>The birds sang.</td>
            </tr>
            <tr>
              <td>One owner</td>
              <td>-&apos;s</td>
              <td>The bird&apos;s song</td>
            </tr>
            <tr>
              <td>Several owners</td>
              <td>-s&apos;</td>
              <td>The birds&apos; songs</td>
            </tr>
            <tr>
              <td>Plural that doesn&apos;t end in s</td>
              <td>-&apos;s</td>
              <td>The children&apos;s books</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Possessive pronouns <strong>never</strong> take apostrophes: <em>its</em>, <em>their</em>,{" "}
        <em>whose</em>, <em>yours</em>. The apostrophe versions are contractions:{" "}
        <em>it&apos;s</em> = it is, <em>they&apos;re</em> = they are, <em>who&apos;s</em> = who is.
      </p>
      <Example
        wrong="The museum is known for it's glass dome."
        right="The museum is known for its glass dome."
        note="Test it: &quot;known for it is glass dome&quot; makes no sense, so drop the apostrophe."
      />

      <h2>Step 4: Let the time clues choose the tense</h2>
      <p>
        Look for dates, words like <em>last year</em>, <em>currently</em>, or <em>by the time</em>,
        and the other verbs in the sentence. Keep the tense consistent unless the time clearly
        changes.
      </p>
      <ul>
        <li>
          <strong>Simple past</strong> (<em>discovered</em>) for a finished event at a specific time.
        </li>
        <li>
          <strong>Present perfect</strong> (<em>has discovered</em>) for something that started in the
          past and connects to now. Never use it with a specific past date.
        </li>
        <li>
          <strong>Past perfect</strong> (<em>had discovered</em>) for something that happened before
          another past event.
        </li>
      </ul>
      <Example
        wrong="In 1928, Alexander Fleming has noticed mold killing bacteria in a dish."
        right="In 1928, Alexander Fleming noticed mold killing bacteria in a dish."
        note="A specific past date calls for the simple past."
      />

      <h2>Step 5: Make sure there&apos;s a main verb</h2>
      <p>
        Every sentence needs a subject and a real, working verb. Forms like <em>drawing</em>,{" "}
        <em>to draw</em>, and <em>having drawn</em> can&apos;t do that job alone. This trap is common
        when a long description separates the subject from the blank.
      </p>
      <Example
        wrong="The violinist, who began lessons at age four, performing her first solo concert at nine."
        right="The violinist, who began lessons at age four, performed her first solo concert at nine."
        note="Without &quot;performed,&quot; the subject &quot;The violinist&quot; never gets a verb."
      />

      <h2>Step 6: Put modifiers next to what they describe</h2>
      <p>
        An opening phrase followed by a comma describes the <strong>first noun after the comma</strong>.
        If that noun isn&apos;t the one doing the action, the modifier is dangling. A possessive like{" "}
        <em>the chef&apos;s</em> doesn&apos;t count: the noun after it is what the phrase describes.
      </p>
      <Example
        wrong="After tasting the soup, more salt was added by the chef."
        right="After tasting the soup, the chef added more salt."
        note="The chef tasted the soup, so &quot;the chef&quot; must come right after the comma."
      />

      <h2>Test-day strategy</h2>
      <ol>
        <li>Look at how the choices differ. That tells you what&apos;s being tested.</li>
        <li>For verbs, find the subject (cross out phrases in the middle) and the time clues.</li>
        <li>For pronouns, point to the exact noun the pronoun replaces.</li>
        <li>For apostrophes, count the owners and check whether anything is owned.</li>
        <li>For an opening phrase, ask &quot;who is doing this?&quot; and make sure that noun comes next.</li>
      </ol>
    </article>
  );
}
