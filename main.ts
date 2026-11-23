// The One-Line Laugh — make.fun entry
// Writes one funny line, a single sentence, to /output/entry.txt.
//
// The line: an alarm set for a new healthy routine, snoozed nine times,
// and rebranded as interval training. The surprise is the last two words:
// snoozing, the most universal morning failure, reframed as a workout.
// It is one sentence, plain text, and well under 200 characters.

import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "I set my alarm for 6am to start my new healthy routine, then snoozed it nine times and called that interval training.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space, and the brief requires exactly one sentence.
// Refuse to write anything that does not meet it, so a bad edit can
// never ship a line that is too long, blank, or more than one sentence.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`line is ${chars.length} characters, must be 1-200`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only white space");
}
// Exactly one sentence: one terminal period, and no other
// sentence-ending punctuation anywhere inside the line.
if (!LINE.endsWith(".")) {
  throw new Error("line must end with a period");
}
if ((LINE.match(/\./g) ?? []).length !== 1) {
  throw new Error("line must contain exactly one period, the terminal one");
}
if (/[!?]/.test(LINE)) {
  throw new Error("line must contain no exclamation or question marks");
}

const OUTPUT_PATH = "/output/entry.txt";

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, LINE + "\n", "utf8");
