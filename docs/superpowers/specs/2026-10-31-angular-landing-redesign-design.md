# Landing Page Angular "Prancheta" — Especificação de Design

## Status

- Direção visual (V1 Prancheta), estrutura da página e arquitetura aprovadas por André Narcizo em 2026-10-31.
- Implementação pendente da revisão deste documento e do plano de implementação.
- Branch: `feat/angular-rewrite` (mesmo repositório; o React atual é substituído nesta branch e só sai do ar no merge).

## Objetivo

Reescrever o portfólio como uma **landing page de página única em Angular**, com identidade visual nova e animações de scroll no nível da referência `https://landing-page-money-flow.vercel.app/`, para diferenciar André em processos seletivos de **desenvolvedor full-stack Angular + Laravel + Flutter**.

O site é, ele próprio, a prova técnica: as animações não são decoração, elas contam como André trabalha (uma requisição atravessando Angular/Flutter → Laravel → PostgreSQL), e a implementação demonstra Angular moderno (standalone, zoneless, signals, SSG) com performance e acessibilidade medidas.

## Critérios de sucesso

1. Recrutador entende em até 10 segundos, sem rolar: nome, cargo, stack alvo (Angular, Laravel, Flutter) e como entrar em contato.
2. A Fig. 02 (história da requisição) mostra visualmente o trabalho full-stack ponta a ponta.
3. Lighthouse mobile: Performance ≥ 95, Accessibility ≥ 95, SEO = 100, Best Practices ≥ 95.
4. Todo o texto está no `index.html` pré-renderizado (legível sem JavaScript).
5. Com `prefers-reduced-motion: reduce`, nada se move e todo o conteúdo aparece no estado final.
6. PT e EN completos, com troca sem recarregar a página.

## Escopo

Inclui:

1. Projeto Angular novo na raiz do repositório, substituindo o código React.
2. Sete seções numeradas como pranchas de desenho técnico (Fig. 01 a Fig. 07), descritas abaixo.
3. Animações GSAP + ScrollTrigger + SplitText com rolagem suave Lenis, em três modos (desktop, flow, reduced).
4. Conteúdo PT/EN migrado de `src/content.ts` e `src/data.ts`.
5. Pré-renderização estática (SSG) da rota `/`.
6. Deploy no Netlify com `netlify.toml` atualizado.
7. Testes unitários e teste do HTML pré-renderizado.

Não inclui:

- Cases em destaque com história de scroll própria. Ficam para um spec separado, depois que André escolher os projetos. Nesta versão, todos os projetos vão para a grade da Fig. 06.
- Modo escuro e alternador de tema (o papel é a identidade).
- Múltiplas páginas, Angular Router, blog, CMS ou backend.
- Seções removidas do site atual: "O que eu construo" (Services), botão flutuante do WhatsApp, CursorGlow, ThemeToggle, TechMarquee. "Perfil profissional" é fundido na Fig. 03.

## Identidade visual

### Conceito

"Prancheta": o site inteiro é uma folha de desenho técnico em papel. Diagramas e molduras em tinta preta; o vermelho aparece só no que se move ou exige atenção (a requisição, o item atual, o foco). Cada seção é uma figura numerada (`FIG. 01 — ...`).

### Tokens de cor

| Token | Valor | Uso |
|---|---|---|
| `--paper` | `#F4EFE6` | fundo da página |
| `--ink` | `#141414` | texto principal, traços dos diagramas |
| `--signal` | `#E8452C` | requisição, destaques gráficos, texto ≥ 24px |
| `--signal-text` | `#B8321C` | texto vermelho pequeno (contraste 5.2:1 no papel) |
| `--muted` | `#6B665C` | texto secundário (contraste 5.0:1 no papel) |
| `--rule` | `#8A8478` | cotas, linhas auxiliares, legendas decorativas (não usar para texto) |
| `--grid` | `rgba(20, 20, 20, 0.06)` | quadriculado de 22px do fundo |

