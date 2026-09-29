// Must be the first import: ES module imports are evaluated in source order
// before any other top-level statement in this file runs, so a later
// `dotenv.config()` call would load .env only *after* every router below
// has already been evaluated — too late for any module-level code that
// reads process.env (e.g. a JWT secret computed as a top-level constant).
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import { initializeDatabase } from './services/database';
import { startMarketingScheduler } from './services/scheduler';
import authRouter from './routes/auth';
import productsRouter from './routes/products';
import marketingRouter from './routes/marketing';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/marketing', marketingRouter);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: err.message || 'Internal server error',
  });
});

// Initialize database and start server
async function start() {
  try {
    initializeDatabase();
    console.log('Database initialized');

    startMarketingScheduler();

    app.listen(PORT, () => {
      console.log(`🏭 Factory API running at http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();

export default app;
