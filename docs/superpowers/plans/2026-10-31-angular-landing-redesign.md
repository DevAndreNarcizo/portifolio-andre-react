# Landing Page Angular "Prancheta" — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir o portfólio React por uma landing page de página única em Angular 22, com identidade "Prancheta" e histórias de scroll em GSAP, pré-renderizada como HTML estático.

**Architecture:** Projeto Angular na raiz do repositório (branch `feat/angular-rewrite`), sem router, com `@angular/ssr` em `outputMode: 'static'` pré-renderizando `/`. Sete seções standalone leem textos PT/EN de `content.ts` via `LangService` (signals). As animações ficam em `motion.ts`: GSAP + ScrollTrigger + Lenis são importados dinamicamente depois do `load`, e cada seção registra sua cena com `sceneMotion()`, que roda dentro de um `gsap.matchMedia` com os modos `desktop` (pin + scrub) e `flow` (reveals únicos); com `prefers-reduced-motion` nada é baixado.

**Tech Stack:** Angular 22.2 (standalone, zoneless, signals, `animate.enter`), TypeScript 6, GSAP 3.15 (+ ScrollTrigger), Lenis 1.3, Vitest 5 (builder `@angular/build:unit-test`), Node test runner, Netlify.

**Spec:** `docs/superpowers/specs/2026-10-31-angular-landing-redesign-design.md`

**Verificação prévia:** todo o código deste plano foi escrito, compilado e testado num projeto de rascunho antes de ser colado aqui: `ng build` sem warnings, 24 testes unitários e 5 testes do HTML pré-renderizado passando, screenshots conferidos em 1440×900, 390×844 e com reduced-motion, Lighthouse (servidor com gzip) mobile 97/100/100/100 e desktop 100/100/100/100, CLS 0.

## Global Constraints

- Repositório: `/var/www/portifolio-andre-react`, branch `feat/angular-rewrite` (já existe e já contém o spec).
- Node 24 obrigatório (Angular CLI 22.2.4 exige ≥ 22.22.3; o Node do sistema é 22.22.1). Nesta máquina o nvm não ativa sozinho por causa do `prefix` em `~/.npmrc`, então **todo comando `npm`/`npx`/`node` começa com** `export PATH="$HOME/.nvm/versions/node/v24.22.2/bin:$PATH" && `. Confira com `node -v` → `v24.22.2`.
- Dependências: exatamente as do `package.json` da Task 1. Nada além de `gsap` e `lenis` em runtime.
- Copie o código **exatamente** como está nos blocos. Não reformate, não renomeie, não "melhore".
- Textos PT/EN: só os de `src/app/content.ts` (Task 2). Nenhum texto de interface fora dele, exceto nomes próprios (Angular, Laravel, LinkedIn…).
- Tokens de cor: `--paper #f4efe6`, `--ink #141414`, `--signal #e8452c`, `--signal-text #b8321c`, `--muted #6b665c`, `--rule #8a8478`, `--grid rgba(20, 20, 20, 0.06)`. Vermelho `--signal` só em gráfico/texto grande; texto pequeno vermelho usa `--signal-text`.
- Fontes: Instrument Serif (títulos), Inter Tight (texto), JetBrains Mono (rótulos), self-hosted em `public/fonts/`.
- Animações só em `transform`, `opacity`, `color` de SVG e `stroke-dashoffset`. Com `prefers-reduced-motion: reduce` nada se move e o GSAP não é baixado.
- IDs das seções, nesta ordem: `inicio`, `requisicao`, `sobre`, `trajetoria`, `stack`, `projetos`, `contato`.
- Todo commit termina com a linha de sessão. Use sempre: `git commit -m "<mensagem>" -m "Claude-Session: https://claude.ai/code/session_01R9bEA8gZWqxAG8mutEq3ZM"`.

## Ajustes em relação ao spec

Decididos durante a verificação do código (o spec ganhou a seção "Ajustes da verificação" com esta mesma lista):

1. **Sem SplitText.** O SplitText reescreve o DOM e quebra os bindings do Angular quando o idioma muda. Os títulos são divididos em palavras pelo próprio template (`app-words`), com o mesmo efeito de máscara por palavra.
2. **Sem `ui/blueprint-diagram.ts`.** O diagrama simples só aparece no hero; a Fig. 02 e o contato têm desenhos próprios.
3. **Hero animado só com CSS.** Sem esperar o GSAP, sem piscar no primeiro paint. As requisições em loop do hero e do contato usam SVG `<animateMotion>`, inserido só no navegador e só sem reduced-motion.
4. **Sem classe `js-motion`.** O helper `reveal()` esconde só elementos abaixo da dobra no momento em que o GSAP carrega; sem JS, nada fica escondido.
5. **Fontes self-hosted** com `preload` e `font-display: optional` em vez do link do Google Fonts. O link gerava CLS 0.2; agora é 0.
6. **Fig. 02 no celular:** mesmo SVG (escalado) abaixo da lista numerada de legendas, sem um segundo desenho vertical.
7. **Fig. 04:** formação e certificados num bloco lateral de cards, não intercalados na linha do tempo.
8. **Fig. 05:** a "vista explodida" usa placas inclinadas em `rotateX` que se abrem até a lista legível. Uma vista isométrica com `rotateZ` deixaria o texto ilegível.
9. **Carimbo do projeto sem "ano":** os dados não têm ano.
10. **Netlify `NODE_VERSION = "24"`**, alinhado ao `.nvmrc`.
11. Quem chega com reduced-motion nunca baixa o GSAP; desligar a preferência no meio da visita exige recarregar.
12. `KNOWLEDGE-README.md` e `setup-knowledge.sh` saem junto com o React (instalavam pacotes React).

## Review Focus

1. **Armazenamento bloqueado** (Safari privado, cookies desligados): trocar idioma não pode quebrar. Teste: `lang.spec.ts` › "still switches when storage is blocked" (Task 2).
2. **Visitante que já escolheu EN:** a página hidrata em PT (igual ao HTML pré-renderizado) e só depois troca para EN, sem erro de hidratação. Teste: `app.spec.ts` › "applies the language saved on a previous visit after the first render" (Task 7) + checagem de console na Task 7, Step 9.
3. **Projeto com link vazio (`''`):** nenhum botão morto. Teste: `projects.spec.ts` › "renders only the links a project has" (Task 5).
4. **Clipboard indisponível** (http, permissão negada): não mostrar "Copiado!" falso; o e-mail fica selecionado. Teste: `contact.spec.ts` › "selects the address instead when the clipboard is unavailable" (Task 6).
5. **Leitor de tela / sem JS lendo o título dividido em palavras:** os espaços precisam existir. Testes: `app.spec.ts` › "keeps the split headline readable as one sentence" (Task 7) e `tests/prerender.test.mjs` › "contains the hero headline as readable text" (Task 7).

## Estrutura de arquivos

```
.nvmrc  .gitignore  netlify.toml  package.json  angular.json  tsconfig*.json
public/fonts/*.woff2            (4 fontes)
public/Imagens/, og-image.png   (mantidos)
src/index.html  src/styles.css  src/main.ts  src/main.server.ts
src/app/
  app.ts  app.config.ts  app.config.server.ts  app.routes.server.ts
  content.ts  lang.ts  motion.ts
  ui/words.ts
  sections/hero.ts  request-story.ts  about.ts  timeline.ts  stack-blueprint.ts  projects.ts  contact.ts
  *.spec.ts (content, lang, app, sections/projects, sections/contact)
tests/prerender.test.mjs
```

---

### Task 1: Base Angular no lugar do React

**Files:**
- Delete: `src/` (React inteiro), `index.html`, `vite.config.ts`, `eslint.config.js`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `package.json`, `package-lock.json`, `install-deps.sh`, `setup.ps1`, `KNOWLEDGE-README.md`, `setup-knowledge.sh`, `tests/`, `public/vite.svg`
- Create: `.nvmrc`, `package.json`, `angular.json`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.spec.json`, `src/index.html`, `src/styles.css`, `src/main.ts`, `src/main.server.ts`, `src/app/app.config.ts`, `src/app/app.config.server.ts`, `src/app/app.routes.server.ts`, `src/app/app.ts` (provisório), `public/fonts/*.woff2`
- Modify (substituir inteiro): `.gitignore`, `netlify.toml`

**Interfaces:**
- Produces: `App` (selector `app-root`) em `src/app/app.ts`, provisório (a Task 7 substitui); classes globais de `src/styles.css` usadas pelas seções: `.wrap`, `.section`, `.fig-label`, `.title`, `.lead`, `.mono`, `.btn`, `.btn-primary`, `.btn-ghost`, `.w`, `.em`, `.skip-link`, `.visually-hidden`; variáveis CSS `--header`, `--section-y`, `--serif`, `--sans`, `--mono` e os tokens de cor.

- [ ] **Step 1: Confirmar branch e Node**

Run: `cd /var/www/portifolio-andre-react && git branch --show-current && export PATH="$HOME/.nvm/versions/node/v24.22.2/bin:$PATH" && node -v`
Expected: `feat/angular-rewrite` e `v24.22.2`

- [ ] **Step 2: Remover o React**

```bash
cd /var/www/portifolio-andre-react
git rm -r -q src index.html vite.config.ts eslint.config.js tsconfig.json tsconfig.app.json tsconfig.node.json package.json package-lock.json install-deps.sh setup.ps1 KNOWLEDGE-README.md setup-knowledge.sh tests public/vite.svg
rm -rf node_modules dist
ls
```

Expected (`ls`): `DEPLOY.md  README.md  README.pt-BR.md  docs  netlify.toml  public`

- [ ] **Step 3: Criar `.nvmrc`**

````text
24
````

- [ ] **Step 4: Substituir `.gitignore` inteiro**

````text
# Build output
/dist
/tmp
/out-tsc
/.angular/cache
/coverage

# Dependencies
/node_modules

# Logs
logs
*.log
npm-debug.log*

# Local env
*.local

# Editors
.vscode/*
!.vscode/extensions.json
.idea
*.sw?

# System
.DS_Store
Thumbs.db

# Agent tooling
.superpowers/
.worktrees/
````

- [ ] **Step 5: Substituir `netlify.toml` inteiro**

````toml
[build]
  command = "npm run build"
  publish = "dist/portfolio-andre/browser"

[build.environment]
  NODE_VERSION = "24"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
````

- [ ] **Step 6: Criar `package.json`**

````json
{
  "name": "portfolio-andre",
  "version": "1.0.0",
  "private": true,
  "packageManager": "npm@11.19.1",
  "engines": {
    "node": ">=24.15.0"
  },
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test --watch=false",
    "test:prerender": "node --test tests/prerender.test.mjs"
  },
  "dependencies": {
    "@angular/common": "^22.2.0",
    "@angular/compiler": "^22.2.0",
    "@angular/core": "^22.2.0",
    "@angular/platform-browser": "^22.2.0",
    "@angular/platform-server": "^22.2.0",
    "@angular/ssr": "^22.2.4",
    "gsap": "^3.15.0",
    "lenis": "^1.3.27",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0"
  },
  "devDependencies": {
    "@angular/build": "^22.2.4",
    "@angular/cli": "^22.2.4",
    "@angular/compiler-cli": "^22.2.0",
    "@types/node": "^22.12.0",
    "jsdom": "^30.0.0",
    "typescript": "~6.0.2",
    "vitest": "^5.0.0"
  }
}
````

- [ ] **Step 7: Criar `angular.json`**

````json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "cli": {
    "packageManager": "npm",
    "analytics": false
  },
  "newProjectRoot": "projects",
  "projects": {
    "portfolio-andre": {
      "projectType": "application",
      "schematics": {},
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "browser": "src/main.ts",
            "server": "src/main.server.ts",
            "outputMode": "static",
            "tsConfig": "tsconfig.app.json",
            "assets": [
              {
                "glob": "**/*",
                "input": "public"
              }
            ],
            "styles": [
              "src/styles.css"
            ]
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "300kB",
                  "maximumError": "500kB"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "6kB",
                  "maximumError": "10kB"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular/build:dev-server",
          "configurations": {
            "production": {
              "buildTarget": "portfolio-andre:build:production"
            },
            "development": {
              "buildTarget": "portfolio-andre:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "test": {
          "builder": "@angular/build:unit-test"
        }
      }
    }
  }
}
````

- [ ] **Step 8: Criar `tsconfig.json`, `tsconfig.app.json` e `tsconfig.spec.json`**

`tsconfig.json`:

````json
/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "compileOnSave": false,
  "compilerOptions": {
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "target": "ES2022",
    "module": "preserve"
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true
  },
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.spec.json"
    }
  ]
}
````

`tsconfig.app.json`:

````json
/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "types": [
      "node"
    ]
  },
  "include": [
    "src/**/*.ts"
  ],
  "exclude": [
    "src/**/*.spec.ts"
  ]
}
````

`tsconfig.spec.json`:

````json
/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "types": [
      "vitest/globals"
    ]
  },
  "include": [
    "src/**/*.d.ts",
    "src/**/*.spec.ts"
  ]
}
````

- [ ] **Step 9: Criar `src/index.html`**

````html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>André Narcizo — Full-Stack Developer | SaaS, Web, Mobile & REST APIs</title>
  <meta name="description" content="Full-Stack Developer at Sysout Tecnologia building SaaS web applications, Flutter apps, and REST APIs with Angular, Laravel, React, Node.js, and PostgreSQL.">
  <meta name="keywords" content="full stack developer, angular, laravel, react, node.js, flutter, postgresql, saas, rest api, clean architecture, brazil">
  <meta name="author" content="André Narcizo">
  <meta name="theme-color" content="#F4EFE6">

  <meta property="og:title" content="André Narcizo — Full-Stack Developer">
  <meta property="og:description" content="SaaS, web, mobile, and REST API development with Angular, Laravel, React, Node.js, Flutter, and PostgreSQL.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://dev-andrenarcizo.netlify.app">
  <meta property="og:image" content="https://dev-andrenarcizo.netlify.app/og-image.png">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:locale:alternate" content="en_US">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="André Narcizo — Full-Stack Developer">
  <meta name="twitter:description" content="SaaS, web, mobile, and REST API development with Angular, Laravel, React, Node.js, Flutter, and PostgreSQL.">
  <meta name="twitter:image" content="https://dev-andrenarcizo.netlify.app/og-image.png">

  <link rel="icon" type="image/png" href="/Imagens/Logo.png">
  <link rel="canonical" href="https://dev-andrenarcizo.netlify.app">

  <link rel="preload" href="/fonts/instrument-serif.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/instrument-serif-italic.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/inter-tight.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/jetbrains-mono.woff2" as="font" type="font/woff2" crossorigin>
</head>
<body>
  <app-root></app-root>
</body>
</html>
````

- [ ] **Step 10: Criar `src/styles.css`**

````css
/* Self-hosted latin subsets, preloaded in index.html.
   optional = no swap after first paint, so no layout shift; a slow first visit falls back to the system font once. */
@font-face {
  font-family: 'Instrument Serif';
  font-style: normal;
  font-weight: 400;
  font-display: optional;
  src: url('/fonts/instrument-serif.woff2') format('woff2');
}

@font-face {
  font-family: 'Instrument Serif';
  font-style: italic;
  font-weight: 400;
  font-display: optional;
  src: url('/fonts/instrument-serif-italic.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter Tight';
  font-style: normal;
  font-weight: 400 600;
  font-display: optional;
  src: url('/fonts/inter-tight.woff2') format('woff2');
}

@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 400 600;
  font-display: optional;
  src: url('/fonts/jetbrains-mono.woff2') format('woff2');
}

