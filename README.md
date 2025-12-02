# André Portfolio - React

Modern and minimalist professional portfolio built with React + TypeScript + Vite.

## 🚀 Technologies

- **React 19** - JavaScript Framework
- **TypeScript** - Statically typed language
- **Vite** - Fast build tool
- **Modern CSS** - CSS Variables, animations, and responsive design

## 📁 Project Structure

```
src/
├── components/         # React Components
│   ├── Header.tsx     # Header with navigation
│   ├── Hero.tsx       # Hero section
│   ├── About.tsx      # About section
│   ├── Skills.tsx     # Skills
│   ├── Projects.tsx   # Projects grid
│   ├── ProjectCard.tsx # Individual card
│   ├── Contact.tsx    # Contact
│   └── Footer.tsx     # Footer
├── data.ts            # Projects and skills data
├── types.ts           # TypeScript definitions
├── App.tsx            # Main component
└── main.tsx           # Entry point
```

## 🛠️ Installation and Usage

1. **Install dependencies:**
```bash
npm install
```

2. **Copy images to public/Imagens/**
Manually copy the `Imagens` folder from the old project to `public/Imagens/`.

3. **Start development server:**
```bash
npm run dev
```

4. **Access:**
```
http://localhost:5173
```

## 📝 Customization

### Edit Project Data

Edit the file `src/data.ts`:
```typescript
export const projects: Project[] = [
  {
    id: 1,
    title: 'Project Name',
    image: '/Imagens/image.png',
    link: 'https://...',
    tags: ['React', 'TypeScript'],
    description: 'Project description'
  },
  // ...
];
```

### Edit Skills

In the same file:
```typescript
export const skills: Skill[] = [
  { name: 'React', level: 90 },
  // ...
];
```

### Customize Contact Links

Edit `src/components/Contact.tsx`:
```typescript
<a href="mailto:YOUR_EMAIL" className="contact-link">
<a href="https://github.com/YOUR_USER" className="contact-link">
<a href="https://linkedin.com/in/YOUR_USER" className="contact-link">
```

## 🎨 Style Customization

Styles are organized in separate CSS files per component:
- `src/components/*.css` - Component-specific styles
- `src/App.css` - Global app styles
- `src/index.css` - Reset and CSS variables

## 📦 Production Build

```bash
npm run build
```

The build will be generated in the `dist/` folder.

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

## 📄 Available Scripts

- `npm run dev` - Starts development server
- `npm run build` - Production build
- `npm run preview` - Build preview
- `npm run lint` - Runs ESLint

## 🎯 Next Steps

- [ ] Add more sophisticated animations
- [ ] Implement dark/light mode
- [ ] Add blog or articles section
- [ ] Implement internationalization (i18n)
- [ ] Add unit tests

## 📞 Contact

For questions or suggestions, get in touch via the links in the portfolio!
