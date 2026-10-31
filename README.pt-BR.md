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
