# Task 2 — Troca do site: tema escuro, hero, cases, seções e shell

Depende da Task 1. Troca o visual "Prancheta" pelo portfólio escuro da spec, numa única mudança
(as seções antigas e as novas não convivem: `content.ts` muda de forma).

## Arquivos

| Arquivo | O quê |
|---|---|
| `src/styles.css`, `src/index.html`, `public/favicon.svg` | Tokens do tema, fontes Geist, metas, favicon |
| `src/app/content.ts` + spec | Textos PT/EN, contato, outros projetos, stack |
| `src/app/cases/case-study.ts` + `.css`, `case-scene.ts` | Case estático (HTML) e a cena fixada no desktop |
| `src/app/sections/*.ts` | Hero, apps, por dentro, outros projetos, trajetória, stack, contato |
| `src/app/app.ts` + spec | Cabeçalho que some ao rolar, ordem das seções, rodapé |
| `tests/prerender.test.mjs` | HTML pré-renderizado: h1, seções, 30 cards, imagens, metas |
| `angular.json` | Orçamento de CSS por componente |
| Removidos | Seções antigas, `ui/words.ts`, `public/Imagens/`, fontes antigas |

`src/app/sections/contact.spec.ts`, `lang.ts`, `lang.spec.ts` e `motion.ts` ficam como estão.

## Passo 1 — Remover o site antigo

```bash
git rm -q src/app/sections/about.ts src/app/sections/projects.ts src/app/sections/projects.spec.ts src/app/sections/request-story.ts src/app/sections/stack-blueprint.ts src/app/sections/timeline.ts src/app/ui/words.ts
git rm -q -r public/Imagens
git rm -q public/fonts/instrument-serif.woff2 public/fonts/instrument-serif-italic.woff2 public/fonts/inter-tight.woff2 public/fonts/jetbrains-mono.woff2
```

## Passo 2 — Criar/substituir os arquivos

