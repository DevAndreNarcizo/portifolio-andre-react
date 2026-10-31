# Task 3 — Currículo em PDF e README

Depende da Task 2 (os botões "Baixar currículo" já apontam para `/cv/andre-narcizo-cv-pt.pdf` e `-en.pdf`).

## Passo 1 — Criar/substituir os arquivos

```bash
python3 - docs/superpowers/plans/2026-10-31-dark-portfolio/task-3-cv-docs.md <<'EOF'
import pathlib, re, sys
text = pathlib.Path(sys.argv[1]).read_text()
for path, body in re.findall(r'^#### `([^`]+)`\n\n````[a-z]*\n(.*?)\n````$', text, re.S | re.M):
    p = pathlib.Path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(body + '\n')
    print('wrote', path)
EOF
```

Saída esperada: 5 linhas `wrote ...`.

## Passo 2 — Script `cv` no `package.json`

Troque:

```json
    "test:excerpts": "node --test tests/excerpts.test.mjs"
```

por:

```json
    "test:excerpts": "node --test tests/excerpts.test.mjs",
    "cv": "mkdir -p public/cv && for l in pt en; do ${CHROME:-brave-browser} --headless --disable-gpu --no-pdf-header-footer --print-to-pdf=public/cv/andre-narcizo-cv-$l.pdf cv/cv-$l.html; done"
```

## Passo 3 — Gerar os PDFs

```bash
npm run cv
```

Esperado: duas linhas `... bytes written to file public/cv/andre-narcizo-cv-pt.pdf` / `-en.pdf`
(mensagens do Chromium sobre GPU/dbus podem aparecer e não importam).

```bash
for l in pt en; do python3 -c "import re,sys; d=open(sys.argv[1],'rb').read(); print(sys.argv[1], len(re.findall(rb'/Type\s*/Page[^s]', d)), 'página(s)')" public/cv/andre-narcizo-cv-$l.pdf; done
```

Esperado: `1 página(s)` para cada arquivo.

## Passo 4 — Verificar o site com os PDFs

```bash
npm run build && ls dist/portfolio-andre/browser/cv
```

Esperado: `andre-narcizo-cv-en.pdf  andre-narcizo-cv-pt.pdf`.

## Passo 5 — Commit

```bash
git add cv public/cv README.md README.pt-BR.md package.json
git commit -m "docs: add the PDF résumé and rewrite the README

Résumé sources in PT and EN, printed to public/cv by npm run cv, and a README
that describes the case-study portfolio.

Claude-Session: https://claude.ai/code/session_01R9bEA8gZWqxAG8mutEq3ZM"
```

## Código

#### `cv/cv.css`

````css
/* Résumé source: printed to public/cv/*.pdf by `npm run cv` (headless Brave or Chrome; set CHROME to pick the binary). */
@font-face {
  font-family: 'Geist';
  font-weight: 100 900;
  src: url('../public/fonts/Geist-Variable.woff2') format('woff2');
}

@font-face {
  font-family: 'Geist Mono';
  font-weight: 100 900;
  src: url('../public/fonts/GeistMono-Variable.woff2') format('woff2');
}

@page {
  size: A4;
  margin: 11mm 14mm;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  color: #15181d;
  font: 400 9.4pt/1.38 'Geist', system-ui, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

header {
  padding-bottom: 10px;
  border-bottom: 2px solid #15181d;
}

h1 {
  font-size: 22pt;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.02em;
}

.role {
  margin-top: 5px;
  color: #1f8f52;
  font: 500 9.5pt 'Geist Mono', monospace;
}

.contact {
  margin-top: 8px;
  font: 400 8.4pt/1.55 'Geist Mono', monospace;
}

h2 {
  margin: 11px 0 5px;
  color: #1f8f52;
  font: 600 8.6pt 'Geist Mono', monospace;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.summary {
  margin-top: 10px;
}

.item {
  display: grid;
  grid-template-columns: 112px 1fr;
  gap: 2px 12px;
  margin-bottom: 7px;
  break-inside: avoid;
}

.when {
  color: #5b6370;
  font: 400 7.8pt/1.6 'Geist Mono', monospace;
}

h3 {
  font-size: 9.8pt;
  font-weight: 600;
}

h3 span {
  color: #5b6370;
  font-weight: 400;
}

.item > * {
  grid-column: 2;
}

.item > .when {
  grid-column: 1;
  grid-row: 1 / span 3;
}

.link {
  color: #5b6370;
  font: 400 8.2pt 'Geist Mono', monospace;
}

.skills {
  display: grid;
  grid-template-columns: 112px 1fr;
  gap: 3px 12px;
}

.skills dt {
  font-weight: 600;
}
````

#### `cv/cv-pt.html`

````html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>André Narcizo — Currículo</title>
  <link rel="stylesheet" href="cv.css">
</head>
<body>
  <header>
    <div>
      <h1>André Narcizo</h1>
      <p class="role">Desenvolvedor Full-Stack · Angular · Laravel · Flutter</p>
    </div>
    <p class="contact">
      Goiânia, GO · remoto · <a href="mailto:dev.andrenarcizo@outlook.com">dev.andrenarcizo@outlook.com</a> · +55 62 98557-9319 · <a href="https://www.linkedin.com/in/andrenarcizo/">linkedin.com/in/andrenarcizo</a> · <a href="https://github.com/DevAndreNarcizo">github.com/DevAndreNarcizo</a> · <a href="https://dev-andrenarcizo.netlify.app">dev-andrenarcizo.netlify.app</a>
    </p>
  </header>

  <p class="summary">
    Desenvolvedor full-stack que entrega a funcionalidade inteira: banco, API, web e mobile.
    Hoje na Sysout Tecnologia com SaaS multi-tenant em Angular, Laravel e PostgreSQL, apps Flutter e APIs REST.
    No portfólio, quatro projetos próprios abertos por dentro, com a tela, a decisão técnica e o código.
  </p>

  <h2>Experiência</h2>
  <div class="item">
    <p class="when">jan 2026 – atual</p>
    <h3>Desenvolvedor Full Stack <span>· Sysout Tecnologia</span></h3>
    <p>Aplicações SaaS multi-tenant com Angular, Laravel e PostgreSQL, apps Flutter e APIs REST: modelagem relacional, autenticação, autorização por tenant, integrações e revisão técnica.</p>
  </div>
  <div class="item">
    <p class="when">mai – out 2025</p>
    <h3>Suporte técnico e desenvolvedor <span>· Syndata Sistemas</span></h3>
    <p>Funcionalidades e correções em Python, SQL e Java, refatoração de módulos legados, integrações e suporte a sistemas em produção.</p>
  </div>
  <div class="item">
    <p class="when">mar 2023 – abr 2025</p>
    <h3>Gerente e técnico de TI <span>· Gêmeos Papelaria e Informática</span></h3>
    <p>Gestão da operação e da equipe, manutenção de hardware, redes e sistemas, atendimento técnico.</p>
  </div>
  <div class="item">
    <p class="when">mar 2019 – mar 2021</p>
    <h3>Aprendiz de TI <span>· Cristal Alimentos</span></h3>
    <p>Suporte ao departamento de TI, manutenção preventiva, chamados e documentação interna.</p>
  </div>

  <h2>Projetos</h2>
  <div class="item">
    <p class="when">API + web + mobile</p>
    <h3>MyFinance <span>· Node/Express, TypeScript, PostgreSQL, React, Flutter</span></h3>
    <p>Finanças da casa com vários logins por família. Contrato OpenAPI gerado dos schemas Zod e checado no CI; domínio de cálculo puro com casos de teste compartilhados entre web e app; app Flutter que abre sem rede. 182 arquivos de teste.</p>
    <p class="link">my-finance-ebon-one.vercel.app</p>
  </div>
  <div class="item">
    <p class="when">SaaS multi-tenant</p>
    <h3>Agenda Fácil <span>· React 19, Supabase, PostgreSQL (RLS), Edge Functions, Stripe</span></h3>
    <p>Agendamento para salões e clínicas. Isolamento por tenant com RLS testado em SQL, exclusion constraint contra horário duplo, lembretes no WhatsApp por outbox com SKIP LOCKED, PWA instalável.</p>
    <p class="link">agenda-facil.vercel.app · github.com/DevAndreNarcizo/Agenda_Facil</p>
  </div>
  <div class="item">
    <p class="when">API REST</p>
    <h3>Laravel Clean Architecture API <span>· Laravel 11, PHP 8.4, PostgreSQL, Redis, RabbitMQ, JWT</span></h3>
    <p>Domínio isolado do framework (verificado por teste), contrato OpenAPI testado contra as rotas, refresh token de uso único com detecção de reuso, eventos no RabbitMQ. 128 testes, 83% de cobertura, PHPStan nível 8.</p>
    <p class="link">github.com/DevAndreNarcizo/laravel-clean-architecture-api</p>
  </div>
  <div class="item">
    <p class="when">produto do zero</p>
    <h3>Foco Vida <span>· JavaScript (ES modules), Supabase Auth, Playwright</span></h3>
    <p>Tarefas, agenda e estudos sem framework: camadas checadas por script, prioridade calculada, exportação .ics (RFC 5545) e tema gerado de design tokens com auditoria de contraste.</p>
    <p class="link">foco-vida.vercel.app</p>
  </div>

  <h2>Competências</h2>
  <dl class="skills">
    <dt>Front-end</dt><dd>Angular, TypeScript, React, JavaScript, GSAP</dd>
    <dt>Mobile</dt><dd>Flutter, Riverpod, PWA</dd>
    <dt>Back-end</dt><dd>Laravel, PHP, Node.js, Express, Supabase Edge Functions, OpenAPI</dd>
    <dt>Dados</dt><dd>PostgreSQL (RLS, RPC), Redis, RabbitMQ</dd>
    <dt>Qualidade</dt><dd>PHPUnit, PHPStan, Vitest, flutter test, Playwright, GitHub Actions, Docker</dd>
  </dl>

  <h2>Formação</h2>
  <div class="item">
    <p class="when">2025</p>
    <h3>Ciência da Computação <span>· Universidade Paulista (UNIP), Goiânia</span></h3>
    <p>Estudos recentes: Angular 20+ (2026), PHP 8.3+ (2026), JavaScript e TypeScript (2025).</p>
  </div>
</body>
</html>
````

#### `cv/cv-en.html`

````html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>André Narcizo — Résumé</title>
  <link rel="stylesheet" href="cv.css">
</head>
<body>
  <header>
    <div>
      <h1>André Narcizo</h1>
      <p class="role">Full-Stack Developer · Angular · Laravel · Flutter</p>
    </div>
    <p class="contact">
      Goiânia, Brazil · remote · <a href="mailto:dev.andrenarcizo@outlook.com">dev.andrenarcizo@outlook.com</a> · +55 62 98557-9319 · <a href="https://www.linkedin.com/in/andrenarcizo/">linkedin.com/in/andrenarcizo</a> · <a href="https://github.com/DevAndreNarcizo">github.com/DevAndreNarcizo</a> · <a href="https://dev-andrenarcizo.netlify.app">dev-andrenarcizo.netlify.app</a>
    </p>
  </header>

  <p class="summary">
    Full-stack developer who ships the whole feature: database, API, web and mobile.
    Currently at Sysout Tecnologia building multi-tenant SaaS with Angular, Laravel and PostgreSQL, Flutter apps and REST APIs.
    My portfolio opens up four of my own projects: the screen, the technical decision and the code.
  </p>

  <h2>Experience</h2>
  <div class="item">
    <p class="when">Jan 2026 – present</p>
    <h3>Full-Stack Developer <span>· Sysout Tecnologia</span></h3>
    <p>Multi-tenant SaaS applications with Angular, Laravel and PostgreSQL, Flutter apps and REST APIs: relational modeling, authentication, per-tenant authorization, integrations and code review.</p>
  </div>
  <div class="item">
    <p class="when">May – Oct 2025</p>
    <h3>Technical Support &amp; Developer <span>· Syndata Sistemas</span></h3>
    <p>Features and fixes in Python, SQL and Java, refactoring of legacy modules, integrations and support for production systems.</p>
  </div>
  <div class="item">
    <p class="when">Mar 2023 – Apr 2025</p>
    <h3>IT Manager &amp; Technician <span>· Gêmeos Papelaria e Informática</span></h3>
    <p>Ran operations and the team; maintained hardware, networks and systems; provided technical support.</p>
  </div>
  <div class="item">
    <p class="when">Mar 2019 – Mar 2021</p>
    <h3>IT Apprentice <span>· Cristal Alimentos</span></h3>
    <p>Supported the IT department: preventive maintenance, service tickets and internal documentation.</p>
  </div>

  <h2>Projects</h2>
  <div class="item">
    <p class="when">API + web + mobile</p>
    <h3>MyFinance <span>· Node/Express, TypeScript, PostgreSQL, React, Flutter</span></h3>
    <p>Household finances with several logins per family. OpenAPI contract generated from Zod schemas and checked in CI; pure calculation domain with test cases shared by web and app; a Flutter app that opens offline. 182 test files.</p>
    <p class="link">my-finance-ebon-one.vercel.app</p>
  </div>
  <div class="item">
    <p class="when">multi-tenant SaaS</p>
    <h3>Agenda Fácil <span>· React 19, Supabase, PostgreSQL (RLS), Edge Functions, Stripe</span></h3>
    <p>Booking for salons and clinics. Tenant isolation with RLS tested in SQL, an exclusion constraint against double booking, WhatsApp reminders through an outbox with SKIP LOCKED, installable PWA.</p>
    <p class="link">agenda-facil.vercel.app · github.com/DevAndreNarcizo/Agenda_Facil</p>
  </div>
  <div class="item">
    <p class="when">REST API</p>
    <h3>Laravel Clean Architecture API <span>· Laravel 11, PHP 8.4, PostgreSQL, Redis, RabbitMQ, JWT</span></h3>
    <p>Domain isolated from the framework (enforced by a test), OpenAPI contract tested against the routes, single-use refresh tokens with reuse detection, RabbitMQ events. 128 tests, 83% coverage, PHPStan level 8.</p>
    <p class="link">github.com/DevAndreNarcizo/laravel-clean-architecture-api</p>
  </div>
  <div class="item">
    <p class="when">from scratch</p>
    <h3>Foco Vida <span>· JavaScript (ES modules), Supabase Auth, Playwright</span></h3>
    <p>Tasks, schedule and studies with no framework: layers checked by a script, computed priority, .ics export (RFC 5545) and a theme generated from design tokens with a contrast audit.</p>
    <p class="link">foco-vida.vercel.app</p>
  </div>

  <h2>Skills</h2>
  <dl class="skills">
    <dt>Front-end</dt><dd>Angular, TypeScript, React, JavaScript, GSAP</dd>
    <dt>Mobile</dt><dd>Flutter, Riverpod, PWA</dd>
    <dt>Back-end</dt><dd>Laravel, PHP, Node.js, Express, Supabase Edge Functions, OpenAPI</dd>
    <dt>Data</dt><dd>PostgreSQL (RLS, RPC), Redis, RabbitMQ</dd>
    <dt>Quality</dt><dd>PHPUnit, PHPStan, Vitest, flutter test, Playwright, GitHub Actions, Docker</dd>
  </dl>

  <h2>Education</h2>
  <div class="item">
    <p class="when">2025</p>
    <h3>Computer Science <span>· Universidade Paulista (UNIP), Goiânia</span></h3>
    <p>Recent studies: Angular 20+ (2026), PHP 8.3+ (2026), JavaScript and TypeScript (2025).</p>
  </div>
</body>
</html>
````

#### `README.md`

````markdown
# André Narcizo — Portfolio

[English](README.md) | [Português](README.pt-BR.md)

[![Angular](https://img.shields.io/badge/Angular-22-DD0031?style=flat-square&logo=angular&logoColor=white)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![GSAP](https://img.shields.io/badge/GSAP-3-0AE448?style=flat-square&logo=greensock&logoColor=black)](https://gsap.com)
[![Netlify](https://img.shields.io/badge/deployed-Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)](https://dev-andrenarcizo.netlify.app)

Single-page portfolio of André Narcizo, Full-Stack Developer (Angular, Laravel, Flutter).
Instead of describing projects, the page opens four of them up: as you scroll, a camera zooms into the real
screens (fictitious demo data) and, next to each part, shows the code behind it with its file and line.

## What is on the page

- **Four cases**: MyFinance (API + web + Flutter), Agenda Fácil (multi-tenant SaaS on Supabase/Postgres),
  Foco Vida (plain JavaScript, no framework) and a Laravel Clean Architecture API.
  Each one has screens, numbers with a source, links and one card with real code per step.
- **Inside this site**: excerpts of this repository; `tests/excerpts.test.mjs` fails if one stops matching its file.
- Other projects, career, stack (every technology links to the case that uses it), contact and a PDF résumé.

## How it is built

- Angular 22: standalone components, zoneless change detection, signals, OnPush
- Static prerendering: the whole page, every card and every code excerpt ship as HTML, readable without JavaScript
- Desktop (wide landscape, motion allowed): each case is pinned and scrubbed with GSAP ScrollTrigger; the camera
  framing is a pure, tested function (`src/app/cases/camera.ts`). Phones, portrait screens and reduced motion get
  the static layout with every card listed
- GSAP and Lenis load after the window `load` event, outside the critical path
- `prefers-reduced-motion` respected: no pinning, no scramble, no tilt
- Portuguese and English for every text, switched at runtime without reloading

## Project layout

| Path | What |
|---|---|
| `src/app/data/` | Case data (screens, steps, cards, code excerpts) and the "inside" cards, typed and framework-free |
| `src/app/cases/` | `CaseStudy` component, camera math and the pinned GSAP scene |
| `src/app/sections/` | Hero, apps, inside, other projects, career, stack, contact |
| `src/app/content.ts` | Interface copy in PT/EN, contact data, other projects, stack |
| `public/apps/` | 2x screenshots of the apps, all from local demo databases |
| `cv/` | Résumé sources; `npm run cv` prints them to `public/cv/*.pdf` |

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
npm run test:excerpts
```

## Links

- [Live portfolio](https://dev-andrenarcizo.netlify.app)
- [LinkedIn](https://linkedin.com/in/andrenarcizo)
- [GitHub](https://github.com/DevAndreNarcizo)
- [Email](mailto:dev.andrenarcizo@outlook.com)

Fonts: [Geist and Geist Mono](https://vercel.com/font) (SIL Open Font License, `public/fonts/GEIST-LICENSE.txt`).
````

#### `README.pt-BR.md`

````markdown
# André Narcizo — Portfólio

[English](README.md) | [Português](README.pt-BR.md)

[![Angular](https://img.shields.io/badge/Angular-22-DD0031?style=flat-square&logo=angular&logoColor=white)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![GSAP](https://img.shields.io/badge/GSAP-3-0AE448?style=flat-square&logo=greensock&logoColor=black)](https://gsap.com)
[![Netlify](https://img.shields.io/badge/deployed-Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)](https://dev-andrenarcizo.netlify.app)

Portfólio de página única de André Narcizo, Desenvolvedor Full-Stack (Angular, Laravel, Flutter).
Em vez de descrever projetos, a página abre quatro deles por dentro: conforme você rola, uma câmera aproxima as
telas reais (com dados fictícios de demonstração) e, ao lado de cada parte, mostra o código que a sustenta, com arquivo e linha.

## O que tem na página

- **Quatro cases**: MyFinance (API + web + Flutter), Agenda Fácil (SaaS multi-tenant no Supabase/Postgres),
  Foco Vida (JavaScript puro, sem framework) e uma API Laravel em Clean Architecture.
  Cada um tem telas, números com fonte, links e um card com código real por passo.
- **Por dentro deste site**: trechos deste repositório; `tests/excerpts.test.mjs` falha se algum deixar de bater com o arquivo.
- Outros projetos, trajetória, stack (cada tecnologia aponta para o case que a usa), contato e currículo em PDF.

## Como é feito

- Angular 22: componentes standalone, detecção de mudanças zoneless, signals, OnPush
- Pré-renderização estática: a página inteira, todos os cards e todos os trechos de código chegam como HTML, legíveis sem JavaScript
- Desktop (tela larga em paisagem, com movimento): cada case fica fixado e anda com o scroll via GSAP ScrollTrigger;
  o enquadramento da câmera é uma função pura e testada (`src/app/cases/camera.ts`). Celular, tela em retrato e
  movimento reduzido recebem o layout estático com todos os cards em lista
- GSAP e Lenis carregam depois do evento `load`, fora do caminho crítico
- `prefers-reduced-motion` respeitado: sem pin, sem scramble, sem inclinação
- Português e inglês em todos os textos, trocados em tempo real sem recarregar

## Estrutura

| Caminho | O quê |
|---|---|
| `src/app/data/` | Dados dos cases (telas, passos, cards, trechos de código) e os cards "por dentro", tipados e sem framework |
| `src/app/cases/` | Componente `CaseStudy`, a matemática da câmera e a cena fixada do GSAP |
| `src/app/sections/` | Hero, apps, por dentro, outros projetos, trajetória, stack, contato |
| `src/app/content.ts` | Textos da interface em PT/EN, contato, outros projetos, stack |
| `public/apps/` | Capturas 2x dos apps, todas de bancos de demonstração locais |
| `cv/` | Fontes do currículo; `npm run cv` imprime em `public/cv/*.pdf` |

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
npm run test:excerpts
```

## Links

- [Portfólio online](https://dev-andrenarcizo.netlify.app)
- [LinkedIn](https://linkedin.com/in/andrenarcizo)
- [GitHub](https://github.com/DevAndreNarcizo)
- [E-mail](mailto:dev.andrenarcizo@outlook.com)

Fontes: [Geist e Geist Mono](https://vercel.com/font) (SIL Open Font License, `public/fonts/GEIST-LICENSE.txt`).
````