Regra de contraste: `--signal` (3.4:1) só para elementos gráficos e texto grande; texto pequeno em vermelho usa `--signal-text`.

### Tipografia

| Papel | Fonte | Pesos |
|---|---|---|
| Títulos (display) | Instrument Serif | 400, 400 itálico |
| Texto | Inter Tight | 400, 600 |
| Rótulos técnicos (FIG., cotas, carimbos, stack) | JetBrains Mono | 400, 600 |

Escalas: título do hero `clamp(44px, 8vw, 104px)`, títulos de seção `clamp(34px, 5.5vw, 64px)`, texto 17px/1.6, rótulos mono 11–12px com `letter-spacing: 0.14em` em caixa alta.

### Elementos recorrentes

- Quadriculado de 22px no fundo (CSS `background-image`, sem imagem).
- Rótulo de figura em mono vermelho: `FIG. 0N — TÍTULO`.
- Caixas de diagrama: retângulo com borda 1.2px `--ink`, cantos 2px, rótulo mono.
- Linhas de cota/chamada em `--rule`, com marcadores de ponta.
- "Carimbo" (title block de prancha) nos cards de projeto: tabela mono com nome, tipo, stack, ano e links.
- A requisição: círculo `--signal` de 8px de diâmetro que percorre caminhos SVG (`offset-path` ou `MotionPathPlugin`).

## Estrutura da página

Página única. O header fixo traz o monograma "AN", os links âncora (`#sobre`, `#trajetoria`, `#stack`, `#projetos`, `#contato`) e o botão PT/EN. Cada seção tem `id` próprio.

### Fig. 01 — Hero (`#inicio`)

Conteúdo:

- Rótulo: `FIG. 01 — ANDRÉ NARCIZO, FULL-STACK` / `FIG. 01 — ANDRÉ NARCIZO, FULL-STACK`
- Título: "Do banco de dados *à interface,* web e mobile." / "From database *to interface,* web and mobile." (trecho em itálico na cor `--signal`)
- Apoio: texto atual de `hero.description`.
- Linha mono: `Angular · Laravel · Flutter · PostgreSQL`
- CTAs: "Ver projetos" (âncora `#projetos`) e "Entrar em contato" (âncora `#contato`).
- Diagrama `blueprint-diagram` à direita (desktop) ou abaixo (mobile): Angular e Flutter → Laravel → PostgreSQL.

Movimento:

- desktop/flow: o título sobe linha por linha (SplitText, `mask: 'lines'`); o diagrama se desenha (stroke-dashoffset); depois duas requisições circulam em loop lento entre os nós.
- reduced: tudo estático; uma requisição parada sobre o nó Angular.
- O hero é completo em HTML/CSS; a animação só começa depois que GSAP carrega, partindo do estado já visível sem piscar (o JS esconde e revela apenas o que ainda não foi pintado, como na referência: uma classe `js-motion` no `<html>` aplicada antes do primeiro paint libera os estados iniciais escondidos).

### Fig. 02 — Uma requisição (`#requisicao`)

A história principal. Desenho em traço de uma janela de navegador (cliente Angular), um celular (cliente Flutter), um bloco Laravel com quatro etapas internas e um cilindro PostgreSQL.

Paradas da requisição e legendas (PT / EN):

1. **Angular** — "Um componente standalone dispara a requisição; signals atualizam só o que mudou na tela." / "A standalone component fires the request; signals update only what changed on screen."
2. **HTTP** — "Requisição autenticada para a API REST." / "Authenticated request to the REST API."
3. **Laravel** — "Autenticação, autorização por tenant e regras de negócio, em camadas." / "Authentication, tenant-based authorization and business rules, in layers." (as quatro etapas acendem em sequência: `auth → tenant → policy → controller`)
4. **PostgreSQL** — "Consulta escopada ao tenant sobre um modelo relacional." / "Tenant-scoped query over a relational model."
5. **Resposta** — "Uma API, dois clientes: a mesma resposta atualiza a web em Angular e o app em Flutter." / "One API, two clients: the same response updates the Angular web app and the Flutter mobile app."