:root {
  --paper: #f4efe6;
  --ink: #141414;
  --signal: #e8452c;
  --signal-text: #b8321c;
  --muted: #6b665c;
  --rule: #8a8478;
  --grid: rgba(20, 20, 20, 0.06);

  --serif: 'Instrument Serif', Georgia, serif;
  --sans: 'Inter Tight', system-ui, sans-serif;
  --mono: 'JetBrains Mono', ui-monospace, monospace;

  --header: 64px;
  --gutter: 16px;
  --maxw: 1200px;
  --section-y: clamp(72px, 12vw, 140px);
  --h2: clamp(34px, 5.5vw, 64px);
}

@media (min-width: 640px) {
  :root {
    --gutter: 32px;
  }
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-padding-top: var(--header);
  -webkit-text-size-adjust: 100%;
}

@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}

/* Lenis controls scrolling while it is active */
html.lenis,
html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

body {
  margin: 0;
  background-color: var(--paper);
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 22px 22px;
  color: var(--ink);
  font: 400 17px/1.6 var(--sans);
  -webkit-font-smoothing: antialiased;
  overflow-x: clip;
}

img,
svg {
  display: block;
  max-width: 100%;
}

h1,
h2,
h3,
p,
ol,
ul,
dl,
dd,
figure {
  margin: 0;
}

ol,
ul {
  padding: 0;
  list-style: none;
}

a {
  color: inherit;
}

button {
  font: inherit;
  color: inherit;
}

:focus-visible {
  outline: 2px solid var(--ink);
  outline-offset: 3px;
}

.wrap {
  width: 100%;
  max-width: calc(var(--maxw) + var(--gutter) * 2);
  margin-inline: auto;
  padding-inline: var(--gutter);
}

.section {
  padding-block: var(--section-y);
}

.fig-label {
  font: 600 12px/1.4 var(--mono);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--signal-text);
}

.title {
  font: 400 var(--h2) / 1 var(--serif);
  letter-spacing: -0.01em;
  margin-top: 12px;
}

.title em {
  font-style: italic;
  color: var(--signal);
}

.lead {
  max-width: 62ch;
  color: var(--muted);
  margin-top: 16px;
}

.mono {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.08em;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 48px;
  padding: 0 22px;
  border: 1.5px solid var(--ink);
  border-radius: 2px;
  font: 600 15px/1 var(--sans);
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.btn-primary {
  background: var(--ink);
  color: var(--paper);
}

.btn-primary:hover {
  background: var(--signal-text);
  border-color: var(--signal-text);
}

.btn-ghost {
  background: transparent;
}

.btn-ghost:hover {
  background: var(--ink);
  color: var(--paper);
}

/* Split headline: each word is a mask, its inner span rises */
.w {
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
  padding-bottom: 0.08em;
  margin-bottom: -0.08em;
}

.w > span {
  display: inline-block;
}

.w > .em {
  font-style: italic;
  color: var(--signal);
}

.skip-link {
  position: absolute;
  left: var(--gutter);
  top: -100px;
  z-index: 100;
  padding: 12px 16px;
  background: var(--ink);
  color: var(--paper);
}

.skip-link:focus {
  top: 8px;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
  }
}
````

- [ ] **Step 11: Criar os pontos de entrada**

`src/main.ts`:

````ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
````

`src/main.server.ts`:

````ts
import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';

const bootstrap = (context: BootstrapContext) => bootstrapApplication(App, config, context);

export default bootstrap;
````

`src/app/app.config.ts`:

````ts
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideClientHydration()],
};
````

`src/app/app.config.server.ts`:

````ts
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes))
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
````

`src/app/app.routes.server.ts`:

````ts
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
````

`src/app/app.ts` (provisório, substituído na Task 7):

