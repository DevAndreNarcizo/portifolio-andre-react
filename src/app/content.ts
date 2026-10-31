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
