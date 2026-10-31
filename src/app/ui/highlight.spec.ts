import { highlight } from './highlight';

const tokens = (line: string, lang: Parameters<typeof highlight>[1]) =>
  highlight(line, lang).map((t) => `${t.kind}:${t.text}`);

describe('highlight', () => {
  it('gives the line back unchanged when the tokens are joined', () => {
    const line = "  const total = round2(a + 0.5); // cents";
    expect(highlight(line, 'ts').map((t) => t.text).join('')).toBe(line);
  });

  it('marks keywords, strings, numbers and comments', () => {
    expect(tokens("return 'ok' + 42 // done", 'ts')).toEqual([
      'k:return',
      ': ',
      "s:'ok'",
      ': + ',
      'n:42',
      ': ',
      'c:// done',
    ]);
  });

  it('reads SQL keywords and -- comments', () => {
    expect(tokens('SELECT 1 -- one', 'sql')).toEqual(['k:SELECT', ': ', 'n:1', ': ', 'c:-- one']);
  });

  it('does not take // inside a string for a comment', () => {
    const kinds = highlight("$url = 'http://localhost';", 'php').map((t) => t.kind);
    expect(kinds).toContain('s');
    expect(kinds).not.toContain('c');
  });

  it('treats a doc-comment line as a comment', () => {
    expect(tokens(' * Gera tokens.css', 'js')).toEqual(['c: * Gera tokens.css']);
  });
});