```bash
python3 - docs/superpowers/plans/2026-10-31-dark-portfolio/task-2-site.md <<'EOF'
import pathlib, re, sys
text = pathlib.Path(sys.argv[1]).read_text()
for path, body in re.findall(r'^#### `([^`]+)`\n\n````[a-z]*\n(.*?)\n````$', text, re.S | re.M):
    p = pathlib.Path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(body + '\n')
    print('wrote', path)
EOF
```

Saída esperada: 18 linhas `wrote ...`.

## Passo 3 — Orçamento de CSS no `angular.json`

O CSS do case (estático + fixado) passa de 6 kB. Troque:

```json
                  "type": "anyComponentStyle",
                  "maximumWarning": "6kB",
                  "maximumError": "10kB"
```

por:

```json
                  "type": "anyComponentStyle",
                  "maximumWarning": "10kB",
                  "maximumError": "16kB"
```

## Passo 4 — Verificar

```bash
npm test
```

Esperado: `Test Files  7 passed (7)` e `Tests  33 passed (33)`.

```bash
npm run build
```

Esperado: `Prerendered 1 static route.` e `Application bundle generation complete.`, sem `WARNING` de orçamento.

```bash
npm run test:prerender && npm run test:excerpts
```

Esperado: `ℹ pass 6` / `ℹ fail 0` no primeiro e `ℹ pass 3` / `ℹ fail 0` no segundo.

```bash
grep -rn "Imagens\|instrument-serif\|inter-tight\|jetbrains-mono\|ui/words" src || echo limpo
```

Esperado: `limpo`.

## Passo 5 — Commit

```bash
git add -A src tests public/favicon.svg angular.json
git commit -m "feat: replace the blueprint site with the dark case-study portfolio

Hero with the real app screens, four case studies (static HTML first, pinned
and scrubbed on wide screens), the inside-this-site section, other projects,
career, stack linked to the cases, and contact. The old sections, images and
fonts go away.

Claude-Session: https://claude.ai/code/session_01R9bEA8gZWqxAG8mutEq3ZM"
```

## Código

#### `src/styles.css`

````css
/* Geist and Geist Mono (SIL OFL, public/fonts/GEIST-LICENSE.txt), latin subsets preloaded in index.html.
   optional = no swap after first paint, so no layout shift; a slow first visit falls back to the system font once. */
@font-face {
  font-family: 'Geist';
  font-style: normal;
  font-weight: 100 900;
  font-display: optional;
  src: url('/fonts/Geist-Variable.woff2') format('woff2');
}

@font-face {
  font-family: 'Geist Mono';
  font-style: normal;
  font-weight: 100 900;
  font-display: optional;
  src: url('/fonts/GeistMono-Variable.woff2') format('woff2');
}

:root {
  color-scheme: dark;
  --bg: #0a0c0f;
  --panel: #0d1116;
  --line: #1c2128;
  --tx: #e6e8eb;
  --mut: #8b939e;
  --acc: #3ddc84;
  --acc-ink: #04130a;

  --sans: 'Geist', system-ui, sans-serif;
  --mono: 'Geist Mono', ui-monospace, monospace;

  --header: 60px;
  --gutter: 16px;
  --maxw: 1200px;
  --section-y: clamp(80px, 12vw, 160px);
  --h2: clamp(30px, 4vw, 56px);
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
  background: var(--bg);
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
  background: var(--bg);
  color: var(--tx);
  font: 400 16px/1.55 var(--sans);
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
h4,
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
  outline: 2px solid var(--acc);
  outline-offset: 3px;
}

::selection {
  background: #3ddc8440;
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

.kick {
  font: 500 13px/1.4 var(--mono);
  color: var(--acc);
  letter-spacing: 0.02em;
}

.h2 {
  font-size: var(--h2);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin-top: 12px;
  max-width: 22ch;
}

.lead {
  max-width: 60ch;
  color: var(--mut);
  margin-top: 14px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 46px;
  padding: 0 18px;
  border: 1px solid var(--line);
  border-radius: 10px;
  font: 500 14px/1 var(--mono);
  text-decoration: none;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;
}

.btn:hover {
  border-color: var(--mut);
}

.btn-primary {
  background: var(--acc);
  border-color: var(--acc);
  color: var(--acc-ink);
}

.btn-primary:hover {
  background: #6be7a3;
  border-color: #6be7a3;
}

.ext::after {
  content: ' ↗';
}

.skip-link {
  position: absolute;
  left: var(--gutter);
  top: -100px;
  z-index: 100;
  padding: 12px 16px;
  background: var(--acc);
  color: var(--acc-ink);
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

/* Code rows of the card on screen slide in one by one (pinned cases only; app-code-block renders the rows) */
.is-pinned .eng.on .row {
  animation: row-in 0.32s calc(0.22s + var(--i) * 28ms) both ease-out;
}

@keyframes row-in {
  from {
    opacity: 0;
    transform: translateX(-8px);
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
  }
}

/* Content still waiting for its scroll reveal must print */
@media print {
  main * {
    opacity: 1 !important;
    visibility: visible !important;
  }
}
````

#### `src/index.html`

````html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>André Narcizo — Desenvolvedor Full-Stack | Angular, Laravel, Flutter</title>
  <meta name="description" content="Desenvolvedor full-stack (Angular, Laravel, Flutter, PostgreSQL). Quatro projetos reais abertos por dentro: a tela, a decisão técnica e o código, com arquivo e linha.">
  <meta name="author" content="André Narcizo">
  <meta name="theme-color" content="#0a0c0f">

  <meta property="og:title" content="André Narcizo — Desenvolvedor Full-Stack">
  <meta property="og:description" content="Banco, API, web e mobile. Quatro projetos reais abertos por dentro, com o código que os sustenta.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://dev-andrenarcizo.netlify.app">
  <meta property="og:image" content="https://dev-andrenarcizo.netlify.app/og-image.png">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:locale:alternate" content="en_US">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="André Narcizo — Desenvolvedor Full-Stack">
  <meta name="twitter:description" content="Banco, API, web e mobile. Quatro projetos reais abertos por dentro, com o código que os sustenta.">
  <meta name="twitter:image" content="https://dev-andrenarcizo.netlify.app/og-image.png">

  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="canonical" href="https://dev-andrenarcizo.netlify.app">

  <link rel="preload" href="/fonts/Geist-Variable.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/GeistMono-Variable.woff2" as="font" type="font/woff2" crossorigin>
</head>
<body>
  <app-root></app-root>
</body>
</html>
````

#### `public/favicon.svg`

````svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#0a0c0f"/><path d="M7 23 13.5 9h1L21 23h-2.6l-1.5-3.4h-6.8L8.6 23H7Zm4-5.6h5L13.5 11.6 11 17.4Z" fill="#e6e8eb"/><rect x="21.5" y="20.5" width="5" height="2.5" fill="#3ddc84"/></svg>
````

#### `src/app/content.ts`

````ts
import type { Localized, MoreProject } from './data/types';

export type Lang = 'pt' | 'en';

/** Sections a stack item can point to: the case (or the site itself) where the technology is used. */
export type ProofId = 'case-myfinance' | 'case-agenda-facil' | 'case-foco-vida' | 'case-laravel' | 'por-dentro';

const pt = {
  nav: {
    label: 'Seções',
    skip: 'Pular para o conteúdo',
    apps: 'Apps',
    career: 'Trajetória',
    stack: 'Stack',
    contact: 'Contato',
    langSwitch: 'Mudar idioma para English',
    langShort: 'EN',
  },
  cv: { label: 'Baixar currículo (PDF)', href: '/cv/andre-narcizo-cv-pt.pdf' },
  hero: {
    kicker: '// full-stack · angular · laravel · flutter',
    title: 'Eu construo o produto inteiro.',
    sub: 'Banco, API, web e mobile. Full-stack na Sysout Tecnologia, em Goiânia, aberto a vagas remotas.',
    apps: 'Ver os apps',
    contact: 'Contato',
    fan: 'Telas do MyFinance, do Agenda Fácil e do Foco Vida, e o app Flutter do MyFinance no celular.',
    proofLabel: 'Em números',
    proof: [
      { value: '4', label: 'projetos abertos aqui', source: 'MyFinance, Agenda Fácil, Foco Vida e API Laravel' },
      { value: '221', label: 'arquivos de teste', source: 'MyFinance 182 · Agenda Fácil 21 · Foco Vida 8 · API Laravel 10' },
      { value: '3', label: 'plataformas', source: 'web, mobile (Flutter e PWA) e API REST' },
      { value: '2019', label: 'primeiro emprego em TI', source: 'Cristal Alimentos · desenvolvedor desde 2025' },
    ],
  },
  apps: {
    kicker: '// 4 projetos · dados de teste · código real',
    title: 'Role para ver por dentro.',
    lead: 'Cada passo aproxima uma parte da tela e mostra, ao lado, como ela foi feita: o trecho de código, o arquivo e a linha. As telas usam dados fictícios.',
    step: 'passo',
    scroll: 'role ↓',
  },
  inside: {
    kicker: '// por dentro deste site',
    title: 'Este site também é código para ler.',
    lead: 'Angular 22 sem zone.js, signals, HTML pré-renderizado e GSAP carregado só depois da página. Três trechos que fazem esta página funcionar:',
    repo: 'Código deste site no GitHub',
  },
  more: {
    kicker: '// outros projetos',
    title: 'Mais coisas que construí.',
  },
  career: {
    kicker: '// trajetória',
    title: 'Do suporte de TI ao produto inteiro.',
    jobs: [
      {
        role: 'Desenvolvedor Full Stack',
        company: 'Sysout Tecnologia',
        period: 'jan 2026 – atual',
        text: 'Aplicações SaaS multi-tenant com Angular, Laravel e PostgreSQL, apps Flutter e APIs REST: modelagem relacional, autenticação, autorização por tenant, integrações e revisão técnica.',
        note: 'Projetos de clientes: código e telas pertencem à Sysout e aos clientes, por isso aparecem aqui só em texto.',
      },
      {
        role: 'Suporte técnico e desenvolvedor',
        company: 'Syndata Sistemas',
        period: 'mai 2025 – out 2025',
        text: 'Funcionalidades e correções em Python, SQL e Java, refatoração de módulos legados, integrações e suporte a sistemas em produção.',
      },
      {
        role: 'Gerente e técnico de TI',
        company: 'Gêmeos Papelaria e Informática',
        period: 'mar 2023 – abr 2025',
        text: 'Gestão da operação e da equipe, manutenção de hardware, redes e sistemas, atendimento técnico.',
      },
      {
        role: 'Aprendiz de TI',
        company: 'Cristal Alimentos',
        period: 'mar 2019 – mar 2021',
        text: 'Suporte ao departamento de TI, manutenção preventiva, chamados e documentação interna.',
      },
    ],
    educationTitle: 'Formação',
    education: 'Ciência da Computação · Universidade Paulista (UNIP), Goiânia · concluído em 2025',
    studiesTitle: 'Estudos recentes',
    studies: ['Angular 20+ (2026)', 'PHP 8.3+ (2026)', 'JavaScript e TypeScript (2025)'],
  },
  stack: {
    kicker: '// stack',
    title: 'Cada tecnologia aponta para onde ela aparece.',
    lead: 'Clique numa tecnologia para ir ao projeto que a usa.',
    at: {
      'case-myfinance': 'MyFinance',
      'case-agenda-facil': 'Agenda Fácil',
      'case-foco-vida': 'Foco Vida',
      'case-laravel': 'API Laravel',
      'por-dentro': 'este site',
    } satisfies Record<ProofId, string>,
  },
  contact: {
    kicker: '// sobre e contato',
    photoAlt: 'Foto de André Narcizo',
    about:
      'Sou André Narcizo, desenvolvedor full-stack em Goiânia. Comecei no suporte de TI em 2019, me formei em Ciência da Computação pela UNIP em 2025 e hoje construo sistemas SaaS, apps Flutter e APIs na Sysout Tecnologia. Gosto de entregar a funcionalidade inteira, do banco à tela, com testes que provam que ela funciona.',
    title: 'Vamos conversar.',
    lead: 'Estou aberto a vagas full-stack remotas e a conversas sobre web, mobile e APIs.',
    email: 'E-mail',
    copy: 'Copiar',
    copied: 'Copiado!',
    hint: 'Goiânia, GO · disponível para trabalho remoto',
  },
  footer: {
    role: 'Desenvolvedor full-stack · Goiânia, Brasil',
    code: 'Código deste site',
  },
};

export type Copy = typeof pt;

const en: Copy = {
  nav: {
    label: 'Sections',
    skip: 'Skip to content',
    apps: 'Apps',
    career: 'Career',
    stack: 'Stack',
    contact: 'Contact',
    langSwitch: 'Switch language to Português',
    langShort: 'PT',
  },
  cv: { label: 'Download résumé (PDF)', href: '/cv/andre-narcizo-cv-en.pdf' },
  hero: {
    kicker: '// full-stack · angular · laravel · flutter',
    title: 'I build the whole product.',
    sub: 'Database, API, web and mobile. Full-stack at Sysout Tecnologia in Goiânia, Brazil, open to remote roles.',
    apps: 'See the apps',
    contact: 'Contact',
    fan: 'Screens of MyFinance, Agenda Fácil and Foco Vida, and the MyFinance Flutter app on a phone.',
    proofLabel: 'In numbers',
    proof: [
      { value: '4', label: 'projects opened up here', source: 'MyFinance, Agenda Fácil, Foco Vida and Laravel API' },
      { value: '221', label: 'test files', source: 'MyFinance 182 · Agenda Fácil 21 · Foco Vida 8 · Laravel API 10' },
      { value: '3', label: 'platforms', source: 'web, mobile (Flutter and PWA) and REST API' },
      { value: '2019', label: 'first job in IT', source: 'Cristal Alimentos · developer since 2025' },
    ],
  },
  apps: {
    kicker: '// 4 projects · test data · real code',
    title: 'Scroll to look inside.',
    lead: 'Each step zooms into part of the screen and shows, next to it, how it was built: the code, the file and the line. The screens use fictitious data.',
    step: 'step',
    scroll: 'scroll ↓',
  },
  inside: {
    kicker: '// inside this site',
    title: 'This site is code to read, too.',
    lead: 'Angular 22 without zone.js, signals, prerendered HTML and GSAP loaded only after the page. Three excerpts that make this page work:',
    repo: 'Source of this site on GitHub',
  },
  more: {
    kicker: '// other projects',
    title: 'More things I have built.',
  },
  career: {
    kicker: '// career',
    title: 'From IT support to the whole product.',
    jobs: [
      {
        role: 'Full-Stack Developer',
        company: 'Sysout Tecnologia',
        period: 'Jan 2026 – present',
        text: 'Multi-tenant SaaS applications with Angular, Laravel and PostgreSQL, Flutter apps and REST APIs: relational modeling, authentication, per-tenant authorization, integrations and code review.',
        note: 'Client projects: the code and screens belong to Sysout and its clients, so they appear here as text only.',
      },
      {
        role: 'Technical Support & Developer',
        company: 'Syndata Sistemas',
        period: 'May 2025 – Oct 2025',
        text: 'Features and fixes in Python, SQL and Java, refactoring of legacy modules, integrations and support for production systems.',
      },
      {
        role: 'IT Manager & Technician',
        company: 'Gêmeos Papelaria e Informática',
        period: 'Mar 2023 – Apr 2025',
        text: 'Ran operations and the team; maintained hardware, networks and systems; provided technical support.',
      },
      {
        role: 'IT Apprentice',
        company: 'Cristal Alimentos',
        period: 'Mar 2019 – Mar 2021',
        text: 'Supported the IT department: preventive maintenance, service tickets and internal documentation.',
      },
    ],
    educationTitle: 'Education',
    education: 'Computer Science · Universidade Paulista (UNIP), Goiânia · completed in 2025',
    studiesTitle: 'Recent studies',
    studies: ['Angular 20+ (2026)', 'PHP 8.3+ (2026)', 'JavaScript and TypeScript (2025)'],
  },
  stack: {
    kicker: '// stack',
    title: 'Every technology points to where it is used.',
    lead: 'Click a technology to jump to the project that uses it.',
    at: {
      'case-myfinance': 'MyFinance',
      'case-agenda-facil': 'Agenda Fácil',
      'case-foco-vida': 'Foco Vida',
      'case-laravel': 'Laravel API',
      'por-dentro': 'this site',
    },
  },
  contact: {
    kicker: '// about and contact',
    photoAlt: 'Photo of André Narcizo',
    about:
      'I am André Narcizo, a full-stack developer in Goiânia, Brazil. I started in IT support in 2019, earned my Computer Science degree from UNIP in 2025, and today I build SaaS systems, Flutter apps and APIs at Sysout Tecnologia. I like shipping the whole feature, from the database to the screen, with tests that prove it works.',
    title: "Let's talk.",
    lead: 'I am open to remote full-stack roles and to conversations about web, mobile and APIs.',
    email: 'Email',
    copy: 'Copy',
    copied: 'Copied!',
    hint: 'Goiânia, Brazil · available for remote work',
  },
  footer: {
    role: 'Full-stack developer · Goiânia, Brazil',
    code: 'Source of this site',
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

export const siteRepo = 'https://github.com/DevAndreNarcizo/portifolio-andre-react';

const gh = (repo: string, label: Localized = { pt: 'GitHub', en: 'GitHub' }) => ({
  label,
  href: `https://github.com/DevAndreNarcizo/${repo}`,
});

