// Lesson: Algebra › Linear Functions

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

export function LinearFunctionsLesson() {
  return (
    <article className="lesson space-y-4">
      <p>
        A <strong>linear function</strong> changes by the same amount every time its input goes up
        by 1. Its graph is a straight line, and it can always be written as{" "}
        <strong>f(x) = mx + b</strong>, where <strong>m</strong> is the slope and{" "}
        <strong>b</strong> is the y-intercept. The SAT tests whether you can find these numbers,
        use function notation, and explain what they mean in a real situation.
      </p>

      <h2>Slope: the rate of change</h2>
      <p>
        Slope tells you how much y changes for each 1-unit increase in x. Given two points, use
        rise over run:
      </p>
      <p>
        <strong>slope = (y₂ − y₁)/(x₂ − x₁)</strong>
      </p>
      <Example
        wrong="(1, 8) and (4, 2): slope = (4 − 1)/(2 − 8) = −1/2"
        right="(1, 8) and (4, 2): slope = (2 − 8)/(4 − 1) = −6/3 = −2"
        note="Change in y goes on top. A line that falls from left to right has a negative slope."
      />
      <ul>
        <li>Positive slope: the line rises left to right. Negative: it falls. Zero: it&apos;s horizontal.</li>
        <li>Parallel lines have the same slope.</li>
        <li>
          Perpendicular lines have <strong>negative reciprocal</strong> slopes. Slope 4/5 becomes
          −5/4.
        </li>
      </ul>

      <h2>Intercepts</h2>
      <p>
        The <strong>y-intercept</strong> is where the line crosses the y-axis, so x = 0. The{" "}
        <strong>x-intercept</strong> is where it crosses the x-axis, so y = 0.
      </p>
      <Example
        right="2x + 5y = 20: x = 0 gives y = 4, so the y-intercept is (0, 4). y = 0 gives x = 10, so the x-intercept is (10, 0)."
        note="For an equation in standard form, setting each variable to 0 is the fastest route."
      />

      <h2>Function notation</h2>
      <p>
        f(x) is just another name for y. <strong>f(3)</strong> means &quot;the output when the
        input is 3.&quot; Be careful about which one you&apos;re given.
      </p>
      <Example
        right="f(x) = 5x − 2. f(3) = 5(3) − 2 = 13."
        note="Given an input: plug it in."
      />
      <Example
        right="f(x) = 5x − 2. If f(x) = 23, then 5x − 2 = 23, so x = 5."
        note="Given an output: set the formula equal to it and solve."
      />

      <h2>Writing the equation of a line</h2>
      <ol>
        <li>Find the slope m (from two points, a table, or the problem).</li>
        <li>Plug one point into y = mx + b and solve for b.</li>
        <li>Check with a second point if you have one.</li>
      </ol>
      <Example
        right="Through (2, 1) and (6, 13): m = 12/4 = 3. Then 1 = 3(2) + b, so b = −5. The line is y = 3x − 5."
        note="Check the other point: 3(6) − 5 = 13. ✓"
      />
      <Example
        wrong="x: 2, 4, 6 and y: 9, 15, 21 → slope = 6"
        right="x: 2, 4, 6 and y: 9, 15, 21 → slope = 6/2 = 3, so y = 3x + 3"
        note="In a table, check how much x changes between rows. Here it's 2, not 1."
      />

      <h2>Linear models in context</h2>
      <p>
        Word problems use linear functions to describe things that change at a steady rate. Learn
        to read each number:
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Part of f(x) = mx + b</th>
              <th>Meaning</th>
              <th>In P(t) = 350 − 14t (gallons of paint left after t days)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>m, the slope</td>
              <td>change in output per 1 unit of input</td>
              <td>14 gallons are used each day</td>
            </tr>
            <tr>
              <td>b, the intercept</td>
              <td>value when the input is 0</td>
              <td>350 gallons at the start</td>
            </tr>
            <tr>
              <td>f(a) − f(c)</td>
              <td>change in output from c to a</td>
              <td>P(10) − P(5) = −70: 70 gallons used from day 5 to day 10</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Example
        wrong="In P(t) = 350 − 14t, 14 is the number of days the paint lasts."
        right="In P(t) = 350 − 14t, 14 is the number of gallons used per day."
        note="The slope's units are always (output units) per (input unit)."
      />
      <Example
        right="A savings account starts at $180 and grows by $25 each week: S(w) = 180 + 25w. After 8 weeks, S(8) = 380."
        note="Starting amount → b. Steady weekly change → m. Use a minus sign if the amount goes down."
      />

      <h2>Test-day strategy</h2>
      <ol>
        <li>Write down m and b before you look at the choices.</li>
        <li>When matching an equation to points, plug in a point. Wrong choices usually fit one point but not the other.</li>
        <li>For interpretation questions, say the meaning out loud with units: &quot;dollars per mile,&quot; &quot;liters at the start.&quot;</li>
        <li>Desmos can graph any line instantly. Use it to check intercepts and intersections.</li>
      </ol>
    </article>
  );
}
