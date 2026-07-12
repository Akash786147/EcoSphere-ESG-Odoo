import { app } from './app.js';
import { env } from './common/config/env.js';
import { logger } from './common/config/logger.js';
import { pool } from './common/db/db.js';
import { redisConnection } from './common/lib/redis.js';

const server = app.listen(env.API_PORT, () => {
  logger.info(`API listening on port ${env.API_PORT}`);
});

// Graceful shutdown
const shutdown = async () => {
  logger.info('Shutting down API server...');
  server.close(async () => {
    logger.info('HTTP server closed.');
    await pool.end();
    redisConnection.disconnect();
    logger.info('Database & Redis connections closed.');
    process.exit(0);
  });
  
  // Force exit after 10s
  setTimeout(() => {
    logger.fatal('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
