#!/bin/bash
# fix-imports.sh

# Este script corrige problemas comuns de importação e formatação

echo "Iniciando correção de problemas comuns..."

# Corrigir imports com @
echo "Corrigindo caminhos de importação..."
find ./src -type f -name "*.ts" -o -name "*.tsx" | xargs sed -i 's/from "@\/features/from "..\/..\/features/g'

# Executar ESLint com --fix
echo "Executando ESLint com correção automática..."
npx eslint --fix "./src/**/*.{ts,tsx}"

# Execução do Prettier
echo "Executando Prettier para formatação de código..."
npx prettier --write "./src/**/*.{ts,tsx}"

echo "Correções aplicadas. Execute 'npm run lint' para verificar o resultado." 