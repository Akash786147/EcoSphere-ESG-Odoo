import { z } from 'zod';

export const ApproveRejectSchema = z.object({
  reason: z.string().optional(),
});
export type ApproveRejectBody = z.infer<typeof ApproveRejectSchema>;

import { registerCrudPaths } from '../../../common/lib/openapi-crud.js';
import { z as _z } from 'zod';

registerCrudPaths({
  tags: ['Social'],
  basePath: '/api/v1/social/participations',
  entityName: 'Participations',
  schemas: {
    create: undefined,
    update: undefined,
    response: _z.any(),
  },
});
