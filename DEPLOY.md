# 🚀 Guia de Deploy - Portfólio André

Este guia vai te ajudar a publicar seu portfólio no GitHub e fazer o deploy na Netlify.

## 📋 Pré-requisitos

- Conta no GitHub
- Conta no Netlify
- Git instalado localmente

## 1️⃣ Publicar no GitHub

### Passo 1: Criar Repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique no botão **"+"** no canto superior direito → **"New repository"**
3. Preencha:
   - **Repository name**: `portifolio-andre-react` (ou o nome que preferir)
   - **Description**: "Portfólio profissional com Angular + TypeScript"
   - **Visibilidade**: Público ou Privado
4. **NÃO** marque "Initialize with README" (já temos)
5. Clique em **"Create repository"**

### Passo 2: Conectar Repositório Local ao GitHub

Execute os seguintes comandos no terminal (substitua `seu-usuario` pelo seu username):

```bash
git branch -M main
git remote add origin https://github.com/seu-usuario/portifolio-andre-react.git
git push -u origin main
```

**Exemplo real:**
```bash
git branch -M main
git remote add origin https://github.com/DevAndreNarcizo/portifolio-andre-react.git
git push -u origin main
```

### Problema: GitHub pode pedir autenticação

Se o GitHub pedir usuário/senha ou token:

1. Vá em **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Clique em **"Generate new token (classic)"**
3. Dê um nome e marque as permissões: `repo`
4. Copie o token gerado
5. Use o token como senha ao fazer push

## 2️⃣ Deploy na Netlify

### Opção 1: Via Git (Recomendado)

1. Acesse [netlify.com](https://netlify.com) e faça login
2. Clique em **"Add new site"** → **"Import an existing project"**
3. Clique em **"Deploy with GitHub"**
4. Autorize o Netlify a acessar seu GitHub
5. Selecione o repositório `portifolio-andre-react`
6. Configure as opções:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist/portfolio-andre/browser`
7. Clique em **"Deploy site"**

A Netlify vai:
- Clonar seu repositório
- Instalar dependências (`npm install`)
- Fazer o build (`npm run build`)
- Publicar o site

### Opção 2: Via Netlify CLI

```bash
# Instalar Netlify CLI (se ainda não tem)
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### Configurações Adicionais

#### Custom Domain (Domínio Personalizado)

1. No Netlify, vá em **Site settings** → **Domain management**
2. Clique em **"Add custom domain"**
3. Digite seu domínio (ex: `andreluis.dev`)
4. Siga as instruções para configurar DNS

#### Configuração Build Automático

O Netlify detecta automaticamente mudanças e refaz o deploy quando você faz push no GitHub!

**Configurações automáticas:**
- **Build command**: `npm run build`
- **Publish directory**: `dist/portfolio-andre/browser`
- **Auto-publish**: Habilitado

### Atualizar o Site

Após fazer alterações no código:

```bash
git add .
git commit -m "Sua mensagem de commit"
git push
```

O Netlify vai detectar automaticamente e fazer um novo deploy!

## 🔧 Comandos Git Úteis

```bash
# Ver status
git status

# Adicionar arquivos
git add .

# Commit
git commit -m "Sua mensagem"

# Push para GitHub
git push

# Ver histórico
git log --oneline

# Voltar versão anterior (se necessário)
git checkout <hash-do-commit>
```

## 📝 Checklist

- [ ] Criar repositório no GitHub
- [ ] Fazer push do código
- [ ] Criar conta no Netlify
- [ ] Fazer deploy via GitHub
- [ ] Testar site publicado
- [ ] Adicionar domínio personalizado (opcional)
- [ ] Compartilhar link nas redes sociais!

## 🎉 Pronto!

Seu portfólio está no ar! 🚀

## 📞 Suporte

Se tiver problemas, consulte:
- [Documentação Netlify](https://docs.netlify.com/)
- [Documentação GitHub](https://docs.github.com/)
- [Documentação Angular](https://angular.dev/)

## 🎨 URLs Úteis

- GitHub: `https://github.com/seu-usuario/portifolio-andre-react`
- Netlify: `https://seu-site.netlify.app`
- Site Live: Será gerado pela Netlify

