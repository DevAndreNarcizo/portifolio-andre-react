import type {
  Project,
  Service,
  StackGroup,
  TechMarqueeItem
} from './types';

export const contactInfo = {
  email: 'dev.andrenarcizo@outlook.com',
  whatsapp: '+55 62 98557-9319',
  whatsappLink: 'https://wa.me/5562985579319',
  linkedin: 'https://www.linkedin.com/in/andrenarcizo/',
  github: 'https://github.com/DevAndreNarcizo',
  instagram: 'https://instagram.com/dev.andre_narcizo',
  instagramUser: '@dev.andre_narcizo'
};

export const heroTechs: TechMarqueeItem[] = [
  { name: 'Laravel' },
  { name: 'PHP' },
  { name: 'Angular' },
  { name: 'React' },
  { name: 'TypeScript' },
  { name: 'Flutter' },
  { name: 'Docker' },
  { name: 'PostgreSQL' },
  { name: 'MySQL' },
  { name: 'Supabase' },
  { name: 'GitHub Actions' },
  { name: 'Clean Architecture' }
];

export const services: Service[] = [
  {
    id: 1,
    title: {
      pt: 'Sites & Landing Pages',
      en: 'Websites & Landing Pages'
    },
    description: {
      pt: 'Para profissionais e empresas que precisam explicar sua oferta, gerar confiança e levar o cliente para o contato certo.',
      en: 'For professionals and businesses that need to communicate their value proposition, build trust, and convert visitors.'
    },
    icon: 'layout'
  },
  {
    id: 2,
    title: {
      pt: 'Aplicações Web',
      en: 'Web Applications'
    },
    description: {
      pt: 'Dashboards, painéis administrativos, sistemas CRUD, relatórios e integrações para processos internos.',
      en: 'Dashboards, admin panels, CRUD systems, reports, and integrations for internal processes.'
    },
    icon: 'layers'
  },
  {
    id: 3,
    title: {
      pt: 'Aplicativos Mobile',
      en: 'Mobile Apps'
    },
    description: {
      pt: 'Aplicações mobile com Flutter para validar produto, atendimento, operação ou experiência do cliente.',
      en: 'Mobile applications with Flutter for product validation, customer service, operations, or user experience.'
    },
    icon: 'smartphone'
  },
  {
    id: 4,
    title: {
      pt: 'APIs, Dados & Automação',
      en: 'APIs, Data & Automation'
    },
    description: {
      pt: 'Backends em Laravel/Node/Python, integrações, PostgreSQL/Supabase e automações com IA.',
      en: 'Backends in Laravel/Node/Python, integrations, PostgreSQL/Supabase, and AI-powered automation.'
    },
    icon: 'settings'
  }
];

