export const expandedTools = [
  // Ferramentas de IA (5)
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    category: 'Ferramentas de IA',
    description: 'Assistente de código com IA da OpenAI',
    url: 'https://github.com/features/copilot',
    tags: ['ia', 'produtividade', 'vscode'],
    free: false,
    rating: 5,
    notes: 'Essencial para acelerar desenvolvimento.'
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'Ferramentas de IA',
    description: 'Assistente de IA para programação',
    url: 'https://chat.openai.com',
    tags: ['ia', 'debug', 'aprendizado'],
    free: true,
    rating: 5
  },
  {
    id: 'tabnine',
    name: 'Tabnine',
    category: 'Ferramentas de IA',
    description: 'Autocompletar código com IA',
    url: 'https://www.tabnine.com',
    tags: ['ia', 'autocompletar', 'vscode'],
    free: true,
    rating: 4
  },
  {
    id: 'codeium',
    name: 'Codeium',
    category: 'Ferramentas de IA',
    description: 'Assistente de código gratuito com IA',
    url: 'https://codeium.com',
    tags: ['ia', 'gratuito', 'autocompletar'],
    free: true,
    rating: 4
  },
  {
    id: 'claude',
    name: 'Claude AI',
    category: 'Ferramentas de IA',
    description: 'IA conversacional da Anthropic para programação',
    url: 'https://claude.ai',
    tags: ['ia', 'conversacional', 'código'],
    free: true,
    rating: 4
  },

  // Editores de Código (6)
  {
    id: 'vscode',
    name: 'Visual Studio Code',
    category: 'Editores de Código',
    description: 'Editor de código mais popular para desenvolvimento',
    url: 'https://code.visualstudio.com',
    tags: ['editor', 'desenvolvimento', 'microsoft'],
    free: true,
    rating: 5
  },
  {
    id: 'webstorm',
    name: 'WebStorm',
    category: 'Editores de Código',
    description: 'IDE poderosa da JetBrains para JavaScript',
    url: 'https://www.jetbrains.com/webstorm',
    tags: ['ide', 'javascript', 'jetbrains'],
    free: false,
    rating: 5
  },
  {
    id: 'sublime-text',
    name: 'Sublime Text',
    category: 'Editores de Código',
    description: 'Editor de texto rápido e elegante',
    url: 'https://www.sublimetext.com',
    tags: ['editor', 'rápido', 'leve'],
    free: false,
    rating: 4
  },
  {
    id: 'vim',
    name: 'Vim',
    category: 'Editores de Código',
    description: 'Editor de texto modal altamente configurável',
    url: 'https://www.vim.org',
    tags: ['editor', 'terminal', 'modal'],
    free: true,
    rating: 4
  },
  {
    id: 'neovim',
    name: 'Neovim',
    category: 'Editores de Código',
    description: 'Versão moderna e extensível do Vim',
    url: 'https://neovim.io',
    tags: ['editor', 'vim', 'moderno'],
    free: true,
    rating: 4
  },
  {
    id: 'cursor',
    name: 'Cursor',
    category: 'Editores de Código',
    description: 'Editor de código com IA integrada',
    url: 'https://cursor.sh',
    tags: ['editor', 'ia', 'moderno'],
    free: true,
    rating: 4
  },

  // Design (8)
  {
    id: 'figma',
    name: 'Figma',
    category: 'Design',
    description: 'Ferramenta de design colaborativo',
    url: 'https://www.figma.com',
    tags: ['design', 'protótipo', 'colaborativo'],
    free: true,
    rating: 5
  },
  {
    id: 'coolors',
    name: 'Coolors',
    category: 'Design',
    description: 'Gerador de paletas de cores',
    url: 'https://coolors.co',
    tags: ['cores', 'design', 'ui'],
    free: true,
    rating: 4
  },
  {
    id: 'gradient-generator',
    name: 'CSS Gradient Generator',
    category: 'Design',
    description: 'Gerador de gradientes CSS',
    url: 'https://cssgradient.io',
    tags: ['css', 'gradiente', 'design'],
    free: true,
    rating: 4
  },
  {
    id: 'svg-backgrounds',
    name: 'SVG Backgrounds',
    category: 'Design',
    description: 'Backgrounds SVG customizáveis',
    url: 'https://www.svgbackgrounds.com',
    tags: ['svg', 'background', 'design'],
    free: true,
    rating: 4
  },
  {
    id: 'canva',
    name: 'Canva',
    category: 'Design',
    description: 'Plataforma de design gráfico online',
    url: 'https://www.canva.com',
    tags: ['design', 'gráfico', 'templates'],
    free: true,
    rating: 4
  },
  {
    id: 'adobe-xd',
    name: 'Adobe XD',
    category: 'Design',
    description: 'Ferramenta de design e prototipagem da Adobe',
    url: 'https://www.adobe.com/products/xd.html',
    tags: ['design', 'adobe', 'protótipo'],
    free: true,
    rating: 4
  },
  {
    id: 'sketch',
    name: 'Sketch',
    category: 'Design',
    description: 'Ferramenta de design digital para Mac',
    url: 'https://www.sketch.com',
    tags: ['design', 'mac', 'ui'],
    free: false,
    rating: 4
  },
  {
    id: 'framer',
    name: 'Framer',
    category: 'Design',
    description: 'Ferramenta de design e prototipagem interativa',
    url: 'https://www.framer.com',
    tags: ['design', 'protótipo', 'interativo'],
    free: true,
    rating: 4
  },

  // Extensões do Navegador (8)
  {
    id: 'react-devtools',
    name: 'React Developer Tools',
    category: 'Extensões do Navegador',
    description: 'Extensão para debug de aplicações React',
    url: 'https://chrome.google.com/webstore/detail/react-developer-tools',
    tags: ['react', 'debug', 'chrome'],
    free: true,
    rating: 5
  },
  {
    id: 'json-viewer',
    name: 'JSON Viewer',
    category: 'Extensões do Navegador',
    description: 'Visualizador de JSON formatado no navegador',
    url: 'https://chrome.google.com/webstore/detail/json-viewer',
    tags: ['json', 'api', 'debug'],
    free: true,
    rating: 4
  },
  {
    id: 'whatfont',
    name: 'WhatFont',
    category: 'Extensões do Navegador',
    description: 'Identificar fontes em sites',
    url: 'https://chrome.google.com/webstore/detail/whatfont',
    tags: ['fonte', 'design', 'chrome'],
    free: true,
    rating: 4
  },
  {
    id: 'lighthouse',
    name: 'Lighthouse',
    category: 'Extensões do Navegador',
    description: 'Auditoria de performance e SEO',
    url: 'https://chrome.google.com/webstore/detail/lighthouse',
    tags: ['performance', 'seo', 'auditoria'],
    free: true,
    rating: 5
  },
  {
    id: 'wappalyzer',
    name: 'Wappalyzer',
    category: 'Extensões do Navegador',
    description: 'Identificar tecnologias usadas em sites',
    url: 'https://www.wappalyzer.com',
    tags: ['tecnologia', 'análise', 'stack'],
    free: true,
    rating: 4
  },
  {
    id: 'colorpick-eyedropper',
    name: 'ColorPick Eyedropper',
    category: 'Extensões do Navegador',
    description: 'Capturar cores de qualquer site',
    url: 'https://chrome.google.com/webstore/detail/colorpick-eyedropper',
    tags: ['cores', 'design', 'eyedropper'],
    free: true,
    rating: 4
  },
  {
    id: 'web-developer',
    name: 'Web Developer',
    category: 'Extensões do Navegador',
    description: 'Conjunto de ferramentas para desenvolvedores web',
    url: 'https://chrome.google.com/webstore/detail/web-developer',
    tags: ['desenvolvimento', 'ferramentas', 'web'],
    free: true,
    rating: 4
  },
  {
    id: 'axe-devtools',
    name: 'axe DevTools',
    category: 'Extensões do Navegador',
    description: 'Teste de acessibilidade automático',
    url: 'https://chrome.google.com/webstore/detail/axe-devtools',
    tags: ['acessibilidade', 'a11y', 'teste'],
    free: true,
    rating: 4
  },

  // Documentação (6)
  {
    id: 'devdocs',
    name: 'DevDocs.io',
    category: 'Documentação',
    description: 'Documentação offline de múltiplas tecnologias',
    url: 'https://devdocs.io',
    tags: ['documentação', 'offline', 'referência'],
    free: true,
    rating: 5
  },
  {
    id: 'mdn',
    name: 'MDN Web Docs',
    category: 'Documentação',
    description: 'Documentação oficial web da Mozilla',
    url: 'https://developer.mozilla.org',
    tags: ['documentação', 'web', 'referência'],
    free: true,
    rating: 5
  },
  {
    id: 'w3schools',
    name: 'W3Schools',
    category: 'Documentação',
    description: 'Tutoriais e referências web',
    url: 'https://www.w3schools.com',
    tags: ['tutorial', 'referência', 'web'],
    free: true,
    rating: 4
  },
  {
    id: 'stackoverflow',
    name: 'Stack Overflow',
    category: 'Documentação',
    description: 'Comunidade de perguntas e respostas para programadores',
    url: 'https://stackoverflow.com',
    tags: ['comunidade', 'qa', 'programação'],
    free: true,
    rating: 5
  },
  {
    id: 'github-docs',
    name: 'GitHub Docs',
    category: 'Documentação',
    description: 'Documentação oficial do GitHub',
    url: 'https://docs.github.com',
    tags: ['github', 'git', 'documentação'],
    free: true,
    rating: 4
  },
  {
    id: 'readme-so',
    name: 'readme.so',
    category: 'Documentação',
    description: 'Gerador de README.md para projetos',
    url: 'https://readme.so',
    tags: ['readme', 'documentação', 'gerador'],
    free: true,
    rating: 4
  },

  // Teste de API (4)
  {
    id: 'postman',
    name: 'Postman',
    category: 'Teste de API',
    description: 'Plataforma para desenvolvimento de APIs',
    url: 'https://www.postman.com',
    tags: ['api', 'testing', 'desenvolvimento'],
    free: true,
    rating: 5
  },
  {
    id: 'insomnia',
    name: 'Insomnia',
    category: 'Teste de API',
    description: 'Cliente REST alternativo ao Postman',
    url: 'https://insomnia.rest',
    tags: ['api', 'rest', 'testing'],
    free: true,
    rating: 4
  },
  {
    id: 'thunder-client',
    name: 'Thunder Client',
    category: 'Teste de API',
    description: 'Cliente REST para VS Code',
    url: 'https://www.thunderclient.com',
    tags: ['api', 'vscode', 'rest'],
    free: true,
    rating: 4
  },
  {
    id: 'hoppscotch',
    name: 'Hoppscotch',
    category: 'Teste de API',
    description: 'Cliente API open-source baseado na web',
    url: 'https://hoppscotch.io',
    tags: ['api', 'opensource', 'web'],
    free: true,
    rating: 4
  },

  // Controle de Versão (4)
  {
    id: 'git',
    name: 'Git',
    category: 'Controle de Versão',
    description: 'Sistema de controle de versão distribuído',
    url: 'https://git-scm.com',
    tags: ['git', 'versionamento', 'colaboração'],
    free: true,
    rating: 5
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Controle de Versão',
    description: 'Plataforma de hospedagem de código com Git',
    url: 'https://github.com',
    tags: ['git', 'repositório', 'colaboração'],
    free: true,
    rating: 5
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    category: 'Controle de Versão',
    description: 'Plataforma DevOps completa com Git',
    url: 'https://gitlab.com',
    tags: ['git', 'devops', 'ci/cd'],
    free: true,
    rating: 4
  },
  {
    id: 'sourcetree',
    name: 'Sourcetree',
    category: 'Controle de Versão',
    description: 'Cliente Git visual gratuito',
    url: 'https://www.sourcetreeapp.com',
    tags: ['git', 'visual', 'cliente'],
    free: true,
    rating: 4
  },

  // Deploy e Hospedagem (6)
  {
    id: 'netlify',
    name: 'Netlify',
    category: 'Deploy e Hospedagem',
    description: 'Plataforma para deploy de sites estáticos',
    url: 'https://www.netlify.com',
    tags: ['deploy', 'hospedagem', 'jamstack'],
    free: true,
    rating: 5
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'Deploy e Hospedagem',
    description: 'Plataforma otimizada para frameworks frontend',
    url: 'https://vercel.com',
    tags: ['deploy', 'nextjs', 'frontend'],
    free: true,
    rating: 5
  },
  {
    id: 'heroku',
    name: 'Heroku',
    category: 'Deploy e Hospedagem',
    description: 'Plataforma cloud para deploy de aplicações',
    url: 'https://www.heroku.com',
    tags: ['deploy', 'cloud', 'paas'],
    free: true,
    rating: 4
  },
  {
    id: 'railway',
    name: 'Railway',
    category: 'Deploy e Hospedagem',
    description: 'Plataforma moderna para deploy de aplicações',
    url: 'https://railway.app',
    tags: ['deploy', 'moderno', 'simples'],
    free: true,
    rating: 4
  },
  {
    id: 'render',
    name: 'Render',
    category: 'Deploy e Hospedagem',
    description: 'Plataforma cloud unificada para apps e sites',
    url: 'https://render.com',
    tags: ['deploy', 'cloud', 'unificado'],
    free: true,
    rating: 4
  },
  {
    id: 'github-pages',
    name: 'GitHub Pages',
    category: 'Deploy e Hospedagem',
    description: 'Hospedagem gratuita de sites estáticos pelo GitHub',
    url: 'https://pages.github.com',
    tags: ['deploy', 'github', 'estático'],
    free: true,
    rating: 4
  },

  // Produtividade (8)
  {
    id: 'notion',
    name: 'Notion',
    category: 'Produtividade',
    description: 'Workspace all-in-one para notas e projetos',
    url: 'https://www.notion.so',
    tags: ['notas', 'produtividade', 'workspace'],
    free: true,
    rating: 5
  },
  {
    id: 'obsidian',
    name: 'Obsidian',
    category: 'Produtividade',
    description: 'Aplicativo de notas com links bidirecionais',
    url: 'https://obsidian.md',
    tags: ['notas', 'conhecimento', 'markdown'],
    free: true,
    rating: 4
  },
  {
    id: 'trello',
    name: 'Trello',
    category: 'Produtividade',
    description: 'Ferramenta de gerenciamento de projetos com boards',
    url: 'https://trello.com',
    tags: ['projetos', 'kanban', 'organização'],
    free: true,
    rating: 4
  },
  {
    id: 'todoist',
    name: 'Todoist',
    category: 'Produtividade',
    description: 'Gerenciador de tarefas e produtividade',
    url: 'https://todoist.com',
    tags: ['tarefas', 'produtividade', 'gtd'],
    free: true,
    rating: 4
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'Produtividade',
    description: 'Plataforma de comunicação para equipes',
    url: 'https://slack.com',
    tags: ['comunicação', 'equipe', 'chat'],
    free: true,
    rating: 4
  },
  {
    id: 'discord',
    name: 'Discord',
    category: 'Produtividade',
    description: 'Plataforma de comunicação para comunidades',
    url: 'https://discord.com',
    tags: ['comunicação', 'comunidade', 'voz'],
    free: true,
    rating: 4
  },
  {
    id: 'linear',
    name: 'Linear',
    category: 'Produtividade',
    description: 'Ferramenta moderna de gerenciamento de issues',
    url: 'https://linear.app',
    tags: ['issues', 'projetos', 'moderno'],
    free: true,
    rating: 4
  },
  {
    id: 'clickup',
    name: 'ClickUp',
    category: 'Produtividade',
    description: 'Plataforma all-in-one de produtividade',
    url: 'https://clickup.com',
    tags: ['produtividade', 'projetos', 'all-in-one'],
    free: true,
    rating: 4
  },

  // Monitoramento e Analytics (5)
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    category: 'Monitoramento e Analytics',
    description: 'Plataforma de análise de tráfego web',
    url: 'https://analytics.google.com',
    tags: ['analytics', 'tráfego', 'google'],
    free: true,
    rating: 5
  },
  {
    id: 'hotjar',
    name: 'Hotjar',
    category: 'Monitoramento e Analytics',
    description: 'Heatmaps e gravações de sessões de usuários',
    url: 'https://www.hotjar.com',
    tags: ['heatmap', 'ux', 'comportamento'],
    free: true,
    rating: 4
  },
  {
    id: 'sentry',
    name: 'Sentry',
    category: 'Monitoramento e Analytics',
    description: 'Monitoramento de erros em aplicações',
    url: 'https://sentry.io',
    tags: ['erros', 'monitoramento', 'debug'],
    free: true,
    rating: 4
  },
  {
    id: 'uptime-robot',
    name: 'UptimeRobot',
    category: 'Monitoramento e Analytics',
    description: 'Monitoramento de uptime de sites',
    url: 'https://uptimerobot.com',
    tags: ['uptime', 'monitoramento', 'disponibilidade'],
    free: true,
    rating: 4
  },
  {
    id: 'plausible',
    name: 'Plausible Analytics',
    category: 'Monitoramento e Analytics',
    description: 'Analytics simples e focado em privacidade',
    url: 'https://plausible.io',
    tags: ['analytics', 'privacidade', 'simples'],
    free: false,
    rating: 4
  }
];