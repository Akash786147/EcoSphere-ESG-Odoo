import { z } from 'zod';
import { IssueSeverity, IssueStatus } from '../../../common/types/enums.js';

export const CreateComplianceIssueSchema = z.object({
  auditId: z.string().uuid(),
  severity: z.nativeEnum(IssueSeverity),
  description: z.string().min(10),
  ownerId: z.string().uuid(),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});
export type CreateComplianceIssueBody = z.infer<typeof CreateComplianceIssueSchema>;

export const UpdateComplianceIssueSchema = CreateComplianceIssueSchema.partial().extend({
  status: z.nativeEnum(IssueStatus).optional(),
});
export type UpdateComplianceIssueBody = z.infer<typeof UpdateComplianceIssueSchema>;

export const ReassignSchema = z.object({ ownerId: z.string().uuid() });
export type ReassignBody = z.infer<typeof ReassignSchema>;

import { registerCrudPaths } from '../../../common/lib/openapi-crud.js';
import { z as _z } from 'zod';

registerCrudPaths({
  tags: ['Governance'],
  basePath: '/api/v1/governance/compliance-issues',
  entityName: 'Compliance Issues',
  schemas: {
    create: CreateComplianceIssueSchema,
    update: UpdateComplianceIssueSchema,
    response: _z.any(),
  },
});
