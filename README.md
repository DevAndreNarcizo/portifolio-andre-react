# Portfólio André - React

Portfólio profissional moderno e minimalista construído com React + TypeScript + Vite.

## 🚀 Tecnologias

- **React 19** - Framework JavaScript
- **TypeScript** - Linguagem com tipagem estática
- **Vite** - Build tool rápida
- **CSS Moderno** - Variáveis CSS, animações e design responsivo

## 📁 Estrutura do Projeto

```
src/
├── components/         # Componentes React
│   ├── Header.tsx     # Cabeçalho com navegação
│   ├── Hero.tsx       # Seção inicial
│   ├── About.tsx      # Seção sobre
│   ├── Skills.tsx     # Habilidades
│   ├── Projects.tsx   # Grid de projetos
│   ├── ProjectCard.tsx # Card individual
│   ├── Contact.tsx    # Contato
│   └── Footer.tsx     # Rodapé
├── data.ts            # Dados dos projetos e habilidades
├── types.ts           # Definições TypeScript
├── App.tsx            # Componente principal
└── main.tsx           # Entry point
```

## 🛠️ Instalação e Uso

1. **Instale as dependências:**
```bash
npm install
```

2. **Copie as imagens para public/Imagens/**
Copie manualmente a pasta `Imagens` do projeto antigo para `public/Imagens/`.

3. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

4. **Acesse:**
```
http://localhost:5173
```

## 📝 Personalização

### Editar Dados dos Projetos

Edite o arquivo `src/data.ts`:
```typescript
export const projects: Project[] = [
  {
    id: 1,
    title: 'Nome do Projeto',
    image: '/Imagens/imagem.png',
    link: 'https://...',
    tags: ['React', 'TypeScript'],
    description: 'Descrição do projeto'
  },
  // ...
];
```

### Editar Habilidades

No mesmo arquivo:
```typescript
export const skills: Skill[] = [
  { name: 'React', level: 90 },
  // ...
];
```

### Personalizar Links de Contato

Edite `src/components/Contact.tsx`:
```typescript
<a href="mailto:SEU_EMAIL" className="contact-link">
<a href="https://github.com/SEU_USUARIO" className="contact-link">
<a href="https://linkedin.com/in/SEU_USUARIO" className="contact-link">
```

## 🎨 Customização de Estilos

Os estilos são organizados em arquivos CSS separados por componente:
- `src/components/*.css` - Estilos específicos de cada componente
- `src/App.css` - Estilos globais do app
- `src/index.css` - Reset e variáveis CSS

## 📦 Build para Produção

```bash
npm run build
```

O build será gerado na pasta `dist/`.

## 🌐 Deploy

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

## 📄 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview do build
- `npm run lint` - Executa ESLint

## 🎯 Próximos Passos

- [ ] Adicionar animações mais sofisticadas
- [ ] Implementar modo escuro/claro
- [ ] Adicionar blog ou seção de artigos
- [ ] Implementar internacionalização (i18n)
- [ ] Adicionar testes unitários

## 📞 Contato

Para dúvidas ou sugestões, entre em contato através dos links no portfólio!