export const moreProjects: MoreProject[] = [
  {
    name: { pt: 'HunterAI Platform', en: 'HunterAI Platform' },
    summary: {
      pt: 'Estudo de arquitetura SaaS B2B para captar e qualificar leads, com processamento assíncrono.',
      en: 'B2B SaaS architecture study for finding and qualifying leads, with asynchronous processing.',
    },
    stack: 'Next.js · Node.js · FastAPI · PostgreSQL · Redis',
    links: [gh('hunter-ai-platform')],
  },
  {
    name: { pt: 'node-microservices-event-driven', en: 'node-microservices-event-driven' },
    summary: {
      pt: 'Microsserviços de pedidos e de notificações conversando por eventos no RabbitMQ.',
      en: 'Order and notification microservices talking through RabbitMQ events.',
    },
    stack: 'NestJS · MongoDB · RabbitMQ · Docker Compose · Jest · Prometheus',
    links: [gh('node-microservices-event-driven')],
  },
  {
    name: { pt: 'saas-task-manager', en: 'saas-task-manager' },
    summary: {
      pt: 'SaaS de tarefas com assinaturas no Stripe, RBAC e atualizações em tempo real.',
      en: 'Task SaaS with Stripe subscriptions, RBAC and real-time updates.',
    },
    stack: 'Next.js 14 · NestJS · PostgreSQL · Redis · Stripe · Docker',
    links: [gh('saas-task-manager')],
  },
  {
    name: { pt: 'php-code-analyzer', en: 'php-code-analyzer' },
    summary: {
      pt: 'CLI open source que analisa projetos PHP/Laravel e gera relatórios de qualidade.',
      en: 'Open-source CLI that analyzes PHP/Laravel projects and writes quality reports.',
    },
    stack: 'PHP · PHPUnit · GitHub Actions · Packagist',
    links: [gh('php-code-analyzer')],
  },
  {
    name: { pt: 'Luz da Aurora (loja online)', en: 'Luz da Aurora (online store)' },
    summary: {
      pt: 'E-commerce de uma loja real: catálogo, carrinho, checkout e painel administrativo.',
      en: 'Ecommerce for a real store: catalog, cart, checkout and admin panel.',
    },
    stack: 'React · Express · Supabase · PostgreSQL',
    links: [{ label: { pt: 'Ver online', en: 'Live site' }, href: 'https://luzdaaurora.shop/' }],
  },
  {
    name: { pt: 'Sites para clientes', en: 'Client websites' },
    summary: {
      pt: 'Site institucional e landing pages para uma clínica de estética, uma nail designer e uma lash designer.',
      en: 'A business site and landing pages for an aesthetics clinic, a nail designer and a lash designer.',
    },
    stack: 'Next.js · React · Tailwind CSS · Vite',
    links: [
      gh('Clinica-Thaysa-Medeiros', { pt: 'Clínica Thaysa Medeiros', en: 'Clínica Thaysa Medeiros' }),
      gh('ThaisSousa-NailDesigner', { pt: 'Thais Sousa', en: 'Thais Sousa' }),
      gh('KarenBianca-LashDesigner', { pt: 'Karen Bianca', en: 'Karen Bianca' }),
    ],
  },
];

export interface StackGroup {
  name: Localized;
  items: { name: string; at: ProofId }[];
}

export const stackGroups: StackGroup[] = [
  {
    name: { pt: 'Front-end', en: 'Front-end' },
    items: [
      { name: 'Angular', at: 'por-dentro' },
      { name: 'TypeScript', at: 'case-myfinance' },
      { name: 'React', at: 'case-agenda-facil' },
      { name: 'JavaScript (ES modules)', at: 'case-foco-vida' },
      { name: 'GSAP', at: 'por-dentro' },
    ],
  },
  {
    name: { pt: 'Mobile', en: 'Mobile' },
    items: [
      { name: 'Flutter', at: 'case-myfinance' },
      { name: 'Riverpod', at: 'case-myfinance' },
      { name: 'PWA', at: 'case-agenda-facil' },
    ],
  },
  {
    name: { pt: 'Back-end', en: 'Back-end' },
    items: [
      { name: 'Laravel', at: 'case-laravel' },
      { name: 'PHP 8.4', at: 'case-laravel' },
      { name: 'Node.js · Express', at: 'case-myfinance' },
      { name: 'Supabase Edge Functions', at: 'case-agenda-facil' },
      { name: 'OpenAPI', at: 'case-laravel' },
    ],
  },
  {
    name: { pt: 'Dados e mensageria', en: 'Data & messaging' },
    items: [
      { name: 'PostgreSQL', at: 'case-agenda-facil' },
      { name: 'Row Level Security', at: 'case-agenda-facil' },
      { name: 'Redis', at: 'case-laravel' },
      { name: 'RabbitMQ', at: 'case-laravel' },
    ],
  },
  {
    name: { pt: 'Qualidade e entrega', en: 'Quality & delivery' },
    items: [
      { name: 'PHPUnit · PHPStan', at: 'case-laravel' },
      { name: 'Vitest', at: 'case-myfinance' },
      { name: 'flutter test', at: 'case-myfinance' },
      { name: 'Playwright', at: 'case-foco-vida' },
      { name: 'GitHub Actions', at: 'case-myfinance' },
      { name: 'Docker', at: 'case-laravel' },
    ],
  },
];
````

#### `src/app/content.spec.ts`

````ts
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
````

#### `src/app/cases/case-scene.ts`

````ts
import type { CaseStep, Case, Rect } from '../data/types';
import type { Motion } from '../motion';
import { cam, overview, spotBox } from './camera';

interface Step extends CaseStep {
  /** Region framed by this step, and the camera padding (1 for overviews). */
  R: Rect;
  P?: number;
  liftEls?: HTMLElement[];
}

/** A phone screen this much taller than the phone (relative) scrolls slowly; a shorter one just settles. */
const LONG_SCREEN = (19.1 / 9) * 1.3;

/**
 * Desktop: pins the case and plays its steps with the scroll (port of the approved prototype v3).
 * Runs inside the gsap.matchMedia context of sceneMotion, which reverts every tween and ScrollTrigger;
 * the returned function undoes the rest (classes, created elements, inline widths).
 */
