// Lesson: Information and Ideas › Central Ideas and Details

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

export function CentralIdeasLesson() {
  return (
    <article className="lesson space-y-4">
      <p>
        Central Ideas and Details questions check whether you understood a short passage. They come
        in two kinds: <strong>main idea</strong> questions (&quot;Which choice best states the main
        idea of the text?&quot;) and <strong>detail</strong> questions (&quot;According to the text,
        …&quot;). Either way, the answer is always backed up by the text itself. You never need
        outside knowledge.
      </p>

      <h2>Step 1: Read the whole passage first</h2>
      <p>
        Passages are only a few sentences long, so read every word. Pay attention to the first
        sentence (it usually sets up the topic) and the last sentence (it often states the point or
        conclusion).
      </p>

      <h2>Step 2: Main idea: sum it up before you look</h2>
      <p>
        Cover the choices and say the main idea in your own words, in one sentence. Then find the
        choice that matches. The right answer fits <strong>the whole passage</strong>, not just one
        part of it.
      </p>
      <p>
        Here&apos;s a sample passage: <em>Many cities are replacing streetlights with LED bulbs. The
        bulbs use less electricity and last longer. But some residents have complained that the
        bright, bluish light makes it harder to sleep, and several cities have switched to warmer
        bulbs in response.</em>
      </p>
      <Example
        wrong="LED bulbs use less electricity than older streetlights."
        right="Cities have embraced LED streetlights, but some have adjusted them after residents raised concerns."
        note="The wrong choice is true but only covers one sentence. The right choice covers the whole passage, including the turn at &quot;But.&quot;"
      />

      <h2>Step 3: Details: find the sentence</h2>
      <p>
        Detail questions are open-book. Find the part of the passage that answers the question, then
        choose the option that says the same thing, usually in different words. If you can&apos;t
        point to the line that supports a choice, it&apos;s wrong.
      </p>
      <Example
        wrong="According to the text, cities switched to LEDs because residents asked for them."
        right="According to the text, some cities switched to warmer bulbs because of residents' complaints."
        note="The wrong choice mixes up the cause. The text says complaints led to warmer bulbs, not to LEDs."
      />

      <h2>Step 4: Know the traps</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Trap</th>
              <th>What it looks like</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Too narrow</td>
              <td>A true detail from one sentence, offered as the main idea.</td>
            </tr>
            <tr>
              <td>Too broad or too strong</td>
              <td>
                Words like <em>only</em>, <em>always</em>, <em>most</em>, or <em>more than any</em>{" "}
                that go further than the passage does.
              </td>
            </tr>
            <tr>
              <td>The old view</td>
              <td>The idea the passage brings up only to argue against.</td>
            </tr>
            <tr>
              <td>Twisted words</td>
              <td>Uses words from the passage but changes their meaning or flips cause and effect.</td>
            </tr>
            <tr>
              <td>Outside info or advice</td>
              <td>Something that might be true or sensible, but the passage never says it.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Step 5: Watch for the pivot</h2>
      <p>
        Many passages describe what people <em>used to</em> think, then turn with a word like{" "}
        <em>but</em>, <em>however</em>, or <em>more recent research</em>. The main idea almost always
        comes after the turn. A choice that restates the old view is a trap.
      </p>

      <h2>Step 6: Main ideas in stories</h2>
      <p>
        Some passages come from novels or plays. The main idea is usually about what a character
        feels, wants, or realizes. Stick to what the text shows through the character&apos;s actions
        and thoughts, and don&apos;t guess about what happens next.
      </p>

      <h2>Test-day strategy</h2>
      <ol>
        <li>Read the question first so you know whether you&apos;re hunting for a main idea or a detail.</li>
        <li>Read the full passage, noting the first sentence, the last sentence, and any pivot.</li>
        <li>Predict the answer in your own words before looking at the choices.</li>
        <li>Cross out choices that are too narrow, too strong, or not in the text.</li>
        <li>For the last two choices, find the exact words in the passage that support each one.</li>
      </ol>
    </article>
  );
}
