const fs = require('fs');
const path = require('path');

// Configurações
const SRC_DIR = path.resolve(__dirname, '../src');
const COMMON_IMPORT_ERRORS = [
  {
    from: /from ['"]@\/features\//g,
    to: 'from \'../../features/'
  },
  {
    from: /from ['"]@\/core\//g,
    to: 'from \'../../core/'
  },
];

// Função para corrigir importações em um arquivo
function fixImportsInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let updatedContent = content;
    
    // Aplicar correções
    COMMON_IMPORT_ERRORS.forEach(({ from, to }) => {
      updatedContent = updatedContent.replace(from, to);
    });
    
    // Salvar se houve mudanças
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`✅ Corrigido: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Erro ao processar ${filePath}:`, error.message);
    return false;
  }
}

// Função para percorrer arquivos recursivamente
function processDirectory(directory) {
  let changedFiles = 0;
  
  const items = fs.readdirSync(directory);
  
  items.forEach(item => {
    const itemPath = path.join(directory, item);
    const stats = fs.statSync(itemPath);
    
    if (stats.isDirectory()) {
      changedFiles += processDirectory(itemPath);
    } else if (stats.isFile() && (itemPath.endsWith('.ts') || itemPath.endsWith('.tsx'))) {
      if (fixImportsInFile(itemPath)) {
        changedFiles++;
      }
    }
  });
  
  return changedFiles;
}

// Iniciar processo de correção
console.log('🔍 Iniciando correção de importações...');
const changedFiles = processDirectory(SRC_DIR);
console.log(`✨ Concluído! ${changedFiles} arquivo(s) corrigido(s).`);

// Sugestão para próximos passos
console.log('\n📝 Próximos passos:');
console.log('1. Execute "npm run format" para formatar os arquivos');
console.log('2. Execute "npm run dev" para iniciar o servidor de desenvolvimento');
console.log('3. Verifique se os imports foram corrigidos corretamente\n'); 