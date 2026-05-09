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
    title: 'Nobus Assistente Financeiro',
    image: '/Imagens/Syndata.png',
    liveLink: '',
    githubLink: '',
    tags: ['Laravel', 'Angular', 'React'],
    summary: 'Sistema com regras de negócio, backend, frontend e organização modular.',
    stack: 'Laravel, Angular, React, PostgreSQL',
    role: 'Full stack, arquitetura de módulos e regras de negócio',
    problem: 'Gestão financeira pessoal e familiar sem centralização de dados.',
    solution: 'Sistema modular com backend Laravel, frontend Angular/React e banco relacional.',
    result: 'Consolidação de práticas de separação de concerns, services e controllers finos.'
  },
  {
    id: 3,
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
    id: 4,
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
    id: 5,
    title: 'Site Profissional Nail/Lash/Estética',
    image: '/Imagens/Nutricionista.png',
    liveLink: 'https://site-institucional-para-nutricionis.vercel.app/',
    githubLink: '',
    tags: ['React', 'Tailwind', 'Express'],
    summary: 'Presença digital para serviços locais de beleza e bem-estar.',
    stack: 'React, Tailwind CSS, Express',
    role: 'Design, frontend e deploy',
    problem: 'Profissionais autônomos sem site para converter visitantes em clientes.',
    solution: 'Landing page rápida, responsiva e com foco em conversão para agendamento.',
    result: 'Template reutilizável para nicho de beleza e serviços locais.'
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

// Notes - seção de aprendizados técnicos
export const notes: Note[] = [
  {
    id: 1,
    title: 'Como estou evoluindo de Full Stack para Arquiteto',
    date: '2026-05-09',
    summary: 'Deixar de ser apenas executor e começar a pensar em decisões estruturais que sobrevivem a mudanças de equipe.',
    content: [
      'Comecei a documentar decisões de arquitetura antes de escrever código. Isso evita retrabalho e alinha expectativas.',
      'Controllers finos e services com responsabilidade única tornam APIs mais fáceis de manter e testar.',
      'Aprender a dizer não para requisitos mal definidos é parte do crescimento técnico.',
      'Automações com IA são ferramentas, não substitutos para raciocínio.'
    ],
    learning: 'Arquitetura começa com documentação e termina com código limpo.',
    nextStep: 'Aplicar padrões de projeto em mais projetos reais e documentar os trade-offs.'
  },
  {
    id: 2,
    title: 'Angular, Laravel e Flutter: minha stack de trabalho em 2026',
    date: '2026-05-09',
    summary: 'Por que escolhi essas três tecnologias como base e como elas se complementam no dia a dia.',
    content: [
      'Angular para sistemas corporativos: tipagem forte, estrutura clara e manutenção previsível.',
      'Laravel para APIs rápidas: ecossistema maduro, Eloquent eficiente e deploy simples.',
      'Flutter para mobile: uma base de código para iOS e Android, com performance nativa.',
      'Python entra como complemento para automações, dados e integrações com IA.'
    ],
    learning: 'Stack real é aquela que resolve o problema do cliente, não a mais hypada.',
    nextStep: 'Aprofundar em arquitetura limpa no Laravel e state management avançado no Angular.'
  },
  {
    id: 3,
    title: 'Agenda-Fácil: aprendizados criando um micro-SaaS de agendamento',
    date: '2026-05-09',
    summary: 'Construir um produto completo sozinho ensina mais do que qualquer tutorial.',
    content: [
      'Modelagem de banco relacional para fluxos recorrentes é mais complexa do que parece.',
      'Autenticação com Supabase acelera o MVP, mas exige entender RLS e políticas de segurança.',
      'UX de agendamento precisa ser intuitiva: o usuário não deve pensar para marcar um horário.',
      'Freelance e produto próprio exigem visão de negócio, não só técnica.'
    ],
    learning: 'Um micro-SaaS é a melhor forma de aprender produto, backend, frontend e deploy ao mesmo tempo.',
    nextStep: 'Adicionar pagamentos e notificações push para validar monetização.'
  },
  {
    id: 4,
    title: 'Por que controllers finos deixam APIs mais fáceis de manter',
    date: '2026-05-09',
    summary: 'Separação de responsabilidades não é teoria: é prática que economiza horas de debug.',
    content: [
      'Controllers devem apenas receber requests, chamar services e retornar responses.',
      'Lógica de negócio vive em services ou use cases, não espalhada nos controllers.',
      'Isso facilita testes unitários, mock de dependências e troca de frameworks.',
      'Padrão de resposta padronizado (ex: { success, data, message }) reduz fricção no frontend.'
    ],
    learning: 'Código que separa responsabilidades envelhece melhor.',
    nextStep: 'Implementar ADR (Action-Domain-Responder) em projetos Laravel novos.'
  },
  {
    id: 5,
    title: 'Como uso IA sem perder raciocínio técnico',
    date: '2026-05-09',
    summary: 'IA é acelerador, não substituto. A regra é: entender antes de aceitar.',
    content: [
      'Uso IA para gerar boilerplate, refatorar e explicar conceitos novos rapidamente.',
      'Nunca aceito código gerado sem ler e entender cada linha.',
      'Prompts bem estruturados geram resultados melhores do que prompts vagos.',
      'Documentar o que a IA sugeriu e por que aceitei é parte do aprendizado.'
    ],
    learning: 'Quem usa IA sem entender o código se torna dependente; quem entende, multiplica produtividade.',
    nextStep: 'Criar templates de prompts para tarefas recorrentes no workflow de desenvolvimento.'
  }
];
