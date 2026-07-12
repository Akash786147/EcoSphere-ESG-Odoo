import { z } from 'zod';
import { GoalMetric } from '../../../common/types/enums.js';

export const CreateGoalSchema = z.object({
  title: z.string().min(2),
  departmentId: z.string().uuid().optional(),
  metric: z.nativeEnum(GoalMetric),
  targetValue: z.coerce.number(),
  baselineValue: z.coerce.number(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  targetDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});
export type CreateGoalBody = z.infer<typeof CreateGoalSchema>;

export const UpdateGoalSchema = CreateGoalSchema.partial();
export type UpdateGoalBody = z.infer<typeof UpdateGoalSchema>;

import { registerCrudPaths } from '../../../common/lib/openapi-crud.js';
import { z as _z } from 'zod';

registerCrudPaths({
  tags: ['Environmental'],
  basePath: '/api/v1/environmental/goals',
  entityName: 'Goals',
  schemas: {
    create: CreateGoalSchema,
    update: UpdateGoalSchema,
    response: _z.any(),
  },
});
