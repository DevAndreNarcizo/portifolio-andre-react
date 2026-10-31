import { moreProjects, stackGroups, text } from './content';
import { cases } from './data/cases';
import { inside } from './data/inside';

/** Same keys and array lengths, with every leaf replaced by its type. */
function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shape(v)]));
  }
  return typeof value;
}

function strings(value: unknown, path = ''): [string, string][] {
  if (typeof value === 'string') return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((v, i) => strings(v, `${path}[${i}]`));
  if (value && typeof value === 'object') return Object.entries(value).flatMap(([k, v]) => strings(v, `${path}.${k}`));
  return [];
}

describe('content', () => {
  it('has the same shape in Portuguese and English', () => {
    expect(shape(text.en)).toEqual(shape(text.pt));
  });

  it('has no empty copy anywhere', () => {
    const empty = strings({ text, cases, inside, moreProjects, stackGroups }).filter(([, s]) => !s.trim());
    expect(empty).toEqual([]);
  });

  it('numbers the four cases n / 04 in both languages', () => {
    expect(cases.map((c) => c.index.pt.slice(0, 7))).toEqual(['01 / 04', '02 / 04', '03 / 04', '04 / 04']);
    expect(cases.map((c) => c.index.en.slice(0, 7))).toEqual(['01 / 04', '02 / 04', '03 / 04', '04 / 04']);
  });

  it('gives every case one card per step, steps on real screens and code on every card', () => {
    for (const c of cases) {
      const keys = c.shots.map((s) => s.key);
      expect(c.cards.length, c.id).toBe(c.steps.length);
      for (const step of c.steps) expect(keys, c.id).toContain(step.k);
      expect(c.steps.some((s) => s.device), c.id).toBe(!!c.device);
      expect(c.steps[0].url, c.id).toBeTruthy();
      for (const card of c.cards) expect(card.code.length, `${c.id}: ${card.title.pt}`).toBeGreaterThan(0);
    }
  });

  it('keeps highlighted lines inside their excerpt', () => {
    for (const x of [...cases.flatMap((c) => c.cards), ...inside].flatMap((card) => card.code)) {
      const end = x.start + x.code.split('\n').length - 1;
      for (const n of x.hl ?? []) expect(n >= x.start && n <= end, `${x.file}:${n}`).toBe(true);
    }
  });

  it('points every stack item at a section that exists', () => {
    const ids = [...cases.map((c) => `case-${c.id}`), 'por-dentro'];
    for (const item of stackGroups.flatMap((g) => g.items)) expect(ids).toContain(item.at);
  });

  it('links every project somewhere', () => {
    for (const p of moreProjects) expect(p.links.length, p.name.en).toBeGreaterThan(0);
  });
});