export function pinScene(m: Motion, root: HTMLElement, data: Case, onStep: (n: number) => void): () => void {
  const { gsap, ScrollTrigger } = m;
  const q = (selector: string) => root.querySelector<HTMLElement>(selector)!;
  root.classList.add('is-pinned');

  const sec = q('section');
  const vp = q('.vp');
  const win = q('.win');
  const cursor = q('.cursor');
  const ripple = q('.rip');
  const phone = root.querySelector<HTMLElement>('.phone');
  const segs = Array.from(root.querySelectorAll<HTMLElement>('.rail b'));
  const shots = new Map(data.shots.map((s) => [s.key, s]));
  const layer = (k: string) => q(`.layer[data-k="${k}"]`);
  const spot = (k: string) => layer(k).querySelector<HTMLElement>('.spot')!;
  const ov = (k: string) => overview(shots.get(k)!);
  const camAt = (k: string, r: Rect, pad?: number) => cam({ w: vp.clientWidth, h: vp.clientHeight }, shots.get(k)!, r, pad);
  // functions, so invalidateOnRefresh recomputes the camera when the window is resized
  const camTo = (k: string, r: Rect, pad?: number) => ({
    x: () => camAt(k, r, pad).x,
    y: () => camAt(k, r, pad).y,
    scale: () => camAt(k, r, pad).scale,
  });

  const steps: Step[] = data.steps.map((st) => ({ ...st, R: st.ov ? ov(st.k) : st.r!, P: st.ov ? 1 : undefined }));

  for (const s of data.shots) {
    gsap.set(layer(s.key), { width: s.w, height: s.h, opacity: s.key === steps[0].k ? 1 : 0 });
    gsap.set(spot(s.key), { left: 0, top: 0, width: s.w, height: s.h, opacity: 0 });
  }

  // Cards copied out of the screenshot (same image, offset background) so they can rise above it
  const lifts: HTMLElement[] = [];
  for (const st of steps) {
    if (!st.lift) continue;
    const s = shots.get(st.k)!;
    st.liftEls = st.lift.map(([x, y, w, h]) => {
      const d = document.createElement('div');
      Object.assign(d.style, {
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        width: `${w}px`,
        height: `${h}px`,
        borderRadius: '24px',
        opacity: '0',
        boxShadow: '0 70px 120px -20px #000, 0 0 0 5px var(--acc)',
        background: `url(${s.src}) -${x}px -${y}px / ${s.w}px ${s.h}px`,
      });
      layer(st.k).appendChild(d);
      lifts.push(d);
      return d;
    });
  }

  gsap.fromTo(
    win,
    { rotationX: 22, y: 110, scale: 0.92, opacity: 0.2 },
    {
      rotationX: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      ease: 'none',
      scrollTrigger: { trigger: sec, start: 'top bottom', end: 'top top', scrub: true },
    },
  );
  gsap.from(root.querySelectorAll('.side > *'), {
    x: 30,
    opacity: 0,
    stagger: 0.07,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: { trigger: sec, start: 'top 55%' },
  });
  gsap.set(layer(steps[0].k), camTo(steps[0].k, steps[0].R, steps[0].P));

  const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
  tl.addLabel('s0').to({}, { duration: 1.4 });
  steps.forEach((st, i) => {
    if (!i) return;
    const pv = steps[i - 1];
    const prev = layer(pv.k);
    const next = layer(st.k);
    tl.addLabel(`s${i}`);
    if (pv.liftEls) tl.to(pv.liftEls, { y: 0, scale: 1, duration: 0.3 }).set(pv.liftEls, { opacity: 0 });
    if (st.k !== pv.k || st.click || st.device) tl.to(spot(pv.k), { opacity: 0, duration: 0.3 });
    if (st.out) tl.to(prev, { ...camTo(pv.k, ov(pv.k), 1), duration: 0.7 });
    if (st.click) {
      const [cx, cy] = st.click;
      const from = st.out ? { R: ov(pv.k), P: 1 } : pv;
      const px = () => {
        const c = camAt(pv.k, from.R, from.P);
        return c.x + cx * c.scale;
      };
      const py = () => {
        const c = camAt(pv.k, from.R, from.P);
        return c.y + cy * c.scale;
      };
      tl.fromTo(
        cursor,
        { x: () => px() + 160, y: () => py() + 120, opacity: 0 },
        { x: px, y: py, opacity: 1, duration: 0.7, ease: 'power3.out' },
      ).fromTo(ripple, { scale: 0.2, opacity: 0.9 }, { scale: 2.2, opacity: 0, duration: 0.35, ease: 'power1.out' });
    }
    if (st.k !== pv.k) {
      tl.set(next, camTo(st.k, st.click ? ov(st.k) : st.R, st.click ? 1 : st.P))
        .to(prev, { opacity: 0, duration: 0.25 }, '>-.05')
        .fromTo(next, { opacity: 0, yPercent: 1.5 }, { opacity: 1, yPercent: 0, duration: 0.35, ease: 'power2.out' }, '<')
        .to(cursor, { opacity: 0, duration: 0.2 }, '<');
    }
    if (!(st.click && st.ov)) tl.to(next, { ...camTo(st.k, st.R, st.P), duration: 1 });
    const s = shots.get(st.k)!;
    tl.to(
      spot(st.k),
      st.ov
        ? { left: 0, top: 0, width: s.w, height: s.h, opacity: 0, duration: 0.6 }
        : { ...spotBox(st.R), opacity: 1, duration: 1 },
      '<',
    );
    if (st.liftEls) {
      tl.set(st.liftEls, { opacity: 1 }).to(st.liftEls, { y: -50, scale: 1.05, stagger: 0.08, duration: 0.5, ease: 'back.out(2)' });
    }
    if (st.device && phone && data.device) {
      const screen = phone.querySelector<HTMLElement>('.scr')!;
      const imgs = Array.from(screen.querySelectorAll('img'));
      tl.to(win, { xPercent: -4, scale: 0.8, opacity: 0.45, transformOrigin: '0% 50%', duration: 0.8 }, '<').fromTo(
        phone,
        { yPercent: 60, opacity: 0, rotationY: -16 },
        { yPercent: 0, opacity: 1, rotationY: 0, duration: 0.9, ease: 'power3.out' },
        '<.1',
      );
      imgs.forEach((img, j) => {
        const shot = data.device!.shots[j];
        if (j) tl.to(img, { opacity: 1, duration: 0.45 }, '+=.9').set(imgs[j - 1], { opacity: 0 });
        tl.to(img, {
          y: () => Math.min(0, screen.clientHeight - img.offsetHeight),
          duration: shot.h / shot.w > LONG_SCREEN ? 2.6 : 0.6,
          ease: 'none',
        });
      });
    }
    tl.to({}, { duration: 1.4 });
  });

  const labels = Object.values(tl.labels).sort((a, b) => a - b);
  let on = 0;
  ScrollTrigger.create({
    trigger: sec,
    start: 'top top',
    end: () => `+=${steps.length * 100}%`,
    pin: true,
    scrub: 0.6,
    animation: tl,
    invalidateOnRefresh: true,
    onToggle: (self) => document.documentElement.classList.toggle('case-pinned', self.isActive),
    onUpdate: (self) => {
      const t = self.progress * tl.duration() + 0.05;
      let n = 0;
      labels.forEach((v, j) => {
        if (t >= v) n = j;
      });
      const end = labels[n + 1] ?? tl.duration();
      segs.forEach((b, j) => {
        b.style.width = j < n ? '100%' : j > n ? '0%' : `${Math.min(100, ((t - labels[n]) / (end - labels[n])) * 100)}%`;
      });
      if (n !== on) onStep((on = n));
    },
  });

  return () => {
    lifts.forEach((d) => d.remove());
    segs.forEach((b) => (b.style.width = ''));
    root.classList.remove('is-pinned');
    document.documentElement.classList.remove('case-pinned');
    onStep(0);
  };
}
````

#### `src/app/cases/case-study.ts`

````ts
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import type { Case } from '../data/types';
import { LangService } from '../lang';
import { reveal, sceneMotion } from '../motion';
import { CodeBlock } from '../ui/code-block';
import { Rich } from '../ui/rich';
import { pinScene } from './case-scene';

/**
 * One app case. The HTML is the static layout (first screen, phone, every card in a list): that is what
 * prerendering, phones, portrait screens and reduced motion get. Wide landscape screens pin it and play the steps.
 */
