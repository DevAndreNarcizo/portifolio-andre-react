# Portfólio escuro "prova primeiro" — design

Data: 2026-10-31 · Branch: `feat/angular-rewrite` · Substitui o visual "Prancheta" (fase 1).

## Objetivo

Mostrar a recrutadores e gestores de engenharia que André constrói o produto inteiro
(banco, API, web, mobile), para vagas full-stack Angular + Laravel + Flutter.
A página prova com apps reais rodando, código real (arquivo e linha) e números verificáveis.
Nada de dado falso: telas vêm de bancos de demonstração locais; números têm fonte.

## Decisões já tomadas com o usuário

- Identidade "F1 refinado": fundo `#0a0c0f`, acento `#3ddc84`, Geist e Geist Mono, título com scramble único.
- Cases 01–03 seguem o protótipo v3 aprovado (janela grande, câmera, cursor, cards com código, passo de celular).
- Case 04: API Laravel (`laravel-clean-architecture-api`), com Swagger e testes reais.
- Seção "Por dentro deste site" com o código do próprio site.
- Outros projetos: lista curta, uma linha cada, com links. Sem filtro.
- PT/EN em tudo, inclusive cards; código fica literal.
- Ordem (estrutura "A", prova primeiro): Hero → Apps (01–04) → Por dentro → Outros projetos → Trajetória → Stack → Sobre + contato → rodapé.
- A seção "caminho de uma requisição" sai.
- Projetos da Sysout: só menção em texto; nenhuma tela ou código (direitos da Sysout e dos clientes).
- Botão "Baixar currículo (PDF)" fica; o PDF é gerado agora a partir dos dados do site e o usuário ajusta depois.
- O usuário pediu para seguir até o fim sem aprovação por seção e ver o resultado pronto.

## Seções

### Cabeçalho
Fixo. Marca `andre.narcizo_` (mono), links Apps · Trajetória · Stack · Contato, botão de idioma.
Some ao rolar para baixo, volta ao rolar para cima, fica escondido enquanto um case está fixado (pin);
volta ao receber foco do teclado.

### Hero (`#inicio`)
- Kicker `// full-stack · angular · laravel · flutter`.
- H1 "Eu construo o produto inteiro." / "I build the whole product." com scramble uma vez ao abrir
  (não roda com movimento reduzido; o texto real fica para leitores de tela).
- Linha: "Banco, API, web e mobile. Full-stack na Sysout Tecnologia, Goiânia — aberto a vagas remotas."
- CTAs: Ver os apps (`#apps`), Contato (`#contato`), Baixar currículo (PDF do idioma atual).
- Leque com as 3 janelas reais (Foco Vida à esquerda, Agenda Fácil à direita, MyFinance no centro)
  e o celular Flutter do MyFinance na frente. Pose 3D em CSS (já no HTML pré-renderizado).
  Desktop: inclinação pelo ponteiro e paralaxe na rolagem. Sem animação de entrada que esconda as imagens.
- Faixa de prova (4 números, cada um com a fonte escrita logo abaixo):
  `4` apps completos nesta página · `221` arquivos de teste (MyFinance 182 · Agenda Fácil 21 · Foco Vida 8 · API Laravel 10)
  · `3` plataformas (web, mobile, API) · `2019` primeiro emprego em TI.

### Apps (`#apps`)
Introdução "Role para ver por dentro." e quatro cases (`#case-myfinance`, `#case-agenda-facil`, `#case-foco-vida`, `#case-laravel`).

Componente único `CaseStudy` recebe os dados do case. Dois modos:
- **Estático** (padrão do HTML, celular, retrato, movimento reduzido): janela com a primeira tela,
  celular abaixo (quando houver), todos os cards visíveis em lista.
- **Fixado** (desktop paisagem ≥1024px com movimento): porte do motor v3. Seção fixada por `steps × 100%`,
  câmera `cam()` sobre a tela em pixels da captura 2x, spot, cards destacados ("lift"), cursor com clique,
  troca de tela, passo do celular, um card por passo, trilho de progresso, URL da barra por passo.

Dados por case: índice, nome, pitch, chips, 4 números, links, telas (`src`, `w`, `h`), celular opcional,
passos (região, overview, clique, lift, url, celular) e cards (kicker, título, texto com `código` entre crases, trechos).
Cases 01–03: textos e trechos exatamente como no protótipo v3 auditado, numerados `/ 04`.

