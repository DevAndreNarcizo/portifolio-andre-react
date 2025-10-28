import type { Project, Skill } from './types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'MeteoLive Dashboard',
    image: '/Imagens/MeteoLive Dashboard.png',
    link: 'https://github.com/DevAndreNarcizo/MeteoLive-Dashboard',
    tags: ['React', 'API', 'Dashboard', 'Weather'],
    description: 'Dashboard interativo de clima em tempo real com integração de API e visualizações dinâmicas'
  },
  {
    id: 2,
    title: 'Landing Page Receitas',
    image: '/Imagens/Landing Page Receitas.png',
    link: 'https://github.com/DevAndreNarcizo/Landing-Page-de-Receitas',
    tags: ['HTML/CSS', 'UI/UX', 'Responsive'],
    description: 'Landing page elegante e responsiva para receitas com animações suaves'
  },
  {
    id: 3,
    title: 'Fin-Assist',
    image: '/Imagens/Fin-Assist.jpg',
    link: 'https://github.com/DevAndreNarcizo/Fin-Assist',
    tags: ['Python', 'Flask', 'Finance'],
    description: 'Sistema de assistente financeiro com IA para controle de gastos'
  },
  {
    id: 4,
    title: 'Criptografia AES',
    image: '/Imagens/Criptografia AES.png',
    link: 'https://github.com/DevAndreNarcizo/TECNICAS-CRIPTOGRAFICAS-AES',
    tags: ['Python', 'Cryptography', 'Backend'],
    description: 'Sistema robusto de criptografia AES com interface web moderna'
  },
  {
    id: 5,
    title: 'Identificação por Imagens',
    image: '/Imagens/Identificação por Imagens.png',
    link: 'https://github.com/DevAndreNarcizo/Sistema-de-identificacao-e-autenticacao-atraves-de-reconhecimento-de-imagens',
    tags: ['Python', 'Computer Vision', 'Image Processing'],
    description: 'Sistema inteligente de identificação e classificação de imagens usando IA'
  },
  {
    id: 6,
    title: 'Syndata em Vídeo',
    image: '/Imagens/Syndata em Video.png',
    link: 'https://github.com/DevAndreNarcizo/Syndata-em-Video',
    tags: ['Data Visualization', 'HTML / CSS', 'JavaScript'],
    description: 'Plataforma de visualização de dados com representações em vídeo'
  },
  {
    id: 7,
    title: 'Santuário da Fé',
    image: '/Imagens/Santuario da fe.png',
    link: 'https://github.com/DevAndreNarcizo/santuario-app',
    tags: ['React', 'TypeScript', 'Responsive'],
    description: 'Site institucional completo com design moderno e responsivo'
  },
];

export const skills: Skill[] = [
  { name: 'React', level: 78 },
  { name: 'TypeScript', level: 70 },
  { name: 'JavaScript', level: 98 },
  { name: 'HTML/CSS', level: 99 },
  { name: 'Node.js', level: 85 },
  { name: 'Express', level: 80 },
  { name: 'Python', level: 85 },
  { name: 'Pytorch', level: 55 },
  { name: 'PostgreSQL', level: 72 },
  { name: 'Git & GitHub', level: 90 },
  { name: 'Flask', level: 55 },
  { name: 'Pandas', level: 50 },
  { name: 'OpenCV', level: 80 },
  { name: 'TensorFlow', level: 55 },
  { name: 'Java', level: 40 },
  { name: 'FastAPI', level: 50 },
  { name: 'C++', level: 50 },
  { name: 'SQL', level: 65 },
  { name: 'MySQL', level: 50 },
  { name: 'Corel Draw', level: 76 },
];

export const aboutText = `
  Desenvolvedor Full Stack especializado em Front-end, apaixonado por criar 
  experiências digitais excepcionais. Com sólida experiência em React e TypeScript, 
  transformo designs em interfaces modernas, responsivas e performáticas. Também domino 
  tecnologias back-end como Node.js, Express e Python, permitindo-me desenvolver 
  soluções completas e integradas.
`;

