export const BLANK = "______";

/**
 * Fill the blank with a choice's text, tidying spaces around leading
 * punctuation (", who") and dashes ("publication—").
 */
export function fillBlank(passage: string, text: string): string {
  const [before, after = ""] = passage.split(BLANK);
  const head = /^[,;:.—]/.test(text) ? before.trimEnd() : before;
  const tail = text.endsWith("—") ? after.trimStart() : after;
  return head + text + tail;
}
