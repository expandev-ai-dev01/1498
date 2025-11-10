# Cadastro de Bancos

Sistema para cadastro e gerenciamento de bancos do sistema financeiro brasileiro.

## Tecnologias

- React 18.3.1
- TypeScript 5.6.3
- Vite 5.4.11
- TailwindCSS 3.4.14
- React Router DOM 6.26.2
- TanStack Query 5.59.20
- Axios 1.7.7
- Zustand 5.0.1
- React Hook Form 7.53.1
- Zod 3.23.8

## Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── App.tsx            # Componente raiz
│   └── router.tsx         # Configuração de rotas
├── assets/                # Recursos estáticos
│   └── styles/           # Estilos globais
├── core/                  # Componentes e lógica compartilhada
│   ├── components/       # Componentes genéricos
│   ├── lib/              # Configurações de bibliotecas
│   ├── types/            # Tipos globais
│   └── utils/            # Utilitários
├── domain/               # Domínios de negócio
├── pages/                # Páginas da aplicação
│   └── layouts/          # Layouts compartilhados
└── main.tsx              # Ponto de entrada
```

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```env
VITE_API_URL=http://localhost:3000
VITE_API_VERSION=v1
VITE_API_TIMEOUT=30000
```

## Desenvolvimento

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Lint

```bash
npm run lint
```

## Funcionalidades

- Cadastrar novo banco
- Consultar bancos
- Editar informações de bancos
- Excluir bancos
- Listar todos os bancos
- Validar código bancário

## Arquitetura

O projeto segue uma arquitetura baseada em domínios com separação clara de responsabilidades:

- **app/**: Configuração e inicialização da aplicação
- **core/**: Componentes e lógica reutilizável
- **domain/**: Lógica de negócio organizada por domínio
- **pages/**: Componentes de página e layouts

## API

O frontend se comunica com o backend através de dois clientes HTTP:

- **publicClient**: Para endpoints públicos (`/api/v1/external`)
- **authenticatedClient**: Para endpoints autenticados (`/api/v1/internal`)

## Estado

Gerenciamento de estado utilizando:

- **TanStack Query**: Para estado do servidor (cache, sincronização)
- **Zustand**: Para estado global da aplicação (quando necessário)
- **React Hook Form**: Para estado de formulários

## Validação

Validação de formulários utilizando:

- **Zod**: Schemas de validação
- **React Hook Form**: Integração com formulários
- **@hookform/resolvers**: Resolvers para Zod

## Estilização

Estilização utilizando:

- **TailwindCSS**: Framework CSS utilitário
- **clsx**: Composição de classes CSS condicionais