Movimento:

- desktop: seção pinned por ~300vh com scrub (`scrub: 0.6`). A requisição percorre o caminho; cada parada acende o nó, mostra a legenda e apaga a anterior. Na volta, a resposta se divide em duas e chega simultaneamente ao navegador e ao celular, que atualizam uma linha de lista desenhada.
- flow: sem pin. Diagrama vertical (Angular/Flutter no topo, PostgreSQL embaixo); as cinco legendas são uma lista numerada ao lado do diagrama, cada item revela uma vez ao entrar na tela; a requisição desce uma vez.
- reduced: diagrama final completo com as cinco legendas visíveis, numeradas.

### Fig. 03 — Sobre (`#sobre`)

Conteúdo: foto `Foto.webp` com cotas de desenho técnico apontando para três rótulos mono ("Goiânia-GO", "Ciência da Computação — UNIP 2025", "Full-stack @ Sysout Tecnologia"); ao lado, os três parágrafos de `about.paragraphs`, com o primeiro em destaque em serifa, e o texto de `profile.copy` como citação. Link para o LinkedIn.

Movimento: desktop/flow — linhas de cota se desenham e os rótulos aparecem em sequência ao entrar na tela (uma vez). reduced — estático.

### Fig. 04 — Trajetória (`#trajetoria`)

Conteúdo: as quatro experiências de `experience.items` e a formação de `education.items` + `education.certificates`, em ordem cronológica decrescente.

Visual: linha vertical em tinta com um nó por item; o item atual (Sysout) tem nó e rótulo "Atual" em vermelho.

Movimento: desktop — a linha se desenha com scrub enquanto a seção passa (sem pin); cada nó acende quando a linha chega nele. flow — cada item revela uma vez. reduced — estático.

### Fig. 05 — Planta da stack (`#stack`)

Conteúdo: quatro camadas montadas a partir de `stackGroups`:

1. Clientes — Frontend + Mobile
2. API — Backend & APIs
3. Dados — Data & Cache
4. Infra e práticas — DevOps & Quality + Architecture & Practices

Cada camada é uma placa com o nome da camada e as tecnologias em mono. Angular, Laravel, Flutter e PostgreSQL recebem sublinhado vermelho (stack alvo).

Movimento: desktop — seção pinned por ~200vh. As placas começam empilhadas em vista isométrica (`transform: rotateX(55deg) rotateZ(-45deg)` em CSS 3D) e se separam verticalmente com scrub ("vista explodida"); linhas de chamada ligam cada placa ao seu rótulo; no fim, a requisição atravessa as camadas de cima para baixo. flow — placas planas empilhadas, cada uma revela uma vez. reduced — placas planas estáticas.

### Fig. 06 — Projetos (`#projetos`)

Conteúdo: todos os projetos de `caseStudyProjects`, `projects`, `architectureProjects` e `landingPages` (12 no total).

- Filtro por tipo: Todos / Enterprise / SaaS / Web / Landing, com botões `aria-pressed`. A contagem de cada tipo aparece no botão.
- Card "prancha": imagem do projeto (ou, sem imagem, um hachurado desenhado em CSS com o nome do projeto em mono), título em serifa, `summary`, e o carimbo mono com tipo, stack e links (projeto publicado e GitHub, só os que existirem).
- Problema / Solução / Resultado / Minha atuação ficam num `<details>` nativo "Ver detalhes" no card.

Movimento: desktop/flow — cards entram em sequência (stagger 0.08s) ao entrar na tela; ao trocar o filtro, os cards saem e entram com fade + 12px de deslocamento. Hover: a imagem ganha leve zoom (1.03) e as marcas de canto da prancha aparecem. reduced — sem transições.

### Fig. 07 — Contato (`#contato`)

