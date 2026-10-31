// The "Por dentro deste site" cards quote this repository. Fails when a quoted file changes and the card no longer matches it.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { inside } from '../src/app/data/inside.ts';

const dedent = (lines) => {
  const pad = Math.min(...lines.filter((l) => l.trim()).map((l) => l.length - l.trimStart().length));
  return lines.map((l) => l.slice(pad)).join('\n');
};

for (const card of inside) {
  for (const x of card.code) {
    test(`${x.file}:${x.start} matches the file`, () => {
      const lines = readFileSync(new URL(`../${x.file}`, import.meta.url), 'utf8').split('\n');
      const quoted = lines.slice(x.start - 1, x.start - 1 + x.code.split('\n').length);
      assert.equal(x.code, dedent(quoted));
    });
  }
}