````ts
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<main id="conteudo"></main>`,
})
export class App {}
````

- [ ] **Step 12: Baixar as fontes e conferir os hashes**

```bash
cd /var/www/portifolio-andre-react
mkdir -p public/fonts && cd public/fonts
curl -fsSL -o instrument-serif.woff2 https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-6zUTjg.woff2
curl -fsSL -o instrument-serif-italic.woff2 https://fonts.gstatic.com/s/instrumentserif/v5/jizHRFtNs2ka5fXjeivQ4LroWlx-6zAjjH7M.woff2
curl -fsSL -o inter-tight.woff2 https://fonts.gstatic.com/s/intertight/v9/NGSwv5HMAFg6IuGlBNMjxLsH8ag.woff2
curl -fsSL -o jetbrains-mono.woff2 https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxDcwg.woff2
sha256sum -c - <<'EOF'
5eb09b5ac0e28b67c2f041c8ba6d244604ca0c0980d65912ab2d47fed84ddc31  instrument-serif.woff2
5a51946dfffa82972bc98745359c46761515641fda557c25116459a9f83da4a7  instrument-serif-italic.woff2
77fefe8ca19b9f69b5284832c519e0493127c1f091f0a8936884be7721c4e618  inter-tight.woff2
83c005d49d8a6a50474c73a5a36ac0468076e9c4a29da7bdb14995d80560a5be  jetbrains-mono.woff2
EOF
```

Expected: quatro linhas terminando em `: OK`.

- [ ] **Step 13: Instalar dependências**

Run: `cd /var/www/portifolio-andre-react && export PATH="$HOME/.nvm/versions/node/v24.22.2/bin:$PATH" && npm install`
Expected: termina sem `npm error`. Avisos `npm warn install-scripts ...` (msgpackr-extract, lmdb) são esperados e inofensivos.

- [ ] **Step 14: Build**

Run: `cd /var/www/portifolio-andre-react && export PATH="$HOME/.nvm/versions/node/v24.22.2/bin:$PATH" && npx ng build`
Expected: contém `Prerendered 1 static route.` e `Application bundle generation complete.`, sem `WARNING` nem `ERROR`; existe `dist/portfolio-andre/browser/index.html`.

- [ ] **Step 15: Commit**

```bash
cd /var/www/portifolio-andre-react
git add -A
git status --short | grep -v '^D ' | head -40
git commit -m "chore: replace React app with Angular 22 static base" -m "Claude-Session: https://claude.ai/code/session_01R9bEA8gZWqxAG8mutEq3ZM"
```

Expected (`git status`): só arquivos novos/modificados desta task (`A`/`M`), sem `node_modules`, `dist` nem `.angular`.

---

### Task 2: Conteúdo PT/EN e idioma

**Files:**
- Create: `src/app/content.ts`, `src/app/lang.ts`
- Test: `src/app/content.spec.ts`, `src/app/lang.spec.ts`

**Interfaces:**
- Produces (`src/app/content.ts`): tipos `Lang = 'pt' | 'en'`, `Localized { pt; en }`, `ProjectTier = 'enterprise' | 'saas' | 'web' | 'landing'`, `Project`, `StackLayer`, `Word { text; em }`, `Copy` (formato dos textos); função `words(source: string): Word[]` (texto entre `*asteriscos*` vira `em: true`); constantes `text: Record<Lang, Copy>`, `contactInfo`, `targetStack: string[]`, `stackLayers: StackLayer[]`, `projects: Project[]` (12 itens).
- Produces (`src/app/lang.ts`): `LangService` (`providedIn: 'root'`) com `lang: WritableSignal<Lang>` (começa `'pt'`), `t: Signal<Copy>`, `set(lang: Lang): void` (signal + `localStorage['portfolio-lang']` + `<html lang>` `pt-BR`/`en`), `toggle(): void`, `restore(): void` (só navegador, após hidratação).

- [ ] **Step 1: Escrever os testes**

`src/app/content.spec.ts`:

````ts
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
````

`src/app/lang.spec.ts`:

````ts
import { TestBed } from '@angular/core/testing';
import { LangService } from './lang';

describe('LangService', () => {
  let lang: LangService;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = 'pt-BR';
    lang = TestBed.inject(LangService);
  });

  afterEach(() => vi.restoreAllMocks());

  it('starts in Portuguese', () => {
    expect(lang.lang()).toBe('pt');
    expect(lang.t().nav.contact).toBe('Contato');
  });

  it('toggles pt → en → pt, updating the copy, storage and <html lang>', () => {
    lang.toggle();
    expect(lang.t().nav.contact).toBe('Contact');
    expect(localStorage.getItem('portfolio-lang')).toBe('en');
    expect(document.documentElement.lang).toBe('en');

    lang.toggle();
    expect(lang.t().nav.contact).toBe('Contato');
    expect(localStorage.getItem('portfolio-lang')).toBe('pt');
    expect(document.documentElement.lang).toBe('pt-BR');
  });

  it('restores a language saved on a previous visit', () => {
    localStorage.setItem('portfolio-lang', 'en');
    lang.restore();
    expect(lang.lang()).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });

  it('ignores unknown saved values', () => {
    localStorage.setItem('portfolio-lang', 'fr');
    lang.restore();
    expect(lang.lang()).toBe('pt');
  });

  it('still switches when storage is blocked', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    lang.set('en');
    expect(lang.lang()).toBe('en');
    expect(() => lang.restore()).not.toThrow();
  });
});
````

- [ ] **Step 2: Rodar e ver falhar**

Run: `cd /var/www/portifolio-andre-react && export PATH="$HOME/.nvm/versions/node/v24.22.2/bin:$PATH" && npx ng test --watch=false`
Expected: FAIL, erro de resolução de `./content` e `./lang` (arquivos ainda não existem).

- [ ] **Step 3: Criar `src/app/content.ts`**

````ts
export type Lang = 'pt' | 'en';

export interface Localized {
  pt: string;
  en: string;
}

export type ProjectTier = 'enterprise' | 'saas' | 'web' | 'landing';

export interface Project {
  id: number;
  title: string;
  image: string;
  liveLink?: string;
  githubLink?: string;
  tier: ProjectTier;
  stack: string;
  summary: Localized;
  role: Localized;
  problem: Localized;
  solution: Localized;
  result: Localized;
}

export interface StackLayer {
  name: Localized;
  techs: string[];
}

export interface Word {
  text: string;
  em: boolean;
}

/** Splits a headline into words; text between *asterisks* is emphasized. */
export function words(source: string): Word[] {
  const out: Word[] = [];
  source.split('*').forEach((chunk, i) => {
    for (const text of chunk.split(/\s+/)) {
      if (text) out.push({ text, em: i % 2 === 1 });
    }
  });
  return out;
}

const pt = {
  nav: {
    label: 'Seções',
    skip: 'Pular para o conteúdo',
    about: 'Sobre',
    experience: 'Trajetória',
    stack: 'Stack',
    projects: 'Projetos',
    contact: 'Contato',
    langSwitch: 'Mudar idioma para English',
    langShort: 'EN',
  },
  hero: {
    label: 'FIG. 01 — ANDRÉ NARCIZO, FULL-STACK',
    title: 'Do banco de dados *à interface,* web e mobile.',
    description:
      'Desenvolvedor Full-Stack na Sysout Tecnologia, com experiência em aplicações SaaS, mobile e APIs REST.',
    stackLine: 'Angular · Laravel · Flutter · PostgreSQL',
    projects: 'Ver projetos',
    contact: 'Entrar em contato',
    diagram:
      'Diagrama: clientes Angular e Flutter enviando requisições para uma API Laravel conectada ao PostgreSQL.',
  },
  request: {
    label: 'FIG. 02 — UMA REQUISIÇÃO, TRÊS CAMADAS',
    title: 'O caminho de *uma requisição.*',
    diagram:
      'Diagrama: uma requisição sai do navegador Angular, passa pelas etapas auth, tenant, policy e controller do Laravel, consulta o PostgreSQL e volta para o navegador e para o app Flutter.',
    steps: [
      {
        name: 'Angular',
        text: 'Um componente standalone dispara a requisição; signals atualizam só o que mudou na tela.',
      },
      { name: 'HTTP', text: 'Requisição autenticada para a API REST.' },
      {
        name: 'Laravel',
        text: 'Autenticação, autorização por tenant e regras de negócio, em camadas.',
      },
      { name: 'PostgreSQL', text: 'Consulta escopada ao tenant sobre um modelo relacional.' },
      {
        name: 'Resposta',
        text: 'Uma API, dois clientes: a mesma resposta atualiza a web em Angular e o app em Flutter.',
      },
    ],
  },
  about: {
    label: 'FIG. 03 — SOBRE',
    title: 'Sobre *mim.*',
    photoAlt: 'Foto de André Narcizo',
    callouts: ['Goiânia-GO', 'Ciência da Computação — UNIP 2025', 'Full-stack @ Sysout Tecnologia'],
    paragraphs: [
      'Sou desenvolvedor Full-Stack em Goiânia-GO e atualmente atuo na Sysout Tecnologia, desenvolvendo aplicações SaaS multi-tenant, aplicativos Flutter e APIs REST.',
      'Minha stack principal combina Angular, Laravel, React, Node.js, Flutter e PostgreSQL. Tenho experiência com autenticação, autorização por tenant, modelagem relacional, integrações e sustentação de sistemas em produção.',
      'Busco evoluir continuamente em arquitetura de software, testes, documentação e decisões técnicas orientadas ao produto, mantendo as soluções compreensíveis e preparadas para crescer.',
    ],
    quote:
      'Atuo do banco de dados à interface, conectando frontend, backend, mobile e integrações. Transformo requisitos em funcionalidades manuteníveis, com atenção à experiência do usuário, qualidade e impacto no negócio.',
    linkedin: 'Ver LinkedIn',
  },
  timeline: {
    label: 'FIG. 04 — TRAJETÓRIA',
    title: 'Experiência *profissional.*',
    current: 'Atual',
    items: [
      {
        role: 'Desenvolvedor Full Stack',
        company: 'Sysout Tecnologia',
        period: 'jan 2026 - atual',
        description:
          'Desenvolvimento de aplicações SaaS multi-tenant com Angular, Laravel e PostgreSQL, aplicativos Flutter e APIs REST. Atuação em modelagem relacional, autenticação, autorização, integrações, revisão técnica e evolução de funcionalidades.',
      },
      {
        role: 'Suporte Técnico e Desenvolvedor',
        company: 'Syndata Sistemas',
        period: 'mai 2025 - out 2025',
        description:
          'Desenvolvimento e manutenção de funcionalidades com Python, SQL e Java, correção de bugs, refatoração de módulos legados, integrações e suporte em ambientes de produção.',
      },
      {
        role: 'Gerente / Técnico em TI',
        company: 'Gêmeos Papelaria e Informática',
        period: 'mar 2023 - abr 2025',
        description:
          'Gestão operacional e liderança de equipe, manutenção de hardware, redes e sistemas, atendimento técnico e resolução de problemas críticos.',
      },
      {
        role: 'Aprendiz de TI',
        company: 'Cristal Alimentos',
        period: 'mar 2019 - mar 2021',
        description:
          'Suporte ao departamento de TI, manutenção preventiva de equipamentos, acompanhamento de chamados e organização de documentação interna.',
      },
    ],
    educationTitle: 'Formação',
    education: [
      {
        title: 'Ciência da Computação',
        institution: 'Universidade Paulista (UNIP) — Goiânia, GO',
        type: 'Bacharelado',
        status: 'Concluído em 2025',
      },
    ],
    certificatesTitle: 'Certificados e estudos',
    certificates: [
      { title: 'Angular 20+', issuer: 'Atualização técnica', status: '2026' },
      { title: 'PHP 8.3+', issuer: 'Atualização técnica', status: '2026' },
      { title: 'JavaScript e TypeScript', issuer: 'Desenvolvimento web', status: '2025' },
    ],
  },
  stack: {
    label: 'FIG. 05 — PLANTA DA STACK',
    title: 'Planta da *stack.*',
    subtitle: 'Tecnologias que uso para construir sistemas completos, do banco de dados ao deploy.',
  },
  projects: {
    label: 'FIG. 06 — PROJETOS',
    title: '*Projetos.*',
    subtitle:
      'Projetos desenvolvidos aplicando produto, experiência do usuário, arquitetura e tecnologia para criar soluções completas.',
    filters: {
      all: 'Todos',
      enterprise: 'Enterprise',
      saas: 'SaaS',
      web: 'Web',
      landing: 'Landing',
    },
    count: 'projetos',
    type: 'Tipo',
    stack: 'Stack',
    live: 'Ver projeto',
    github: 'GitHub',
    details: 'Ver detalhes',
    role: 'Minha atuação',
    problem: 'Problema',
    solution: 'Solução',
    outcome: 'Resultado',
  },
  contact: {
    label: 'FIG. 07 — CONTATO',
    title: 'Vamos *conversar.*',
    description:
      'Estou aberto a oportunidades full-stack remotas e a conversas sobre desenvolvimento web, mobile, SaaS e APIs. Entre em contato pelo LinkedIn, e-mail ou WhatsApp.',
    email: 'E-mail',
    copy: 'Copiar',
    copied: 'Copiado!',
    you: 'você',
    hint: 'Goiânia, GO — disponível para trabalho remoto.',
  },
  footer: {
    role: 'Full-Stack Developer na Sysout Tecnologia — Goiânia, Brasil',
  },
};

export type Copy = typeof pt;

const en: Copy = {
  nav: {
    label: 'Sections',
    skip: 'Skip to content',
    about: 'About',
    experience: 'Career',
    stack: 'Stack',
    projects: 'Projects',
    contact: 'Contact',
    langSwitch: 'Switch language to Português',
    langShort: 'PT',
  },
  hero: {
    label: 'FIG. 01 — ANDRÉ NARCIZO, FULL-STACK',
    title: 'From database *to interface,* web and mobile.',
    description:
      'Full-Stack Developer at Sysout Tecnologia, experienced in SaaS applications, mobile development, and REST APIs.',
    stackLine: 'Angular · Laravel · Flutter · PostgreSQL',
    projects: 'View projects',
    contact: 'Contact me',
    diagram:
      'Diagram: Angular and Flutter clients sending requests to a Laravel API connected to PostgreSQL.',
  },
  request: {
    label: 'FIG. 02 — ONE REQUEST, THREE LAYERS',
    title: 'The path of *a request.*',
    diagram:
      'Diagram: a request leaves the Angular browser, passes through the Laravel auth, tenant, policy and controller stages, queries PostgreSQL and returns to both the browser and the Flutter app.',
    steps: [
      {
        name: 'Angular',
        text: 'A standalone component fires the request; signals update only what changed on screen.',
      },
      { name: 'HTTP', text: 'Authenticated request to the REST API.' },
      {
        name: 'Laravel',
        text: 'Authentication, tenant-based authorization and business rules, in layers.',
      },
      { name: 'PostgreSQL', text: 'Tenant-scoped query over a relational model.' },
      {
        name: 'Response',
        text: 'One API, two clients: the same response updates the Angular web app and the Flutter mobile app.',
      },
    ],
  },
  about: {
    label: 'FIG. 03 — ABOUT',
    title: 'About *me.*',
    photoAlt: 'Photo of André Narcizo',
    callouts: ['Goiânia, Brazil', 'Computer Science — UNIP 2025', 'Full-stack @ Sysout Tecnologia'],
    paragraphs: [
      'I am a Full-Stack Developer based in Goiânia, Brazil, currently working at Sysout Tecnologia on multi-tenant SaaS applications, Flutter apps, and REST APIs.',
      'My core stack includes Angular, Laravel, React, Node.js, Flutter, and PostgreSQL. I have experience with authentication, tenant-based authorization, relational modeling, integrations, and production support.',
      'I continuously improve my software architecture, testing, documentation, and product-oriented decision-making skills, keeping solutions understandable and ready to evolve.',
    ],
    quote:
      'I work from database to interface, connecting frontend, backend, mobile, and integrations. I turn requirements into maintainable features with attention to user experience, quality, and business impact.',
    linkedin: 'View LinkedIn',
  },
  timeline: {
    label: 'FIG. 04 — CAREER',
    title: 'Professional *experience.*',
    current: 'Present',
    items: [
      {
        role: 'Full-Stack Developer',
        company: 'Sysout Tecnologia',
        period: 'Jan 2026 - Present',
        description:
          'Development of multi-tenant SaaS applications with Angular, Laravel, and PostgreSQL, Flutter apps, and REST APIs. Work includes relational modeling, authentication, authorization, integrations, technical reviews, and feature evolution.',
      },
      {
        role: 'Technical Support & Developer',
        company: 'Syndata Sistemas',
        period: 'May 2025 - Oct 2025',
        description:
          'Developed and maintained features with Python, SQL, and Java, fixed bugs, refactored legacy modules, integrated corporate systems, and supported production environments.',
      },
      {
        role: 'IT Manager / Technician',
        company: 'Gêmeos Papelaria e Informática',
        period: 'Mar 2023 - Apr 2025',
        description:
          'Managed operations and led the team, maintained hardware, networks, and systems, provided technical assistance, and resolved critical issues.',
      },
      {
        role: 'IT Apprentice',
        company: 'Cristal Alimentos',
        period: 'Mar 2019 - Mar 2021',
        description:
          'Supported the IT department, performed preventive equipment maintenance, tracked service requests, and organized internal documentation.',
      },
    ],
    educationTitle: 'Education',
    education: [
      {
        title: 'Computer Science',
        institution: 'Universidade Paulista (UNIP) — Goiânia, Brazil',
        type: "Bachelor's degree",
        status: 'Completed in 2025',
      },
    ],
    certificatesTitle: 'Certificates and studies',
    certificates: [
      { title: 'Angular 20+', issuer: 'Technical update', status: '2026' },
      { title: 'PHP 8.3+', issuer: 'Technical update', status: '2026' },
      { title: 'JavaScript and TypeScript', issuer: 'Web development', status: '2025' },
    ],
  },
  stack: {
    label: 'FIG. 05 — STACK BLUEPRINT',
    title: 'Stack *blueprint.*',
    subtitle: 'Technologies I use to build complete systems, from database to deployment.',
  },
  projects: {
    label: 'FIG. 06 — PROJECTS',
    title: '*Projects.*',
    subtitle:
      'Projects built with product thinking, user experience, architecture, and technology to create complete solutions.',
    filters: {
      all: 'All',
      enterprise: 'Enterprise',
      saas: 'SaaS',
      web: 'Web',
      landing: 'Landing',
    },
    count: 'projects',
    type: 'Type',
    stack: 'Stack',
    live: 'View project',
    github: 'GitHub',
    details: 'View details',
    role: 'My role',
    problem: 'Problem',
    solution: 'Solution',
    outcome: 'Outcome',
  },
  contact: {
    label: 'FIG. 07 — CONTACT',
    title: "Let's *talk.*",
    description:
      'I am open to remote full-stack opportunities and conversations about web, mobile, SaaS, and API development. Reach me through LinkedIn, email, or WhatsApp.',
    email: 'Email',
    copy: 'Copy',
    copied: 'Copied!',
    you: 'you',
    hint: 'Goiânia, Brazil — available for remote work.',
  },
  footer: {
    role: 'Full-Stack Developer at Sysout Tecnologia — Goiânia, Brazil',
  },
};

export const text: Record<Lang, Copy> = { pt, en };

export const contactInfo = {
  email: 'dev.andrenarcizo@outlook.com',
  whatsapp: '+55 62 98557-9319',
  whatsappLink: 'https://wa.me/5562985579319',
  linkedin: 'https://www.linkedin.com/in/andrenarcizo/',
  github: 'https://github.com/DevAndreNarcizo',
};

/** Technologies of the target role; underlined in red in Fig. 05. */
export const targetStack = ['Angular', 'Laravel', 'Flutter', 'PostgreSQL'];

export const stackLayers: StackLayer[] = [
  {
    name: { pt: 'Clientes', en: 'Clients' },
    techs: ['Angular', 'React', 'Next.js', 'TypeScript', 'Vite', 'Tailwind CSS', 'Flutter', 'Dart'],
  },
  {
    name: { pt: 'API', en: 'API' },
    techs: ['Laravel', 'PHP', 'Node.js', 'Express', 'NestJS', 'Python', 'FastAPI'],
  },
  {
    name: { pt: 'Dados', en: 'Data' },
    techs: ['PostgreSQL', 'MySQL', 'Redis', 'Supabase'],
  },
  {
    name: { pt: 'Infra e práticas', en: 'Infra & practices' },
    techs: [
      'Docker',
      'Docker Compose',
      'GitHub Actions',
      'CI/CD',
      'Clean Architecture',
      'SOLID',
      'BLoC',
      'Event-Driven',
      'Design Patterns',
    ],
  },
];

export const projects: Project[] = [
  {
    id: 201,
    title: 'MyFinance Platform',
    image: '/Imagens/myfinance-platform.webp',
    liveLink: 'https://my-finance-ebon-one.vercel.app/',
    githubLink: 'https://github.com/DevAndreNarcizo/myfinance-platform',
    tier: 'saas',
    stack: 'React, Node.js, Express, Flutter, Supabase, PostgreSQL, JWT',
    summary: {
      pt: 'Estudo de caso de uma plataforma financeira full-stack para web e mobile, com autenticação, dados relacionais e importação assistida por IA.',
      en: 'Case study of a full-stack financial platform for web and mobile, featuring authentication, relational data, and AI-assisted imports.',
    },
    role: {
      pt: 'Modelagem de produto, arquitetura full-stack, API, mobile e documentação',
      en: 'Product modeling, full-stack architecture, API, mobile, and documentation',
    },
    problem: {
      pt: 'Centralizar receitas, despesas, dívidas, metas e documentos financeiros de um núcleo familiar.',
      en: 'Centralize household income, expenses, debts, goals, and financial documents.',
    },
    solution: {
      pt: 'Clientes React e Flutter consumindo uma API Node.js, com PostgreSQL, JWT e isolamento dos dados por núcleo familiar.',
      en: 'React and Flutter clients consuming a Node.js API with PostgreSQL, JWT, and household-based data isolation.',
    },
    result: {
      pt: 'Demonstra domínio de produto, autenticação, dados relacionais, integração com IA e entrega multiplataforma.',
      en: 'Demonstrates product ownership, authentication, relational data, AI integration, and cross-platform delivery.',
    },
  },
  {
    id: 202,
    title: 'HunterAI Platform',
    image: '/Imagens/hunter-ai-platform.webp',
    githubLink: 'https://github.com/DevAndreNarcizo/hunter-ai-platform',
    tier: 'enterprise',
    stack: 'Next.js, Node.js, TypeScript, FastAPI, PostgreSQL, Redis',
    summary: {
      pt: 'Estudo de caso de arquitetura SaaS B2B para aquisição e qualificação de leads com processamento assíncrono e governança de abordagem.',
      en: 'B2B SaaS architecture case study for lead acquisition and qualification with asynchronous processing and outreach governance.',
    },
    role: {
      pt: 'Decomposição do sistema, limites de domínio, arquitetura assíncrona e roadmap',
      en: 'System decomposition, domain boundaries, asynchronous architecture, and roadmap',
    },
    problem: {
      pt: 'Organizar captura, qualificação e abordagem de leads sem acoplar fluxos sensíveis ao processamento síncrono.',
      en: 'Organize lead capture, qualification, and outreach without coupling sensitive workflows to synchronous processing.',
    },
    solution: {
      pt: 'Arquitetura evolutiva com web, API, worker Python, PostgreSQL e Redis, preservando aprovação manual em comunicações sensíveis.',
      en: 'Evolvable architecture with web, API, Python worker, PostgreSQL, and Redis, preserving manual approval for sensitive communication.',
    },
    result: {
      pt: 'Demonstra decisões pragmáticas sobre SaaS, filas, conformidade e evolução de um monólito modular.',
      en: 'Demonstrates pragmatic decisions around SaaS, queues, compliance, and modular-monolith evolution.',
    },
  },
  {
    id: 1,
    title: 'Agenda-Fácil',
    image: '/Imagens/AgendaFacil-new.png',
    liveLink: 'https://agenda-facil.vercel.app/',
    githubLink: 'https://github.com/DevAndreNarcizo/Agenda_Facil',
    tier: 'saas',
    stack: 'React 19, Supabase, TypeScript',
    summary: {
      pt: 'Aplicação full-stack para criação, edição e gestão de agendamentos com interface responsiva.',
      en: 'Full-stack application for creating, editing, and managing appointments through a responsive interface.',
    },
    role: {
      pt: 'Produto, frontend, banco de dados e fluxo de agendamento',
      en: 'Product, frontend, database, scheduling flow',
    },
    problem: {
      pt: 'Pequenos negócios precisam organizar seus agendamentos sem depender de planilhas.',
      en: 'Small businesses need to organize appointments without relying on spreadsheets.',
    },
    solution: {
      pt: 'Agendamento digital com cadastro, horários disponíveis e uma base sólida de gestão.',
      en: 'Digital scheduling with registration, time slots, and management foundation.',
    },
    result: {
      pt: 'Modelagem de produto SaaS, autenticação e UX para o fluxo recorrente do usuário.',
      en: 'SaaS product modeling, authentication, and recurring user flow UX.',
    },
  },
  {
    id: 2,
    title: 'Fin-Assist',
    image: '/Imagens/Fin-Assist.jpg',
    liveLink: '',
    githubLink: 'https://github.com/DevAndreNarcizo/Fin-Assist',
    tier: 'web',
    stack: 'Python, PyTorch, FastAPI, Gemini',
    summary: {
      pt: 'Aplicação de finanças pessoais com machine learning, análise de gastos e assistente conversacional.',
      en: 'Personal finance application with machine learning, spending analysis, and a conversational assistant.',
    },
    role: {
      pt: 'Produto, modelagem, UI e treinamento do modelo',
      en: 'Product, modeling, UI, model training',
    },
    problem: {
      pt: 'Falta de ferramentas acessíveis que unam educação financeira e inteligência artificial.',
      en: 'Lack of accessible tools combining financial education with AI.',
    },
    solution: {
      pt: 'Aplicação com categorização, previsão de gastos, detecção de anomalias e suporte conversacional.',
      en: 'Application with categorization, spending prediction, anomaly detection, and conversational support.',
    },
    result: {
      pt: 'Ponte entre a pesquisa acadêmica (TCC), Python e uma visão de produto financeiro real.',
      en: 'Bridge between academic research (TCC), Python, and real-world financial product vision.',
    },
  },
  {
    id: 3,
    title: 'Ecommerce Luz da Aurora',
    image: '/Imagens/Luz da Aurora.png',
    liveLink: 'https://luzdaaurora.shop/',
    githubLink: '',
    tier: 'web',
    stack: 'React, Express, Supabase, PostgreSQL',
    summary: {
      pt: 'Plataforma completa de e-commerce — catálogo, carrinho, checkout e painel administrativo para uma loja real.',
      en: 'Full ecommerce platform — catalog, cart, checkout, and admin panel for a real store.',
    },
    role: {
      pt: 'Frontend, backend, banco de dados e integração de pagamentos',
      en: 'Frontend, backend, database, payment integration',
    },
    problem: {
      pt: 'Loja física precisava de presença digital com catálogo e checkout.',
      en: 'Physical store needed digital presence with catalog and checkout.',
    },
    solution: {
      pt: 'E-commerce completo com catálogo, carrinho, checkout e painel administrativo.',
      en: 'Complete ecommerce with catalog, cart, checkout, and admin dashboard.',
    },
    result: {
      pt: 'Entrega de loja funcional com experiência prática no fluxo de vendas online.',
      en: 'Functional store delivery with hands-on online sales flow experience.',
    },
  },
  {
    id: 101,
    title: 'laravel-clean-architecture-api',
    image: '/Imagens/laravel-clean-architecture-api.webp',
    githubLink: 'https://github.com/DevAndreNarcizo/laravel-clean-architecture-api',
    tier: 'enterprise',
    stack: 'Laravel 11, PostgreSQL, Redis, RabbitMQ, Docker, PHPUnit, GitHub Actions',
    summary: {
      pt: 'API Laravel organizada com Clean Architecture, limites de domínio claros, Docker e automação de validação.',
      en: 'Laravel API organized with Clean Architecture, clear domain boundaries, Docker, and automated validation.',
    },
    role: {
      pt: 'Arquitetura, backend, testes e DevOps',
      en: 'Architecture, backend, tests, DevOps',
    },
    problem: {
      pt: 'Demonstrar arquitetura de backend de nível produção, indo além de controllers CRUD.',
      en: 'Demonstrate production-grade backend architecture beyond CRUD controllers.',
    },
    solution: {
      pt: 'Arquitetura em camadas (Domain/Application/Infrastructure/Interface) com mensageria orientada a eventos e testes abrangentes.',
      en: 'Layered architecture (Domain/Application/Infrastructure/Interface) with event-driven messaging and comprehensive tests.',
    },
    result: {
      pt: 'Demonstra organização de backend, separação de responsabilidades, testes e práticas de entrega.',
      en: 'Demonstrates backend organization, separation of concerns, testing, and delivery practices.',
    },
  },
  {
    id: 102,
    title: 'node-microservices-event-driven',
    image: '/Imagens/node-microservices-event-driven.webp',
    githubLink: 'https://github.com/DevAndreNarcizo/node-microservices-event-driven',
    tier: 'enterprise',
    stack: 'Node.js, NestJS, MongoDB, RabbitMQ, Docker Compose, Jest, Prometheus',
    summary: {
      pt: 'Microsserviços orientados a eventos com RabbitMQ — Order Service e Notification Service.',
      en: 'Event-driven microservices with RabbitMQ — Order Service and Notification Service.',
    },
    role: {
      pt: 'Sistemas distribuídos, mensageria, testes e DevOps',
      en: 'Distributed systems, messaging, tests, DevOps',
    },
    problem: {
      pt: 'Comprovar o domínio de sistemas distribuídos e arquitetura orientada a eventos.',
      en: 'Prove understanding of distributed systems and event-driven architecture.',
    },
    solution: {
      pt: 'Dois serviços independentes que se comunicam exclusivamente via RabbitMQ, com health checks, correlation IDs e logging estruturado.',
      en: 'Two independent services communicating exclusively via RabbitMQ with health checks, correlation IDs, and structured logging.',
    },
    result: {
      pt: 'Demonstração de padrões de microsserviços, comunicação assíncrona e observabilidade de serviços.',
      en: 'Demonstrating microservices patterns, async communication, and service observability.',
    },
  },
  {
    id: 103,
    title: 'saas-task-manager',
    image: '',
    githubLink: 'https://github.com/DevAndreNarcizo/saas-task-manager',
    tier: 'enterprise',
    stack: 'Next.js 14, TypeScript, Tailwind, NestJS, PostgreSQL, Redis, Stripe, Docker',
    summary: {
      pt: 'SaaS full-stack com assinaturas via Stripe, RBAC e atualizações em tempo real — publicado e funcional.',
      en: 'Full-stack SaaS with Stripe subscriptions, RBAC, and real-time updates — deployed and functional.',
    },
    role: {
      pt: 'Full-stack, pagamentos, autenticação e deploy',
      en: 'Full-stack, payments, auth, deployment',
    },
    problem: {
      pt: 'Propriedade de um produto SaaS de ponta a ponta — do código ao pagamento e ao deploy.',
      en: 'End-to-end SaaS product ownership from code to payment to deployment.',
    },
    solution: {
      pt: 'Gerenciador de tarefas freemium com Stripe Checkout, webhooks, controle de acesso por papéis e atualizações em tempo real.',
      en: 'Freemium task manager with Stripe Checkout, webhooks, role-based access, and real-time updates.',
    },
    result: {
      pt: 'SaaS no ar demonstrando o ciclo de vida completo do produto e integração de pagamentos.',
      en: 'Live SaaS demonstrating full product lifecycle and payment integration.',
    },
  },
  {
    id: 104,
    title: 'php-code-analyzer',
    image: '',
    githubLink: 'https://github.com/DevAndreNarcizo/php-code-analyzer',
    tier: 'enterprise',
    stack: 'PHP, PHPUnit, GitHub Actions, Packagist',
    summary: {
      pt: 'CLI open-source que analisa projetos PHP/Laravel e gera relatórios de qualidade.',
      en: 'Open-source CLI that analyzes PHP/Laravel projects and generates quality reports.',
    },
    role: {
      pt: 'Autor, arquitetura, testes e CI/CD',
      en: 'Author, architecture, tests, CI/CD',
    },
    problem: {
      pt: 'Lacuna em contribuição open-source — nada publicado no Packagist ou npm.',
      en: 'Open-source contribution gap — nothing published on Packagist or npm.',
    },
    solution: {
      pt: 'Ferramenta CLI que mede complexidade ciclomática, violações de SOLID, cobertura de tipos e cobertura de testes.',
      en: 'CLI tool measuring cyclomatic complexity, SOLID violations, type coverage, and test coverage.',
    },
    result: {
      pt: 'Pacote publicado que demonstra contribuição com a comunidade e padrões de qualidade de código.',
      en: 'Published package demonstrating community contribution and code quality standards.',
    },
  },
  {
    id: 4,
    title: 'Clinica Thaysa Medeiros',
    image: '/Imagens/ClinicaThaysa.png',
    githubLink: 'https://github.com/DevAndreNarcizo/Clinica-Thaysa-Medeiros',
    tier: 'landing',
    stack: 'Next.js, Tailwind CSS, Framer Motion',
    summary: {
      pt: 'Site institucional premium para clínica de estética e bem-estar.',
      en: 'Premium institutional website for aesthetics and wellness clinic.',
    },
    role: {
      pt: 'Design, frontend, animações e deploy',
      en: 'Design, frontend, animations, deploy',
    },
    problem: {
      pt: 'A clínica precisava de autoridade digital e conversão de novos clientes.',
      en: 'Clinic needed digital authority and new client conversion.',
    },
    solution: {
      pt: 'Interface premium focada em sofisticação, serviços e na jornada de agendamento.',
      en: 'Premium interface focused on luxury, services, and booking journey.',
    },
    result: {
      pt: 'Posicionamento de marca elevado e site otimizado para mobile.',
      en: 'Elevated brand positioning and mobile-optimized site.',
    },
  },
  {
    id: 5,
    title: 'Thais Sousa - Nail Designer',
    image: '/Imagens/ThaisSousa.png',
    githubLink: 'https://github.com/DevAndreNarcizo/ThaisSousa-NailDesigner',
    tier: 'landing',
    stack: 'React, Tailwind CSS, Vite',
    summary: {
      pt: 'Landing page para nail designer com portfólio e agendamento.',
      en: 'Landing page for nail designer with portfolio and booking.',
    },
    role: {
      pt: 'Design, frontend e deploy',
      en: 'Design, frontend, deploy',
    },
    problem: {
      pt: 'Profissional autônoma sem presença digital para atrair clientes.',
      en: 'Independent professional without digital presence to attract clients.',
    },
    solution: {
      pt: 'Landing page visual com galeria de trabalhos e foco em conversão.',
      en: 'Visual landing page with work gallery and conversion focus.',
    },
    result: {
      pt: 'Template reutilizável para profissionais de beleza e estética.',
      en: 'Reusable template for beauty and aesthetics professionals.',
    },
  },
  {
    id: 6,
    title: 'Karen Bianca - Lash Designer',
    image: '/Imagens/KarenBianca.png',
    githubLink: 'https://github.com/DevAndreNarcizo/KarenBianca-LashDesigner',
    tier: 'landing',
    stack: 'React, Tailwind CSS, Vite',
    summary: {
      pt: 'Site profissional para lash designer com portfólio e contato.',
      en: 'Professional site for lash designer with portfolio and contact.',
    },
    role: {
      pt: 'Design, frontend e deploy',
      en: 'Design, frontend, deploy',
    },
    problem: {
      pt: 'A lash designer precisava de um site para mostrar seus trabalhos e receber agendamentos.',
      en: 'Lash designer needed a site to showcase work and receive bookings.',
    },
    solution: {
      pt: 'Página elegante com galeria, depoimentos e CTA para WhatsApp.',
      en: 'Elegant page with gallery, testimonials, and WhatsApp CTA.',
    },
    result: {
      pt: 'Presença digital que converte visitantes em clientes agendados.',
      en: 'Digital presence that converts visitors into booked clients.',
    },
  },
];
````

- [ ] **Step 4: Criar `src/app/lang.ts`**

````ts
import { DOCUMENT, Injectable, computed, inject, signal } from '@angular/core';
import { Lang, text } from './content';

const STORAGE_KEY = 'portfolio-lang';

@Injectable({ providedIn: 'root' })
export class LangService {
  private readonly document = inject(DOCUMENT);

  // ponytail: always 'pt' until restore(); the prerendered HTML is PT and hydration must match it
  readonly lang = signal<Lang>('pt');
  readonly t = computed(() => text[this.lang()]);

  set(lang: Lang): void {
    this.lang.set(lang);
    this.document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // storage blocked (private mode, disabled cookies): the choice just isn't remembered
    }
  }

  toggle(): void {
    this.set(this.lang() === 'pt' ? 'en' : 'pt');
  }

  /** Browser only, after hydration: applies the language saved on a previous visit. */
  restore(): void {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      return;
    }
    if (saved === 'pt' || saved === 'en') this.set(saved);
  }
}
````

- [ ] **Step 5: Rodar e ver passar**

Run: `cd /var/www/portifolio-andre-react && export PATH="$HOME/.nvm/versions/node/v24.22.2/bin:$PATH" && npx ng test --watch=false`
Expected: `Test Files  2 passed (2)` e `Tests  11 passed (11)`.

- [ ] **Step 6: Commit**

```bash
cd /var/www/portifolio-andre-react
git add src/app/content.ts src/app/lang.ts src/app/content.spec.ts src/app/lang.spec.ts
git commit -m "feat: add bilingual content and language service" -m "Claude-Session: https://claude.ai/code/session_01R9bEA8gZWqxAG8mutEq3ZM"
```

---

### Task 3: Motor de animação, Fig. 01 (hero) e Fig. 02 (requisição)

**Files:**
- Create: `src/app/motion.ts`, `src/app/ui/words.ts`, `src/app/sections/hero.ts`, `src/app/sections/request-story.ts`

**Interfaces:**
- Consumes: `LangService.t` (Task 2), `words()` (Task 2), classes globais de `styles.css` (Task 1).
- Produces (`src/app/motion.ts`): `interface Motion { gsap; ScrollTrigger; lenis }`, `type Mode = 'desktop' | 'flow'`, `type Scene = (m: Motion, mode: Mode, root: HTMLElement) => void | (() => void)`, `DESKTOP`, `FLOW` (media queries), `reducedMotion(): boolean`, `loadMotion(): Promise<Motion>`, `refreshScroll(): void`, `sceneMotion(scene: Scene): void` (chamar no construtor do componente), `reveal(m: Motion, targets: Iterable<Element>, stagger = 0.08): void`.
- Produces: componentes `Words` (`<app-words [text]="..."/>`), `Hero` (`<app-hero/>`, section `#inicio`), `RequestStory` (`<app-request-story/>`, section `#requisicao`).