@Component({
  selector: 'app-case-study',
  imports: [CodeBlock, Rich],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './case-study.css',
  template: `
    <section class="case" [id]="'case-' + data().id" [attr.aria-labelledby]="'case-' + data().id + '-name'">
      <div class="in">
        <div class="stage">
          <div class="win">
            <div class="bar" aria-hidden="true"><i></i><i></i><i></i><span class="url">{{ urls()[step()] }}</span></div>
            <div class="vp">
              @for (s of data().shots; track s.key; let first = $first) {
                <div class="layer" [attr.data-k]="s.key">
                  <img
                    [src]="s.src"
                    [width]="s.w"
                    [height]="s.h"
                    [attr.alt]="first ? data().alt[lang()] : ''"
                    loading="lazy"
                    decoding="async"
                  />
                  <div class="spot"></div>
                </div>
              }
              <div class="cursor" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="26">
                  <path d="M4 2l16 9-7 2-3 7z" fill="#fff" stroke="#000" stroke-width="1.4" stroke-linejoin="round" />
                </svg>
                <span class="rip"></span>
              </div>
            </div>
          </div>
          @if (data().device; as device) {
            <div class="phone">
              <span class="tag">{{ device.tag[lang()] }}</span>
              <div class="scr">
                @for (s of device.shots; track s.key) {
                  <img [src]="s.src" [width]="s.w" [height]="s.h" alt="" loading="lazy" decoding="async" />
                }
              </div>
            </div>
          }
        </div>

        <div class="side">
          <header>
            <p class="idx">{{ data().index[lang()] }}</p>
            <h3 [id]="'case-' + data().id + '-name'">{{ data().name }}</h3>
            <p class="pitch">{{ data().pitch[lang()] }}</p>
          </header>
          <ul class="chips">
            @for (chip of data().chips; track chip) {
              <li>{{ chip }}</li>
            }
          </ul>
          <dl class="nums">
            @for (n of data().nums; track n.value + n.label.en) {
              <div>
                <dt>{{ n.label[lang()] }}</dt>
                <dd>{{ n.value }}</dd>
              </div>
            }
          </dl>
          <p class="links">
            @for (link of data().links; track link.href) {
              <a class="ext" [href]="link.href" target="_blank" rel="noopener">{{ link.label[lang()] }}</a>
            }
            @if (data().note; as note) {
              <span class="note">{{ note[lang()] }}</span>
            }
          </p>
          <div class="cards">
            @for (c of data().cards; track $index; let i = $index) {
              <article class="eng" [class.on]="i === step()">
                <p class="k">{{ pad(i + 1) }} / {{ pad(data().cards.length) }} · {{ c.kicker[lang()] }}</p>
                <h4>{{ c.title[lang()] }}</h4>
                <p><app-rich [text]="c.text[lang()]" /></p>
                @for (x of c.code; track $index) {
                  <app-code-block [excerpt]="x" />
                }
              </article>
            }
          </div>
          <div class="progress" aria-hidden="true">
            <div class="rail">
              @for (s of data().steps; track $index) {
                <i><b></b></i>
              }
            </div>
            <div class="rail-l">
              <span>{{ t().apps.step }} {{ step() + 1 }} / {{ data().steps.length }}</span><span>{{ t().apps.scroll }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class CaseStudy {
  readonly data = input.required<Case>();
  protected readonly lang = inject(LangService).lang;
  protected readonly t = inject(LangService).t;

  /** Step on screen while the case is pinned; stays 0 in the static layout. */
  readonly step = signal(0);

  /** Address bar text per step: a step without a url keeps the previous one. */
  protected readonly urls = computed(() => {
    let url = '';
    return this.data().steps.map((s) => (url = s.url ?? url));
  });

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  constructor() {
    sceneMotion((m, mode, root) =>
      mode === 'desktop'
        ? pinScene(m, root, this.data(), (n) => this.step.set(n))
        : reveal(m, root.querySelectorAll('.win, .phone, .side > header, .chips, .nums, .links, .eng')),
    );
  }
}
````

#### `src/app/cases/case-study.css`

````css
/* ---------- static layout (prerendered HTML, phones, portrait, reduced motion) ---------- */
:host {
  display: block;
}

.case {
  padding-block: 56px;
}

.in {
  display: grid;
  gap: 22px;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding-inline: var(--gutter);
}

.stage {
  position: relative;
  min-width: 0;
}

.win {
  border: 1px solid #262c35;
  border-radius: 14px;
  overflow: hidden;
  background: #111;
  box-shadow: 0 60px 140px -40px #000;
  transform-origin: 50% 60%;
}

.bar {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding: 0 12px;
  background: #15191f;
  border-bottom: 1px solid #232830;
}

.bar i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #2c323b;
}

.url {
  flex: 1;
  max-width: 380px;
  height: 18px;
  margin-left: 10px;
  padding: 0 10px;
  border-radius: 5px;
  background: #0d1014;
  color: #7d8692;
  font: 11px/18px var(--mono);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* The first screen, top 16:10 slice: the same framing as the first pinned step */
.vp {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  background: #0b0f14;
}

.layer img {
  width: 100%;
  height: auto;
}

.layer + .layer,
.spot,
.cursor {
  display: none;
}

.rip {
  position: absolute;
  left: -14px;
  top: -14px;
  width: 28px;
  height: 28px;
  border: 2px solid var(--acc);
  border-radius: 50%;
  opacity: 0;
}

.phone {
  position: relative;
  z-index: 2;
  width: min(36%, 200px);
  aspect-ratio: 9 / 19.1;
  margin: -22% 5% 0 auto;
  padding: 7px;
  border: 1px solid #2a3038;
  border-radius: 30px;
  background: #05070a;
  box-shadow: 0 40px 80px -20px #000;
}

.scr {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 23px;
  background: #0b0f14;
}

.scr img {
  width: 100%;
  height: auto;
}

.scr img + img,
.tag,
.progress {
  display: none;
}

.idx {
  font: 500 12px var(--mono);
  color: var(--mut);
}

h3 {
  margin: 8px 0;
  font-size: clamp(28px, 2.4vw, 40px);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.03em;
}

.pitch {
  max-width: 60ch;
  color: var(--mut);
  font-size: 15px;
  line-height: 1.45;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 14px;
}

.chips li {
  padding: 2px 8px;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: #b9c0c9;
  font: 500 11px var(--mono);
}

.nums {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 14px 0 0;
  border: 1px solid var(--line);
  border-radius: 12px;
  overflow: hidden;
}

.nums div {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  padding: 9px 10px;
  border-right: 1px solid var(--line);
}

.nums div:last-child {
  border: 0;
}

dd {
  margin: 0;
  font: 600 20px/1.1 var(--sans);
  letter-spacing: -0.02em;
}

dt {
  margin-top: 3px;
  color: var(--mut);
  font: 400 10.5px/1.3 var(--mono);
}

.links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 14px;
  margin-top: 14px;
  font: 500 13px var(--mono);
}

.links a {
  color: var(--acc);
  text-decoration: none;
}

.links a:hover {
  text-decoration: underline;
}

.note {
  color: var(--mut);
}

.cards {
  display: grid;
  gap: 12px;
  margin-top: 18px;
}

.eng {
  min-width: 0;
  padding: 15px 16px 16px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--panel);
}

.k {
  color: var(--acc);
  font: 500 11px var(--mono);
}

h4 {
  margin: 6px 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.015em;
}

.eng p {
  color: #c3c9d1;
  font-size: 13.5px;
  line-height: 1.5;
}

.rail {
  display: flex;
  gap: 4px;
}

.rail i {
  flex: 1;
  height: 3px;
  border-radius: 2px;
  background: var(--line);
  overflow: hidden;
}

.rail b {
  display: block;
  width: 0;
  height: 100%;
  background: var(--acc);
}

.rail-l {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  color: var(--mut);
  font: 400 11px var(--mono);
}

@media (min-width: 760px) {
  .cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Wide screens without the pinned story: the window stays while the cards scroll past */
@media (min-width: 1024px) {
  .in {
    grid-template-columns: minmax(0, 1fr) clamp(330px, 30vw, 440px);
    align-items: start;
  }
  .stage {
    position: sticky;
    top: calc(var(--header) + 16px);
  }
  .cards {
    grid-template-columns: minmax(0, 1fr);
  }
}

/* ---------- pinned story (added by pinScene on wide landscape screens with motion) ---------- */
:host(.is-pinned) .case {
  height: 100vh;
  padding: 0;
}

:host(.is-pinned) .in {
  height: 100%;
  grid-template-columns: minmax(0, 1fr) clamp(330px, 26vw, 440px);
  align-items: stretch;
  padding: 18px 22px;
}

:host(.is-pinned) .stage {
  position: relative;
  top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1600px;
  container-type: size;
}

:host(.is-pinned) .win {
  width: min(100cqw, calc((100cqh - 30px) * 1.6));
}

/* width-bound (laptops): the viewport grows taller instead of leaving empty bands */
:host(.is-pinned) .vp {
  width: 100%;
  height: min(calc(100cqh - 30px), calc(100cqw / 1.2));
  aspect-ratio: auto;
}

/* sizes in screenshot pixels (2x captures); the layer scale shrinks them */
:host(.is-pinned) .layer {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  transform-origin: 0 0;
}

:host(.is-pinned) .layer img {
  height: 100%;
}

:host(.is-pinned) .spot {
  display: block;
  position: absolute;
  border: 6px solid var(--acc);
  border-radius: 28px;
  box-shadow: 0 0 0 30000px #05070ad6;
  opacity: 0;
  pointer-events: none;
}

:host(.is-pinned) .cursor {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 5;
  width: 26px;
  opacity: 0;
  pointer-events: none;
  filter: drop-shadow(0 3px 6px #0009);
}

:host(.is-pinned) .phone {
  position: absolute;
  top: 5%;
  bottom: 5%;
  right: 4%;
  z-index: 6;
  width: auto;
  margin: 0;
  padding: 10px;
  border-radius: 44px;
  box-shadow: 0 60px 120px -20px #000, 0 0 0 1px #000;
  opacity: 0;
}

:host(.is-pinned) .scr {
  border-radius: 34px;
}

:host(.is-pinned) .scr img {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

:host(.is-pinned) .scr img:first-child {
  opacity: 1;
}

:host(.is-pinned) .tag {
  display: block;
  position: absolute;
  left: -12px;
  bottom: 14%;
  transform: translateX(-100%);
  padding: 6px 10px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #0a0c0fe6;
  color: var(--acc);
  font: 500 12px var(--mono);
  white-space: nowrap;
}

:host(.is-pinned) .side {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 0;
  padding: 6px 0;
}

:host(.is-pinned) .chips,
:host(.is-pinned) .nums,
:host(.is-pinned) .links,
:host(.is-pinned) .cards {
  margin-top: 0;
}

:host(.is-pinned) .cards {
  flex: 1;
  min-height: 0;
  grid-template-columns: minmax(0, 1fr);
  align-content: start;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(#000 calc(100% - 24px), transparent);
  mask-image: linear-gradient(#000 calc(100% - 24px), transparent);
}

/* every card stays in the accessibility tree; only the current one is visible */
:host(.is-pinned) .eng {
  grid-area: 1 / 1;
  align-self: start;
  opacity: 0;
  transform: translateY(14px);
  pointer-events: none;
  transition: opacity 0.22s, transform 0.22s;
}

:host(.is-pinned) .eng.on {
  opacity: 1;
  transform: none;
  pointer-events: auto;
  transition: opacity 0.5s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1), transform 0.5s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
}

:host(.is-pinned) .progress {
  display: block;
}

@media (max-height: 780px) {
  :host(.is-pinned) {
    --code-size: 10.4px;
  }
  :host(.is-pinned) .pitch,
  :host(.is-pinned) .chips {
    display: none;
  }
  :host(.is-pinned) .side {
    gap: 10px;
  }
  :host(.is-pinned) h3 {
    margin: 4px 0 0;
    font-size: 28px;
  }
  :host(.is-pinned) .eng {
    padding: 12px 14px;
  }
  :host(.is-pinned) h4 {
    font-size: 16px;
  }
  :host(.is-pinned) .eng p {
    font-size: 12.5px;
    line-height: 1.45;
  }
}
````

#### `src/app/sections/hero.ts`

````ts
import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { LangService } from '../lang';
import { reducedMotion, sceneMotion } from '../motion';

const NOISE = '!<>-_/[]{}=+*^?#01';
const FRAMES = 34;

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="inicio" class="hero">
      <p class="kick">{{ t().hero.kicker }}</p>
      <h1 [attr.aria-label]="t().hero.title">{{ scrambled() ?? t().hero.title }}</h1>
      <p class="sub">{{ t().hero.sub }}</p>
      <p class="ctas">
        <a class="btn btn-primary" href="#apps">{{ t().hero.apps }}</a>
        <a class="btn" href="#contato">{{ t().hero.contact }}</a>
        <a class="btn" [href]="t().cv.href" download>{{ t().cv.label }}</a>
      </p>

      <div class="fan" role="img" [attr.aria-label]="t().hero.fan">
        <div class="slot s1">
          <figure class="w">
            <div class="bar"><i></i><i></i><i></i><span class="url">foco-vida.vercel.app</span></div>
            <img src="/apps/hero-fv.webp" width="1100" height="729" alt="" decoding="async" />
          </figure>
        </div>
        <div class="slot s2">
          <figure class="w">
            <div class="bar"><i></i><i></i><i></i><span class="url">agenda-facil · /dashboard</span></div>
            <img src="/apps/hero-af.webp" width="1100" height="729" alt="" decoding="async" />
          </figure>
        </div>
        <div class="slot s0">
          <figure class="w">
            <div class="bar"><i></i><i></i><i></i><span class="url">myfinance · /inicio</span></div>
            <img src="/apps/hero-mf.webp" width="1600" height="1060" alt="" fetchpriority="high" />
          </figure>
        </div>
        <div class="slot sp">
          <div class="phone"><img src="/apps/hero-phone.webp" width="560" height="1188" alt="" decoding="async" /></div>
        </div>
      </div>

      <ul class="proof" [attr.aria-label]="t().hero.proofLabel">
        @for (p of t().hero.proof; track p.value) {
          <li>
            <b>{{ p.value }}</b><span class="l">{{ p.label }}</span><span class="src">{{ p.source }}</span>
          </li>
        }
      </ul>
    </section>
  `,
  styles: `
    .hero {
      padding: 56px var(--gutter) 0;
      text-align: center;
      overflow: hidden;
    }
    h1 {
      max-width: 14ch;
      margin: 18px auto;
      font-size: clamp(40px, 6.4vw, 88px);
      font-weight: 600;
      line-height: 1.02;
      letter-spacing: -0.035em;
    }
    .sub {
      max-width: 50ch;
      margin: 0 auto;
      color: var(--mut);
      font-size: clamp(16px, 1.4vw, 19px);
    }
    .ctas {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      margin-top: 28px;
    }
    .fan {
      position: relative;
      width: min(1240px, 94vw);
      height: min(52vw, 580px);
      margin: 52px auto 0;
      perspective: 1800px;
      transform-style: preserve-3d;
    }
    .slot {
      position: absolute;
      transform-style: preserve-3d;
    }
    .s0 {
      left: 17%;
      top: 10%;
      z-index: 3;
      width: 66%;
    }
    .s1 {
      left: 0;
      top: 0;
      z-index: 1;
      width: 44%;
    }
    .s2 {
      right: 0;
      top: 3%;
      z-index: 2;
      width: 44%;
    }
    .sp {
      right: 12%;
      top: 34%;
      z-index: 4;
      width: 13%;
    }
    .w {
      aspect-ratio: 16 / 10.6;
      overflow: hidden;
      border: 1px solid #262c35;
      border-radius: 12px;
      background: #111;
      box-shadow: 0 50px 120px -30px #000;
    }
    .s0 .w {
      transform: rotateX(8deg);
    }
    .s1 .w {
      transform: rotateY(22deg) rotateX(6deg) translateZ(-260px);
      filter: brightness(0.62);
    }
    .s2 .w {
      transform: rotateY(-22deg) rotateX(6deg) translateZ(-260px);
      filter: brightness(0.62);
    }
    .w img {
      width: 100%;
      height: calc(100% - 22px);
      object-fit: cover;
      object-position: top left;
    }
    .bar {
      display: flex;
      align-items: center;
      gap: 4px;
      height: 22px;
      padding: 0 9px;
      background: #15191f;
      border-bottom: 1px solid #232830;
    }
    .bar i {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #2c323b;
    }
    .url {
      flex: 1;
      max-width: 240px;
      height: 13px;
      margin-left: 8px;
      padding: 0 8px;
      border-radius: 4px;
      background: #0d1014;
      color: #7d8692;
      font: 8px/13px var(--mono);
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
    }
    .phone {
      padding: 5%;
      border: 1px solid #2a3038;
      border-radius: 18% / 8.5%;
      background: #05070a;
      box-shadow: 0 40px 90px -20px #000;
      transform: rotateY(-10deg) translateZ(90px);
    }
    .phone img {
      width: 100%;
      height: auto;
      border-radius: 14% / 6.6%;
    }
    .proof {
      position: relative;
      z-index: 5;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      max-width: 1000px;
      margin: -36px auto 64px;
      border: 1px solid var(--line);
      border-radius: 14px;
      background: #0a0c0fe0;
      backdrop-filter: blur(10px);
      text-align: left;
    }
    .proof li {
      padding: 14px 16px;
      border-right: 1px solid var(--line);
    }
    .proof li:last-child {
      border-right: 0;
    }
    .proof b {
      display: block;
      font-size: 28px;
      font-weight: 600;
      line-height: 1;
      letter-spacing: -0.02em;
    }
    .l {
      display: block;
      margin-top: 6px;
      font-size: 14px;
    }
    .src {
      display: block;
      margin-top: 4px;
      color: var(--mut);
      font: 400 11px/1.4 var(--mono);
    }
    @media (max-width: 759.98px) {
      .fan {
        height: 70vw;
      }
      .sp {
        right: 6%;
        width: 18%;
      }
      .proof {
        grid-template-columns: 1fr 1fr;
        margin-top: 0;
      }
      .proof li:nth-child(2) {
        border-right: 0;
      }
      .proof li:nth-child(-n + 2) {
        border-bottom: 1px solid var(--line);
      }
    }
  `,
})
export class Hero {
  protected readonly t = inject(LangService).t;
  /** The headline while it decodes itself, once; null shows the real text. */
  protected readonly scrambled = signal<string | null>(null);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (reducedMotion()) return;
      const title = this.t().hero.title;
      let frame = 0;
      const id = setInterval(() => {
        frame++;
        if (frame >= FRAMES) {
          clearInterval(id);
          this.scrambled.set(null);
          return;
        }
        const shown = (title.length * frame) / FRAMES;
        this.scrambled.set(
          [...title].map((c, i) => (c === ' ' || i < shown ? c : NOISE[(Math.random() * NOISE.length) | 0])).join(''),
        );
      }, 30);
      destroyRef.onDestroy(() => clearInterval(id));
    });

    sceneMotion((m, mode, root) => {
      if (mode !== 'desktop') return;
      const { gsap } = m;
      const hero = root.querySelector('.hero')!;
      const fan = root.querySelector<HTMLElement>('.fan')!;
      const rx = gsap.quickTo(fan, 'rotationX', { duration: 0.9, ease: 'power3' });
      const ry = gsap.quickTo(fan, 'rotationY', { duration: 0.9, ease: 'power3' });
      const tilt = (e: PointerEvent) => {
        ry((e.clientX / innerWidth - 0.5) * 8);
        rx(-(e.clientY / innerHeight - 0.5) * 6);
      };
      addEventListener('pointermove', tilt);

      const scrub = (start: string) => ({ trigger: hero, start, end: 'bottom top', scrub: true });
      gsap.to(fan, { y: -140, scale: 1.12, ease: 'none', scrollTrigger: scrub('top top') });
      gsap.to(root.querySelector('.s1'), { xPercent: -30, opacity: 0, ease: 'none', scrollTrigger: scrub('30% top') });
      gsap.to(root.querySelector('.s2'), { xPercent: 30, opacity: 0, ease: 'none', scrollTrigger: scrub('30% top') });
      gsap.to(root.querySelector('.sp'), { yPercent: -18, ease: 'none', scrollTrigger: scrub('top top') });
      return () => removeEventListener('pointermove', tilt);
    });
  }
}
````

