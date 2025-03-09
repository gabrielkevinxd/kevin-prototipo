# Guia de Refatoração e Padronização do Código

Este guia contém instruções práticas para refatorar e padronizar o código do projeto DSTELECOM Knowledge Platform.

## Estrutura de Importações

### Problema Atual

Atualmente temos inconsistências nas importações, usando diferentes padrões:

```typescript
// Usando importação relativa (inconsistente)
import { Component } from '../../features/module/path';

// Usando alias @ (ocasionalmente quebrado)
import { Component } from '@/features/module/path';
```

### Padrão Recomendado

1. **Para Importações Internas do Projeto:**

```typescript
// Use sempre o alias @ para importações internas
import { Component } from '@/features/module/path';
```

2. **Para Importações de Bibliotecas:**

```typescript
// Bibliotecas principais primeiro
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Depois componentes/funções de UI
import { Box, Typography, Button } from '@mui/material';
import { User, Settings } from 'lucide-react';

// Por último, importações internas
import { useAppSelector, useAppDispatch } from '@/core/hooks/reduxHooks';
import { selectUser } from '@/features/auth/store/authSlice';
```

## Uso do Redux

### Problema Atual

Uso inconsistente de hooks do Redux sem tipagem adequada:

```typescript
// Sem tipagem
const user = useSelector(state => state.auth.user);
const dispatch = useDispatch();
```

### Padrão Recomendado

Substituir por hooks tipados:

```typescript
// Com tipagem correta
import { useAppSelector, useAppDispatch } from '@/core/hooks/reduxHooks';

// Em um componente:
const user = useAppSelector(state => state.auth.user);
const dispatch = useAppDispatch();
```

## Tipagem

### Problema Atual

Uso excessivo de `any` e falta de tipagem em props:

```typescript
// Sem tipagem adequada
const Component = (props) => { ... }

// Uso de any
const data: any = fetchData();
```

### Padrão Recomendado

```typescript
// Interfaces para props
interface ComponentProps {
  title: string;
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

// Componente tipado
const Component: React.FC<ComponentProps> = ({ title, onSubmit, isLoading = false }) => { ... }

// Tipagem para dados
interface User {
  id: string;
  name: string;
  email: string;
}

const data: User[] = fetchData();
```

## Scripts de Automação Disponíveis

Para facilitar a correção de problemas comuns, use os scripts:

```bash
# Corrigir problemas de importação
npm run fix-imports

# Formatar código com Prettier
npm run format

# Verificar erros com ESLint
npm run lint
```

## Ordem de Refatoração Recomendada

1. Execute os scripts de correção automática
2. Substitua useSelector/useDispatch por useAppSelector/useAppDispatch
3. Adicione tipagens para props de componentes
4. Corrija as importações conforme o padrão recomendado
5. Verifique e corrija quaisquer avisos do ESLint restantes

## Exemplos de Antes/Depois

### Antes:

```typescript
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '@mui/material';
import { login } from '../../features/auth/store/authSlice';

const LoginPage = (props) => {
  const isLoading = useSelector(state => state.auth.isLoading);
  const error = useSelector(state => state.auth.error);
  const dispatch = useDispatch();

  const handleLogin = (data) => {
    dispatch(login(data));
  };

  return (
    <Container>
      {/* ... */}
    </Container>
  );
};

export default LoginPage;
```

### Depois:

```typescript
import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';

import { useAppSelector, useAppDispatch } from '@/core/hooks/reduxHooks';
import { login } from '@/features/auth/store/authSlice';
import { LoginForm } from '@/features/auth/components/LoginForm';

interface LoginPageProps {
  redirectTo?: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ redirectTo = '/dashboard' }) => {
  const { isLoading, error } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const handleLogin = (data: { email: string; password: string }) => {
    dispatch(login(data));
  };

  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4">Login</Typography>
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />
      </Box>
    </Container>
  );
};

export default LoginPage;
``` 