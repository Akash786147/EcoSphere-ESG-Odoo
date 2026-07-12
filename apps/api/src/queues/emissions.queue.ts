import { Queue, Worker, type ConnectionOptions } from 'bullmq';
import { redisConnection } from '../common/lib/redis.js';
import { logger } from '../common/config/logger.js';

export const EMISSIONS_QUEUE = 'ecosphere:emissions';

export interface EmissionsJobData {
  orgId: string;
  operationId: string;
}

export const emissionsQueue = new Queue<EmissionsJobData>(EMISSIONS_QUEUE, {
  connection: redisConnection as ConnectionOptions,
});

export const emissionsWorker = new Worker<EmissionsJobData>(
  EMISSIONS_QUEUE,
  async (job) => {
    logger.info({ jobId: job.id, operationId: job.data.operationId }, 'Calculating emissions');
    // TODO: fetch operation, find emission factor, multiply, create carbon_transaction
  },
  { connection: redisConnection as ConnectionOptions },
);
