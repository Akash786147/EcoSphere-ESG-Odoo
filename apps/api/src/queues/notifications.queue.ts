import { Queue, Worker, type ConnectionOptions } from 'bullmq';
import { redisConnection } from '../common/lib/redis.js';
import { logger } from '../common/config/logger.js';

export const NOTIFICATION_QUEUE = 'ecosphere:notifications';

export interface NotificationJobData {
  orgId: string;
  recipientId: string;
  type: string;
  title: string;
  body: string;
  payload?: Record<string, unknown>;
}

const queueOpts = {
  connection: redisConnection as ConnectionOptions,
  defaultJobOptions: {
    attempts: 5,
    backoff: { type: 'exponential' as const, delay: 10_000 },
  },
};

export const notificationQueue = new Queue<NotificationJobData>(NOTIFICATION_QUEUE, queueOpts);

export const notificationWorker = new Worker<NotificationJobData>(
  NOTIFICATION_QUEUE,
  async (job) => {
    logger.info({ jobId: job.id, recipientId: job.data.recipientId }, 'Sending notification');
    // TODO: Actually send push/email and update notification_queue table status
  },
  { connection: redisConnection as ConnectionOptions },
);
