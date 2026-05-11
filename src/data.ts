import type { Project, Service, Note, ArchitecturePrinciple, StackGroup } from './types';

export interface Differential {
  title: string;
  description: string;
  icon: string;
}

export interface ProcessStep {
  title: string;
  description: string;
  icon: string;
}

export const contactInfo = {
  email: 'dev.andrenarcizo@gmail.com',
  whatsapp: '+55 62 99338-2881',
  whatsappLink: 'https://wa.me/5562993382881',
  linkedin: 'https://www.linkedin.com/in/andr%C3%A9-narcizo/',
  github: 'https://github.com/DevAndreNarcizo',
  instagram: 'https://instagram.com/dev.andre_narcizo',
  instagramUser: '@dev.andre_narcizo'
};

export const differentials: Differential[] = [
  {
    title: 'Product Engineering',
    description: 'I think like a product owner — technology must serve the business, not the other way around.',
    icon: 'briefcase'
  },
  {
    title: 'Architecture First',
    description: 'Every decision is documented. Scalability and maintainability are non-negotiable from day one.',
    icon: 'shield'
  },
  {
    title: 'Outcome Focus',
    description: 'Clean code, fast interfaces, and software that solves real problems — not just tickets.',
    icon: 'zap'
  }
];

export const processSteps: ProcessStep[] = [
  {
    title: '1. Discovery',
    description: 'Understanding the real problem before proposing any solution.',
    icon: 'search'
  },
  {
    title: '2. Architecture Proposal',
    description: 'Architecture, stack, and scope aligned with business goals.',
    icon: 'file-text'
  },
  {
    title: '3. Development',
    description: 'Clean code, organized commits, continuous delivery.',
    icon: 'code'
  },
  {
    title: '4. Review & Delivery',
    description: 'Tests, adjustments, and documentation for operations.',
    icon: 'check-square'
  }
];

export const services: Service[] = [
  {
    id: 1,
    title: 'Websites & Landing Pages',
    titleEn: 'Websites & Landing Pages',
    description: 'Para profissionais e empresas que precisam explicar sua oferta, gerar confiança e levar o cliente para o contato certo.',
    descriptionEn: 'For professionals and businesses that need to communicate their value proposition, build trust, and convert visitors.',
    icon: 'layout'
  },
  {
    id: 2,
    title: 'Web Applications',
    titleEn: 'Web Applications',
    description: 'Dashboards, admin panels, CRUD systems, reports, and integrations for internal processes.',
    descriptionEn: 'Dashboards, admin panels, CRUD systems, reports, and integrations for internal processes.',
    icon: 'layers'
  },
  {
    id: 3,
    title: 'Mobile Apps',
    titleEn: 'Mobile Apps',
    description: 'Aplicações mobile com Flutter para validar produto, atendimento, operação ou experiência do cliente.',
    descriptionEn: 'Mobile applications with Flutter for product validation, customer service, operations, or user experience.',
    icon: 'smartphone'
  },
  {
    id: 4,
    title: 'APIs, Data & Automation',
    titleEn: 'APIs, Data & Automation',
    description: 'Backends em Laravel/Node/Python, integrações, PostgreSQL/Supabase e automações com IA.',
    descriptionEn: 'Backends in Laravel/Node/Python, integrations, PostgreSQL/Supabase, and AI-powered automation.',
    icon: 'settings'
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
    summary: 'Micro-SaaS for appointment scheduling — production app with real users in beauty and local services.',
    stack: 'React 19, Supabase, TypeScript',
    role: 'Product, frontend, database, scheduling flow',
    problem: 'Small businesses need to organize appointments without relying on spreadsheets.',
    solution: 'Digital scheduling with registration, time slots, and management foundation.',
    result: 'SaaS product modeling, authentication, and recurring user flow UX.'
  },
  {
    id: 2,
    title: 'Fin-Assist',
    image: '/Imagens/Fin-Assist.jpg',
    liveLink: '',
    githubLink: 'https://github.com/DevAndreNarcizo/Fin-Assist',
    tags: ['Python', 'Machine Learning', 'AI'],
    tier: 'web',
    summary: 'AI/ML applied to financial education and personal finance management.',
    stack: 'Python, Scikit-learn, CustomTkinter',
    role: 'Product, modeling, UI, model training',
    problem: 'Lack of accessible tools combining financial education with AI.',
    solution: 'Desktop application with predictive model for financial health scoring.',
    result: 'Bridge between academic research (TCC), Python, and real-world financial product vision.'
  },
  {
    id: 3,
    title: 'Ecommerce Luz da Aurora',
    image: '/Imagens/Luz da Aurora.png',
    liveLink: 'https://luzdaaurora.shop/',
    githubLink: '',
    tags: ['React', 'Express', 'Supabase', 'PostgreSQL'],
    tier: 'web',
    summary: 'Full ecommerce platform — catalog, cart, checkout, and admin panel for a real store.',
    stack: 'React, Express, Supabase, PostgreSQL',
    role: 'Frontend, backend, database, payment integration',
    problem: 'Physical store needed digital presence with catalog and checkout.',
    solution: 'Complete ecommerce with catalog, cart, checkout, and admin dashboard.',
    result: 'Functional store delivery with hands-on online sales flow experience.'
  }
];

