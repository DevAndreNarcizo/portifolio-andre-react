import type { Project, Skill, Service } from './types';

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

// Strategic Differentials
export const differentials: Differential[] = [
  {
    title: 'Engenharia de Produto, não só Código',
    description: 'Não sou um executor de tarefas. Penso como dono do produto para garantir que a tecnologia sirva ao seu lucro.',
    icon: 'briefcase'
  },
  {
    title: 'Arquitetura antes do Commit',
    description: 'Sistemas escaláveis exigem planejamento. Cada linha de código é pensada para suportar o crescimento do seu negócio.',
    icon: 'shield'
  },
  {
    title: 'Foco em Performance Extrema',
    description: 'Milissegundos custam dinheiro. Desenvolvo interfaces ultra-rápidas que aumentam sua taxa de conversão.',
    icon: 'zap'
  }
];

// Professional Process
export const processSteps: ProcessStep[] = [
  {
    title: '1. Descoberta',
    description: 'Alinhamento estratégico para entender seus objetivos de negócio e desafios técnicos.',
    icon: 'search'
  },
  {
    title: '2. Proposta Técnica',
    description: 'Desenho da arquitetura, definição de stack e cronograma detalhado de entregas.',
    icon: 'file-text'
  },
  {
    title: '3. Desenvolvimento',
    description: 'Escrita de código limpo com atualizações constantes e deploys em ambiente de staging.',
    icon: 'code'
  },
  {
    title: '4. Revisão e Ajustes',
    description: 'Ciclo rigoroso de testes e refinamento de UX para garantir perfeição na entrega.',
    icon: 'check-square'
  },
  {
    title: '5. Entrega e Suporte',
    description: 'Deploy em produção e acompanhamento inicial para garantir estabilidade total.',
    icon: 'rocket'
  }
];

// Specialized Services
export const services: Service[] = [
  {
    id: 1,
    title: 'Autoridade Digital Premium',
    description: 'Sites institucionais de alta performance que transformam sua marca em uma referência de mercado e convertem visitantes em clientes fiéis.',
    icon: 'layout'
  },
  {
    id: 2,
    title: 'Inteligência Web Sob Medida',
    description: 'Sistemas complexos, Dashboards e CRMs desenvolvidos para automatizar sua operação e escalar processos com máxima eficiência.',
    icon: 'layers'
  },
  {
    id: 3,
    title: 'Ecossistema Mobile Nativo',
    description: 'Experiências fluidas em iOS e Android com Flutter, colocando sua empresa no centro das mãos dos seus clientes com tecnologia de ponta.',
    icon: 'smartphone'
  },
  {
    id: 4,
    title: 'E-commerce de Alta Performance',
    description: 'Lojas virtuais focadas em vendas em massa, com checkout simplificado, segurança bancária e integração total de logística e pagamentos.',
    icon: 'shopping-cart'
  }
];

