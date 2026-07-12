import { z } from 'zod';
import { AuditType, AuditStatus } from '../../../common/types/enums.js';

export const CreateAuditSchema = z.object({
  title: z.string().min(2),
  auditType: z.nativeEnum(AuditType),
  departmentId: z.string().uuid(),
  vendorId: z.string().uuid().optional(),
  auditorId: z.string().uuid(),
  auditDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  findingsSummary: z.string().optional(),
});
export type CreateAuditBody = z.infer<typeof CreateAuditSchema>;

export const UpdateAuditSchema = CreateAuditSchema.partial().extend({
  status: z.nativeEnum(AuditStatus).optional(),
});
export type UpdateAuditBody = z.infer<typeof UpdateAuditSchema>;

import { registerCrudPaths } from '../../../common/lib/openapi-crud.js';
import { z as _z } from 'zod';

registerCrudPaths({
  tags: ['Governance'],
  basePath: '/api/v1/governance/audits',
  entityName: 'Audits',
  schemas: {
    create: CreateAuditSchema,
    update: UpdateAuditSchema,
    response: _z.any(),
  },
});
