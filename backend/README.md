# Cadastro de Bancos - Backend API

Backend API for Brazilian bank registry system.

## Features

- Bank registration and management
- Bank code validation
- Complete CRUD operations
- RESTful API design
- Multi-tenancy support
- TypeScript implementation

## Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MS SQL Server
- **Validation**: Zod

## Project Structure

```
src/
├── api/                    # API controllers
├── routes/                 # Route definitions
├── middleware/             # Express middleware
├── services/               # Business logic
├── utils/                  # Utility functions
├── instances/              # Service instances
└── server.ts              # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 18+
- MS SQL Server
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your database credentials

4. Run database migrations (execute SQL scripts in `database/` folder)

### Development

```bash
npm run dev
```

Server will start on `http://localhost:3000`

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## API Endpoints

All endpoints are prefixed with `/api/v1`

### Health Check
- `GET /health` - Server health status

### Banks (Internal)
- `GET /api/v1/internal/bank` - List all banks
- `POST /api/v1/internal/bank` - Create new bank
- `GET /api/v1/internal/bank/:id` - Get bank details
- `PUT /api/v1/internal/bank/:id` - Update bank
- `DELETE /api/v1/internal/bank/:id` - Delete bank

## Environment Variables

| Variable | Description | Default |
|----------|-------------|----------|
| NODE_ENV | Environment | development |
| PORT | Server port | 3000 |
| DB_SERVER | Database server | localhost |
| DB_PORT | Database port | 1433 |
| DB_USER | Database user | sa |
| DB_PASSWORD | Database password | - |
| DB_NAME | Database name | cadastro_bancos |
| DB_ENCRYPT | Enable encryption | true |

## License

ISC