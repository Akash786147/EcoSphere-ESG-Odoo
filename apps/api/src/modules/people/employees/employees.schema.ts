import { z } from 'zod';

export const CreateEmployeeSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  departmentId: z.string().uuid(),
  role: z.enum(['ADMIN', 'ESG_OFFICER', 'DEPT_HEAD', 'EMPLOYEE', 'AUDITOR']).default('EMPLOYEE'),
  joinDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  gender: z.string().optional(),
  ageBand: z.string().optional(),
  ethnicity: z.string().optional(),
  disabilityStatus: z.boolean().optional(),
  nationality: z.string().optional(),
});
export type CreateEmployeeBody = z.infer<typeof CreateEmployeeSchema>;

export const UpdateEmployeeSchema = CreateEmployeeSchema.omit({ password: true, email: true }).partial();
export type UpdateEmployeeBody = z.infer<typeof UpdateEmployeeSchema>;

export const ChangeRoleSchema = z.object({
  role: z.enum(['ADMIN', 'ESG_OFFICER', 'DEPT_HEAD', 'EMPLOYEE', 'AUDITOR']),
});
export type ChangeRoleBody = z.infer<typeof ChangeRoleSchema>;

export const DiversityUpdateSchema = z.object({
  gender: z.string().optional(),
  ageBand: z.string().optional(),
  ethnicity: z.string().optional(),
  disabilityStatus: z.boolean().optional(),
  nationality: z.string().optional(),
});
export type DiversityUpdateBody = z.infer<typeof DiversityUpdateSchema>;

import { registerCrudPaths } from '../../../common/lib/openapi-crud.js';
import { z as _z } from 'zod';

registerCrudPaths({
  tags: ['People'],
  basePath: '/api/v1/people/employees',
  entityName: 'Employees',
  schemas: {
    create: CreateEmployeeSchema,
    update: UpdateEmployeeSchema,
    response: _z.any(),
  },
});