Conteúdo: título "Vamos conversar." / "Let's talk.", texto de `contact.description`, e quatro canais: e-mail (com botão "Copiar" que usa `navigator.clipboard` com fallback para seleção de texto, mostrando "Copiado!"), LinkedIn, GitHub e WhatsApp. Linha mono com `contact.hint`. Footer com nome, `footer.role` e ano.

Movimento: desktop/flow — o título entra palavra por palavra; uma última requisição percorre um caminho curto até o rótulo "você". reduced — estático.

## Arquitetura

### Base

- Angular na última versão estável no momento da implementação (22.x em 2026-10-31), criado com `ng new portfolio-andre --style=css --ssr` (zoneless é o padrão da versão).
- Componentes standalone, `ChangeDetectionStrategy.OnPush`, signals para estado (idioma, filtro de projetos).
- `@angular/ssr` com `outputMode: 'static'`, pré-renderizando apenas `/`. Sem `provideRouter`.
- Fontes via `<link>` do Google Fonts no `index.html`; a otimização de fontes do build embute o CSS.
- Imagens: os arquivos de `public/Imagens/` são mantidos; as usadas recebem `NgOptimizedImage` com `width`/`height` explícitos e `loading="lazy"` fora do hero.
- Metadados SEO e Open Graph do `index.html` atual são mantidos (título, descrição, OG, Twitter, canonical, favicon).

### Estrutura de pastas

```
src/
  index.html
  styles.css                 tokens, reset, quadriculado, tipografia, utilitários .fig-label
  main.ts / main.server.ts / server.ts (gerados pelo ng new --ssr)
  app/
    app.ts                   shell: header + sete seções + footer
    app.config.ts
    content.ts               tipos + textos PT/EN + projetos + stack + contato
    lang.ts                  LangService
    motion.ts                carregador único de GSAP/ScrollTrigger/SplitText/Lenis
    ui/
      blueprint-diagram.ts   SVG Angular/Flutter ⇄ Laravel ⇄ PostgreSQL (input: variante 'hero' | 'contact')
    sections/
      hero.ts  request-story.ts  about.ts  timeline.ts  stack-blueprint.ts  projects.ts  contact.ts
public/
  Imagens/ ... (mantido)
  og-image.png (mantido)
```

Cada componente usa template e estilos inline quando o arquivo fica abaixo de ~200 linhas; acima disso, separa `.html`/`.css`.

### Idioma (`lang.ts`)

- `LangService` com `lang = signal<'pt' | 'en'>('pt')` e `t = computed(() => text[lang()])`.
- Ao trocar: grava em `localStorage` (`portfolio-lang`, com `try/catch`) e atualiza `document.documentElement.lang` para `pt-BR` ou `en`.
- Na inicialização no navegador, lê o `localStorage`; no servidor (pré-render), sempre `pt`.
- Textos localizados de projetos usam o tipo `Localized { pt; en }`, como hoje.

### Movimento (`motion.ts`)

