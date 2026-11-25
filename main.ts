// SPDX-License-Identifier: MIT
// "Boiler Leak" — The Excuse That Almost Works
// make.fun bounty u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5
// Writes the single-line excuse to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt when set).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Sorry, my boiler's leaking into the apartment below and the plumber can't come till noon.";

// Gate self-check (bounty rules: 1–140 chars, at most 20 words, one line).
// Fail loudly instead of ever writing an entry the sealed scorer would reject.
const words = ENTRY.trim().split(/\s+/).length;
if (ENTRY.length < 1 || ENTRY.length > 140) {
  throw new Error(`entry is ${ENTRY.length} chars, gate needs 1–140`);
}
if (words > 20) {
  throw new Error(`entry is ${words} words, gate allows at most 20`);
}
if (ENTRY.includes("\n") || ENTRY.trim() !== ENTRY) {
  throw new Error("entry must be a single line with no surrounding whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length} chars to ${outPath}`);