export const caseStudyProjects: Project[] = [
  {
    id: 201,
    title: 'MyFinance Platform',
    image: '/Imagens/myfinance-platform.webp',
    liveLink: 'https://my-finance-ebon-one.vercel.app/',
    githubLink: 'https://github.com/DevAndreNarcizo/myfinance-platform',
    tags: ['React', 'Node.js', 'Flutter', 'PostgreSQL', 'JWT'],
    tier: 'saas',
    summary: {
      pt: 'Estudo de caso de uma plataforma financeira full-stack para web e mobile, com autenticação, dados relacionais e importação assistida por IA.',
      en: 'Case study of a full-stack financial platform for web and mobile, featuring authentication, relational data, and AI-assisted imports.'
    },
    stack: 'React, Node.js, Express, Flutter, Supabase, PostgreSQL, JWT',
    role: {
      pt: 'Modelagem de produto, arquitetura full-stack, API, mobile e documentação',
      en: 'Product modeling, full-stack architecture, API, mobile, and documentation'
    },
    problem: {
      pt: 'Centralizar receitas, despesas, dívidas, metas e documentos financeiros de um núcleo familiar.',
      en: 'Centralize household income, expenses, debts, goals, and financial documents.'
    },
    solution: {
      pt: 'Clientes React e Flutter consumindo uma API Node.js, com PostgreSQL, JWT e isolamento dos dados por núcleo familiar.',
      en: 'React and Flutter clients consuming a Node.js API with PostgreSQL, JWT, and household-based data isolation.'
    },
    result: {
      pt: 'Demonstra domínio de produto, autenticação, dados relacionais, integração com IA e entrega multiplataforma.',
      en: 'Demonstrates product ownership, authentication, relational data, AI integration, and cross-platform delivery.'
    }
  },
  {
    id: 202,
    title: 'HunterAI Platform',
    image: '/Imagens/hunter-ai-platform.webp',
    githubLink: 'https://github.com/DevAndreNarcizo/hunter-ai-platform',
    tags: ['Next.js', 'Node.js', 'FastAPI', 'PostgreSQL', 'Redis'],
    tier: 'enterprise',
    summary: {
      pt: 'Estudo de caso de arquitetura SaaS B2B para aquisição e qualificação de leads com processamento assíncrono e governança de abordagem.',
      en: 'B2B SaaS architecture case study for lead acquisition and qualification with asynchronous processing and outreach governance.'
    },
    stack: 'Next.js, Node.js, TypeScript, FastAPI, PostgreSQL, Redis',
    role: {
      pt: 'Decomposição do sistema, limites de domínio, arquitetura assíncrona e roadmap',
      en: 'System decomposition, domain boundaries, asynchronous architecture, and roadmap'
    },
    problem: {
      pt: 'Organizar captura, qualificação e abordagem de leads sem acoplar fluxos sensíveis ao processamento síncrono.',
      en: 'Organize lead capture, qualification, and outreach without coupling sensitive workflows to synchronous processing.'
    },
    solution: {
      pt: 'Arquitetura evolutiva com web, API, worker Python, PostgreSQL e Redis, preservando aprovação manual em comunicações sensíveis.',
      en: 'Evolvable architecture with web, API, Python worker, PostgreSQL, and Redis, preserving manual approval for sensitive communication.'
    },
    result: {
      pt: 'Demonstra decisões pragmáticas sobre SaaS, filas, conformidade e evolução de um monólito modular.',
      en: 'Demonstrates pragmatic decisions around SaaS, queues, compliance, and modular-monolith evolution.'
    }
  }
];

export const projects: Project[] = [
  {
    id: 1,
    title: 'Agenda-Fácil',
    image: '/Imagens/AgendaFacil-new.png',
    liveLink: 'https://agenda-facil.vercel.app/',
    githubLink: 'https://github.com/DevAndreNarcizo/Agenda_Facil',
    tags: ['React 19', 'Supabase', 'TypeScript', 'SaaS'],
    tier: 'saas',
    summary: {
      pt: 'Aplicação full-stack para criação, edição e gestão de agendamentos com interface responsiva.',
      en: 'Full-stack application for creating, editing, and managing appointments through a responsive interface.'
    },
    stack: 'React 19, Supabase, TypeScript',
    role: {
      pt: 'Produto, frontend, banco de dados e fluxo de agendamento',
      en: 'Product, frontend, database, scheduling flow'
    },
    problem: {
      pt: 'Pequenos negócios precisam organizar seus agendamentos sem depender de planilhas.',
      en: 'Small businesses need to organize appointments without relying on spreadsheets.'
    },
    solution: {
      pt: 'Agendamento digital com cadastro, horários disponíveis e uma base sólida de gestão.',
      en: 'Digital scheduling with registration, time slots, and management foundation.'
    },
    result: {
      pt: 'Modelagem de produto SaaS, autenticação e UX para o fluxo recorrente do usuário.',
      en: 'SaaS product modeling, authentication, and recurring user flow UX.'
    }
  },
  {
    id: 2,
    title: 'Fin-Assist',
    image: '/Imagens/Fin-Assist.jpg',
    liveLink: '',
    githubLink: 'https://github.com/DevAndreNarcizo/Fin-Assist',
    tags: ['Python', 'Machine Learning', 'AI'],
    tier: 'web',
    summary: {
      pt: 'Aplicação de finanças pessoais com machine learning, análise de gastos e assistente conversacional.',
      en: 'Personal finance application with machine learning, spending analysis, and a conversational assistant.'
    },
    stack: 'Python, PyTorch, FastAPI, Gemini',
    role: {
      pt: 'Produto, modelagem, UI e treinamento do modelo',
      en: 'Product, modeling, UI, model training'
    },
    problem: {
      pt: 'Falta de ferramentas acessíveis que unam educação financeira e inteligência artificial.',
      en: 'Lack of accessible tools combining financial education with AI.'
    },
    solution: {
      pt: 'Aplicação com categorização, previsão de gastos, detecção de anomalias e suporte conversacional.',
      en: 'Application with categorization, spending prediction, anomaly detection, and conversational support.'
    },
    result: {
      pt: 'Ponte entre a pesquisa acadêmica (TCC), Python e uma visão de produto financeiro real.',
      en: 'Bridge between academic research (TCC), Python, and real-world financial product vision.'
    }
  },
  {
    id: 3,
    title: 'Ecommerce Luz da Aurora',
    image: '/Imagens/Luz da Aurora.png',
    liveLink: 'https://luzdaaurora.shop/',
    githubLink: '',
    tags: ['React', 'Express', 'Supabase', 'PostgreSQL'],
    tier: 'web',
    summary: {
      pt: 'Plataforma completa de e-commerce — catálogo, carrinho, checkout e painel administrativo para uma loja real.',
      en: 'Full ecommerce platform — catalog, cart, checkout, and admin panel for a real store.'
    },
    stack: 'React, Express, Supabase, PostgreSQL',
    role: {
      pt: 'Frontend, backend, banco de dados e integração de pagamentos',
      en: 'Frontend, backend, database, payment integration'
    },
    problem: {
      pt: 'Loja física precisava de presença digital com catálogo e checkout.',
      en: 'Physical store needed digital presence with catalog and checkout.'
    },
    solution: {
      pt: 'E-commerce completo com catálogo, carrinho, checkout e painel administrativo.',
      en: 'Complete ecommerce with catalog, cart, checkout, and admin dashboard.'
    },
    result: {
      pt: 'Entrega de loja funcional com experiência prática no fluxo de vendas online.',
      en: 'Functional store delivery with hands-on online sales flow experience.'
    }
  }
];

