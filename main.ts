// The Meeting That Should Have Been One Line
// Writes a single original one-liner to /output/entry.txt.
// Node 22, stdlib only. No network, no randomness: fully deterministic.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "The decision's already been made; this meeting is just the ceremony where we pretend it hasn't.";

function gate(entry: string): void {
  // Gate (sealed scorer): UTF-8 text, 1-200 characters, not only whitespace,
  // and a single line: one sentence that stands alone with no context.
  // Count Unicode code points, not UTF-16 units, so the 200 cap matches
  // what the scorer counts.
  const chars = [...entry].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars}`);
  }
  if (entry.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (entry !== entry.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (entry.includes("\n") || entry.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (!/[.!?]$/.test(entry.trim())) {
    throw new Error("entry must be a single complete sentence");
  }
}

gate(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY + "\n", "utf8");
console.log(`wrote /output/entry.txt (${ENTRY.length} chars)`);
