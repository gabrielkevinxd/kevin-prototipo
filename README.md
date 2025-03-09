# DSTELECOM Knowledge Platform

Protótipo da Plataforma de Conhecimento DSTELECOM, um sistema para gerenciamento, compartilhamento e busca de informações técnicas e organizacionais.

## Funcionalidades

- Autenticação segura e gerenciamento de usuários
- Biblioteca de documentos categorizada
- Dashboard com métricas e atividades recentes
- Perfil de usuário personalizado
- Busca avançada com integração de IA
- Interface moderna e responsiva

## Tecnologias

- React com TypeScript
- Material UI para componentes
- Redux para gerenciamento de estado
- Supabase para backend e autenticação
- Vite para build e desenvolvimento

## Estrutura do Projeto

O projeto segue uma arquitetura modular baseada em features:

```
src/
├── core/             # Componentes e serviços compartilhados
│   ├── components/   # Componentes de UI reutilizáveis
│   ├── hooks/        # Hooks personalizados
│   ├── services/     # Serviços compartilhados
│   ├── store/        # Configuração do Redux
│   └── theme/        # Tema da aplicação
├── features/         # Módulos funcionais da aplicação
│   ├── auth/         # Autenticação e registro
│   ├── dashboard/    # Dashboard principal
│   ├── library/      # Biblioteca de documentos
│   ├── profile/      # Perfil de usuário
│   └── admin/        # Painel administrativo
└── types/            # Definições de tipos globais
```

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Construir para produção
npm run build

# Executar testes
npm run test
```

## Guias

- [Guia de Refatoração](./REFATORACAO.md) - Instruções para padronização do código
- [Plano de Implementação](./PLANO_IMPLEMENTACAO.md) - Cronograma e estratégia de desenvolvimento

## Licença

Este projeto é proprietário e de uso exclusivo da DSTELECOM. 