Por que não há teste unitário nesta task: as cenas só rodam no navegador com GSAP (no jsdom `reducedMotion()` é `true` e nada carrega). O template é verificado pelo compilador AOT no build (Step 5) e o comportamento na Task 7 (screenshots/console) e na revisão final.

- [ ] **Step 1: Criar `src/app/motion.ts`**

````ts
import { DestroyRef, ElementRef, afterNextRender, inject } from '@angular/core';
import type Lenis from 'lenis';

type Gsap = typeof import('gsap').gsap;
type ScrollTriggerStatic = typeof import('gsap/ScrollTrigger').ScrollTrigger;

export interface Motion {
  gsap: Gsap;
  ScrollTrigger: ScrollTriggerStatic;
  lenis: Lenis;
}

export type Mode = 'desktop' | 'flow';

/**
 * Builds a section's animations for one mode. Runs inside a gsap.matchMedia context scoped to the section,
 * so tweens and ScrollTriggers revert by themselves; return a function to undo anything else (e.g. classes).
 */
export type Scene = (m: Motion, mode: Mode, root: HTMLElement) => void | (() => void);

// Same breakpoint as the CSS layouts: pinned stories only on wide landscape screens.
export const DESKTOP =
  '(min-width: 1024px) and (orientation: landscape) and (prefers-reduced-motion: no-preference)';
export const FLOW =
  '((max-width: 1023.98px) or (orientation: portrait)) and (prefers-reduced-motion: no-preference)';

let loading: Promise<Motion> | undefined;
let loaded: Motion | undefined;

/** True when the visitor asked for reduced motion, or when matchMedia is missing (tests, old engines). */
export function reducedMotion(): boolean {
  return globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? true;
}

/** Loads GSAP, ScrollTrigger and Lenis once, after the window load event, outside the critical path. */
export function loadMotion(): Promise<Motion> {
  return (loading ??= (async () => {
    if (document.readyState !== 'complete') {
      await new Promise((resolve) => addEventListener('load', resolve, { once: true }));
    }
    const [{ gsap }, { ScrollTrigger }, { default: LenisCtor }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('lenis'),
    ]);
    gsap.registerPlugin(ScrollTrigger);

    // anchors: Lenis smooth-scrolls #links itself and honours html { scroll-padding-top } (the sticky header)
    const lenis = new LenisCtor({ autoRaf: false, anchors: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    await document.fonts?.ready;
    loaded = { gsap, ScrollTrigger, lenis };
    return loaded;
  })());
}

/** Recomputes trigger positions after the page height changes (e.g. the project filter). No-op before load. */
export function refreshScroll(): void {
  loaded?.ScrollTrigger.refresh();
}

/**
 * Registers a section's scene. Call from a component constructor (injection context).
 * ponytail: a visitor who starts with reduced motion never downloads GSAP; turning it off mid-visit needs a reload.
 */
export function sceneMotion(scene: Scene): void {
  const root = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  let revert: (() => void) | undefined;
  let destroyed = false;

  inject(DestroyRef).onDestroy(() => {
    destroyed = true;
    revert?.();
  });

  afterNextRender(() => {
    if (reducedMotion()) return;
    loadMotion().then((m) => {
      if (destroyed) return;
      const mm = m.gsap.matchMedia(root);
      mm.add({ desktop: DESKTOP, flow: FLOW }, (ctx) =>
        scene(m, ctx.conditions?.['desktop'] ? 'desktop' : 'flow', root),
      );
      revert = () => mm.revert();
    });
  });
}

/** Once-only fade + slide-up as targets scroll in. Targets already on or above the screen are left alone. */
export function reveal(m: Motion, targets: Iterable<Element>, stagger = 0.08): void {
  const below = Array.from(targets).filter((el) => el.getBoundingClientRect().top > innerHeight);
  if (!below.length) return;
  m.gsap.set(below, { autoAlpha: 0, y: 24 });
  m.ScrollTrigger.batch(below, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) =>
      m.gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger, overwrite: true }),
  });
}
````