export const architectureProjects: Project[] = [
  {
    id: 101,
    title: 'laravel-clean-architecture-api',
    image: '',
    githubLink: 'https://github.com/DevAndreNarcizo/laravel-clean-architecture-api',
    tags: ['Laravel 11', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Docker', 'PHPUnit'],
    tier: 'enterprise',
    summary: 'Enterprise-grade REST API with Clean Architecture, 100+ tests, Docker, CI/CD, and async messaging.',
    stack: 'Laravel 11, PostgreSQL, Redis, RabbitMQ, Docker, PHPUnit, GitHub Actions',
    role: 'Architecture, backend, tests, DevOps',
    problem: 'Demonstrate production-grade backend architecture beyond CRUD controllers.',
    solution: 'Layered architecture (Domain/Application/Infrastructure/Interface) with event-driven messaging and comprehensive tests.',
    result: 'Recruiter-ready proof of enterprise backend engineering and DevOps skills.'
  },
  {
    id: 102,
    title: 'node-microservices-event-driven',
    image: '',
    githubLink: 'https://github.com/DevAndreNarcizo/node-microservices-event-driven',
    tags: ['Node.js', 'NestJS', 'MongoDB', 'RabbitMQ', 'Docker', 'Jest'],
    tier: 'enterprise',
    summary: 'Event-driven microservices with RabbitMQ — Order Service and Notification Service.',
    stack: 'Node.js, NestJS, MongoDB, RabbitMQ, Docker Compose, Jest, Prometheus',
    role: 'Distributed systems, messaging, tests, DevOps',
    problem: 'Prove understanding of distributed systems and event-driven architecture.',
    solution: 'Two independent services communicating exclusively via RabbitMQ with health checks, correlation IDs, and structured logging.',
    result: 'Demonstrating microservices patterns, async communication, and service observability.'
  },
  {
    id: 103,
    title: 'saas-task-manager',
    image: '',
    githubLink: 'https://github.com/DevAndreNarcizo/saas-task-manager',
    tags: ['Next.js 14', 'TypeScript', 'Stripe', 'PostgreSQL', 'Redis'],
    tier: 'enterprise',
    summary: 'Full-stack SaaS with Stripe subscriptions, RBAC, and real-time updates — deployed and functional.',
    stack: 'Next.js 14, TypeScript, Tailwind, NestJS, PostgreSQL, Redis, Stripe, Docker',
    role: 'Full-stack, payments, auth, deployment',
    problem: 'End-to-end SaaS product ownership from code to payment to deployment.',
    solution: 'Freemium task manager with Stripe Checkout, webhooks, role-based access, and real-time updates.',
    result: 'Live SaaS demonstrating full product lifecycle and payment integration.'
  },
  {
    id: 104,
    title: 'php-code-analyzer',
    image: '',
    githubLink: 'https://github.com/DevAndreNarcizo/php-code-analyzer',
    tags: ['PHP', 'CLI', 'Open Source', 'Static Analysis'],
    tier: 'enterprise',
    summary: 'Open-source CLI that analyzes PHP/Laravel projects and generates quality reports.',
    stack: 'PHP, PHPUnit, GitHub Actions, Packagist',
    role: 'Author, architecture, tests, CI/CD',
    problem: 'Open-source contribution gap — nothing published on Packagist or npm.',
    solution: 'CLI tool measuring cyclomatic complexity, SOLID violations, type coverage, and test coverage.',
    result: 'Published package demonstrating community contribution and code quality standards.'
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
    summary: 'Premium institutional website for aesthetics and wellness clinic.',
    stack: 'Next.js, Tailwind CSS, Framer Motion',
    role: 'Design, frontend, animations, deploy',
    problem: 'Clinic needed digital authority and new client conversion.',
    solution: 'Premium interface focused on luxury, services, and booking journey.',
    result: 'Elevated brand positioning and mobile-optimized site.'
  },
  {
    id: 5,
    title: 'Thais Sousa - Nail Designer',
    image: '/Imagens/ThaisSousa.png',
    githubLink: 'https://github.com/DevAndreNarcizo/ThaisSousa-NailDesigner',
    tags: ['React', 'Tailwind CSS', 'Responsive'],
    tier: 'landing',
    summary: 'Landing page for nail designer with portfolio and booking.',
    stack: 'React, Tailwind CSS, Vite',
    role: 'Design, frontend, deploy',
    problem: 'Independent professional without digital presence to attract clients.',
    solution: 'Visual landing page with work gallery and conversion focus.',
    result: 'Reusable template for beauty and aesthetics professionals.'
  },
  {
    id: 6,
    title: 'Karen Bianca - Lash Designer',
    image: '/Imagens/KarenBianca.png',
    githubLink: 'https://github.com/DevAndreNarcizo/KarenBianca-LashDesigner',
    tags: ['React', 'Tailwind CSS', 'Responsive'],
    tier: 'landing',
    summary: 'Professional site for lash designer with portfolio and contact.',
    stack: 'React, Tailwind CSS, Vite',
    role: 'Design, frontend, deploy',
    problem: 'Lash designer needed a site to showcase work and receive bookings.',
    solution: 'Elegant page with gallery, testimonials, and WhatsApp CTA.',
    result: 'Digital presence that converts visitors into booked clients.'
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
    items: 'Docker, Docker Compose, GitHub Actions, CI/CD, Azure DevOps',
    icon: 'terminal'
  },
  {
    category: 'Architecture & Practices',
    items: 'Clean Architecture, SOLID, DDD, TDD, Event-Driven, Design Patterns',
    icon: 'layers'
  }
];

export const architecturePrinciples: ArchitecturePrinciple[] = [
  {
    title: 'Clean Architecture',
    description: 'Domain layer at the core. Application use cases orchestrate business logic. Infrastructure implements contracts. Controllers are thin adapters — never contain business rules.',
    icon: 'layers'
  },
  {
    title: 'SOLID by Default',
    description: 'Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion — applied as muscle memory, not buzzwords.',
    icon: 'box'
  },
  {
    title: 'Test-Driven Confidence',
    description: 'Unit tests for domain logic. Feature tests for use cases. Integration tests for infrastructure. CI/CD pipeline blocks merge if coverage drops.',
    icon: 'check-circle'
  },
  {
    title: 'Event-Driven when Needed',
    description: 'Synchronous REST for CRUD. RabbitMQ/Kafka for async workflows: emails, notifications, audit logs. Each service owns its database.',
    icon: 'git-branch'
  },
  {
    title: 'Infrastructure as Code',
    description: 'Docker Compose for local dev mirrors production. CI/CD builds, tests, and deploys on push. Zero "works on my machine" surprises.',
    icon: 'terminal'
  },
  {
    title: 'API Design First',
    description: 'Standardized JSON responses ({ success, data, error, meta }). Pagination, filtering, sorting, and full-text search on every list endpoint. OpenAPI/Swagger documented.',
    icon: 'file-text'
  }
];

export const aboutTextEn = `I'm Andre Narcizo, a full-stack developer from Goiania, Brazil, working at Sysout Tecnologia and on freelance projects.

My work spans frontend, backend, mobile, data, and integrations — with deep focus on Angular, Laravel, Flutter, Python, and PostgreSQL. I'm actively evolving toward Software Architecture, with growing expertise in distributed systems, event-driven architecture, and DevOps.

My goal for 2026 is to consolidate my transition from Junior to Mid-Level/Pleno Developer, building a solid foundation for a long-term career in Software Architecture.`;

export const aboutTextPt = `Sou Andre Narcizo, desenvolvedor full-stack em Goiania-GO, atuando na Sysout Tecnologia e em projetos freelance.

Minha atuacao combina frontend, backend, mobile, dados e integracoes. Tenho foco em Angular, Laravel, Flutter, Python e PostgreSQL, com interesse crescente em arquitetura de software, documentacao, qualidade e automacoes com IA.

Meu objetivo para 2026 e consolidar minha evolucao para Desenvolvedor Pleno e, no longo prazo, construir uma carreira solida rumo a Arquitetura de Software.`;

export const notes: Note[] = [
  {
    id: 1,
    title: 'My plan to evolve from Junior to Mid-Level in 2026',
    date: '2026-05-04',
    summary: 'Autonomy, quality, and communication are the three pillars I am working on to leave the Junior level behind.',
    content: [
      'Mapped real gaps in my core stacks: Flutter, PHP, Laravel, and Angular. No point studying everything — I need depth where I work daily.',
      'Created a weekly routine with 2 manual study blocks and 1 delivered-task review. Practicing code without AI is mandatory.',
      'Started asking leadership for objective feedback on what is missing to reach Mid-Level. Spoiler: it is not just technical.',
      'Use AI to explain concepts and review PRs, but never to replace my own reasoning.'
    ],
    learning: 'Career growth requires measurable evidence, not just good intentions.',
    nextStep: 'Build original examples in Flutter and Laravel by August, with tests and documentation.'
  },
  {
    id: 2,
    title: 'Thin controllers and single-responsibility services',
    date: '2026-05-05',
    summary: 'The moment I stopped putting business logic in controllers, my code became testable for the first time.',
    content: [
      'Controllers should only orchestrate HTTP input/output. Business rules live in Services or UseCases, with explicit dependencies.',
      'Logic directly in controllers delivers faster initially, but becomes tech debt within weeks.',
      'Large generic services centralize rules but can become bloated. I prefer UseCases per relevant flow.',
      'Input validation happens before business rule execution — via Requests, DTOs, or equivalent validators per stack.'
    ],
    learning: 'Unit tests become trivial when business logic is isolated from the framework.',
    nextStep: 'Apply ADR pattern (Action-Domain-Responder) in the next Laravel project from scratch.'
  },
  {
    id: 3,
    title: 'The JSON response pattern I use in every API',
    date: '2026-05-06',
    summary: 'A standardized response format eliminates guesswork between frontend and backend, and simplifies debugging.',
    content: [
      'Adopted { success, data, error, meta } structure across all projects. The frontend never has to guess where the payload is.',
      'Errors return readable codes (e.g. USER_NOT_FOUND) and clear messages, never stack traces in production.',
      'Correct HTTP status codes: 201 for creation, 422 for validation, 409 for conflict. I never return 200 for everything.',
      'Paginated listings include meta with current_page, per_page, total, and last_page. No unpaginated tables.'
    ],
    learning: 'Predictable APIs reduce rework between teams more than any framework ever will.',
    nextStep: 'Document all public APIs with OpenAPI/Swagger before deployment.'
  },
  {
    id: 4,
    title: 'Clean Code in practice: what actually changes day to day',
    date: '2026-05-07',
    summary: 'Clear names, small functions, and proper error handling are 80% of the Clean Code I apply daily.',
    content: [
      'Names reveal intent: isPasswordValid() beats proc(). If I need a comment to explain the name, the name is wrong.',
      'Functions do one thing. Maximum 20 lines, ideally 10. More than 3 parameters become a DTO.',
      'Never return null to signal an error. Use domain-specific exceptions or Result objects.',
      'Comments explain WHY, not WHAT. Commented-out code gets deleted — git keeps history.'
    ],
    learning: 'Clean code is not about perfection, it is about being obvious to whoever reads it next.',
    nextStep: 'Create my own code review checklist and apply it to personal PRs before opening.'
  },
  {
    id: 5,
    title: 'How I use AI in my workflow without creating dependency',
    date: '2026-05-08',
    summary: 'AI is an accelerator, not an autopilot. The rule: understand before accepting, document before forgetting.',
    content: [
      'Every AI session starts from the Second Brain INDEX and loads only necessary context. Skills are activated on demand.',
      'I use AI to explain concepts, generate boilerplate, and review PRs — never to deliver a finished solution without understanding.',
      'Always read and understand every generated line before accepting. If I cannot explain it, I do not use it.',
      'Document what the AI suggested and why I accepted it. This becomes real learning, not a shortcut.'
    ],
    learning: 'Those who use AI without understanding the code become dependent; those who understand multiply productivity.',
    nextStep: 'Create prompt templates for recurring tasks (CRUD, tests, refactoring).'
  },
  {
    id: 6,
    title: 'Angular, Laravel, and Flutter: my working stack in 2026',
    date: '2026-05-09',
    summary: 'Real stack is the one that solves the client\'s problem. I chose technologies I use at work and in freelance.',
    content: [
      'Angular for enterprise systems: strong typing, clear structure, predictable maintenance. Ideal for dashboards and complex CRUDs.',
      'Laravel for rapid APIs: mature ecosystem, efficient Eloquent, simple deployment. My default backend for web and mobile.',
      'Flutter for mobile: one codebase for iOS and Android, with native performance. Priority of the Pleno 2026 Plan.',
      'Python as a complement for automation, data, and AI integrations. Fin-Assist proves you can unite academic research and product.'
    ],
    learning: 'Going deep in 4 stacks well is worth more than knowing 10 superficially.',
    nextStep: 'Build original Flutter and Laravel examples with clean architecture by September.'
  }
];
