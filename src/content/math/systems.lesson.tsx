// Lesson: Algebra › Systems of Linear Equations

function Example({ problem, steps, note }: { problem: string; steps: string[]; note?: string }) {
  return (
    <div className="my-3 rounded-2xl border-2 border-line p-4 text-sm">
      <p className="font-semibold">{problem}</p>
      <ol className="mt-2 space-y-1 text-brand-dark">
        {steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      {note && <p className="mt-2 text-muted">{note}</p>}
    </div>
  );
}

export function SystemsLesson() {
  return (
    <article className="lesson space-y-4">
      <p>
        A <strong>system of linear equations</strong> is two (or more) equations that have to be true
        at the same time. The solution is the pair (x, y) that works in both. On a graph, it&apos;s
        the point where the two lines cross. Systems come up often on the SAT, both as plain
        equations and as word problems.
      </p>

      <h2>Method 1: Substitution</h2>
      <p>
        Use substitution when one equation already has a variable by itself (y = …, or x = …).
        Replace that variable in the other equation, then solve.
      </p>
      <Example
        problem="y = x + 5 and 3x + y = 21"
        steps={[
          "Replace y in the second equation: 3x + (x + 5) = 21",
          "Combine: 4x + 5 = 21, so 4x = 16 and x = 4",
          "Back-substitute: y = 4 + 5 = 9",
          "Solution: (4, 9). Check: 3(4) + 9 = 21 ✓",
        ]}
      />

      <h2>Method 2: Elimination</h2>
      <p>
        Use elimination when the equations line up neatly. Add or subtract them so one variable
        cancels. If no coefficients match, multiply one equation first.
      </p>
      <Example
        problem="2x + 5y = 1 and 4x − y = 13"
        steps={[
          "Multiply the second equation by 5: 20x − 5y = 65",
          "Add it to the first: 22x = 66, so x = 3",
          "Substitute: 4(3) − y = 13, so y = −1",
          "Solution: (3, −1)",
        ]}
        note="Pick the variable that's easiest to cancel. Here, the y-terms only needed one equation multiplied."
      />

      <h2>Shortcut: solve for the expression</h2>
      <p>
        Sometimes the question asks for something like x + y or 3x + 3y, not x or y. Before
        solving, see whether adding or subtracting the equations gives that expression directly.
      </p>
      <Example
        problem="If 4x + y = 17 and x + 4y = 13, what is x + y?"
        steps={["Add the equations: 5x + 5y = 30", "Divide by 5: x + y = 6"]}
        note="You never needed x or y on their own."
      />

      <h2>Writing systems from word problems</h2>
      <ol>
        <li>Name each unknown with a letter, and write down what it stands for.</li>
        <li>
          Find two facts. Usually one is a <strong>count</strong> (how many items) and one is a{" "}
          <strong>total value</strong> (how much they cost, weigh, or hold).
        </li>
        <li>Turn each fact into an equation, solve, and reread the question to see which unknown it asks for.</li>
      </ol>
      <Example
        problem="A café sold 40 drinks: smoothies for $6 and teas for $3, for $186 in total. How many smoothies?"
        steps={[
          "s + t = 40 and 6s + 3t = 186",
          "Substitute t = 40 − s: 6s + 120 − 3s = 186",
          "3s = 66, so s = 22 smoothies (and 18 teas)",
        ]}
      />
      <p>
        For &quot;when do two plans cost the same?&quot; problems, write each total as start + rate
        × time and set them equal. For speed problems with a current or wind, the speeds add going
        with it and subtract going against it.
      </p>

      <h2>How many solutions?</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Lines are…</th>
              <th>Equations look like</th>
              <th>Solutions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Crossing</td>
              <td>Different slopes</td>
              <td>Exactly one</td>
            </tr>
            <tr>
              <td>Parallel</td>
              <td>x- and y-coefficients in the same ratio, constants not in that ratio</td>
              <td>None</td>
            </tr>
            <tr>
              <td>The same line</td>
              <td>One whole equation is a multiple of the other</td>
              <td>Infinitely many</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Example
        problem="For what value of k does 2x + ky = 7 and 8x + 12y = 5 have no solution?"
        steps={[
          "The x-coefficient went from 2 to 8, a factor of 4",
          "The y-coefficients need the same factor: 4k = 12, so k = 3",
          "Constants: 4 × 7 = 28 ≠ 5, so the lines are parallel and don't meet",
        ]}
        note="If the constants had matched too (28), the system would have infinitely many solutions instead."
      />

      <h2>Test-day strategy</h2>
      <ol>
        <li>Look at the setup first: a lone variable means substitute, and matching coefficients mean eliminate.</li>
        <li>Check what the question wants (x, y, a sum, or a constant) before you start working.</li>
        <li>Plug your answer back into both equations. It takes ten seconds and catches sign slips.</li>
        <li>Wrong choices are usually the other numbers from your work. If you see the value of x when you need y, slow down.</li>
      </ol>
    </article>
  );
}
