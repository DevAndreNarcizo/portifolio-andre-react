import { projects, stackLayers, targetStack, text, words } from './content';

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, v]) => [key, shape(v)]));
  }
  return typeof value;
}

function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
}

describe('content', () => {
  it('has the same keys and list lengths in PT and EN', () => {
    expect(shape(text.en)).toEqual(shape(text.pt));
  });

  it('has no empty copy in either language', () => {
    for (const lang of ['pt', 'en'] as const) {
      expect(strings(text[lang]).filter((s) => !s.trim())).toEqual([]);
    }
  });

  it('lists 12 projects with unique ids and complete PT/EN texts', () => {
    expect(projects.length).toBe(12);
    expect(new Set(projects.map((p) => p.id)).size).toBe(12);
    for (const p of projects) {
      for (const field of [p.summary, p.role, p.problem, p.solution, p.result]) {
        expect(field.pt.trim()).not.toBe('');
        expect(field.en.trim()).not.toBe('');
      }
    }
  });

  it('keeps MongoDB out of the stack blueprint and every target tech in it', () => {
    const techs = stackLayers.flatMap((layer) => layer.techs);
    expect(techs).not.toContain('MongoDB');
    for (const tech of targetStack) expect(techs).toContain(tech);
  });
});

describe('words', () => {
  it('splits on whitespace and flags the text between asterisks', () => {
    expect(words('Do banco *à interface,* web')).toEqual([
      { text: 'Do', em: false },
      { text: 'banco', em: false },
      { text: 'à', em: true },
      { text: 'interface,', em: true },
      { text: 'web', em: false },
    ]);
  });

  it('handles emphasis at the start and end without empty words', () => {
    expect(words('*Projetos.*')).toEqual([{ text: 'Projetos.', em: true }]);
    expect(words("Let's *talk.*")).toEqual([
      { text: "Let's", em: false },
      { text: 'talk.', em: true },
    ]);
  });
});
