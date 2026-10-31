import type { InsideCard } from './types';

// Excerpts of this repository; tests/excerpts.test.mjs checks them against the files.
export const inside: InsideCard[] = [
  {
    title: { pt: "A câmera dos cases é uma função pura.", en: "The case camera is a pure function." },
    text: {
      pt: "Os passos enquadram regiões em pixels da captura. `cam()` calcula escala e posição sem tocar no DOM, por isso é testada em `camera.spec.ts` sem navegador; o GSAP só anima até o resultado.",
      en: "Steps frame regions in screenshot pixels. `cam()` works out scale and position without touching the DOM, so `camera.spec.ts` tests it without a browser; GSAP only animates to the result.",
    },
    code: [
      {
        file: "src/app/cases/camera.ts",
        lang: "ts",
        start: 23,
        hl: [25],
        code: "export function cam(view: Size, shot: Size, r: Rect, pad = 1.1): Camera {\n  const fit = view.w / shot.w;\n  const scale = Math.max(fit, Math.min(view.w / (r[2] * pad), view.h / (r[3] * pad), fit * MAX_ZOOM));\n  const x = view.w / 2 - (r[0] + r[2] / 2) * scale;\n  const y = view.h / 2 - (r[1] + r[3] / 2) * scale;\n  return {\n    scale,\n    x: shot.w * scale > view.w ? Math.min(0, Math.max(view.w - shot.w * scale, x)) : (view.w - shot.w * scale) / 2,\n    y: shot.h * scale > view.h ? Math.min(0, Math.max(view.h - shot.h * scale, y)) : (view.h - shot.h * scale) / 2,\n  };\n}",
      },
    ],
  },
  {
    title: { pt: "Idioma com signals, sem zone.js.", en: "Language with signals, no zone.js." },
    text: {
      pt: "Um `signal` guarda o idioma e um `computed` entrega os textos: só o que lê `t()` renderiza de novo. O HTML pré-renderizado sai em português, e o idioma salvo entra depois da hidratação.",
      en: "A `signal` holds the language and a `computed` serves the copy: only what reads `t()` renders again. The prerendered HTML ships in Portuguese, and the saved language comes in after hydration.",
    },
    code: [
      {
        file: "src/app/lang.ts",
        lang: "ts",
        start: 11,
        code: "readonly lang = signal<Lang>('pt');\nreadonly t = computed(() => text[this.lang()]);",
      },
    ],
  },
  {
    title: { pt: "Este card é testado.", en: "This card is tested." },
    text: {
      pt: "`tests/excerpts.test.mjs` abre cada arquivo citado nesta seção e falha se o trecho exibido deixar de bater com as linhas do arquivo.",
      en: "`tests/excerpts.test.mjs` opens every file quoted in this section and fails if a displayed excerpt stops matching the lines of the file.",
    },
    code: [
      {
        file: "tests/excerpts.test.mjs",
        lang: "js",
        start: 12,
        hl: [18],
        code: "for (const card of inside) {\n  for (const x of card.code) {\n    test(`${x.file}:${x.start} matches the file`, () => {\n      const lines = readFileSync(new URL(`../${x.file}`, import.meta.url), 'utf8').split('\\n');\n      const quoted = lines.slice(x.start - 1, x.start - 1 + x.code.split('\\n').length);\n      assert.equal(x.code, dedent(quoted));\n    });\n  }\n}",
      },
    ],
  },
];