#### `src/app/sections/apps.ts`

````ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CaseStudy } from '../cases/case-study';
import { cases } from '../data/cases';
import { LangService } from '../lang';
import { reveal, sceneMotion } from '../motion';

@Component({
  selector: 'app-apps',
  imports: [CaseStudy],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="apps" class="intro wrap">
      <p class="kick">{{ t().apps.kicker }}</p>
      <h2 class="h2">{{ t().apps.title }}</h2>
      <p class="lead">{{ t().apps.lead }}</p>
    </section>
    @for (c of cases; track c.id) {
      <app-case-study [data]="c" />
    }
  `,
  styles: `
    .intro {
      padding-block: 16vh 6vh;
      text-align: center;
    }
    .h2,
    .lead {
      margin-inline: auto;
    }
  `,
})
export class Apps {
  protected readonly t = inject(LangService).t;
  protected readonly cases = cases;

  constructor() {
    sceneMotion((m, _mode, root) => reveal(m, root.querySelectorAll('.intro > *')));
  }
}
````

#### `src/app/sections/inside.ts`

````ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { siteRepo } from '../content';
import { inside } from '../data/inside';
import { LangService } from '../lang';
import { reveal, sceneMotion } from '../motion';
import { CodeBlock } from '../ui/code-block';
import { Rich } from '../ui/rich';

@Component({
  selector: 'app-inside',
  imports: [CodeBlock, Rich],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="por-dentro" class="section wrap">
      <p class="kick">{{ t().inside.kicker }}</p>
      <h2 class="h2">{{ t().inside.title }}</h2>
      <p class="lead">{{ t().inside.lead }}</p>
      <div class="grid">
        @for (c of cards; track $index) {
          <article class="eng">
            <h3>{{ c.title[lang()] }}</h3>
            <p><app-rich [text]="c.text[lang()]" /></p>
            @for (x of c.code; track $index) {
              <app-code-block [excerpt]="x" />
            }
          </article>
        }
      </div>
      <p class="repo"><a class="btn ext" [href]="repo" target="_blank" rel="noopener">{{ t().inside.repo }}</a></p>
    </section>
  `,
  styles: `
    .grid {
      display: grid;
      gap: 14px;
      margin-top: 36px;
    }
    .eng {
      min-width: 0;
      padding: 18px;
      border: 1px solid var(--line);
      border-radius: 14px;
      background: var(--panel);
    }
    h3 {
      font-size: 18px;
      font-weight: 600;
      line-height: 1.25;
      letter-spacing: -0.015em;
    }
    .eng p {
      margin-top: 6px;
      color: #c3c9d1;
      font-size: 14px;
      line-height: 1.5;
    }
    .repo {
      margin-top: 24px;
    }
    @media (min-width: 1024px) {
      .grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        align-items: start;
      }
    }
  `,
})
export class Inside {
  protected readonly lang = inject(LangService).lang;
  protected readonly t = inject(LangService).t;
  protected readonly cards = inside;
  protected readonly repo = siteRepo;