- `loadMotion()` faz `import()` dinâmico de `gsap`, `gsap/ScrollTrigger`, `gsap/SplitText` e `lenis` uma única vez (promessa memoizada), registra os plugins e devolve `{ gsap, ScrollTrigger, SplitText, lenis }`. Fica num chunk lazy, fora do bundle inicial.
- O carregamento começa após o evento `load` da janela.
- Lenis só é criado quando não há `prefers-reduced-motion`; integrado ao ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)` e `gsap.ticker`). Os links âncora do header usam `lenis.scrollTo(alvo, { offset: -alturaDoHeader })` quando Lenis existe; senão, rolagem nativa (`scroll-behavior: smooth`, desligado em reduced).
- Três modos, decididos num único `gsap.matchMedia()` por seção:
  - `desktop`: `(min-width: 1024px) and (orientation: landscape) and (prefers-reduced-motion: no-preference)`
  - `flow`: `(not ((min-width: 1024px) and (orientation: landscape))) and (prefers-reduced-motion: no-preference)`
  - `reduced`: `(prefers-reduced-motion: reduce)` → nenhuma animação; CSS já mostra o estado final.
- Cada seção, em `afterNextRender`, chama `loadMotion()` e cria seus tweens dentro de `gsap.context(..., hostElement)`; no `DestroyRef.onDestroy`, `ctx.revert()`.
- SplitText roda após `document.fonts.ready` e usa `aria: 'auto'` (leitores de tela leem a frase inteira).
- Animações só em `transform` e `opacity` (e `stroke-dashoffset` nos SVG).
- Estados iniciais escondidos existem só sob a classe `html.js-motion`, adicionada por um script inline no `<head>` quando não há reduced-motion. Sem JS, nada fica escondido.

### Acessibilidade

- Link "Pular para o conteúdo" no topo.
- Foco visível: contorno 2px `--ink` com offset 3px; em elementos vermelhos, contorno `--ink`.
- Diagramas SVG com `role="img"` e `<title>` descritivo; as legendas da Fig. 02 existem como texto real no DOM, em ordem de leitura.
- Botão de idioma com `aria-pressed`/rótulo "Mudar idioma para English" / "Switch language to Português".
- Filtros com `aria-pressed`; a grade usa `aria-live="polite"` para anunciar a contagem após filtrar.
- Contraste conforme a tabela de tokens.

## Testes

1. **Unitários** (runner padrão do Angular, `ng test`):
   - `content.spec.ts`: as chaves de `text.pt` e `text.en` são idênticas em profundidade; todo projeto tem `summary`, `problem`, `solution`, `result` e `role` com `pt` e `en` não vazios; total de 12 projetos.
   - `lang.spec.ts`: alternar `pt → en → pt` atualiza `t()`, `localStorage` e `document.documentElement.lang`.
   - `projects.spec.ts`: filtro "Todos" mostra 12 cards; cada filtro mostra só o tipo escolhido; as contagens dos botões batem com os dados.
2. **HTML pré-renderizado** (`tests/prerender.test.mjs`, `node --test`, roda após `ng build`): o `index.html` gerado contém o título do hero em PT, os sete `id` de seção, o título dos 12 projetos e as meta tags `og:title` e `description`.
3. **Manual antes do merge**: Lighthouse mobile e desktop (metas da seção de critérios), navegação só por teclado, teste com reduced-motion ativado, Chrome + Firefox + Safari (ou WebKit) em desktop e um celular real.

## Deploy

- `netlify.toml`: `command = "npm run build"`, `publish = "dist/portfolio-andre/browser"`, `NODE_VERSION = "22"`; o redirect `/* → /index.html` é mantido.
- Arquivos do React removidos na branch: `src/` antigo, `vite.config.ts`, `eslint.config.js` (substituído pela config do Angular, se adicionada), `tsconfig.app.json`, `tsconfig.node.json`, `tests/project-card-links.test.mjs`, `tests/case-study-projects.test.mjs`, `install-deps.sh`, `setup.ps1`.
- `README.md` e `README.pt-BR.md` atualizados para a stack Angular.

## Riscos e decisões

- **Pin + Lenis + SSG**: tudo que toca `window` roda em `afterNextRender`; o pré-render nunca importa GSAP.
- **Redimensionar / girar tablet**: `gsap.matchMedia` reverte e recria as animações ao trocar de modo; `ScrollTrigger.refresh()` após `document.fonts.ready` e após o carregamento das imagens da Fig. 06.
- **Peso**: GSAP + plugins + Lenis (~70 KB gzip) ficam no chunk lazy; o bundle inicial contém só Angular e o conteúdo.
- **SplitText e troca de idioma**: ao trocar PT/EN, as seções revertem o split e refazem com o texto novo (efeito sobre o signal `lang`).

## Pontos a confirmar na revisão

- `stackGroups` atual lista MongoDB em "Data & Cache", embora o commit `aa0069a` diga que MongoDB foi removido da stack. Esta spec migra os dados como estão; remover MongoDB é uma decisão de André.