export const architectureProjects: Project[] = [
  {
    id: 101,
    title: 'laravel-clean-architecture-api',
    image: '/Imagens/laravel-clean-architecture-api.webp',
    githubLink: 'https://github.com/DevAndreNarcizo/laravel-clean-architecture-api',
    tags: ['Laravel 11', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Docker', 'PHPUnit'],
    tier: 'enterprise',
    summary: {
      pt: 'API Laravel organizada com Clean Architecture, limites de domínio claros, Docker e automação de validação.',
      en: 'Laravel API organized with Clean Architecture, clear domain boundaries, Docker, and automated validation.'
    },
    stack: 'Laravel 11, PostgreSQL, Redis, RabbitMQ, Docker, PHPUnit, GitHub Actions',
    role: {
      pt: 'Arquitetura, backend, testes e DevOps',
      en: 'Architecture, backend, tests, DevOps'
    },
    problem: {
      pt: 'Demonstrar arquitetura de backend de nível produção, indo além de controllers CRUD.',
      en: 'Demonstrate production-grade backend architecture beyond CRUD controllers.'
    },
    solution: {
      pt: 'Arquitetura em camadas (Domain/Application/Infrastructure/Interface) com mensageria orientada a eventos e testes abrangentes.',
      en: 'Layered architecture (Domain/Application/Infrastructure/Interface) with event-driven messaging and comprehensive tests.'
    },
    result: {
      pt: 'Demonstra organização de backend, separação de responsabilidades, testes e práticas de entrega.',
      en: 'Demonstrates backend organization, separation of concerns, testing, and delivery practices.'
    }
  },
  {
    id: 102,
    title: 'node-microservices-event-driven',
    image: '/Imagens/node-microservices-event-driven.webp',
    githubLink: 'https://github.com/DevAndreNarcizo/node-microservices-event-driven',
    tags: ['Node.js', 'NestJS', 'MongoDB', 'RabbitMQ', 'Docker', 'Jest'],
    tier: 'enterprise',
    summary: {
      pt: 'Microsserviços orientados a eventos com RabbitMQ — Order Service e Notification Service.',
      en: 'Event-driven microservices with RabbitMQ — Order Service and Notification Service.'
    },
    stack: 'Node.js, NestJS, MongoDB, RabbitMQ, Docker Compose, Jest, Prometheus',
    role: {
      pt: 'Sistemas distribuídos, mensageria, testes e DevOps',
      en: 'Distributed systems, messaging, tests, DevOps'
    },
    problem: {
      pt: 'Comprovar o domínio de sistemas distribuídos e arquitetura orientada a eventos.',
      en: 'Prove understanding of distributed systems and event-driven architecture.'
    },
    solution: {
      pt: 'Dois serviços independentes que se comunicam exclusivamente via RabbitMQ, com health checks, correlation IDs e logging estruturado.',
      en: 'Two independent services communicating exclusively via RabbitMQ with health checks, correlation IDs, and structured logging.'
    },
    result: {
      pt: 'Demonstração de padrões de microsserviços, comunicação assíncrona e observabilidade de serviços.',
      en: 'Demonstrating microservices patterns, async communication, and service observability.'
    }
  },
  {
    id: 103,
    title: 'saas-task-manager',
    image: '',
    githubLink: 'https://github.com/DevAndreNarcizo/saas-task-manager',
    tags: ['Next.js 14', 'TypeScript', 'Stripe', 'PostgreSQL', 'Redis'],
    tier: 'enterprise',
    summary: {
      pt: 'SaaS full-stack com assinaturas via Stripe, RBAC e atualizações em tempo real — publicado e funcional.',
      en: 'Full-stack SaaS with Stripe subscriptions, RBAC, and real-time updates — deployed and functional.'
    },
    stack: 'Next.js 14, TypeScript, Tailwind, NestJS, PostgreSQL, Redis, Stripe, Docker',
    role: {
      pt: 'Full-stack, pagamentos, autenticação e deploy',
      en: 'Full-stack, payments, auth, deployment'
    },
    problem: {
      pt: 'Propriedade de um produto SaaS de ponta a ponta — do código ao pagamento e ao deploy.',
      en: 'End-to-end SaaS product ownership from code to payment to deployment.'
    },
    solution: {
      pt: 'Gerenciador de tarefas freemium com Stripe Checkout, webhooks, controle de acesso por papéis e atualizações em tempo real.',
      en: 'Freemium task manager with Stripe Checkout, webhooks, role-based access, and real-time updates.'
    },
    result: {
      pt: 'SaaS no ar demonstrando o ciclo de vida completo do produto e integração de pagamentos.',
      en: 'Live SaaS demonstrating full product lifecycle and payment integration.'
    }
  },
  {
    id: 104,
    title: 'php-code-analyzer',
    image: '',
    githubLink: 'https://github.com/DevAndreNarcizo/php-code-analyzer',
    tags: ['PHP', 'CLI', 'Open Source', 'Static Analysis'],
    tier: 'enterprise',
    summary: {
      pt: 'CLI open-source que analisa projetos PHP/Laravel e gera relatórios de qualidade.',
      en: 'Open-source CLI that analyzes PHP/Laravel projects and generates quality reports.'
    },
    stack: 'PHP, PHPUnit, GitHub Actions, Packagist',
    role: {
      pt: 'Autor, arquitetura, testes e CI/CD',
      en: 'Author, architecture, tests, CI/CD'
    },
    problem: {
      pt: 'Lacuna em contribuição open-source — nada publicado no Packagist ou npm.',
      en: 'Open-source contribution gap — nothing published on Packagist or npm.'
    },
    solution: {
      pt: 'Ferramenta CLI que mede complexidade ciclomática, violações de SOLID, cobertura de tipos e cobertura de testes.',
      en: 'CLI tool measuring cyclomatic complexity, SOLID violations, type coverage, and test coverage.'
    },
    result: {
      pt: 'Pacote publicado que demonstra contribuição com a comunidade e padrões de qualidade de código.',
      en: 'Published package demonstrating community contribution and code quality standards.'
    }
  }
];

export const landingPages: Project[] = [
  {
    id: 4,
    title: 'Clinica Thaysa Medeiros',
    image: '/Imagens/ClinicaThaysa.png',
    githubLink: 'https://github.com/DevAndreNarcizo/Clinica-Thaysa-Medeiros',
    tags: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    tier: 'landing',
    summary: {
      pt: 'Site institucional premium para clínica de estética e bem-estar.',
      en: 'Premium institutional website for aesthetics and wellness clinic.'
    },
    stack: 'Next.js, Tailwind CSS, Framer Motion',
    role: {
      pt: 'Design, frontend, animações e deploy',
      en: 'Design, frontend, animations, deploy'
    },
    problem: {
      pt: 'A clínica precisava de autoridade digital e conversão de novos clientes.',
      en: 'Clinic needed digital authority and new client conversion.'
    },
    solution: {
      pt: 'Interface premium focada em sofisticação, serviços e na jornada de agendamento.',
      en: 'Premium interface focused on luxury, services, and booking journey.'
    },
    result: {
      pt: 'Posicionamento de marca elevado e site otimizado para mobile.',
      en: 'Elevated brand positioning and mobile-optimized site.'
    }
  },
  {
    id: 5,
    title: 'Thais Sousa - Nail Designer',
    image: '/Imagens/ThaisSousa.png',
    githubLink: 'https://github.com/DevAndreNarcizo/ThaisSousa-NailDesigner',
    tags: ['React', 'Tailwind CSS', 'Responsive'],
    tier: 'landing',
    summary: {
      pt: 'Landing page para nail designer com portfólio e agendamento.',
      en: 'Landing page for nail designer with portfolio and booking.'
    },
    stack: 'React, Tailwind CSS, Vite',
    role: {
      pt: 'Design, frontend e deploy',
      en: 'Design, frontend, deploy'
    },
    problem: {
      pt: 'Profissional autônoma sem presença digital para atrair clientes.',
      en: 'Independent professional without digital presence to attract clients.'
    },
    solution: {
      pt: 'Landing page visual com galeria de trabalhos e foco em conversão.',
      en: 'Visual landing page with work gallery and conversion focus.'
    },
    result: {
      pt: 'Template reutilizável para profissionais de beleza e estética.',
      en: 'Reusable template for beauty and aesthetics professionals.'
    }
  },
  {
    id: 6,
    title: 'Karen Bianca - Lash Designer',
    image: '/Imagens/KarenBianca.png',
    githubLink: 'https://github.com/DevAndreNarcizo/KarenBianca-LashDesigner',
    tags: ['React', 'Tailwind CSS', 'Responsive'],
    tier: 'landing',
    summary: {
      pt: 'Site profissional para lash designer com portfólio e contato.',
      en: 'Professional site for lash designer with portfolio and contact.'
    },
    stack: 'React, Tailwind CSS, Vite',
    role: {
      pt: 'Design, frontend e deploy',
      en: 'Design, frontend, deploy'
    },
    problem: {
      pt: 'A lash designer precisava de um site para mostrar seus trabalhos e receber agendamentos.',
      en: 'Lash designer needed a site to showcase work and receive bookings.'
    },
    solution: {
      pt: 'Página elegante com galeria, depoimentos e CTA para WhatsApp.',
      en: 'Elegant page with gallery, testimonials, and WhatsApp CTA.'
    },
    result: {
      pt: 'Presença digital que converte visitantes em clientes agendados.',
      en: 'Digital presence that converts visitors into booked clients.'
    }
  }
];

export const stackGroups: StackGroup[] = [
  {
    category: 'Backend & APIs',
    items: 'Laravel, PHP, Node.js, Express, NestJS, Python, FastAPI',
    icon: 'server'
  },
  {
    category: 'Frontend',
    items: 'React, Next.js, Angular, TypeScript, Vite, Tailwind CSS',
    icon: 'layout'
  },
  {
    category: 'Mobile',
    items: 'Flutter, Dart',
    icon: 'smartphone'
  },
  {
    category: 'Data & Cache',
    items: 'PostgreSQL, MySQL, MongoDB, Redis, Supabase',
    icon: 'database'
  },
  {
    category: 'DevOps & Quality',
    items: 'Docker, Docker Compose, GitHub Actions, CI/CD',
    icon: 'terminal'
  },
  {
    category: 'Architecture & Practices',
    items: 'Clean Architecture, SOLID, BLoC, Event-Driven, Design Patterns',
    icon: 'layers'
  }
];

// Curadoria enxuta para recrutadores: estudos de caso e projetos verificáveis.
export const featuredProjects: Project[] = [
  caseStudyProjects[0],
  caseStudyProjects[1],
  projects[1],
  architectureProjects[1],
  architectureProjects[0],
  projects[0]
];
