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
