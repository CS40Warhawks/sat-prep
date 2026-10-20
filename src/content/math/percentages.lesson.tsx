// Lesson: Problem-Solving and Data Analysis › Percentages

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

export function PercentagesLesson() {
  return (
    <article className="lesson space-y-4">
      <p>
        <strong>Percent</strong> means &quot;per hundred.&quot; Almost every SAT percent question
        comes down to one idea: turn the percent into a decimal and multiply. Once you think in{" "}
        <strong>multipliers</strong>, percent change, back-to-back changes, and working backward all
        become one-line problems.
      </p>

      <h2>Percent of a number</h2>
      <p>
        Divide the percent by 100 to get a decimal. &quot;Of&quot; means multiply, and
        &quot;is&quot; means equals.
      </p>
      <Example
        problem="What is 15% of 260?"
        steps={["15% = 0.15", "0.15 × 260 = 39"]}
      />
      <Example
        problem="42 is what percent of 120?"
        steps={["part ÷ whole = 42 ÷ 120 = 0.35", "0.35 × 100 = 35%"]}
        note="The number right after &quot;of&quot; is the whole. It goes on the bottom."
      />

      <h2>Percent change</h2>
      <p>
        <strong>Percent change = (new − original) ÷ original × 100.</strong> Always divide by the
        starting value, even when the number went down.
      </p>
      <Example
        problem="A plant grew from 16 cm to 20 cm. What was the percent increase?"
        steps={["Change: 20 − 16 = 4", "4 ÷ 16 = 0.25 → a 25% increase"]}
        note="Dividing by 20 instead gives 20%. That's a common wrong choice."
      />

      <h2>Multipliers</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Change</th>
              <th>Multiply by</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Increase by 15%</td>
              <td>1.15</td>
            </tr>
            <tr>
              <td>Decrease by 15%</td>
              <td>0.85</td>
            </tr>
            <tr>
              <td>Increase by 120%</td>
              <td>2.20</td>
            </tr>
            <tr>
              <td>Take 15% of</td>
              <td>0.15</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        An increase of r% multiplies by (1 + r/100), and a decrease multiplies by (1 − r/100). One
        multiplication gives you the new amount directly, with no separate step to add or subtract.
      </p>

      <h2>Successive changes multiply</h2>
      <p>
        When one change is applied after another, the second percent is taken of the{" "}
        <em>new</em> amount. So you multiply the factors. Adding the percents is the classic trap.
      </p>
      <Example
        problem="A price goes up 25% and then down 20%. What is the overall change?"
        steps={["1.25 × 0.80 = 1.00", "Overall: no change"]}
        note="Check with $100: up 25% is $125, and 20% off $125 is $100. This works out evenly only because of these numbers. Up 20% then down 20% is a 4% drop overall."
      />

      <h2>Working backward (reverse percent)</h2>
      <p>
        When you know the amount <em>after</em> a change, write original × multiplier = final and
        divide. Don&apos;t apply the percent to the final amount.
      </p>
      <Example
        problem="After a 30% markup, a vase sells for $91. What did the store pay?"
        steps={["original × 1.30 = 91", "original = 91 ÷ 1.30 = $70"]}
        note="Taking 30% off $91 gives $63.70, which is wrong. The 30% was 30% of $70, not of $91."
      />
      <Example
        problem="With 6% tax, a bill comes to $63.60. What was it before tax?"
        steps={["1.06 × price = 63.60", "price = 63.60 ÷ 1.06 = $60"]}
      />

      <h2>Percents of percents</h2>
      <p>
        &quot;40% of the 25%&quot; means 0.40 × 0.25 = 0.10, or 10% of the whole. Multiply the
        decimals; never add or subtract the percents.
      </p>

      <h2>Test-day strategy</h2>
      <ol>
        <li>Rewrite every percent as a multiplier before doing anything else.</li>
        <li>Ask which amount is the original. That&apos;s what you divide by, or what gets multiplied.</li>
        <li>Stuck on an abstract percent question? Plug in 100 for the starting amount.</li>
        <li>Check that your answer makes sense: the price before a discount has to be higher than the sale price.</li>
      </ol>
    </article>
  );
}
