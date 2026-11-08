import type { CodeLang } from '../data/types';

type TokenKind = '' | 'k' | 's' | 'c' | 'n';

interface Token {
  kind: TokenKind;
  text: string;
}

// ponytail: one shared keyword list for every language; a real grammar only if an excerpt reads wrong
const KEYWORDS = [
  'const', 'let', 'var', 'for', 'foreach', 'of', 'if', 'else', 'return', 'await', 'async', 'try', 'catch',
  'throw', 'export', 'function', 'fn', 'new', 'final', 'while', 'import', 'from', 'as', 'null', 'true',
  'false', 'public', 'private', 'static', 'readonly', 'class', 'use', 'self',
  'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'IN', 'IS', 'NOT', 'NULL', 'CREATE', 'FUNCTION', 'RETURNS',
  'TABLE', 'LANGUAGE', 'STABLE', 'SECURITY', 'INVOKER', 'SET', 'AS', 'WITH', 'ORDER', 'BY', 'LIMIT', 'FOR',
  'UPDATE', 'SKIP', 'LOCKED', 'ALTER', 'ADD', 'CONSTRAINT', 'EXCLUDE', 'USING', 'RAISE', 'EXCEPTION',
  'THEN', 'END', 'IF', 'WHEN', 'PERFORM', 'GROUP', 'LEFT', 'JOIN', 'ON', 'AT', 'TIME', 'ZONE', 'SQLSTATE',
  'ERRCODE', 'name', 'run', 'uses', 'env',
].join('|');

const C_LIKE = '\\/\\/.*$|^\\s*\\/?\\*.*$';

const COMMENT: Record<CodeLang, string> = {
  ts: C_LIKE,
  js: C_LIKE,
  php: C_LIKE,
  dart: '\\/\\/.*$',
  sql: '--.*$',
  yaml: '#.*$',
};

const STRING = `'(?:[^'\\\\]|\\\\.)*'|"(?:[^"\\\\]|\\\\.)*"|\`(?:[^\`\\\\]|\\\\.)*\``;

const PATTERNS = Object.fromEntries(
  Object.entries(COMMENT).map(([lang, comment]) => [
    lang,
    new RegExp(`(${comment})|(${STRING})|\\b(${KEYWORDS})\\b|\\b(\\d+(?:\\.\\d+)?)\\b`, 'g'),
  ]),
) as Record<CodeLang, RegExp>;

/** Splits one line of code into tokens; joining their text gives the line back unchanged. */
export function highlight(line: string, lang: CodeLang): Token[] {
  const tokens: Token[] = [];
  let last = 0;
  for (const m of line.matchAll(PATTERNS[lang])) {
    if (m.index > last) tokens.push({ kind: '', text: line.slice(last, m.index) });
    tokens.push({ kind: m[1] ? 'c' : m[2] ? 's' : m[3] ? 'k' : 'n', text: m[0] });
    last = m.index + m[0].length;
  }
  if (last < line.length) tokens.push({ kind: '', text: line.slice(last) });
  return tokens;
}