- [ ] **Step 2: Criar `src/app/ui/words.ts`**

````ts
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { words } from '../content';

/** Renders a headline as masked words (.w > span, styled in styles.css) so sections can animate them. */
@Component({
  selector: 'app-words',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `@for (w of list(); track $index) {<span class="w"><span [class.em]="w.em" [style.--i]="$index">{{ w.text }}</span></span>&ngsp;}`,
})
export class Words {
  readonly text = input.required<string>();
  protected readonly list = computed(() => words(this.text()));
}
````

- [ ] **Step 3: Criar `src/app/sections/hero.ts`**

````ts
import { ChangeDetectionStrategy, Component, afterNextRender, inject, signal } from '@angular/core';
import { LangService } from '../lang';
import { reducedMotion } from '../motion';
import { Words } from '../ui/words';

@Component({
  selector: 'app-hero',
  imports: [Words],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="inicio" class="hero wrap">
      <div class="copy">
        <p class="fig-label">{{ t().hero.label }}</p>
        <h1 class="headline"><app-words [text]="t().hero.title" /></h1>
        <p class="lead">{{ t().hero.description }}</p>
        <p class="mono stack-line">{{ t().hero.stackLine }}</p>
        <div class="ctas">
          <a class="btn btn-primary" href="#projetos">{{ t().hero.projects }}</a>
          <a class="btn btn-ghost" href="#contato">{{ t().hero.contact }}</a>
        </div>
      </div>

      <svg class="diagram" viewBox="0 0 520 300" role="img" [attr.aria-label]="t().hero.diagram">
        <path class="wire" pathLength="1" d="M130 62 C170 62 170 150 210 150" />
        <path class="wire" pathLength="1" d="M130 238 C170 238 170 150 210 150" />
        <path class="wire" pathLength="1" d="M330 150 H390" />
        <text class="note" x="192" y="100">HTTP</text>
        <text class="note" x="344" y="140">SQL</text>

        <g class="node">
          <rect x="10" y="40" width="120" height="44" rx="2" />
          <text x="70" y="67">Angular</text>
        </g>
        <g class="node">
          <rect x="10" y="216" width="120" height="44" rx="2" />
          <text x="70" y="243">Flutter</text>
        </g>
        <g class="node">
          <rect x="210" y="128" width="120" height="44" rx="2" />
          <text x="270" y="155">Laravel</text>
        </g>
        <g class="node">
          <rect x="390" y="128" width="120" height="44" rx="2" />
          <text x="450" y="155">PostgreSQL</text>
        </g>

        @if (live()) {
          <circle class="packet" r="5">
            <animateMotion dur="3.2s" repeatCount="indefinite" path="M130 62 C170 62 170 150 210 150 H390" />
          </circle>
          <circle class="packet" r="5">
            <animateMotion dur="3.2s" begin="1.6s" repeatCount="indefinite" path="M130 238 C170 238 170 150 210 150 H390" />
          </circle>
        } @else {
          <circle class="packet" r="5" cx="130" cy="62" />
        }
      </svg>
    </section>
  `,
  styles: `
    .hero {
      display: grid;
      gap: 48px;
      align-items: center;
      min-height: calc(100svh - var(--header));
      padding-block: 48px 72px;
    }
    .headline {
      font: 400 clamp(44px, 6.6vw, 96px) / 0.98 var(--serif);
      letter-spacing: -0.015em;
      margin-top: 16px;
    }
    .headline .w > span {
      animation: rise 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) backwards;
      animation-delay: calc(var(--i) * 60ms + 120ms);
    }
    .stack-line {
      margin-top: 20px;
      text-transform: uppercase;
    }
    .ctas {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 32px;
    }
    .diagram {
      width: 100%;
      max-width: 560px;
      justify-self: center;
      color: var(--ink);
    }
    .wire {
      fill: none;
      stroke: currentColor;
      stroke-width: 1.4;
      stroke-dasharray: 1;
      animation: draw 1.1s 0.5s cubic-bezier(0.6, 0, 0.4, 1) backwards;
    }
    .node {
      animation: fade 0.6s 0.25s backwards;
    }
    .node rect {
      fill: var(--paper);
      stroke: currentColor;
      stroke-width: 1.4;
    }
    text {
      font: 600 14px var(--mono);
      fill: currentColor;
      text-anchor: middle;
    }
    .note {
      font-weight: 400;
      font-size: 12px;
      fill: var(--muted);
    }
    .packet {
      fill: var(--signal);
    }
    @media (min-width: 1024px) {
      .hero {
        grid-template-columns: 1.15fr 0.85fr;
      }
    }
    @keyframes rise {
      from {
        transform: translateY(105%);
      }
    }
    @keyframes draw {
      from {
        stroke-dashoffset: 1;
      }
    }
    @keyframes fade {
      from {
        opacity: 0;
      }
    }
  `,
})
export class Hero {
  protected readonly t = inject(LangService).t;
  // SMIL ignores prefers-reduced-motion, so the moving packets are only added in the browser when motion is allowed
  protected readonly live = signal(false);

  constructor() {
    afterNextRender(() => this.live.set(!reducedMotion()));
  }
}
````

- [ ] **Step 4: Criar `src/app/sections/request-story.ts`**

````ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LangService } from '../lang';
import { Motion, Mode, reveal, sceneMotion } from '../motion';
import { Words } from '../ui/words';

const SIGNAL = '#e8452c';
const INK = '#141414';

type Point = [x: number, y: number];

// Route of the request in SVG coordinates (viewBox 0 0 800 480); see the template for the shapes.
const TO_LARAVEL: Point[] = [[290, 115], [290, 166], [350, 166], [440, 166]];
const STAGES: Point[] = [[440, 216], [440, 266], [440, 316]];
const TO_DB: Point[] = [[530, 316], [575, 316], [575, 240], [690, 240]];
const BACK_TO_SPLIT: Point[] = [[575, 240], [575, 316], [440, 316], [440, 166], [350, 166], [290, 166]];
const TO_BROWSER: Point[] = [[290, 115], [250, 115]];
const TO_PHONE: Point[] = [[290, 352], [200, 352]];

@Component({
  selector: 'app-request-story',
  imports: [Words],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="requisicao" class="request">
      <div class="stage wrap">
        <div class="side">
          <p class="fig-label">{{ t().request.label }}</p>
          <h2 class="title"><app-words [text]="t().request.title" /></h2>
          <ol class="steps">
            @for (step of t().request.steps; track $index) {
              <li class="step">
                <span class="mono num">0{{ $index + 1 }}</span>
                <h3>{{ step.name }}</h3>
                <p>{{ step.text }}</p>
              </li>
            }
          </ol>
        </div>

        <svg class="diagram" viewBox="0 0 800 480" role="img" [attr.aria-label]="t().request.diagram">
          <path class="wire" data-node="http" d="M250 115 H290 V166 H350" />
          <path class="wire" data-node="mobile-http" d="M200 352 H290 V166" />
          <path class="wire" data-node="sql" d="M530 316 H575 V240 H610" />

          <g class="node" data-node="browser">
            <rect class="frame" x="20" y="30" width="230" height="170" rx="4" />
            <path d="M20 54 H250" />
            <circle cx="36" cy="42" r="3.5" />
            <circle cx="48" cy="42" r="3.5" />
            <circle cx="60" cy="42" r="3.5" />
            <rect x="40" y="72" width="190" height="18" />
            <rect x="40" y="100" width="150" height="18" />
            <rect x="40" y="128" width="170" height="18" />
            <rect class="row-new" x="40" y="156" width="190" height="18" />
            <text x="135" y="222">Angular</text>
          </g>

          <g class="node" data-node="phone">
            <rect class="frame" x="90" y="262" width="110" height="180" rx="16" />
            <path d="M130 276 H160" />
            <rect x="104" y="292" width="82" height="14" />
            <rect x="104" y="314" width="66" height="14" />
            <rect x="104" y="336" width="74" height="14" />
            <rect class="row-new" x="104" y="358" width="82" height="14" />
            <text x="145" y="468">Flutter</text>
          </g>

          <g class="node">
            <rect class="frame" x="330" y="100" width="220" height="270" rx="4" />
            <text x="440" y="128">Laravel</text>
          </g>
          @for (stage of stages; track stage; let i = $index) {
            <g class="node" [attr.data-node]="stage">
              <rect class="frame" x="350" [attr.y]="146 + i * 50" width="180" height="40" rx="2" />
              <text class="small" x="440" [attr.y]="171 + i * 50">{{ stage }}</text>
            </g>
          }

          <g class="node" data-node="db">
            <path class="frame" d="M610 180 V300 A80 18 0 0 0 770 300 V180" />
            <ellipse class="frame" cx="690" cy="180" rx="80" ry="18" />
            <text x="690" y="252">PostgreSQL</text>
          </g>

          <circle class="packet" data-packet="req" r="7" cx="250" cy="115" />
          <circle class="packet" data-packet="res-a" r="7" cx="690" cy="240" />
          <circle class="packet" data-packet="res-b" r="7" cx="690" cy="240" />
        </svg>
      </div>
    </section>
  `,
  styles: `
    .request {
      padding-block: var(--section-y);
    }
    .stage {
      display: grid;
      gap: 40px;
    }
    .steps {
      display: grid;
      gap: 20px;
      margin-top: 32px;
    }
    .step {
      border-top: 1px solid var(--rule);
      padding-top: 14px;
    }
    .num {
      color: var(--signal-text);
    }
    .step h3 {
      font: 400 28px/1.1 var(--serif);
      margin-top: 4px;
    }
    .step p {
      color: var(--muted);
      margin-top: 6px;
    }
    .diagram {
      width: 100%;
      color: var(--ink);
    }
    .wire,
    .node path,
    .node .frame {
      fill: none;
      stroke: currentColor;
      stroke-width: 1.6;
    }
    .node rect.frame {
      fill: var(--paper);
    }
    .node circle,
    .node rect:not(.frame) {
      fill: currentColor;
      opacity: 0.18;
    }
    .node rect.row-new {
      fill: var(--signal);
      opacity: 1;
    }
    text {
      font: 600 17px var(--mono);
      fill: currentColor;
      text-anchor: middle;
    }
    text.small {
      font-weight: 400;
      font-size: 15px;
    }
    .packet {
      fill: var(--signal);
      opacity: 0;
    }
    @media (min-width: 1024px) and (orientation: landscape) {
      .request {
        padding-block: 0;
      }
      .stage {
        grid-template-columns: 340px 1fr;
        align-items: center;
        min-height: calc(100svh - var(--header));
        padding-block: 48px;
      }
      :host(.is-pinned) .step {
        grid-area: 1 / 1;
      }
    }
  `,
})
export class RequestStory {
  protected readonly t = inject(LangService).t;
  protected readonly stages = ['auth', 'tenant', 'policy', 'controller'];

  constructor() {
    sceneMotion(story);
  }
}

function story(m: Motion, mode: Mode, root: HTMLElement): () => void {
  const { gsap } = m;
  const q = gsap.utils.selector(root);
  const steps = q('.step');
  const node = (name: string) => q(`[data-node="${name}"]`);
  const [req, resA, resB] = ['req', 'res-a', 'res-b'].map((name) => q(`[data-packet="${name}"]`));
  const desktop = mode === 'desktop';

  if (desktop) root.classList.add('is-pinned');
  gsap.set(q('.row-new'), { autoAlpha: 0 });
  if (desktop) gsap.set(steps.slice(1), { autoAlpha: 0, y: 16 });
  else reveal(m, steps);

  const tl = gsap.timeline({
    defaults: { ease: desktop ? 'none' : 'power1.inOut', duration: 0.3 },
    scrollTrigger: desktop
      ? { trigger: q('.stage')[0], start: 'top top+=64', end: '+=300%', pin: true, scrub: 0.6 }
      : { trigger: q('.diagram')[0], start: 'top 70%', once: true },
  });

  const caption = (i: number) => {
    if (!desktop) return;
    tl.to(steps, { autoAlpha: (j: number) => (j === i ? 1 : 0), y: (j: number) => (j === i ? 0 : -16) }, '<');
  };
  const travel = (packets: Element[], points: Point[]) => {
    for (const [cx, cy] of points) tl.to(packets, { attr: { cx, cy } });
  };
  const light = (name: string) => tl.to(node(name), { color: SIGNAL, duration: 0.15 });
  const dim = (name: string) => tl.to(node(name), { color: INK, duration: 0.15 }, '<');

  // 01 Angular
  light('browser');
  tl.to(req, { autoAlpha: 1, duration: 0.15 }, '<');
  caption(0);
  // 02 HTTP
  light('http');
  caption(1);
  dim('browser');
  travel(req, TO_LARAVEL.slice(0, 3));
  // 03 Laravel: auth → tenant → policy → controller
  dim('http');
  caption(2);
  travel(req, TO_LARAVEL.slice(3));
  light('auth');
  STAGES.forEach(([cx, cy], i) => {
    tl.to(req, { attr: { cx, cy } });
    dim(['auth', 'tenant', 'policy'][i]);
    light(['tenant', 'policy', 'controller'][i]);
  });
  // 04 PostgreSQL
  dim('controller');
  light('sql');
  caption(3);
  travel(req, TO_DB);
  dim('sql');
  light('db');
  tl.to(req, { autoAlpha: 0, duration: 0.15 });
  // 05 Response: back through the API, then split to both clients
  caption(4);
  tl.to([resA, resB], { autoAlpha: 1, duration: 0.15 });
  dim('db');
  travel([...resA, ...resB], BACK_TO_SPLIT);
  tl.addLabel('split');
  for (const [cx, cy] of TO_BROWSER) tl.to(resA, { attr: { cx, cy } });
  tl.to(resB, { attr: { cx: TO_PHONE[0][0], cy: TO_PHONE[0][1] } }, 'split');
  tl.to(resB, { attr: { cx: TO_PHONE[1][0], cy: TO_PHONE[1][1] } }, 'split+=0.3');
  light('browser');
  light('phone');
  tl.to(q('.row-new'), { autoAlpha: 1, duration: 0.2 }, '<');
  tl.to([resA, resB], { autoAlpha: 0, duration: 0.15 }, '<');
  // hold the finished frame for the last stretch of the pin
  tl.to({}, { duration: desktop ? 0.6 : 0 });

  return () => root.classList.remove('is-pinned');
}
````

- [ ] **Step 5: Build e testes**

Run: `cd /var/www/portifolio-andre-react && export PATH="$HOME/.nvm/versions/node/v24.22.2/bin:$PATH" && npx ng build && npx ng test --watch=false`
Expected: build com `Prerendered 1 static route.` e sem `WARNING`/`ERROR`; testes `Tests  11 passed (11)`.

- [ ] **Step 6: Commit**