// Result-focused Case Studies
export const projects: Project[] = [
  {
    id: 1,
    title: 'Clínica Thaysa Medeiros',
    image: '/Imagens/ClinicaThaysa.png',
    liveLink: 'https://clinica-thaysamedeiros.vercel.app/',
    githubLink: 'https://github.com/DevAndreNarcizo/Clinica-Thaysa-Medeiros',
    tags: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    description: 'Problema: Falta de autoridade digital e dificuldade de conversão no site antigo. Solução: Interface premium institucional focada em luxo e conversão direta. Resultado: Posicionamento de marca elevado e jornada de agendamento mobile-first otimizada.'
  },
  {
    id: 2,
    title: 'Plataforma Nutrifit (Case)',
    image: '/Imagens/Nutricionista.png',
    liveLink: 'https://site-institucional-para-nutricionis.vercel.app/',
    githubLink: 'https://github.com/DevAndreNarcizo/Site-Institucional-Para-Nutricionista',
    tags: ['React', 'Node.js', 'Conversion UX'],
    description: 'Problema: Baixo agendamento via site antigo. Solução: Redesign focado em autoridade e jornada de agendamento em 3 cliques. Resultado: Interface ultra-rápida preparada para aumento de conversão.'
  },
  {
    id: 3,
    title: 'Luz da Aurora E-commerce',
    image: '/Imagens/Luz da Aurora.png',
    liveLink: 'https://luzdaaurora.shop/',
    githubLink: 'https://github.com/DevAndreNarcizo/Ecommerce-Luz-da-Aurora',
    tags: ['Angular', 'Laravel', 'E-commerce'],
    description: 'E-commerce desenvolvido do zero para suportar a escala e ambição de crescimento da marca. Solução: Migração de sistema legado para uma stack moderna com checkout otimizado. Resultado: Aumento real na taxa de conversão e zero gargalos de performance.'
  },
  {
    id: 4,
    title: 'Santuário da Fé',
    image: '/Imagens/Santuario.png',
    liveLink: 'https://santurariodafe.netlify.app/',
    githubLink: 'https://github.com/DevAndreNarcizo/santuario-app',
    tags: ['React', 'Firebase', 'Social'],
    description: 'Problema: Dificuldade de comunicação e engajamento com membros. Solução: Portal moderno com gestão de eventos e conteúdos integrados. Resultado: Aumento no engajamento da comunidade e facilidade de acesso a informações.'
  },
  {
    id: 5,
    title: 'Syndata em Vídeo',
    image: '/Imagens/Syndata.png',
    liveLink: 'https://syndata-video.netlify.app/',
    githubLink: 'https://github.com/DevAndreNarcizo/Syndata-em-Video',
    tags: ['Next.js', 'Video Platform', 'Documentation'],
    description: 'Problema: Curva de aprendizado alta para o sistema ERP. Solução: Central de guias em vídeo estruturada para rápido aprendizado. Resultado: Redução no volume de tickets de suporte e maior autonomia dos usuários.'
  }
];

// Expert Authority Stack - Mapped to business outcomes
export const skills: (Skill & { benefit: string })[] = [
  { name: 'React / Next.js', level: 95, benefit: 'Velocidade extrema e SEO: transforme cliques em vendas.' },
  { name: 'Node.js / TypeScript', level: 95, benefit: 'Backend resiliente: seu sistema nunca para de lucrar.' },
  { name: 'PHP / Laravel', level: 94, benefit: 'Desenvolvimento ágil e seguro: estabilidade para sua operação.' },
  { name: 'Angular', level: 90, benefit: 'Interfaces empresariais robustas: ideal para sistemas complexos.' },
  { name: 'Flutter', level: 88, benefit: 'Apps nativos (iOS/Android): sua marca em todas as lojas.' },
  { name: 'React Native / Expo', level: 92, benefit: 'App nativo de alta performance: experiência fluida no mobile.' },
  { name: 'Python', level: 85, benefit: 'Automação inteligente: otimize tarefas e reduza custos.' },
  { name: 'JavaScript', level: 95, benefit: 'Dinâmica e Interatividade: sites que engajam seu público.' },
  { name: 'PostgreSQL / Redis', level: 88, benefit: 'Dados seguros e rápidos: estabilidade para escalar.' },
  { name: 'Arquitetura de Sistemas', level: 90, benefit: 'Projetos escaláveis: sua tecnologia acompanha seu crescimento.' },
  { name: 'UI/UX para Conversão', level: 85, benefit: 'Interfaces persuasivas: design que vende e retém.' }
];

// Authority-driven About text
export const aboutText = `
Sou André Narcizo, desenvolvedor Full Stack e graduando no 8º período de Ciência da Computação. Minha abordagem une o rigor científico da academia com a agilidade necessária para o mercado de tecnologia moderno.

Meu foco é a construção de aplicações robustas e escaláveis. Não entrego apenas código; entrego soluções estruturadas sob uma arquitetura resiliente, pensada para suportar o crescimento e a demanda real do seu negócio.

Acredito na engenharia de software como uma ferramenta estratégica. Se você busca um parceiro que compreenda seu modelo de operação e transforme desafios complexos em produtos digitais de alta performance, vamos construir algo extraordinário juntos.
`;
