import type { Project, Skill } from './types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'MeteoLive Dashboard',
    image: '/Imagens/MeteoLive Dashboard.png',
    link: 'https://github.com/DevAndreNarcizo/MeteoLive-Dashboard',
    tags: ['React', 'API', 'Dashboard', 'Weather'],
    description: 'Interactive real-time weather dashboard with API integration and dynamic visualizations'
  },
  {
    id: 2,
    title: 'Recipes Landing Page',
    image: '/Imagens/Landing Page Receitas.png',
    link: 'https://github.com/DevAndreNarcizo/Landing-Page-de-Receitas',
    tags: ['HTML/CSS', 'UI/UX', 'Responsive'],
    description: 'Elegant and responsive landing page for recipes with smooth animations'
  },
  {
    id: 3,
    title: 'Fin-Assist',
    image: '/Imagens/Fin-Assist.jpg',
    link: 'https://github.com/DevAndreNarcizo/Fin-Assist',
    tags: ['Python', 'Flask', 'Finance'],
    description: 'AI-powered financial assistant system for expense tracking'
  },
  {
    id: 4,
    title: 'AES Encryption',
    image: '/Imagens/Criptografia AES.png',
    link: 'https://github.com/DevAndreNarcizo/TECNICAS-CRIPTOGRAFICAS-AES',
    tags: ['Python', 'Cryptography', 'Backend'],
    description: 'Robust AES encryption system with modern web interface'
  },
  {
    id: 5,
    title: 'Image Identification',
    image: '/Imagens/Identificação por Imagens.png',
    link: 'https://github.com/DevAndreNarcizo/Sistema-de-identificacao-e-autenticacao-atraves-de-reconhecimento-de-imagens',
    tags: ['Python', 'Computer Vision', 'Image Processing'],
    description: 'Intelligent image identification and classification system using AI'
  },
  {
    id: 6,
    title: 'Syndata in Video',
    image: '/Imagens/Syndata em Video.png',
    link: 'https://github.com/DevAndreNarcizo/Syndata-em-Video',
    tags: ['Data Visualization', 'HTML / CSS', 'JavaScript'],
    description: 'Data visualization platform with video representations'
  },
  {
    id: 7,
    title: 'Sanctuary of Faith',
    image: '/Imagens/Santuario da fe.png',
    link: 'https://github.com/DevAndreNarcizo/santuario-app',
    tags: ['React', 'TypeScript', 'Responsive'],
    description: 'Complete institutional website with modern and responsive design'
  },
];

export const skills: Skill[] = [
  { name: 'React', level: 78 },
  { name: 'TypeScript', level: 70 },
  { name: 'JavaScript', level: 98 },
  { name: 'HTML/CSS', level: 99 },
  { name: 'Node.js', level: 85 },
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
  Full Stack Developer specialized in Front-end, passionate about creating 
  exceptional digital experiences. With solid experience in React and TypeScript, 
  I transform designs into modern, responsive, and performant interfaces. I also master 
  back-end technologies like Node.js, Java, and Python, allowing me to develop 
  complete and integrated solutions.
`;