```bash
cd /var/www/portifolio-andre-react
git add src/app/motion.ts src/app/ui/words.ts src/app/sections/hero.ts src/app/sections/request-story.ts
git commit -m "feat: add motion engine, hero and request story" -m "Claude-Session: https://claude.ai/code/session_01R9bEA8gZWqxAG8mutEq3ZM"
```

---

### Task 4: Fig. 03 (sobre), Fig. 04 (trajetória) e Fig. 05 (planta da stack)

**Files:**
- Create: `src/app/sections/about.ts`, `src/app/sections/timeline.ts`, `src/app/sections/stack-blueprint.ts`

**Interfaces:**
- Consumes: `LangService` (Task 2), `contactInfo`, `stackLayers`, `targetStack` (Task 2), `sceneMotion`, `reveal` (Task 3), `Words` (Task 3).
- Produces: `About` (`<app-about/>`, `#sobre`), `Timeline` (`<app-timeline/>`, `#trajetoria`), `StackBlueprint` (`<app-stack-blueprint/>`, `#stack`).

- [ ] **Step 1: Criar `src/app/sections/about.ts`**

````ts
import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { contactInfo } from '../content';
import { LangService } from '../lang';
import { reveal, sceneMotion } from '../motion';
import { Words } from '../ui/words';

@Component({
  selector: 'app-about',
  imports: [NgOptimizedImage, Words],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="sobre" class="section">
      <div class="wrap grid">
        <figure class="photo">
          <div class="frame">
            <img ngSrc="/Imagens/Foto.webp" width="1440" height="1440" [alt]="t().about.photoAlt" />
            @for (c of t().about.callouts; track $index) {
              <span class="marker mono" [class]="'m' + $index" aria-hidden="true">{{ $index + 1 }}</span>
            }
          </div>
          <figcaption>
            <ol class="legend">
              @for (c of t().about.callouts; track $index) {
                <li class="mono"><span class="n">{{ $index + 1 }}</span>{{ c }}</li>
              }
            </ol>
          </figcaption>
        </figure>

        <div class="text">
          <p class="fig-label">{{ t().about.label }}</p>
          <h2 class="title"><app-words [text]="t().about.title" /></h2>
          <p class="first">{{ t().about.paragraphs[0] }}</p>
          @for (p of t().about.paragraphs.slice(1); track $index) {
            <p class="para">{{ p }}</p>
          }
          <blockquote class="quote">{{ t().about.quote }}</blockquote>
          <a class="btn btn-ghost" [href]="linkedin" target="_blank" rel="noopener">{{ t().about.linkedin }}</a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .grid {
      display: grid;
      gap: 48px;
      align-items: start;
    }
    .frame {
      position: relative;
      max-width: 420px;
      border: 1.5px solid var(--ink);
      padding: 10px;
      background: var(--paper);
    }
    .frame img {
      width: 100%;
      height: auto;
      filter: grayscale(1) contrast(1.05);
    }
    .marker {
      position: absolute;
      display: grid;
      place-items: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--signal);
      color: var(--paper);
      font-weight: 600;
    }
    .m0 {
      top: 14%;
      left: 70%;
    }
    .m1 {
      top: 46%;
      left: 12%;
    }
    .m2 {
      top: 80%;
      left: 62%;
    }
    .legend {
      display: grid;
      gap: 8px;
      margin-top: 16px;
    }
    .legend li {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    .n {
      display: inline-grid;
      place-items: center;
      width: 22px;
      height: 22px;
      border: 1px solid var(--signal-text);
      border-radius: 50%;
      color: var(--signal-text);
    }
    .first {
      font: 400 clamp(24px, 2.6vw, 32px) / 1.25 var(--serif);
      margin-top: 24px;
    }
    .para {
      color: var(--muted);
      margin-top: 16px;
      max-width: 62ch;
    }
    .quote {
      margin: 28px 0;
      padding-left: 18px;
      border-left: 2px solid var(--signal);
      font-style: italic;
      max-width: 62ch;
    }
    @media (min-width: 1024px) {
      .grid {
        grid-template-columns: 420px 1fr;
        gap: 72px;
      }
    }
  `,
})
export class About {
  protected readonly t = inject(LangService).t;
  protected readonly linkedin = contactInfo.linkedin;

  constructor() {
    sceneMotion((m, _mode, root) => {
      const q = m.gsap.utils.selector(root);
      m.gsap.from(q('.marker'), {
        scale: 0,
        duration: 0.5,
        ease: 'back.out(3)',
        stagger: 0.15,
        scrollTrigger: { trigger: q('.frame')[0], start: 'top 75%', once: true },
      });
      reveal(m, q('.legend li, .text > *'));
    });
  }
}
````

- [ ] **Step 2: Criar `src/app/sections/timeline.ts`**

````ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LangService } from '../lang';
import { reveal, sceneMotion } from '../motion';
import { Words } from '../ui/words';

@Component({
  selector: 'app-timeline',
  imports: [Words],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="trajetoria" class="section">
      <div class="wrap">
        <p class="fig-label">{{ t().timeline.label }}</p>
        <h2 class="title"><app-words [text]="t().timeline.title" /></h2>

        <div class="cols">
          <div class="track">
            <div class="rail" aria-hidden="true"><div class="fill"></div></div>
            <ol class="items">
              @for (item of t().timeline.items; track $index) {
                <li class="item" [class.current]="$first">
                  <span class="dot" aria-hidden="true"></span>
                  <p class="mono period">
                    {{ item.period }}
                    @if ($first) {
                      <span class="badge">{{ t().timeline.current }}</span>
                    }
                  </p>
                  <h3>{{ item.role }}</h3>
                  <p class="company">{{ item.company }}</p>
                  <p class="desc">{{ item.description }}</p>
                </li>
              }
            </ol>
          </div>

          <aside class="edu">
            <h3 class="mono">{{ t().timeline.educationTitle }}</h3>
            @for (e of t().timeline.education; track $index) {
              <div class="card">
                <p class="card-title">{{ e.title }}</p>
                <p>{{ e.institution }}</p>
                <p class="mono">{{ e.type }} · {{ e.status }}</p>
              </div>
            }
            <h3 class="mono">{{ t().timeline.certificatesTitle }}</h3>
            @for (c of t().timeline.certificates; track $index) {
              <div class="card">
                <p class="card-title">{{ c.title }}</p>
                <p class="mono">{{ c.issuer }} · {{ c.status }}</p>
              </div>
            }
          </aside>
        </div>
      </div>
    </section>
  `,
  styles: `
    .cols {
      display: grid;
      gap: 56px;
      margin-top: 48px;
    }
    .track {
      position: relative;
      padding-left: 36px;
    }
    .rail {
      position: absolute;
      left: 7px;
      top: 6px;
      bottom: 6px;
      width: 2px;
      background: rgba(20, 20, 20, 0.12);
    }
    .fill {
      height: 100%;
      background: var(--ink);
      transform-origin: top;
    }
    .items {
      display: grid;
      gap: 40px;
    }
    .item {
      position: relative;
    }
    .dot {
      position: absolute;
      left: -36px;
      top: 4px;
      width: 16px;
      height: 16px;
      border: 2px solid var(--ink);
      border-radius: 50%;
      background: var(--ink);
      transition: background-color 0.3s;
    }
    :host(.drawing) .item:not(.lit, .current) .dot {
      background: var(--paper);
    }
    .current .dot {
      border-color: var(--signal);
      background: var(--signal);
    }
    .period {
      color: var(--muted);
      text-transform: uppercase;
    }
    .badge {
      margin-left: 8px;
      padding: 2px 8px;
      background: var(--signal-text);
      color: var(--paper);
    }
    .item h3 {
      font: 400 30px/1.1 var(--serif);
      margin-top: 6px;
    }
    .company {
      font-weight: 600;
      margin-top: 2px;
    }
    .desc {
      color: var(--muted);
      margin-top: 8px;
      max-width: 62ch;
    }
    .edu {
      display: grid;
      gap: 12px;
      align-content: start;
    }
    .edu h3 {
      color: var(--signal-text);
      text-transform: uppercase;
      margin-top: 12px;
    }
    .card {
      border: 1.5px solid var(--ink);
      padding: 14px 16px;
      background: var(--paper);
    }
    .card-title {
      font: 400 22px/1.2 var(--serif);
    }
    @media (min-width: 1024px) {
      .cols {
        grid-template-columns: 1fr 340px;
        gap: 72px;
      }
    }
  `,
})
export class Timeline {
  protected readonly t = inject(LangService).t;

  constructor() {
    sceneMotion((m, mode, root) => {
      const q = m.gsap.utils.selector(root);
      if (mode === 'flow') {
        reveal(m, q('.item, .card'));
        return;
      }
      root.classList.add('drawing');
      m.gsap.from(q('.fill'), {
        scaleY: 0,
        ease: 'none',
        scrollTrigger: { trigger: q('.track')[0], start: 'top 60%', end: 'bottom 60%', scrub: 0.6 },
      });
      for (const item of q('.item')) {
        m.ScrollTrigger.create({ trigger: item, start: 'top 60%', toggleClass: 'lit' });
      }
      reveal(m, q('.card'));
      return () => root.classList.remove('drawing');
    });
  }
}
````

- [ ] **Step 3: Criar `src/app/sections/stack-blueprint.ts`**

````ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { stackLayers, targetStack } from '../content';
import { LangService } from '../lang';
import { reveal, sceneMotion } from '../motion';
import { Words } from '../ui/words';

@Component({
  selector: 'app-stack-blueprint',
  imports: [Words],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="stack" class="stack">
      <div class="stage wrap">
        <div class="head">
          <p class="fig-label">{{ t().stack.label }}</p>
          <h2 class="title"><app-words [text]="t().stack.title" /></h2>
          <p class="lead">{{ t().stack.subtitle }}</p>
        </div>

        <div class="board">
          <div class="rail" aria-hidden="true"><span class="packet"></span></div>
          <ol class="plates">
            @for (layer of layers; track $index) {
              <li class="plate">
                <p class="mono name">0{{ $index + 1 }} · {{ layer.name[lang()] }}</p>
                <ul class="techs">
                  @for (tech of layer.techs; track tech) {
                    <li [class.target]="targets.has(tech)">{{ tech }}</li>
                  }
                </ul>
              </li>
            }
          </ol>
        </div>
      </div>
    </section>
  `,
  styles: `
    .stack {
      padding-block: var(--section-y);
    }
    .stage {
      display: grid;
      gap: 40px;
    }
    .board {
      position: relative;
      padding-left: 32px;
    }
    .rail {
      position: absolute;
      left: 8px;
      top: 0;
      bottom: 0;
      border-left: 1.5px dashed var(--rule);
    }
    .packet {
      position: absolute;
      left: -8px;
      top: 0;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--signal);
      opacity: 0;
    }
    .plates {
      display: grid;
      gap: 16px;
      perspective: 1400px;
    }
    .plate {
      border: 1.5px solid var(--ink);
      background: var(--paper);
      padding: 16px 20px;
      box-shadow: 6px 6px 0 rgba(20, 20, 20, 0.08);
    }
    .name {
      color: var(--signal-text);
      text-transform: uppercase;
      font-weight: 600;
    }
    .techs {
      display: flex;
      flex-wrap: wrap;
      gap: 6px 18px;
      margin-top: 8px;
      font: 400 22px/1.3 var(--serif);
    }
    .target {
      text-decoration: underline 2px var(--signal);
      text-underline-offset: 5px;
    }
    @media (min-width: 1024px) and (orientation: landscape) {
      .stack {
        padding-block: 0;
      }
      .stage {
        grid-template-columns: 340px 1fr;
        align-items: center;
        min-height: calc(100svh - var(--header));
        padding-block: 48px;
      }
    }
  `,
})
export class StackBlueprint {
  private readonly langService = inject(LangService);
  protected readonly t = this.langService.t;
  protected readonly lang = this.langService.lang;
  protected readonly layers = stackLayers;
  protected readonly targets = new Set(targetStack);

  constructor() {
    sceneMotion((m, mode, root) => {
      const q = m.gsap.utils.selector(root);
      const plates = q('.plate') as HTMLElement[];
      if (mode === 'flow') {
        reveal(m, plates);
        return;
      }
      const rail = q('.rail')[0] as HTMLElement;
      const tl = m.gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: { trigger: q('.stage')[0], start: 'top top+=64', end: '+=200%', pin: true, scrub: 0.6 },
      });
      // Exploded view: the plates start as a tilted, overlapping stack and separate into the readable list
      tl.from(plates, {
        y: (i: number, el: HTMLElement) => plates[0].offsetTop - el.offsetTop + i * 40,
        rotateX: 58,
        transformOrigin: '50% 0%',
        boxShadow: '0 0 0 rgba(20, 20, 20, 0)',
        duration: 1,
        stagger: 0.08,
      });
      tl.to(q('.packet'), { autoAlpha: 1, duration: 0.05 });
      tl.to(q('.packet'), { y: () => rail.offsetHeight - 14, duration: 0.6, ease: 'none' });
      tl.to(q('.packet'), { autoAlpha: 0, duration: 0.05 });
    });
  }
}
````

- [ ] **Step 4: Build e testes**

Run: `cd /var/www/portifolio-andre-react && export PATH="$HOME/.nvm/versions/node/v24.22.2/bin:$PATH" && npx ng build && npx ng test --watch=false`
Expected: build com `Prerendered 1 static route.` e sem `WARNING`/`ERROR`; testes `Tests  11 passed (11)`.

- [ ] **Step 5: Commit**

```bash
cd /var/www/portifolio-andre-react
git add src/app/sections/about.ts src/app/sections/timeline.ts src/app/sections/stack-blueprint.ts
git commit -m "feat: add about, timeline and stack blueprint sections" -m "Claude-Session: https://claude.ai/code/session_01R9bEA8gZWqxAG8mutEq3ZM"
```

---

### Task 5: Fig. 06 (projetos com filtro)

**Files:**
- Create: `src/app/sections/projects.ts`
- Test: `src/app/sections/projects.spec.ts`

**Interfaces:**
- Consumes: `projects`, `ProjectTier` (Task 2), `LangService` (Task 2), `refreshScroll`, `reveal`, `sceneMotion` (Task 3), `Words` (Task 3).
- Produces: `Projects` (`<app-projects/>`, `#projetos`) com `filter: WritableSignal<Filter>`, `visible: Signal<Project[]>`, `counts: Record<Filter, number>`, `select(f: Filter): void`; exporta `type Filter = ProjectTier | 'all'` e `FILTERS`.

- [ ] **Step 1: Escrever o teste**

`src/app/sections/projects.spec.ts`:

````ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LangService } from '../lang';
import { Projects } from './projects';

