// Lesson: Algebra › Linear Equations in One Variable

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

export function LinearEquationsOneVariableLesson() {
  return (
    <article className="lesson space-y-4">
      <p>
        A <strong>linear equation in one variable</strong> has a single unknown, usually x, and no
        powers higher than 1: no x², no √x. Your job is to find the value that makes both sides
        equal. These questions are some of the most common on the Math section, and almost all of
        them come down to the same few moves done carefully.
      </p>

      <h2>Step 1: Simplify each side</h2>
      <p>
        Before moving anything across the equals sign, clean up each side on its own.{" "}
        <strong>Distribute</strong> any number in front of parentheses to every term inside, then
        combine like terms.
      </p>
      <Example
        wrong="3(2x + 1) − 4 = 6x + 1 − 4"
        right="3(2x + 1) − 4 = 6x + 3 − 4 = 6x − 1"
        note="The 3 multiplies the 1 too. Dropping it is the single most common slip."
      />

      <h2>Step 2: Get x on one side</h2>
      <p>
        If x appears on both sides, subtract one x term from both sides. Then move the constants to
        the other side by adding or subtracting. Finally, divide by the coefficient of x.
      </p>
      <Example
        right="9x + 2 = 4x + 27 → 5x + 2 = 27 → 5x = 25 → x = 5"
        note="Check by plugging in: 9(5) + 2 = 47 and 4(5) + 27 = 47. A five-second check catches most errors."
      />

      <h2>Step 3: Clear fractions early</h2>
      <p>
        When an equation has fractions, multiply <em>every term on both sides</em> by the least
        common denominator. If each side is a single fraction, you can cross-multiply instead.
      </p>
      <Example
        right="x/2 − x/5 = 9 → (×10) → 5x − 2x = 90 → 3x = 90 → x = 30"
        note="Every term gets multiplied by 10, including the 9 on the right."
      />
      <Example
        wrong="(x + 1)/4 = (x − 2)/3 → 4(x + 1) = 3(x − 2)"
        right="(x + 1)/4 = (x − 2)/3 → 3(x + 1) = 4(x − 2) → 3x + 3 = 4x − 8 → x = 11"
        note="Each numerator is multiplied by the other side's denominator."
      />

      <h2>Step 4: Answer the question that was asked</h2>
      <p>
        Many questions ask for something other than x, like 2x + 1 or the length instead of the
        width. Sometimes you can skip solving for x entirely.
      </p>
      <Example
        right="If 3x + 4 = 19, then 6x + 8 = 2(3x + 4) = 38"
        note="Doubling the whole equation gets the answer in one step."
      />

      <h2>Word problems</h2>
      <p>Translate the story into an equation before doing any arithmetic.</p>
      <ol>
        <li>Name the unknown (&quot;let n = number of tickets&quot;).</li>
        <li>
          A one-time amount (fee, starting value) is added once. A per-item or per-hour amount is
          multiplied by the unknown.
        </li>
        <li>
          For &quot;when are they the same?&quot; questions, write one expression for each
          quantity and set them equal.
        </li>
      </ol>
      <Example
        right="A bike rental is $12 plus $7.50 per hour. A $57 bill means 12 + 7.5h = 57 → 7.5h = 45 → h = 6 hours."
        note="The $12 is charged once, so it isn't multiplied by h."
      />
      <Example
        right="Tank A has 500 L and loses 20 L per minute. Tank B has 300 L and gains 30 L per minute. 500 − 20t = 300 + 30t → 200 = 50t → t = 4."
        note="Gains are + and losses are −. After 4 minutes both tanks hold 420 L."
      />

      <h2>One, none, or infinitely many solutions</h2>
      <p>
        Simplify both sides into the form (number)x + (number), then compare:
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>After simplifying…</th>
              <th>Number of solutions</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>x coefficients differ</td>
              <td>Exactly one</td>
              <td>4x + 1 = 2x + 9 (x = 4)</td>
            </tr>
            <tr>
              <td>Same x coefficient, different constants</td>
              <td>None</td>
              <td>4x + 1 = 4x + 9 (1 = 9 is false)</td>
            </tr>
            <tr>
              <td>Both sides identical</td>
              <td>Infinitely many</td>
              <td>4x + 1 = 4x + 1 (always true)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Example
        right="2(px + 3) = 10x + 6 has infinitely many solutions when 2p = 10, so p = 5."
        note="When a question asks for a constant that creates infinitely many (or no) solutions, match the x coefficients first, then compare the constants."
      />
      <Example
        wrong="3x + 5 = x + 5 → 2x = 0 → no solution"
        right="3x + 5 = x + 5 → 2x = 0 → x = 0"
        note="Zero is a perfectly good answer. No solution only happens when x disappears and leaves a false statement."
      />

      <h2>Test-day strategy</h2>
      <ol>
        <li>Distribute and combine like terms before moving anything.</li>
        <li>Clear fractions or decimals by multiplying through, so you work with whole numbers.</li>
        <li>Reread the question before choosing: x, or something built from x?</li>
        <li>Plug your answer back into the original equation. Wrong choices are often the result of one sign slip.</li>
        <li>If you&apos;re stuck, try each answer choice in the equation. On the digital SAT, the built-in Desmos calculator can also check your work.</li>
      </ol>
    </article>
  );
}
