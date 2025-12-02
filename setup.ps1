# Script para configurar o projeto
Write-Host "Copiando imagens..." -ForegroundColor Green

# Criar pasta Imagens em public
$destDir = Join-Path $PSScriptRoot "public\Imagens"
New-Item -ItemType Directory -Force -Path $destDir | Out-Null

# Copiar imagens (ajuste o caminho se necessário)
$sourceDir = "D:\TUDO\Projetos\Portifolio\Portifólio André\Imagens"

if (Test-Path $sourceDir) {
    Copy-Item -Path "$sourceDir\*" -Destination $destDir -Recurse -Force
    Write-Host "Imagens copiadas com sucesso!" -ForegroundColor Green
} else {
    Write-Host "Aviso: Pasta de origem não encontrada. Copie manualmente as imagens para public\Imagens\" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Configuração concluída! Agora execute:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White

