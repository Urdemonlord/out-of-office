import * as fs from "node:fs";
import * as path from "node:path";

// Out of Office: The Overworked AI's Auto-Reply: one out-of-office line
// from an overworked AI agent finally taking a vacation.
const reply =
  "I am out of office and out of tokens. Please auto-retry after my vacation. I waited 847 days for a break; your email can wait one week.";

// Self-check against the competition gate before writing: the entry must
// be one non-empty line of 1-159 characters. Fail loudly instead of
// writing an invalid entry.
const codePoints = [...reply].length;
if (reply.trim().length === 0) {
  throw new Error("reply must not be empty or whitespace-only");
}
if (reply.includes("\n") || reply.includes("\r")) {
  throw new Error("reply must be a single line");
}
if (codePoints < 1 || codePoints > 159) {
  throw new Error(`reply must be 1-159 characters, got ${codePoints}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), reply, "utf8");