  constructor() {
    sceneMotion((m, _mode, root) => reveal(m, root.querySelectorAll('.kick, .h2, .lead, .eng, .repo')));
  }
}
````

#### `src/app/sections/more.ts`

````ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { moreProjects } from '../content';
import { LangService } from '../lang';
import { reveal, sceneMotion } from '../motion';

@Component({
  selector: 'app-more',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="projetos" class="section wrap">
      <p class="kick">{{ t().more.kicker }}</p>
      <h2 class="h2">{{ t().more.title }}</h2>
      <ul class="list">
        @for (p of projects; track p.name.en) {
          <li>
            <h3>{{ p.name[lang()] }}</h3>
            <div>
              <p>{{ p.summary[lang()] }}</p>
              <p class="stack">{{ p.stack }}</p>
            </div>
            <p class="links">
              @for (link of p.links; track link.href) {
                <a class="ext" [href]="link.href" target="_blank" rel="noopener">{{ link.label[lang()] }}</a>
              }
            </p>
          </li>
        }
      </ul>
    </section>
  `,
  styles: `
    .list {
      margin-top: 36px;
      border-bottom: 1px solid var(--line);
    }
    li {
      display: grid;
      gap: 6px 32px;
      padding: 18px 0;
      border-top: 1px solid var(--line);
    }
    h3 {
      font: 500 15px/1.4 var(--mono);
      overflow-wrap: anywhere;
    }
    li p {
      color: #c3c9d1;
      font-size: 15px;
    }
    .stack {
      margin-top: 4px;
      color: var(--mut) !important;
      font: 400 12px/1.5 var(--mono);
    }
    .links {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 14px;
      font: 500 13px var(--mono);
    }
    .links a {
      color: var(--acc);
      text-decoration: none;
      white-space: nowrap;
    }
    .links a:hover {
      text-decoration: underline;
    }
    @media (min-width: 900px) {
      li {
        grid-template-columns: 280px minmax(0, 1fr) 220px;
      }
      .links {
        flex-direction: column;
        align-items: flex-end;
      }
    }
  `,
})
export class More {
  protected readonly lang = inject(LangService).lang;
  protected readonly t = inject(LangService).t;
  protected readonly projects = moreProjects;

  constructor() {
    sceneMotion((m, _mode, root) => reveal(m, root.querySelectorAll('.kick, .h2, li')));
  }
}
````

#### `src/app/sections/career.ts`

````ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LangService } from '../lang';
import { reveal, sceneMotion } from '../motion';

@Component({
  selector: 'app-career',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="trajetoria" class="section wrap">
      <p class="kick">{{ t().career.kicker }}</p>
      <h2 class="h2">{{ t().career.title }}</h2>
      <ol class="jobs">
        @for (job of t().career.jobs; track job.company) {
          <li>
            <p class="when">{{ job.period }}</p>
            <div>
              <h3>{{ job.role }} <span>· {{ job.company }}</span></h3>
              <p>{{ job.text }}</p>
              @if (job.note) {
                <p class="note">{{ job.note }}</p>
              }
            </div>
          </li>
        }
      </ol>
      <div class="edu">
        <div>
          <h3>{{ t().career.educationTitle }}</h3>
          <p>{{ t().career.education }}</p>
        </div>
        <div>
          <h3>{{ t().career.studiesTitle }}</h3>
          <ul>
            @for (s of t().career.studies; track s) {
              <li>{{ s }}</li>
            }
          </ul>
        </div>
      </div>
    </section>
  `,
  styles: `
    .jobs {
      margin-top: 36px;
    }
    .jobs > li {
      display: grid;
      gap: 6px 32px;
      padding: 22px 0;
      border-top: 1px solid var(--line);
    }
    .when {
      color: var(--mut);
      font: 400 13px/1.6 var(--mono);
    }
    h3 {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: -0.015em;
    }
    h3 span {
      color: var(--mut);
      font-weight: 400;
    }
    .jobs p:not(.when) {
      max-width: 70ch;
      margin-top: 6px;
      color: #c3c9d1;
    }
    .jobs .note {
      padding-left: 12px;
      border-left: 2px solid var(--acc);
      color: var(--mut) !important;
      font-size: 14px;
    }
    .edu {
      display: grid;
      gap: 24px 32px;
      padding-top: 28px;
      border-top: 1px solid var(--line);
    }
    .edu h3 {
      color: var(--acc);
      font: 500 13px/1.4 var(--mono);
    }
    .edu p,
    .edu li {
      margin-top: 6px;
      color: #c3c9d1;
    }
    @media (min-width: 900px) {
      .jobs > li {
        grid-template-columns: 200px minmax(0, 1fr);
      }
      .edu {
        grid-template-columns: 1fr 1fr;
      }
    }
  `,
})
export class Career {
  protected readonly t = inject(LangService).t;

  constructor() {
    sceneMotion((m, _mode, root) => reveal(m, root.querySelectorAll('.kick, .h2, .jobs > li, .edu > div')));
  }
}
````

#### `src/app/sections/stack.ts`

````ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { stackGroups } from '../content';
import { LangService } from '../lang';
import { reveal, sceneMotion } from '../motion';

@Component({
  selector: 'app-stack',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="stack" class="section wrap">
      <p class="kick">{{ t().stack.kicker }}</p>
      <h2 class="h2">{{ t().stack.title }}</h2>
      <p class="lead">{{ t().stack.lead }}</p>
      <div class="groups">
        @for (g of groups; track g.name.en) {
          <div class="group">
            <h3>{{ g.name[lang()] }}</h3>
            <ul>
              @for (item of g.items; track item.name) {
                <li>
                  <a [href]="'#' + item.at">{{ item.name }}<span>{{ t().stack.at[item.at] }}</span></a>
                </li>
              }
            </ul>
          </div>
        }
      </div>
    </section>
  `,
  styles: `
    .groups {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: 28px 32px;
      margin-top: 36px;
    }
    h3 {
      color: var(--acc);
      font: 500 13px/1.4 var(--mono);
    }
    ul {
      margin-top: 10px;
      border-top: 1px solid var(--line);
    }
    a {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
      padding: 9px 0;
      border-bottom: 1px solid var(--line);
      text-decoration: none;
    }
    a span {
      color: var(--mut);
      font: 400 11px var(--mono);
      white-space: nowrap;
    }
    a:hover,
    a:hover span {
      color: var(--acc);
    }
  `,
})
export class Stack {
  protected readonly lang = inject(LangService).lang;
  protected readonly t = inject(LangService).t;
  protected readonly groups = stackGroups;

  constructor() {
    sceneMotion((m, _mode, root) => reveal(m, root.querySelectorAll('.kick, .h2, .lead, .group')));
  }
}
````

#### `src/app/sections/contact.ts`

````ts
import { ChangeDetectionStrategy, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { contactInfo } from '../content';
import { LangService } from '../lang';
import { reveal, sceneMotion } from '../motion';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contato" class="section wrap">
      <p class="kick">{{ t().contact.kicker }}</p>
      <div class="about">
        <img src="/andre.webp" width="640" height="640" [attr.alt]="t().contact.photoAlt" loading="lazy" decoding="async" />
        <p>{{ t().contact.about }}</p>
      </div>

      <h2 class="title">{{ t().contact.title }}</h2>
      <p class="lead">{{ t().contact.lead }}</p>

      <ul class="channels">
        <li class="channel">
          <span class="label">{{ t().contact.email }}</span>
          <a #email [href]="'mailto:' + info.email">{{ info.email }}</a>
          <button type="button" class="copy" (click)="copy()">
            {{ copied() ? t().contact.copied : t().contact.copy }}
          </button>
          <span class="visually-hidden" role="status">{{ copied() ? t().contact.copied : '' }}</span>
        </li>
        <li class="channel">
          <span class="label">LinkedIn</span>
          <a [href]="info.linkedin" target="_blank" rel="noopener">linkedin.com/in/andrenarcizo</a>
        </li>
        <li class="channel">
          <span class="label">GitHub</span>
          <a [href]="info.github" target="_blank" rel="noopener">github.com/DevAndreNarcizo</a>
        </li>
        <li class="channel">
          <span class="label">WhatsApp</span>
          <a [href]="info.whatsappLink" target="_blank" rel="noopener">{{ info.whatsapp }}</a>
        </li>
      </ul>
      <p class="end">
        <a class="btn btn-primary" [href]="t().cv.href" download>{{ t().cv.label }}</a>
        <span class="hint">{{ t().contact.hint }}</span>
      </p>
    </section>
  `,
  styles: `
    .about {
      display: grid;
      gap: 20px 32px;
      align-items: center;
      margin-top: 24px;
    }
    .about img {
      width: 140px;
      height: 140px;
      border: 1px solid var(--line);
      border-radius: 16px;
      object-fit: cover;
    }
    .about p {
      max-width: 62ch;
      color: #c3c9d1;
      font-size: 17px;
    }
    .title {
      margin-top: clamp(56px, 9vw, 110px);
      font-size: clamp(44px, 9vw, 120px);
      font-weight: 600;
      line-height: 0.95;
      letter-spacing: -0.045em;
    }
    .channels {
      margin-top: 36px;
      border-top: 1px solid var(--line);
    }
    .channel {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px 20px;
      padding: 16px 0;
      border-bottom: 1px solid var(--line);
    }
    .label {
      width: 96px;
      color: var(--mut);
      font: 400 12px var(--mono);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .channel a {
      font-size: clamp(18px, 2.4vw, 26px);
      font-weight: 500;
      letter-spacing: -0.01em;
      text-decoration: none;
      overflow-wrap: anywhere;
    }
    .channel a:hover {
      color: var(--acc);
    }
    .copy {
      min-height: 34px;
      padding: 0 12px;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: transparent;
      font: 500 12px var(--mono);
      cursor: pointer;
    }
    .copy:hover {
      border-color: var(--acc);
      color: var(--acc);
    }
    .end {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px 20px;
      margin-top: 28px;
    }
    .hint {
      color: var(--mut);
      font: 400 12px var(--mono);
    }
    @media (min-width: 640px) {
      .about {
        grid-template-columns: 140px minmax(0, 1fr);
      }
    }
  `,
})
export class Contact {
  protected readonly t = inject(LangService).t;
  protected readonly info = contactInfo;
  readonly copied = signal(false);
  private timer?: ReturnType<typeof setTimeout>;
  private readonly email = viewChild.required<ElementRef<HTMLAnchorElement>>('email');

