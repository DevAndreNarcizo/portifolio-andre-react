import type { Project, Service, Note } from './types';

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

export interface StackGroup {
  category: string;
  items: string;
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

// Strategic Differentials (kept for reference, not heavily used)
export const differentials: Differential[] = [
  {
    title: 'Engenharia de Produto',
    description: 'Penso como dono do produto para garantir que a tecnologia sirva ao negócio.',
    icon: 'briefcase'
  },
  {
    title: 'Arquitetura antes do Código',
    description: 'Cada decisão é documentada e pensada para manutenção e crescimento.',
    icon: 'shield'
  },
  {
    title: 'Foco em Resultado',
    description: 'Interfaces rápidas, código limpo e software que resolve problemas reais.',
    icon: 'zap'
  }
];

// Professional Process
export const processSteps: ProcessStep[] = [
  {
    title: '1. Descoberta',
    description: 'Entender o problema real antes de propor solução.',
    icon: 'search'
  },
  {
    title: '2. Proposta Técnica',
    description: 'Arquitetura, stack e escopo alinhados ao objetivo.',
    icon: 'file-text'
  },
  {
    title: '3. Desenvolvimento',
    description: 'Código limpo, commits organizados e deploys contínuos.',
    icon: 'code'
  },
  {
    title: '4. Revisão e Entrega',
    description: 'Testes, ajustes e documentação para operação.',
    icon: 'check-square'
  }
];

// Services - tom direto e sem exageros
export const services: Service[] = [
  {
    id: 1,
    title: 'Sites e landing pages',
    description: 'Para profissionais e empresas que precisam explicar sua oferta, gerar confiança e levar o cliente para o contato certo.',
    icon: 'layout'
  },
  {
    id: 2,
    title: 'Sistemas web',
    description: 'Dashboards, áreas administrativas, CRUDs, relatórios e integrações para processos internos.',
    icon: 'layers'
  },
  {
    id: 3,
    title: 'Apps Flutter',
    description: 'Aplicações mobile com Flutter para validar produto, atendimento, operação ou experiência do cliente.',
    icon: 'smartphone'
  },
  {
    id: 4,
    title: 'APIs, dados e automações',
    description: 'Backends em Laravel/Node/Python, integrações, PostgreSQL/Supabase e automações com IA.',
    icon: 'settings'
  }
];

// Projects - cases reais com estrutura completa
export const projects: Project[] = [
  {
    id: 1,
    title: 'Agenda-Fácil',
    image: '/Imagens/AgendaFacil.jpeg',
    liveLink: 'https://agenda-facil.vercel.app/',
    githubLink: 'https://github.com/DevAndreNarcizo/Agenda_Facil',
    tags: ['React 19', 'Supabase', 'TypeScript'],
    summary: 'Micro-SaaS de agendamento para profissionais de beleza e serviços locais.',
    stack: 'React 19, Supabase, TypeScript',
    role: 'Produto, frontend, banco e fluxo de agendamento',
    problem: 'Pequenos negócios precisam organizar horários sem depender de planilhas.',
    solution: 'Agenda digital com cadastro, horários e base para gestão.',
    result: 'Modelagem de produto SaaS, autenticação e UX de fluxo recorrente.'
  },
  {
    id: 2,
    title: 'Fin-Assist',
    image: '/Imagens/Fin-Assist.jpg',
    liveLink: '',
    githubLink: 'https://github.com/DevAndreNarcizo/Fin-Assist',
    tags: ['Python', 'CustomTkinter', 'ML'],
    summary: 'IA/ML aplicada a educação e gestão financeira pessoal.',
    stack: 'Python, CustomTkinter, Machine Learning',
    role: 'Produto, modelagem, interface e treinamento de modelo',
    problem: 'Falta de ferramentas acessíveis que unam educação financeira e IA.',
    solution: 'Aplicação desktop com interface em CustomTkinter e modelo preditivo.',
    result: 'Conexão entre TCC, Python e visão de produto financeiro com dados reais.'
  },
  {
    id: 3,
    title: 'Ecommerce Luz da Aurora',
    image: '/Imagens/Luz da Aurora.png',
    liveLink: 'https://luzdaaurora.shop/',
    githubLink: '',
    tags: ['React', 'Express', 'Supabase'],
    summary: 'Ecommerce com operação, catálogo e backend para loja real.',
    stack: 'React, Express, Supabase, PostgreSQL',
    role: 'Frontend, backend, banco e integração de pagamentos',
    problem: 'Loja física precisava de presença digital com catálogo e checkout.',
    solution: 'Ecommerce completo com catálogo, carrinho, checkout e painel administrativo.',
    result: 'Entrega de loja funcional com aprendizado em fluxo de vendas online.'
  },
  {
    id: 4,
    title: 'Clínica Thaysa Medeiros',
    image: '/Imagens/ClinicaThaysa.png',
    liveLink: '',
    githubLink: 'https://github.com/DevAndreNarcizo/Clinica-Thaysa-Medeiros',
    tags: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    summary: 'Site institucional premium para clínica de estética e bem-estar.',
    stack: 'Next.js, Tailwind CSS, Framer Motion',
    role: 'Design, frontend, animações e deploy',
    problem: 'Clínica precisava de autoridade digital e conversão de novos clientes.',
    solution: 'Interface premium com foco em luxo, serviços e jornada de agendamento.',
    result: 'Posicionamento de marca elevado e site otimizado para mobile.'
  },
  {
    id: 5,
    title: 'Thais Sousa - Nail Designer',
    image: '/Imagens/ThaisSousa.png',
    liveLink: '',
    githubLink: 'https://github.com/DevAndreNarcizo/ThaisSousa-NailDesigner',
    tags: ['React', 'Tailwind CSS', 'Responsive'],
    summary: 'Landing page para nail designer com portfólio e agendamento.',
    stack: 'React, Tailwind CSS, Vite',
    role: 'Design, frontend e deploy',
    problem: 'Profissional autônoma sem presença digital para atrair clientes.',
    solution: 'Landing page visual com galeria de trabalhos e foco em conversão.',
    result: 'Template reutilizável para profissionais de beleza e estética.'
  },
  {
    id: 6,
    title: 'Karen Bianca - Lash Designer',
    image: '/Imagens/KarenBianca.png',
    liveLink: '',
    githubLink: 'https://github.com/DevAndreNarcizo/KarenBianca-LashDesigner',
    tags: ['React', 'Tailwind CSS', 'Responsive'],
    summary: 'Site profissional para lash designer com portfólio e contato.',
    stack: 'React, Tailwind CSS, Vite',
    role: 'Design, frontend e deploy',
    problem: 'Lash designer precisava de site para mostrar trabalhos e receber agendamentos.',
    solution: 'Página elegante com galeria, depoimentos e CTA para WhatsApp.',
    result: 'Presença digital que converte visitantes em clientes agendados.'
  }
];

// Stack grouped by usage - no percentages
export const stackGroups: StackGroup[] = [
  {
    category: 'Frontend',
    items: 'Angular, React, TypeScript, Vite, Tailwind CSS'
  },
  {
    category: 'Backend',
    items: 'Laravel / PHP, Node.js, Express, NestJS, Python'
  },
  {
    category: 'Mobile',
    items: 'Flutter, Dart, React Native'
  },
  {
    category: 'Dados',
    items: 'PostgreSQL, MySQL, MongoDB, Redis, Supabase'
  },
  {
    category: 'Infra e qualidade',
    items: 'Docker, GitHub Actions, Azure DevOps, CI/CD, Clean Code, SOLID'
  }
];

// About text - autoral e sem exageros
export const aboutText = `Sou André Narcizo, desenvolvedor full-stack em Goiânia-GO, atuando na Sysout Tecnologia e em projetos freelance.

Minha atuação combina frontend, backend, mobile, dados e integrações. Tenho foco em Angular, Laravel, Flutter, Python e PostgreSQL, com interesse crescente em arquitetura de software, documentação, qualidade e automações com IA.

Meu objetivo para 2026 é consolidar minha evolução para Desenvolvedor Pleno e, no longo prazo, construir uma carreira sólida rumo à Arquitetura de Software.`;

// Notes - seção de aprendizados técnicos (uma nota por dia)
export const notes: Note[] = [
  {
    id: 1,
    title: 'Meu plano para evoluir de Júnior para Pleno em 2026',
    date: '2026-05-04',
    summary: 'Autonomia, qualidade e comunicação são os três pilares que estou trabalhando para deixar o nível Júnior.',
    content: [
      'Mapeei lacunas reais nas minhas stacks principais: Flutter, PHP, Laravel e Angular. Não adianta estudar tudo — preciso de profundidade onde trabalho todo dia.',
      'Criei uma rotina semanal com 2 blocos de estudo manual e 1 revisão de tarefa entregue. Praticar código sem IA é obrigatório.',
      'Comecei a pedir feedback objetivo para liderança sobre o que falta para virar Pleno. Advinha: não é só técnica.',
      'Uso IA para explicar conceitos e revisar PRs, mas nunca para substituir o raciocínio próprio.'
    ],
    learning: 'Evolução de carreira precisa de evidências mensuráveis, não só de boa vontade.',
    nextStep: 'Criar exemplos próprios em Flutter e Laravel até agosto, com testes e documentação.'
  },
  {
    id: 2,
    title: 'Controllers finos e Services com responsabilidade única',
    date: '2026-05-05',
    summary: 'Quando parei de colocar regra de negócio nos controllers, meu código ficou testável pela primeira vez.',
    content: [
      'Controllers devem apenas orquestrar entrada e saída HTTP. Regras de negócio ficam em Services ou UseCases, com dependências explícitas.',
      'Lógica diretamente no controller entrega mais rápido no início, mas vira dívida técnica em semanas.',
      'Services genéricos grandes centralizam regras, mas podem virar classes inchadas. Prefiro UseCases por fluxo relevante.',
      'Validação de input acontece antes da execução da regra, seja com Requests, DTOs ou validators equivalentes por stack.'
    ],
    learning: 'Testes unitários ficam simples quando a regra de negócio está isolada do framework.',
    nextStep: 'Aplicar ADR (Action-Domain-Responder) no próximo projeto Laravel do zero.'
  },
  {
    id: 3,
    title: 'Padrão de resposta JSON que uso em todas as APIs',
    date: '2026-05-06',
    summary: 'Um formato de resposta padronizado elimina dúvidas entre frontend e backend, além de facilitar debug.',
    content: [
      'Adotei a estrutura { success, data, error, meta } em todos os projetos. O frontend nunca precisa adivinhar onde está o payload.',
      'Erros retornam código legível (ex: USER_NOT_FOUND) e mensagem clara, nunca stack trace em produção.',
      'Status HTTP corretos: 201 para criação, 422 para validação, 409 para conflito. Não devolvo 200 para tudo.',
      'Listagens paginadas incluem meta com current_page, per_page, total e last_page. Nenhuma tabela sem paginação.'
    ],
    learning: 'APIs previsíveis reduzem retrabalho entre equipes mais do que qualquer framework.',
    nextStep: 'Documentar todas as APIs públicas com OpenAPI/Swagger antes do deploy.'
  },
  {
    id: 4,
    title: 'Clean Code na prática: o que realmente muda no dia a dia',
    date: '2026-05-07',
    summary: 'Nomes claros, funções pequenas e tratamento de erros adequado são 80% do Clean Code que aplico.',
    content: [
      'Nomes revelam intenção: isPasswordValid() é melhor que proc(). Se preciso de comentário para explicar o nome, o nome está errado.',
      'Funções fazem uma coisa só. Máximo 20 linhas, ideal 10. Mais de 3 parâmetros viram DTO.',
      'Nunca retorno null para indicar erro. Uso exceções específicas de domínio (UserNotFoundException) ou objetos Result.',
      'Comentários explicam WHY, não WHAT. Código comentado é deletado — o git guarda histórico.'
    ],
    learning: 'Código limpo não é sobre perfeição, é sobre ser óbvio para quem lê depois.',
    nextStep: 'Criar checklist de code review próprio e aplicar em PRs pessoais antes de abrir.'
  },
  {
    id: 5,
    title: 'Como uso IA no workflow sem criar dependência',
    date: '2026-05-08',
    summary: 'IA é acelerador, não piloto automático. A regra é: entender antes de aceitar, documentar antes de esquecer.',
    content: [
      'Toda IA inicia pelo INDEX do Segundo Cérebro e carrega apenas o contexto necessário. Skills são ativadas por demanda.',
      'Uso IA para explicar conceitos, gerar boilerplate e revisar PRs — nunca para entregar solução pronta sem entender.',
      'Sempre leio e entendo cada linha gerada antes de aceitar. Se não consigo explicar, não uso.',
      'Documento o que a IA sugeriu e por que aceitei. Isso vira aprendizado real, não atalho.'
    ],
    learning: 'Quem usa IA sem entender o código se torna dependente; quem entende, multiplica produtividade.',
    nextStep: 'Criar templates de prompts para tarefas recorrentes (CRUD, testes, refatoração).'
  },
  {
    id: 6,
    title: 'Angular, Laravel e Flutter: minha stack de trabalho em 2026',
    date: '2026-05-09',
    summary: 'Stack real é aquela que resolve o problema do cliente. Escolhi tecnologias que uso no trabalho e no freelance.',
    content: [
      'Angular para sistemas corporativos: tipagem forte, estrutura clara e manutenção previsível. Ideal para dashboards e CRUDs complexos.',
      'Laravel para APIs rápidas: ecossistema maduro, Eloquent eficiente e deploy simples. Meu backend padrão para web e mobile.',
      'Flutter para mobile: uma base de código para iOS e Android, com performance nativa. Prioridade do Plano Pleno 2026.',
      'Python entra como complemento para automações, dados e integrações com IA. Fin-Assist prova que dá para unir TCC e produto.'
    ],
    learning: 'Aprofundar 4 stacks bem vale mais do que conhecer 10 superficialmente.',
    nextStep: 'Criar exemplos próprios em Flutter e Laravel com arquitetura limpa até setembro.'
  }
];
