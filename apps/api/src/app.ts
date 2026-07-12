import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { pinoHttp } from 'pino-http';
import { logger } from './common/config/logger.js';
import { errorHandler } from './common/middleware/error-handler.js';
import { generateOpenAPIDocument } from './common/lib/openapi.js';
import swaggerUi from 'swagger-ui-express';

// Module routes
import { authRoutes } from './modules/auth/auth.routes.js';
import { platformRoutes } from './modules/platform/platform.routes.js';
import { peopleRoutes } from './modules/people/people.routes.js';
import { environmentalRoutes } from './modules/environmental/environmental.routes.js';
import { socialRoutes } from './modules/social/social.routes.js';
import { governanceRoutes } from './modules/governance/governance.routes.js';
import { gamificationRoutes } from './modules/gamification/gamification.routes.js';
import { scoringRoutes } from './modules/scoring/scoring.routes.js';
import { analyticsRoutes } from './modules/analytics/analytics.routes.js';
import { notificationsRoutes } from './modules/notifications/notifications.routes.js';
import { filesRoutes } from './modules/files/files.routes.js';

export const app = express();

// ─── Global Middleware ───────────────────────────────────────────────
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(pinoHttp({
  logger,
  serializers: {
    req: (req) => ({ method: req.method, url: req.url }),
    res: (res) => ({ statusCode: res.statusCode }),
  },
}));

// ─── Health & Docs ───────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/openapi.json', (_req, res) => {
  res.json(generateOpenAPIDocument());
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(generateOpenAPIDocument(), {
  customSiteTitle: "EcoSphere API Docs",
  swaggerOptions: { persistAuthorization: true },
}));

// ─── API v1 Routes ──────────────────────────────────────────────────
const v1 = express.Router();

v1.use('/auth', authRoutes);
v1.use('/platform', platformRoutes);
v1.use('/people', peopleRoutes);
v1.use('/environmental', environmentalRoutes);
v1.use('/social', socialRoutes);
v1.use('/governance', governanceRoutes);
v1.use('/gamification', gamificationRoutes);
v1.use('/scoring', scoringRoutes);
v1.use('/analytics', analyticsRoutes);
v1.use('/notifications', notificationsRoutes);
v1.use('/files', filesRoutes);

app.use('/api/v1', v1);

// ─── Error Handling ─────────────────────────────────────────────────
app.use(errorHandler);
