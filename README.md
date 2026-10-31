# André Narcizo — Portfolio

[English](README.md) | [Português](README.pt-BR.md)

[![Angular](https://img.shields.io/badge/Angular-22-DD0031?style=flat-square&logo=angular&logoColor=white)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![GSAP](https://img.shields.io/badge/GSAP-3-0AE448?style=flat-square&logo=greensock&logoColor=black)](https://gsap.com)
[![Netlify](https://img.shields.io/badge/deployed-Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)](https://dev-andrenarcizo.netlify.app)

Single-page portfolio of André Narcizo, Full-Stack Developer (Angular, Laravel, Flutter) at Sysout Tecnologia.
The page is drawn like a technical blueprint: each section is a numbered figure, and a red dot — an HTTP
request — travels from the Angular and Flutter clients through a Laravel API to PostgreSQL as you scroll.

## Highlights

- Angular 22: standalone components, zoneless change detection, signals, native `animate.enter`
- Static prerendering (SSG): the full page ships as HTML, readable without JavaScript
- Scroll stories with GSAP ScrollTrigger (pinned and scrubbed on desktop, once-only reveals on mobile)
  and Lenis smooth scrolling, loaded after the page is interactive
- `prefers-reduced-motion` respected everywhere: no motion, final state shown
- Portuguese and English, switched at runtime without reloading
- Lighthouse: Performance 97 (mobile) / 100 (desktop), Accessibility, Best Practices and SEO 100

## Stack

| Layer | Technologies |
|---|---|
| Framework | Angular 22, TypeScript 6 |
| Motion | GSAP 3 + ScrollTrigger, Lenis, CSS animations, SVG SMIL |
| Rendering | `@angular/ssr` static output (prerendered `/`) |
| Tests | Vitest (Angular unit-test builder), Node test runner for the prerendered HTML |
| Delivery | Netlify |

## Local development

Requires Node.js 24 (`nvm use`).

```bash
git clone https://github.com/DevAndreNarcizo/portifolio-andre-react.git
cd portifolio-andre-react
npm install
npm start
```

## Validation

```bash
npm test
npm run build
npm run test:prerender
```

## Links

- [Live portfolio](https://dev-andrenarcizo.netlify.app)
- [LinkedIn](https://linkedin.com/in/andrenarcizo)
- [GitHub](https://github.com/DevAndreNarcizo)
- [Email](mailto:dev.andrenarcizo@outlook.com)
