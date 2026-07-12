import { Queue, Worker, type ConnectionOptions } from 'bullmq';
import { redisConnection } from '../common/lib/redis.js';
import { logger } from '../common/config/logger.js';

export const SCORING_QUEUE = 'ecosphere:scoring';

export interface ScoringJobData {
  orgId: string;
  /** Omit to recalculate all departments */
  departmentId?: string;
  /** 'YYYY-MM' monthly period */
  period: string;
}

const queueOpts = {
  connection: redisConnection as ConnectionOptions,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential' as const, delay: 5_000 },
    removeOnComplete: { count: 100 },
    removeOnFail: { count: 500 },
  },
};

export const scoringQueue = new Queue<ScoringJobData>(SCORING_QUEUE, queueOpts);

export const scoringWorker = new Worker<ScoringJobData>(
  SCORING_QUEUE,
  async (job) => {
    const { orgId, departmentId, period } = job.data;
    logger.info({ orgId, departmentId, period, jobId: job.id }, 'Scoring job started');

    // TODO – implement pluggable Scorer pipeline (ADR-0004):
    // 1. Environmental Scorer  → 0-100 E pillar score
    // 2. Social Scorer         → 0-100 S pillar score
    // 3. Governance Scorer     → 0-100 G pillar score
    // 4. Apply org pillar weights (default 40/30/30) → total score
    // 5. Upsert department_scores snapshot row
    await job.updateProgress(100);
    logger.info({ jobId: job.id }, 'Scoring job complete');
  },
  { connection: redisConnection as ConnectionOptions },
);
