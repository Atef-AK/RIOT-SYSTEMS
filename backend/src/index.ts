import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import { config } from './config';
import { errorHandler } from './middleware/errorHandler';
import { apiLimiter } from './middleware/rateLimiter';

// Import Routes
import authRoutes from './routes/authRoutes';
import servicesRoutes from './routes/servicesRoutes';
import projectsRoutes from './routes/projectsRoutes';
import messagesRoutes from './routes/messagesRoutes';
import { pagesRouter, sectionsRouter } from './routes/pagesRoutes';
import settingsRoutes from './routes/settingsRoutes';
import mediaRoutes from './routes/mediaRoutes';
import testimonialsRoutes from './routes/testimonialsRoutes';
import teamRoutes from './routes/teamRoutes';
import usersRoutes from './routes/usersRoutes';
import navigationRoutes from './routes/navigationRoutes';
import technologiesRoutes from './routes/technologiesRoutes';
import statsRoutes from './routes/statsRoutes';

const app = express();

// Trust reverse proxy (Nginx)
app.set('trust proxy', 1);

// Ensure upload directory exists
const uploadDirectory = path.resolve(process.cwd(), config.uploadDir);
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Security & Utility Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      // In development or if origin matches config
      if (
        config.nodeEnv === 'development' ||
        config.corsOrigin.includes(origin) ||
        config.corsOrigin.includes('*')
      ) {
        return callback(null, true);
      }
      return callback(null, true); // Fallback allow
    },
    credentials: true,
  })
);

app.use(morgan(config.nodeEnv === 'development' ? 'dev' : 'combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads directory
app.use('/uploads', express.static(uploadDirectory));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: 'R-IoTSys Core API',
  });
});

// API Routes with Rate Limiting
app.use('/api', apiLimiter);
app.use('/api/auth', authRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/pages', pagesRouter);
app.use('/api/sections', sectionsRouter);
app.use('/api/settings', settingsRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/navigation', navigationRoutes);
app.use('/api/technologies', technologiesRoutes);
app.use('/api/stats', statsRoutes);

// Catch 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use(errorHandler);

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, '0.0.0.0', () => {
    console.log(`=========================================`);
    console.log(`⚡ R-IoTSys API Server running on port ${config.port}`);
    console.log(`🌐 Environment: ${config.nodeEnv}`);
    console.log(`📁 Uploads dir: ${uploadDirectory}`);
    console.log(`=========================================`);
  });
}

export default app;