describe('Projects', () => {
  let fixture: ComponentFixture<Projects>;
  let el: HTMLElement;

  const sheets = () => Array.from(el.querySelectorAll<HTMLElement>('.sheet'));
  const sheet = (title: string) => sheets().find((s) => s.querySelector('h3')?.textContent?.trim() === title)!;
  const chip = (label: string) =>
    Array.from(el.querySelectorAll<HTMLButtonElement>('.chip')).find((b) => b.textContent!.trim().startsWith(label))!;

  beforeEach(async () => {
    localStorage.clear();
    fixture = TestBed.createComponent(Projects);
    el = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('shows all 12 projects by default', () => {
    expect(sheets().length).toBe(12);
    expect(chip('Todos').getAttribute('aria-pressed')).toBe('true');
  });

  it('shows the project count of each filter', () => {
    const labels = Array.from(el.querySelectorAll('.chip')).map((b) => b.textContent!.replace(/\s+/g, ' ').trim());
    expect(labels).toEqual(['Todos 12', 'Enterprise 5', 'SaaS 2', 'Web 2', 'Landing 3']);
  });

  it('filters by tier and back', async () => {
    chip('Landing').click();
    await fixture.whenStable();
    expect(sheets().map((s) => s.querySelector('h3')!.textContent!.trim())).toEqual([
      'Clinica Thaysa Medeiros',
      'Thais Sousa - Nail Designer',
      'Karen Bianca - Lash Designer',
    ]);
    expect(chip('Landing').getAttribute('aria-pressed')).toBe('true');
    expect(chip('Todos').getAttribute('aria-pressed')).toBe('false');
    expect(el.querySelector('[aria-live]')!.textContent!.trim()).toBe('3 projetos');

    chip('Todos').click();
    await fixture.whenStable();
    expect(sheets().length).toBe(12);
  });

  it('renders only the links a project has', () => {
    const finAssist = sheet('Fin-Assist');
    expect(finAssist.querySelector('.links')!.textContent).not.toContain('Ver projeto');
    expect(finAssist.querySelector('.links')!.textContent).toContain('GitHub');

    const aurora = sheet('Ecommerce Luz da Aurora');
    expect(aurora.querySelector('.links')!.textContent).toContain('Ver projeto');
    expect(aurora.querySelector('.links')!.textContent).not.toContain('GitHub');
  });

  it('draws a placeholder for projects without an image', () => {
    expect(sheet('saas-task-manager').querySelector('.hatch')).not.toBeNull();
    expect(sheet('saas-task-manager').querySelector('img')).toBeNull();
    expect(sheet('MyFinance Platform').querySelector('img')).not.toBeNull();
  });

  it('switches the project texts with the language', async () => {
    TestBed.inject(LangService).set('en');
    await fixture.whenStable();
    expect(sheet('Fin-Assist').querySelector('.summary')!.textContent).toContain('Personal finance application');
    expect(chip('All').getAttribute('aria-pressed')).toBe('true');
  });
});
````

- [ ] **Step 2: Rodar e ver falhar**

Run: `cd /var/www/portifolio-andre-react && export PATH="$HOME/.nvm/versions/node/v24.22.2/bin:$PATH" && npx ng test --watch=false`
Expected: FAIL, erro de resolução de `./projects`.

- [ ] **Step 3: Criar `src/app/sections/projects.ts`**

````ts
import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ProjectTier, projects } from '../content';
import { LangService } from '../lang';
import { refreshScroll, reveal, sceneMotion } from '../motion';
import { Words } from '../ui/words';

export type Filter = ProjectTier | 'all';

export const FILTERS: Filter[] = ['all', 'enterprise', 'saas', 'web', 'landing'];

const COUNTS: Record<Filter, number> = { all: projects.length, enterprise: 0, saas: 0, web: 0, landing: 0 };
for (const p of projects) COUNTS[p.tier]++;

@Component({
  selector: 'app-projects',
  imports: [NgOptimizedImage, Words],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="projetos" class="section">
      <div class="wrap">
        <p class="fig-label">{{ t().projects.label }}</p>
        <h2 class="title"><app-words [text]="t().projects.title" /></h2>
        <p class="lead">{{ t().projects.subtitle }}</p>

        <div class="filters" role="group" [attr.aria-label]="t().projects.type">
          @for (f of filters; track f) {
            <button type="button" class="chip mono" [attr.aria-pressed]="filter() === f" (click)="select(f)">
              {{ t().projects.filters[f] }} <span class="count">{{ counts[f] }}</span>
            </button>
          }
        </div>
        <p class="visually-hidden" aria-live="polite">{{ visible().length }} {{ t().projects.count }}</p>

        <div class="grid">
          @for (p of visible(); track p.id) {
            <article class="sheet" animate.enter="sheet-in">
              <div class="media">
                @if (p.image) {
                  <img [ngSrc]="p.image" fill alt="" />
                } @else {
                  <div class="hatch mono" aria-hidden="true">{{ p.title }}</div>
                }
              </div>
              <div class="body">
                <h3>{{ p.title }}</h3>
                <p class="summary">{{ p.summary[lang()] }}</p>
                <dl class="stamp mono">
                  <div>
                    <dt>{{ t().projects.type }}</dt>
                    <dd>{{ t().projects.filters[p.tier] }}</dd>
                  </div>
                  <div>
                    <dt>{{ t().projects.stack }}</dt>
                    <dd>{{ p.stack }}</dd>
                  </div>
                </dl>
                <div class="links">
                  @if (p.liveLink) {
                    <a class="btn btn-primary" [href]="p.liveLink" target="_blank" rel="noopener">{{ t().projects.live }}</a>
                  }
                  @if (p.githubLink) {
                    <a class="btn btn-ghost" [href]="p.githubLink" target="_blank" rel="noopener">{{ t().projects.github }}</a>
                  }
                </div>
                <details>
                  <summary class="mono">{{ t().projects.details }}</summary>
                  <dl class="facts">
                    <dt>{{ t().projects.problem }}</dt>
                    <dd>{{ p.problem[lang()] }}</dd>
                    <dt>{{ t().projects.solution }}</dt>
                    <dd>{{ p.solution[lang()] }}</dd>
                    <dt>{{ t().projects.outcome }}</dt>
                    <dd>{{ p.result[lang()] }}</dd>
                    <dt>{{ t().projects.role }}</dt>
                    <dd>{{ p.role[lang()] }}</dd>
                  </dl>
                </details>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .filters {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 32px;
    }
    .chip {
      min-height: 40px;
      padding: 0 14px;
      border: 1.5px solid var(--ink);
      border-radius: 2px;
      background: var(--paper);
      text-transform: uppercase;
      cursor: pointer;
    }
    .chip[aria-pressed='true'] {
      background: var(--ink);
      color: var(--paper);
    }
    .count {
      opacity: 0.6;
    }
    .grid {
      display: grid;
      gap: 24px;
      margin-top: 32px;
    }
    .sheet {
      position: relative;
      display: flex;
      flex-direction: column;
      border: 1.5px solid var(--ink);
      background: var(--paper);
    }
    .sheet::before,
    .sheet::after {
      content: '';
      position: absolute;
      width: 14px;
      height: 14px;
      border: 0 solid var(--signal);
      opacity: 0;
      transition: opacity 0.2s;
    }
    .sheet::before {
      top: -7px;
      left: -7px;
      border-width: 2px 0 0 2px;
    }
    .sheet::after {
      right: -7px;
      bottom: -7px;
      border-width: 0 2px 2px 0;
    }
    .sheet:hover::before,
    .sheet:hover::after {
      opacity: 1;
    }
    .media {
      position: relative;
      aspect-ratio: 16 / 10;
      overflow: hidden;
      border-bottom: 1.5px solid var(--ink);
    }
    .media img {
      object-fit: cover;
      object-position: top;
      transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .sheet:hover .media img {
      transform: scale(1.03);
    }
    .hatch {
      height: 100%;
      display: grid;
      place-items: center;
      padding: 16px;
      text-align: center;
      background: repeating-linear-gradient(45deg, transparent 0 9px, rgba(20, 20, 20, 0.1) 9px 10px);
    }
    .body {
      display: flex;
      flex-direction: column;
      gap: 14px;
      flex: 1;
      padding: 20px;
    }
    .body h3 {
      font: 400 28px/1.1 var(--serif);
    }
    .summary {
      color: var(--muted);
    }
    .stamp {
      display: grid;
      border: 1px solid var(--ink);
    }
    .stamp div {
      display: grid;
      grid-template-columns: 64px 1fr;
    }
    .stamp div + div {
      border-top: 1px solid var(--ink);
    }
    .stamp dt,
    .stamp dd {
      padding: 6px 8px;
    }
    .stamp dt {
      border-right: 1px solid var(--ink);
      text-transform: uppercase;
      color: var(--muted);
    }
    .links {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: auto;
    }
    .links .btn {
      min-height: 40px;
      padding: 0 16px;
      font-size: 14px;
    }
    summary {
      cursor: pointer;
      text-transform: uppercase;
      color: var(--signal-text);
    }
    .facts dt {
      font-weight: 600;
      margin-top: 12px;
    }
    .facts dd {
      color: var(--muted);
    }
    .sheet-in {
      animation: sheet-in 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    @keyframes sheet-in {
      from {
        opacity: 0;
        transform: translateY(12px);
      }
    }
    @media (min-width: 720px) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (min-width: 1100px) {
      .grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  `,
})
export class Projects {
  private readonly langService = inject(LangService);
  private readonly injector = inject(Injector);
  protected readonly t = this.langService.t;
  protected readonly lang = this.langService.lang;
  protected readonly filters = FILTERS;

  readonly filter = signal<Filter>('all');
  readonly visible = computed(() => {
    const f = this.filter();
    return f === 'all' ? projects : projects.filter((p) => p.tier === f);
  });
  readonly counts = COUNTS;

  constructor() {
    sceneMotion((m, _mode, root) => reveal(m, m.gsap.utils.selector(root)('.sheet')));
  }

  select(f: Filter): void {
    this.filter.set(f);
    // the grid height changed: triggers below it (Fig. 07) need new positions
    afterNextRender(refreshScroll, { injector: this.injector });
  }
}
````

- [ ] **Step 4: Rodar e ver passar**

Run: `cd /var/www/portifolio-andre-react && export PATH="$HOME/.nvm/versions/node/v24.22.2/bin:$PATH" && npx ng test --watch=false`
Expected: `Test Files  3 passed (3)` e `Tests  17 passed (17)`.

- [ ] **Step 5: Commit**

```bash
cd /var/www/portifolio-andre-react
git add src/app/sections/projects.ts src/app/sections/projects.spec.ts
git commit -m "feat: add filterable project sheets" -m "Claude-Session: https://claude.ai/code/session_01R9bEA8gZWqxAG8mutEq3ZM"
```

---

### Task 6: Fig. 07 (contato) e rodapé

**Files:**
- Create: `src/app/sections/contact.ts`
- Test: `src/app/sections/contact.spec.ts`

**Interfaces:**
- Consumes: `contactInfo` (Task 2), `LangService` (Task 2), `reducedMotion`, `reveal`, `sceneMotion` (Task 3), `Words` (Task 3).
- Produces: `Contact` (`<app-contact/>`, `#contato` + `<footer>`) com `copied: WritableSignal<boolean>` e `copy(): Promise<void>`.

- [ ] **Step 1: Escrever o teste**

`src/app/sections/contact.spec.ts`:

````ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Contact } from './contact';

describe('Contact', () => {
  let fixture: ComponentFixture<Contact>;
  let el: HTMLElement;
  const copyButton = () => el.querySelector<HTMLButtonElement>('.copy')!;

  function mockClipboard(writeText: () => Promise<void>) {
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: vi.fn(writeText) }, configurable: true });
    return navigator.clipboard.writeText as ReturnType<typeof vi.fn>;
  }

  beforeEach(async () => {
    localStorage.clear();
    getSelection()?.removeAllRanges();
    fixture = TestBed.createComponent(Contact);
    el = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('copies the email and confirms', async () => {
    const writeText = mockClipboard(() => Promise.resolve());
    await fixture.componentInstance.copy();
    await fixture.whenStable();
    expect(writeText).toHaveBeenCalledWith('dev.andrenarcizo@outlook.com');
    expect(copyButton().textContent!.trim()).toBe('Copiado!');
  });

  it('selects the address instead when the clipboard is unavailable', async () => {
    mockClipboard(() => Promise.reject(new Error('denied')));
    await fixture.componentInstance.copy();
    await fixture.whenStable();
    expect(copyButton().textContent!.trim()).toBe('Copiar');
    expect(getSelection()!.toString()).toBe('dev.andrenarcizo@outlook.com');
  });

  it('lists the four contact channels', () => {
    const hrefs = Array.from(el.querySelectorAll<HTMLAnchorElement>('.channel a')).map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual([
      'mailto:dev.andrenarcizo@outlook.com',
      'https://www.linkedin.com/in/andrenarcizo/',
      'https://github.com/DevAndreNarcizo',
      'https://wa.me/5562985579319',
    ]);
  });
});
````

- [ ] **Step 2: Rodar e ver falhar**

Run: `cd /var/www/portifolio-andre-react && export PATH="$HOME/.nvm/versions/node/v24.22.2/bin:$PATH" && npx ng test --watch=false`
Expected: FAIL, erro de resolução de `./contact`.

- [ ] **Step 3: Criar `src/app/sections/contact.ts`**

````ts
import { ChangeDetectionStrategy, Component, ElementRef, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { contactInfo } from '../content';
import { LangService } from '../lang';
import { reducedMotion, reveal, sceneMotion } from '../motion';
import { Words } from '../ui/words';

@Component({
  selector: 'app-contact',
  imports: [Words],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contato" class="section">
      <div class="wrap">
        <p class="fig-label">{{ t().contact.label }}</p>
        <h2 class="headline"><app-words [text]="t().contact.title" /></h2>

        <svg class="route" viewBox="0 0 520 60" aria-hidden="true">
          <text x="0" y="36">api</text>
          <path class="wire" d="M44 31 H440" />
          <text class="you" x="452" y="36">{{ t().contact.you }}</text>
          @if (live()) {
            <circle class="packet" r="6">
              <animateMotion dur="2.4s" repeatCount="indefinite" path="M44 31 H440" />
            </circle>
          } @else {
            <circle class="packet" r="6" cx="440" cy="31" />
          }
        </svg>

        <p class="lead">{{ t().contact.description }}</p>

        <ul class="channels">
          <li class="channel">
            <span class="mono label">{{ t().contact.email }}</span>
            <a #email [href]="'mailto:' + info.email">{{ info.email }}</a>
            <button type="button" class="copy mono" (click)="copy()">
              {{ copied() ? t().contact.copied : t().contact.copy }}
            </button>
          </li>
          <li class="channel">
            <span class="mono label">LinkedIn</span>
            <a [href]="info.linkedin" target="_blank" rel="noopener">linkedin.com/in/andrenarcizo</a>
          </li>
          <li class="channel">
            <span class="mono label">GitHub</span>
            <a [href]="info.github" target="_blank" rel="noopener">github.com/DevAndreNarcizo</a>
          </li>
          <li class="channel">
            <span class="mono label">WhatsApp</span>
            <a [href]="info.whatsappLink" target="_blank" rel="noopener">{{ info.whatsapp }}</a>
          </li>
        </ul>
        <p class="mono hint">{{ t().contact.hint }}</p>
      </div>
    </section>

    <footer class="footer">
      <div class="wrap row mono">
        <span>André Narcizo — {{ t().footer.role }}</span>
        <span>© {{ year }}</span>
      </div>
    </footer>
  `,
  styles: `
    .headline {
      font: 400 clamp(56px, 11vw, 160px) / 0.95 var(--serif);
      letter-spacing: -0.02em;
      margin-top: 12px;
    }
    .route {
      width: 100%;
      max-width: 520px;
      margin-top: 24px;
    }
    .route text {
      font: 600 16px var(--mono);
      fill: var(--ink);
    }
    .route .you {
      fill: var(--signal-text);
    }
    .wire {
      stroke: var(--ink);
      stroke-width: 1.4;
      stroke-dasharray: 4 6;
    }
    .packet {
      fill: var(--signal);
    }
    .channels {
      display: grid;
      margin-top: 40px;
      border-top: 1.5px solid var(--ink);
    }
    .channel {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px 20px;
      padding: 18px 0;
      border-bottom: 1px solid var(--rule);
    }
    .label {
      width: 96px;
      text-transform: uppercase;
      color: var(--muted);
    }
    .channel a {
      font: 400 clamp(22px, 3vw, 34px) / 1.2 var(--serif);
      text-decoration-thickness: 1px;
      text-underline-offset: 6px;
      overflow-wrap: anywhere;
    }
    .channel a:hover {
      color: var(--signal-text);
    }
    .copy {
      min-height: 36px;
      padding: 0 12px;
      border: 1.5px solid var(--ink);
      border-radius: 2px;
      background: var(--paper);
      text-transform: uppercase;
      cursor: pointer;
    }
    .hint {
      margin-top: 24px;
      color: var(--muted);
    }
    .footer {
      border-top: 1.5px solid var(--ink);
      padding-block: 24px;
    }
    .row {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 8px;
      color: var(--muted);
    }
  `,
})
export class Contact {
  protected readonly t = inject(LangService).t;
  protected readonly info = contactInfo;
  protected readonly year = new Date().getFullYear();
  protected readonly live = signal(false);
  readonly copied = signal(false);
  private readonly email = viewChild.required<ElementRef<HTMLAnchorElement>>('email');

  constructor() {
    afterNextRender(() => this.live.set(!reducedMotion()));
    sceneMotion((m, _mode, root) => {
      const q = m.gsap.utils.selector(root);
      m.gsap.from(q('.headline .w > span'), {
        yPercent: 105,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: q('.headline')[0], start: 'top 80%', once: true },
      });
      reveal(m, q('.lead, .channel, .hint'));
    });
  }

  async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.info.email);
    } catch {
      // no clipboard (insecure context or denied): select the address so the visitor can copy it by hand
      getSelection()?.selectAllChildren(this.email().nativeElement);
      return;
    }
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }
}
````

- [ ] **Step 4: Rodar e ver passar**

Run: `cd /var/www/portifolio-andre-react && export PATH="$HOME/.nvm/versions/node/v24.22.2/bin:$PATH" && npx ng test --watch=false`
Expected: `Test Files  4 passed (4)` e `Tests  20 passed (20)`.

- [ ] **Step 5: Commit**

```bash
cd /var/www/portifolio-andre-react
git add src/app/sections/contact.ts src/app/sections/contact.spec.ts
git commit -m "feat: add contact section and footer" -m "Claude-Session: https://claude.ai/code/session_01R9bEA8gZWqxAG8mutEq3ZM"
```

---

### Task 7: Shell da página, teste do HTML pré-renderizado e documentação

**Files:**
- Modify (substituir inteiro): `src/app/app.ts`, `README.md`, `README.pt-BR.md`
- Modify: `DEPLOY.md` (4 trocas de texto)
- Test: `src/app/app.spec.ts`, `tests/prerender.test.mjs`

**Interfaces:**
- Consumes: todos os componentes de seção (Tasks 3–6) e `LangService` (Task 2).
- Produces: `App` final (header fixo com âncoras e botão PT/EN, `<main id="conteudo">` com as sete seções).

- [ ] **Step 1: Escrever o teste do shell**

`src/app/app.spec.ts`:

````ts
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = 'pt-BR';
  });

  async function render() {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }

  const headline = (el: HTMLElement) => el.querySelector('h1')!.textContent!.replace(/\s+/g, ' ').trim();

  it('renders the seven sections in order', async () => {
    const { el } = await render();
    expect(Array.from(el.querySelectorAll('main section')).map((s) => s.id)).toEqual([
      'inicio',
      'requisicao',
      'sobre',
      'trajetoria',
      'stack',
      'projetos',
      'contato',
    ]);
  });

  it('keeps the split headline readable as one sentence', async () => {
    const { el } = await render();
    expect(headline(el)).toBe('Do banco de dados à interface, web e mobile.');
    expect(el.querySelectorAll('h1 .w').length).toBe(9);
    expect(el.querySelectorAll('h1 .em').length).toBe(2);
  });

  it('switches the whole page to English from the header button', async () => {
    const { fixture, el } = await render();
    const button = el.querySelector<HTMLButtonElement>('.lang')!;
    expect(button.getAttribute('aria-label')).toBe('Mudar idioma para English');

    button.click();
    await fixture.whenStable();
    expect(headline(el)).toBe('From database to interface, web and mobile.');
    expect(button.getAttribute('aria-label')).toBe('Switch language to Português');
    expect(document.documentElement.lang).toBe('en');
  });

  it('applies the language saved on a previous visit after the first render', async () => {
    localStorage.setItem('portfolio-lang', 'en');
    const { fixture, el } = await render();
    await fixture.whenStable();
    expect(headline(el)).toBe('From database to interface, web and mobile.');
  });
});
````

- [ ] **Step 2: Rodar e ver falhar**

Run: `cd /var/www/portifolio-andre-react && export PATH="$HOME/.nvm/versions/node/v24.22.2/bin:$PATH" && npx ng test --watch=false`
Expected: FAIL em `app.spec.ts` (o `App` provisório não tem seções, `h1` nem botão `.lang`); os outros 20 testes passam.

- [ ] **Step 3: Substituir `src/app/app.ts` inteiro**

````ts
import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';
import { LangService } from './lang';
import { About } from './sections/about';
import { Contact } from './sections/contact';
import { Hero } from './sections/hero';
import { Projects } from './sections/projects';
import { RequestStory } from './sections/request-story';
import { StackBlueprint } from './sections/stack-blueprint';
import { Timeline } from './sections/timeline';

@Component({
  selector: 'app-root',
  imports: [Hero, RequestStory, About, Timeline, StackBlueprint, Projects, Contact],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="skip-link" href="#conteudo">{{ t().nav.skip }}</a>
    <header class="header">
      <div class="wrap bar">
        <a class="mark" href="#inicio" aria-label="André Narcizo">AN</a>
        <nav [attr.aria-label]="t().nav.label">
          <a class="hide-sm" href="#sobre">{{ t().nav.about }}</a>
          <a class="hide-sm" href="#trajetoria">{{ t().nav.experience }}</a>
          <a class="hide-sm" href="#stack">{{ t().nav.stack }}</a>
          <a class="hide-sm" href="#projetos">{{ t().nav.projects }}</a>
          <a href="#contato">{{ t().nav.contact }}</a>
        </nav>
        <button type="button" class="lang mono" [attr.aria-label]="t().nav.langSwitch" (click)="lang.toggle()">
          {{ t().nav.langShort }}
        </button>
      </div>
    </header>
    <main id="conteudo" tabindex="-1">
      <app-hero />
      <app-request-story />
      <app-about />
      <app-timeline />
      <app-stack-blueprint />
      <app-projects />
      <app-contact />
    </main>
  `,
  styles: `
    .header {
      position: sticky;
      top: 0;
      z-index: 50;
      height: var(--header);
      background: color-mix(in srgb, var(--paper) 90%, transparent);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid rgba(20, 20, 20, 0.12);
    }
    .bar {
      display: flex;
      align-items: center;
      gap: 24px;
      height: 100%;
    }
    .mark {
      font: italic 400 28px/1 var(--serif);
      text-decoration: none;
      margin-right: auto;
    }
    nav {
      display: flex;
      gap: 24px;
    }
    nav a {
      font-weight: 600;
      font-size: 15px;
      text-decoration: none;
    }
    nav a:hover {
      color: var(--signal-text);
    }
    .lang {
      min-width: 44px;
      min-height: 36px;
      border: 1.5px solid var(--ink);
      border-radius: 2px;
      background: transparent;
      font-weight: 600;
      cursor: pointer;
    }
    .lang:hover {
      background: var(--ink);
      color: var(--paper);
    }
    main:focus {
      outline: none;
    }
    @media (max-width: 759.98px) {
      .hide-sm {
        display: none;
      }
    }
  `,
})
export class App {
  protected readonly lang = inject(LangService);
  protected readonly t = this.lang.t;

  constructor() {
    afterNextRender(() => this.lang.restore());
  }
}
````

- [ ] **Step 4: Rodar e ver passar**

Run: `cd /var/www/portifolio-andre-react && export PATH="$HOME/.nvm/versions/node/v24.22.2/bin:$PATH" && npx ng test --watch=false`
Expected: `Test Files  5 passed (5)` e `Tests  24 passed (24)`.

- [ ] **Step 5: Criar `tests/prerender.test.mjs`**

````js
// Run after `npm run build`: proves recruiters and crawlers get the full page without JavaScript.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const html = readFileSync(new URL('../dist/portfolio-andre/browser/index.html', import.meta.url), 'utf8');
const plain = (fragment) => fragment.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

test('is Portuguese by default', () => {
  assert.match(html, /<html lang="pt-BR"/);
});

test('contains the hero headline as readable text', () => {
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  assert.ok(h1, 'no <h1> in the prerendered page');
  assert.equal(plain(h1[1]), 'Do banco de dados à interface, web e mobile.');
});

test('contains the seven sections', () => {
  for (const id of ['inicio', 'requisicao', 'sobre', 'trajetoria', 'stack', 'projetos', 'contato']) {
    assert.ok(html.includes(`id="${id}"`), `missing section #${id}`);
  }
});

test('contains every project title', () => {
  const titles = [
    'MyFinance Platform',
    'HunterAI Platform',
    'Agenda-Fácil',
    'Fin-Assist',
    'Ecommerce Luz da Aurora',
    'laravel-clean-architecture-api',
    'node-microservices-event-driven',
    'saas-task-manager',
    'php-code-analyzer',
    'Clinica Thaysa Medeiros',
    'Thais Sousa - Nail Designer',
    'Karen Bianca - Lash Designer',
  ];
  for (const title of titles) assert.ok(html.includes(`>${title}<`), `missing project ${title}`);
});

test('keeps the SEO and social meta tags', () => {
  assert.match(html, /<meta name="description" content="Full-Stack Developer at Sysout Tecnologia/);
  assert.match(html, /<meta property="og:title" content="André Narcizo — Full-Stack Developer">/);
  assert.match(html, /<link rel="canonical" href="https:\/\/dev-andrenarcizo.netlify.app">/);
});
````

- [ ] **Step 6: Build e teste do HTML pré-renderizado**

Run: `cd /var/www/portifolio-andre-react && export PATH="$HOME/.nvm/versions/node/v24.22.2/bin:$PATH" && npm run build && npm run test:prerender`
Expected: build com `Prerendered 1 static route.`, sem `WARNING`/`ERROR`, chunks lazy `index` (gsap), `ScrollTrigger` e `lenis` listados em "Lazy chunk files"; depois `ℹ pass 5` e `ℹ fail 0`.

- [ ] **Step 7: Substituir `README.md` e `README.pt-BR.md` inteiros**

`README.md`:

````markdown
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
````

`README.pt-BR.md`:

````markdown
# André Narcizo — Portfólio

[English](README.md) | [Português](README.pt-BR.md)

[![Angular](https://img.shields.io/badge/Angular-22-DD0031?style=flat-square&logo=angular&logoColor=white)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![GSAP](https://img.shields.io/badge/GSAP-3-0AE448?style=flat-square&logo=greensock&logoColor=black)](https://gsap.com)
[![Netlify](https://img.shields.io/badge/deployed-Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)](https://dev-andrenarcizo.netlify.app)

Portfólio de página única de André Narcizo, Desenvolvedor Full-Stack (Angular, Laravel, Flutter) na Sysout Tecnologia.
A página é desenhada como uma prancha técnica: cada seção é uma figura numerada, e um ponto vermelho — uma
requisição HTTP — viaja dos clientes Angular e Flutter por uma API Laravel até o PostgreSQL conforme você rola.

## Destaques

- Angular 22: componentes standalone, detecção de mudanças zoneless, signals, `animate.enter` nativo
- Pré-renderização estática (SSG): a página inteira chega como HTML, legível sem JavaScript
- Histórias de scroll com GSAP ScrollTrigger (pin + scrub no desktop, reveals únicos no celular)
  e rolagem suave com Lenis, carregados depois que a página fica interativa
- `prefers-reduced-motion` respeitado em tudo: sem movimento, estado final visível
- Português e inglês, com troca em tempo real sem recarregar
- Lighthouse: Performance 97 (mobile) / 100 (desktop), Acessibilidade, Boas Práticas e SEO 100

## Stack

| Camada | Tecnologias |
|---|---|
| Framework | Angular 22, TypeScript 6 |
| Movimento | GSAP 3 + ScrollTrigger, Lenis, animações CSS, SVG SMIL |
| Renderização | `@angular/ssr` com saída estática (`/` pré-renderizada) |
| Testes | Vitest (builder de testes do Angular), Node test runner para o HTML pré-renderizado |
| Entrega | Netlify |

## Desenvolvimento local

Requer Node.js 24 (`nvm use`).

```bash
git clone https://github.com/DevAndreNarcizo/portifolio-andre-react.git
cd portifolio-andre-react
npm install
npm start
```

## Validação

```bash
npm test
npm run build
npm run test:prerender
```

## Links

- [Portfólio publicado](https://dev-andrenarcizo.netlify.app)
- [LinkedIn](https://linkedin.com/in/andrenarcizo)
- [GitHub](https://github.com/DevAndreNarcizo)
- [E-mail](mailto:dev.andrenarcizo@outlook.com)
````

- [ ] **Step 8: Atualizar `DEPLOY.md`**

```bash
cd /var/www/portifolio-andre-react
sed -i \
  -e 's|"Portfólio profissional com React + TypeScript"|"Portfólio profissional com Angular + TypeScript"|' \
  -e 's|\*\*Publish directory\*\*: `dist`|**Publish directory**: `dist/portfolio-andre/browser`|' \
  -e 's|\[Documentação Vite\](https://vitejs.dev/)|[Documentação Angular](https://angular.dev/)|' \
  DEPLOY.md
grep -nE 'React|Vite|`dist`' DEPLOY.md
grep -c 'dist/portfolio-andre/browser' DEPLOY.md
```

Expected: o primeiro `grep` não imprime nada; o segundo imprime `2`.

- [ ] **Step 9: Checagem no navegador**

Run: `cd /var/www/portifolio-andre-react && export PATH="$HOME/.nvm/versions/node/v24.22.2/bin:$PATH" && npx -y serve@14 -l 4310 dist/portfolio-andre/browser` (em segundo plano), abrir `http://localhost:4310/` e conferir:
- Console do DevTools sem erros nem avisos, inclusive depois de `localStorage.setItem('portfolio-lang','en')` + recarregar (a página volta em inglês).
- Desktop 1440×900: a Fig. 02 fica presa enquanto a requisição percorre Angular → Laravel (auth/tenant/policy/controller) → PostgreSQL → navegador + celular; a Fig. 05 abre as placas.
- Celular (DevTools 390×844): sem pin, sem rolagem horizontal.
- Com "Emulate CSS prefers-reduced-motion: reduce": nada se move e tudo aparece.
- Lighthouse do DevTools (Navigation, Mobile): Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO 100, CLS 0. Referência na verificação prévia: 97/100/100/100.
Depois, encerrar o servidor.

- [ ] **Step 10: Commit**

```bash
cd /var/www/portifolio-andre-react
git add src/app/app.ts src/app/app.spec.ts tests/prerender.test.mjs README.md README.pt-BR.md DEPLOY.md
git commit -m "feat: assemble single-page shell, prerender test and docs" -m "Claude-Session: https://claude.ai/code/session_01R9bEA8gZWqxAG8mutEq3ZM"
```
