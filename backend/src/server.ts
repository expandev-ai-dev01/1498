import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import { errorMiddleware } from '@/middleware/error';
import { notFoundMiddleware } from '@/middleware/notFound';
import apiRoutes from '@/routes';

dotenv.config();

const app: Application = express();

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? process.env.CORS_ORIGINS?.split(',') || []
        : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
    maxAge: 86400,
  })
);

// Request processing middleware
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// API Routes with versioning
app.use('/api', apiRoutes);

// 404 handler
app.use(notFoundMiddleware);

// Error handling
app.use(errorMiddleware);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Server startup
const PORT = parseInt(process.env.PORT || '3000');
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

export default server;
