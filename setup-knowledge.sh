#!/bin/bash

echo "🚀 Instalando dependências da Knowledge Base..."

# Instalar dependências principais
npm install react-router-dom lucide-react fuse.js prismjs

# Instalar tipos TypeScript
npm install -D @types/prismjs

echo "✅ Dependências instaladas com sucesso!"
echo ""
echo "📝 Para usar a Knowledge Base:"
echo "1. Execute: npm run dev"
echo "2. Acesse: http://localhost:5173/knowledge"
echo ""
echo "🎯 Funcionalidades disponíveis:"
echo "- /knowledge - Dashboard principal"
echo "- /knowledge/cheatsheets - Comandos Git"
echo "- /knowledge/tools - Ferramentas curadas"
echo "- /knowledge/roadmap - Timeline de aprendizado"