# Plano — Portfólio escuro "prova primeiro"

Spec: `docs/superpowers/specs/2026-10-31-dark-portfolio-design.md` · Branch: `feat/angular-rewrite`.

Todo o código abaixo já foi montado e validado numa cópia isolada do repositório
(build, 33 testes unitários, prerender, trechos e capturas em 1440×900, 1280×720, 390×844 e com movimento reduzido).
Cada task traz o código completo de cada arquivo, um comando que copia os blocos para os arquivos,
os comandos de verificação com a saída esperada e o commit.

| Task | Arquivo | Resultado |
|---|---|---|
| 1 | [task-1-base.md](task-1-base.md) | Tipos, realce, câmera, blocos de código, dados dos 4 cases e dos cards "por dentro" |
| 2 | [task-2-site.md](task-2-site.md) | Site trocado: tema escuro, hero, cases, seções, cabeçalho, testes |
| 3 | [task-3-cv-docs.md](task-3-cv-docs.md) | Currículo PDF PT/EN e README PT/EN |

Ordem obrigatória: 1 → 2 → 3. Rodar tudo da raiz do repositório, sem push.

## Verificação final (depois da Task 3)

```bash
npm test && npm run build && npm run test:prerender && npm run test:excerpts
```

Esperado: `Tests  33 passed (33)`, build sem avisos, `ℹ fail 0` nos dois testes de Node.

Já feito antes do plano (commit `docs: add dark portfolio design and its screenshots`): spec, capturas em `public/apps/`,
`public/andre.webp`, fontes Geist e `public/og-image.png`.