Case 04 — API Laravel (repo público): telas `l-docs` (Swagger), `l-refresh` (refresh expandido),
`l-login` (login executado), `l-tests` (terminal com execução real no Postgres 16).
Números: 128 testes · 83% cobertura · 14 rotas no OpenAPI · nível 8 PHPStan. Sete cards:
arquitetura (ArchitectureTest), contrato (OpenApiContractTest), dono dos dados (findForOwner + OwnershipTest),
eventos (CreateTaskUseCase + RabbitMq), refresh de uso único (DatabaseRefreshTokenStore), envelope (ApiResponse),
qualidade (ci.yml). Linhas conferidas no commit `191d380` da branch `chore/portfolio-ready`.

Links: MyFinance (online; repo privado), Agenda Fácil (online + GitHub), Foco Vida (online; repo privado), Laravel (GitHub).

### Por dentro deste site (`#por-dentro`)
Três cards com código deste repositório: a câmera `cam()` (função pura e testada), o idioma com signals
(`LangService`) e o teste que confere os trechos. `tests/excerpts.test.mjs` lê cada arquivo citado e falha
se o trecho exibido divergir das linhas do arquivo.

### Outros projetos (`#projetos`)
Seis linhas: HunterAI Platform, node-microservices-event-driven, saas-task-manager, php-code-analyzer,
Luz da Aurora (loja online), sites para clientes (Clínica Thaysa Medeiros, Thais Sousa, Karen Bianca).

### Trajetória (`#trajetoria`)
Sysout Tecnologia (atual; só descrição, com a nota de direitos), Syndata Sistemas, Gêmeos Papelaria e Informática,
Cristal Alimentos; formação UNIP Ciência da Computação (2025); estudos recentes.

### Stack (`#stack`)
Cinco grupos (front-end, mobile, back-end, dados e mensageria, qualidade). Cada tecnologia é um link para o case
que a prova (ex.: Flutter → MyFinance, Redis → API Laravel, Angular → Por dentro deste site).

### Sobre + contato (`#contato`) e rodapé
Foto, parágrafo curto, "Vamos conversar.", e-mail com copiar (anúncio para leitor de tela), LinkedIn, GitHub,
WhatsApp, currículo PDF.
O currículo sai de `cv/cv-pt.html` e `cv/cv-en.html`, impressos em `public/cv/*.pdf` por `npm run cv` (Brave/Chrome headless). Rodapé com nome, cidade e link para o código do site.

## Arquitetura

- Angular 22 standalone, zoneless, OnPush, signals, SSR com prerender (como na fase 1).
- `src/app/data/*.ts`: dados puros (tipos + literais, só `import type`), para que testes em Node os importem.
- `src/app/content.ts`: textos de interface PT/EN, contato, outros projetos, trajetória, stack.
- `src/app/ui/highlight.ts`: realce de sintaxe puro por linha (ts, js, sql, yaml, dart, php), sem `innerHTML`.
- `src/app/cases/camera.ts`: `cam()`, `overview()`, `spotBox()` puros; `case-scene.ts`: cena GSAP do modo fixado.
- `motion.ts` (fase 1) continua: GSAP/ScrollTrigger/Lenis só depois do `load`, `matchMedia` desktop/flow, revert automático.
- Seções antigas (request-story, about, timeline, stack-blueprint, projects) e `ui/words.ts` são removidas.
- Imagens em `public/apps/*.webp` (capturas 2x); fontes Geist subset latino em `public/fonts`.

## Acessibilidade e desempenho
- Conteúdo inteiro no HTML pré-renderizado; cards visíveis sem JavaScript.
- Movimento reduzido: nada de pin, scramble, tilt ou paralaxe.
- Imagens dos cases com `loading="lazy"`; hero com dimensões explícitas e `fetchpriority="high"` na janela central.
- Contraste: texto `#e6e8eb` e secundário `#8b939e` sobre `#0a0c0f` (≥ 4.5:1).

## Testes
- Unit (vitest via `ng test`): LangService, highlight, camera, conteúdo (paridade PT/EN, sem texto vazio,
  4 cases com cards = passos), App (ordem das seções, troca de idioma, idioma salvo).
- Node: `tests/prerender.test.mjs` (HTML pré-renderizado: idioma, h1, seções, cases, metas),
  `tests/excerpts.test.mjs` (trechos do site batem com os arquivos).
- Verificação visual com Brave headless em 1440×900, 1280×720 e 390×844.

## Fora do escopo
- Push, merge e deploy (o usuário decide).
- Push da branch do repo Laravel: os trechos do case 04 citam a branch local `chore/portfolio-ready`;
  o link aponta para o repo público e passa a bater depois que o usuário aprovar o push.