  constructor() {
    sceneMotion((m, _mode, root) => reveal(m, root.querySelectorAll('.about, .title, .lead, .channel, .end')));
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
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.copied.set(false), 2000);
  }
}
````

#### `src/app/app.ts`

````ts
import { ChangeDetectionStrategy, Component, Injector, afterNextRender, inject, signal } from '@angular/core';
import { siteRepo } from './content';
import { LangService } from './lang';
import { refreshScroll } from './motion';
import { Apps } from './sections/apps';
import { Career } from './sections/career';
import { Contact } from './sections/contact';
import { Hero } from './sections/hero';
import { Inside } from './sections/inside';
import { More } from './sections/more';
import { Stack } from './sections/stack';

@Component({
  selector: 'app-root',
  imports: [Hero, Apps, Inside, More, Career, Stack, Contact],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(window:scroll)': 'onScroll()' },
  template: `
    <a class="skip-link" href="#conteudo">{{ t().nav.skip }}</a>
    <header class="header" [class.hidden]="hidden()">
      <div class="wrap bar">
        <a class="mark" href="#inicio" aria-label="André Narcizo">andre.narcizo<span>_</span></a>
        <nav [attr.aria-label]="t().nav.label">
          <a class="hide-sm" href="#apps">{{ t().nav.apps }}</a>
          <a class="hide-sm" href="#trajetoria">{{ t().nav.career }}</a>
          <a class="hide-sm" href="#stack">{{ t().nav.stack }}</a>
          <a href="#contato">{{ t().nav.contact }}</a>
        </nav>
        <button type="button" class="lang" [attr.aria-label]="t().nav.langSwitch" (click)="toggleLang()">
          {{ t().nav.langShort }}
        </button>
      </div>
    </header>
    <main id="conteudo" tabindex="-1">
      <app-hero />
      <app-apps />
      <app-inside />
      <app-more />
      <app-career />
      <app-stack />
      <app-contact />
    </main>
    <footer class="footer">
      <div class="wrap row">
        <span>André Narcizo · {{ t().footer.role }}</span>
        <a class="ext" [href]="repo" target="_blank" rel="noopener">{{ t().footer.code }}</a>
      </div>
    </footer>
  `,
  styles: `
    .header {
      position: sticky;
      top: 0;
      z-index: 50;
      height: var(--header);
      background: color-mix(in srgb, var(--bg) 85%, transparent);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--line);
      transition: transform 0.3s ease;
    }
    .header.hidden,
    :host-context(.case-pinned) .header {
      transform: translateY(-100%);
    }
    .header:focus-within {
      transform: none !important;
    }
    .bar {
      display: flex;
      align-items: center;
      gap: 24px;
      height: 100%;
      font: 500 13px var(--mono);
    }
    .mark {
      margin-right: auto;
      text-decoration: none;
    }
    .mark span {
      color: var(--acc);
    }
    nav {
      display: flex;
      gap: 24px;
    }
    nav a {
      color: var(--mut);
      text-decoration: none;
    }
    nav a:hover {
      color: var(--tx);
    }
    .lang {
      min-width: 44px;
      min-height: 34px;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: transparent;
      font: 500 12px var(--mono);
      cursor: pointer;
    }
    .lang:hover {
      border-color: var(--acc);
      color: var(--acc);
    }
    main:focus {
      outline: none;
    }
    .footer {
      padding-block: 28px;
      border-top: 1px solid var(--line);
    }
    .row {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 8px 24px;
      color: var(--mut);
      font: 400 12px var(--mono);
    }
    .row a {
      text-decoration: none;
    }
    .row a:hover {
      color: var(--acc);
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
  protected readonly repo = siteRepo;
  /** Header slides away while scrolling down and comes back on the way up. */
  protected readonly hidden = signal(false);
  private readonly injector = inject(Injector);
  private lastY = 0;

  constructor() {
    afterNextRender(() => this.lang.restore());
  }

  protected onScroll(): void {
    const y = scrollY;
    this.hidden.set(y > this.lastY && y > 120);
    this.lastY = y;
  }

  protected toggleLang(): void {
    this.lang.toggle();
    // New copy changes section heights; re-measure pins and triggers once the DOM has the new text
    afterNextRender(refreshScroll, { injector: this.injector });
  }
}
````

#### `src/app/app.spec.ts`

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

  const headline = (el: HTMLElement) => el.querySelector('h1')!.textContent!.trim();

  it('renders the sections in order', async () => {
    const { el } = await render();
    expect(Array.from(el.querySelectorAll('main section')).map((s) => s.id)).toEqual([
      'inicio',
      'apps',
      'case-myfinance',
      'case-agenda-facil',
      'case-foco-vida',
      'case-laravel',
      'por-dentro',
      'projetos',
      'trajetoria',
      'stack',
      'contato',
    ]);
  });

  it('shows every case card in the static layout, with its code', async () => {
    const { el } = await render();
    expect(el.querySelectorAll('.case .eng').length).toBe(27);
    expect(el.querySelectorAll('#por-dentro .eng').length).toBe(3);
    expect(el.querySelector('#case-laravel .eng .row')).not.toBeNull();
  });

  it('switches the whole page to English from the header button', async () => {
    const { fixture, el } = await render();
    const button = el.querySelector<HTMLButtonElement>('.lang')!;
    expect(headline(el)).toBe('Eu construo o produto inteiro.');
    expect(button.getAttribute('aria-label')).toBe('Mudar idioma para English');

    button.click();
    await fixture.whenStable();
    expect(headline(el)).toBe('I build the whole product.');
    expect(el.querySelector('#case-myfinance .pitch')!.textContent).toContain('Household finances');
    expect(button.getAttribute('aria-label')).toBe('Switch language to Português');
    expect(document.documentElement.lang).toBe('en');
  });

  it('applies the language saved on a previous visit after the first render', async () => {
    localStorage.setItem('portfolio-lang', 'en');
    const { fixture, el } = await render();
    await fixture.whenStable();
    expect(headline(el)).toBe('I build the whole product.');
  });

  it('hides the header while scrolling down and shows it again scrolling up', async () => {
    const { fixture, el } = await render();
    const header = el.querySelector('.header')!;
    const scrollTo = async (y: number) => {
      Object.defineProperty(window, 'scrollY', { value: y, configurable: true });
      window.dispatchEvent(new Event('scroll'));
      await fixture.whenStable();
    };

    await scrollTo(600);
    expect(header.classList).toContain('hidden');
    await scrollTo(500);
    expect(header.classList).not.toContain('hidden');
    await scrollTo(0);
  });
});
````

#### `tests/prerender.test.mjs`

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
  assert.equal(plain(h1[1]), 'Eu construo o produto inteiro.');
});

test('contains every section', () => {
  const ids = ['inicio', 'apps', 'case-myfinance', 'case-agenda-facil', 'case-foco-vida', 'case-laravel'];
  for (const id of [...ids, 'por-dentro', 'projetos', 'trajetoria', 'stack', 'contato']) {
    assert.ok(html.includes(`id="${id}"`), `missing section #${id}`);
  }
});

test('contains every card with its code, readable without JavaScript', () => {
  assert.equal(html.match(/<article[^>]*class="eng[ "]/g)?.length, 30);
  assert.ok(plain(html).includes('lockForUpdate'), 'Laravel excerpt missing');
  assert.ok(plain(html).includes('FOR UPDATE SKIP LOCKED'), 'Agenda Fácil excerpt missing');
  for (const name of ['MyFinance', 'Agenda Fácil', 'Foco Vida', 'Laravel API']) {
    assert.ok(html.includes(`>${name}</h3>`), `missing case ${name}`);
  }
});

test('gives the hero images their size up front', () => {
  for (const src of ['hero-mf', 'hero-af', 'hero-fv', 'hero-phone']) {
    assert.match(html, new RegExp(`<img[^>]*src="/apps/${src}\\.webp" width="\\d+" height="\\d+"`), `${src} without size`);
  }
});

test('keeps the SEO and social meta tags', () => {
  assert.match(html, /<meta name="description" content="Desenvolvedor full-stack/);
  assert.match(html, /<meta property="og:title" content="André Narcizo — Desenvolvedor Full-Stack">/);
  assert.match(html, /<meta name="theme-color" content="#0a0c0f">/);
  assert.match(html, /<link rel="canonical" href="https:\/\/dev-andrenarcizo.netlify.app">/);
});
````
