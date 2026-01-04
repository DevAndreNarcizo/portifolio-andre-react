export const adrs = [
  {
    id: 'adr-001',
    title: 'ADR 001: Escolha do Framework Frontend',
    status: 'Aceito',
    date: '2025-01-04',
    context: 'Projeto Portfolio Pessoal',
    problem: 'Necessidade de criar portfolio com performance, SEO e facilidade de atualizacao.',
    decisions: [
      'React + Vite',
      'Next.js 14',
      'Astro'
    ],
    decision: 'React + Vite',
    justification: `
## Justificativa

### React + Vite escolhido por:
- **Performance**: Build rapido e HMR instantaneo
- **Simplicidade**: Menos configuracao que Next.js para SPA
- **Flexibilidade**: Controle total sobre roteamento e estrutura
- **Tamanho**: Bundle menor para portfolio simples
- **Experiencia**: Conhecimento profundo da stack

### Alternativas descartadas:
- **Next.js**: Overhead desnecessario para SPA simples
- **Astro**: Curva de aprendizado adicional
`,
    consequences: `
## Consequencias

### Positivas:
- Desenvolvimento rapido e eficiente
- Bundle otimizado e performatico
- Facilidade de manutencao
- Deploy simples em qualquer CDN

### Negativas:
- SEO limitado (SPA)
- Sem SSR nativo
- Gerenciamento manual de rotas

### Riscos Mitigados:
- SEO: Meta tags dinamicas + sitemap
- Performance: Code splitting + lazy loading
`,
    category: 'Frontend',
    tags: ['react', 'vite', 'frontend', 'performance']
  },
  {
    id: 'adr-002',
    title: 'ADR 002: Estrategia de Gerenciamento de Estado',
    status: 'Aceito',
    date: '2025-01-04',
    context: 'Knowledge Base com multiplas secoes e filtros',
    problem: 'Gerenciar estado complexo entre componentes sem prop drilling.',
    decisions: [
      'Context API nativo',
      'Redux Toolkit',
      'Zustand',
      'Estado local + props'
    ],
    decision: 'Context API + Estado Local',
    justification: `
## Justificativa

### Context API escolhido por:
- **Nativo**: Sem dependencias externas
- **Simplicidade**: Adequado para escopo do projeto
- **Performance**: Suficiente para dados nao-frequentes
- **Manutencao**: Menos complexidade

### Combinado com Estado Local:
- Filtros e buscas: useState local
- Dados globais: Context (tema, auth)
- Cache simples: localStorage
`,
    consequences: `
## Consequencias

### Positivas:
- Bundle menor (sem libs externas)
- Codigo mais simples e direto
- Facil de entender e manter

### Negativas:
- Re-renders desnecessarios em alguns casos
- Menos ferramentas de debug

### Mitigacao:
- useMemo para otimizacoes
- Multiplos contexts pequenos
- Estado local quando possivel
`,
    category: 'Frontend',
    tags: ['react', 'state', 'context', 'performance']
  },
  {
    id: 'adr-003',
    title: 'ADR 003: Arquitetura de Dados da Knowledge Base',
    status: 'Aceito',
    date: '2025-01-04',
    context: 'Estruturacao de dados para cheatsheets, tools e roadmap',
    problem: 'Organizar dados de forma escalavel e facil de manter.',
    decisions: [
      'Arquivos TypeScript estaticos',
      'JSON files + validacao',
      'CMS headless',
      'Banco de dados local'
    ],
    decision: 'Arquivos TypeScript com interfaces tipadas',
    justification: `
## Justificativa

### TypeScript files escolhido por:
- **Type Safety**: Validacao em tempo de compilacao
- **Performance**: Dados estaticos, sem requisicoes
- **Simplicidade**: Sem infraestrutura adicional
- **Versionamento**: Dados no Git junto com codigo
- **Intellisense**: Autocompletar e validacao no editor

### Estrutura:
\`\`\`
src/
├── data/
│   ├── commands/
│   │   ├── git.ts
│   │   ├── sql.ts
│   │   └── docker.ts
│   ├── tools.ts
│   ├── roadmap.ts
│   └── index.ts
\`\`\`
`,
    consequences: `
## Consequencias

### Positivas:
- Dados tipados e validados
- Facil de editar e manter
- Performance maxima (estatico)
- Sem dependencias externas

### Negativas:
- Requer rebuild para mudancas
- Nao adequado para dados dinamicos
- Sem interface de edicao

### Evolucao futura:
- Migrar para CMS se necessario
- Adicionar validacao runtime
- Implementar hot-reload de dados
`,
    category: 'Data',
    tags: ['typescript', 'data', 'architecture', 'static']
  }
];