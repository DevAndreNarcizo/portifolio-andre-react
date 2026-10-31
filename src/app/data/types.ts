// Pure data types. Data modules import them with `import type` only, so Node can load those modules
// directly (type stripping) in tests/excerpts.test.mjs.

export interface Localized {
  pt: string;
  en: string;
}

/** [x, y, width, height] in screenshot pixels (2x captures: 1280 CSS px = 2560 px). */
export type Rect = [number, number, number, number];

export type CodeLang = 'ts' | 'js' | 'sql' | 'yaml' | 'dart' | 'php';

/** Lines `start`… of `file`, verbatim except for the common indentation, which is removed. */
export interface Excerpt {
  file: string;
  lang: CodeLang;
  start: number;
  /** Highlighted line numbers, as numbered in the file. */
  hl?: number[];
  code: string;
}

export interface Shot {
  key: string;
  src: string;
  w: number;
  h: number;
}

export interface CaseStep {
  /** Key of the shot shown in the window. */
  k: string;
  /** Frame the whole width of the shot, without a spotlight. */
  ov?: true;
  /** Region to frame and spotlight. */
  r?: Rect;
  /** Regions copied out of the screenshot and lifted towards the viewer. */
  lift?: Rect[];
  /** The fake cursor clicks here, in the previous shot, before this step. */
  click?: [number, number];
  /** Zoom the previous shot out before the click. */
  out?: true;
  /** Address bar text from this step on. */
  url?: string;
  /** Bring the phone in. */
  device?: true;
}

export interface CaseCard {
  kicker: Localized;
  title: Localized;
  /** Text between `backticks` renders as inline code. */
  text: Localized;
  code: Excerpt[];
}

export interface CaseNumber {
  value: string;
  label: Localized;
}

export interface CaseLink {
  label: Localized;
  href: string;
}

export interface Case {
  id: string;
  index: Localized;
  name: string;
  pitch: Localized;
  chips: string[];
  nums: CaseNumber[];
  links: CaseLink[];
  /** Shown after the links, e.g. "private repository". */
  note?: Localized;
  /** Alt text of the first screenshot. */
  alt: Localized;
  shots: Shot[];
  device?: { tag: Localized; shots: Shot[] };
  steps: CaseStep[];
  /** One card per step. */
  cards: CaseCard[];
}

export interface InsideCard {
  title: Localized;
  text: Localized;
  code: Excerpt[];
}

export interface MoreProject {
  name: Localized;
  summary: Localized;
  stack: string;
  links: CaseLink[];
}
