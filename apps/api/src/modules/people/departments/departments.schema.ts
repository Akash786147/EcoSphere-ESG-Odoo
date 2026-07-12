import { z } from 'zod';

export const CreateDepartmentSchema = z.object({
  name: z.string().min(2),
  code: z.string().min(1).max(20),
  parentDepartmentId: z.string().uuid().optional(),
  headId: z.string().uuid().optional(),
});
export type CreateDepartmentBody = z.infer<typeof CreateDepartmentSchema>;

export const UpdateDepartmentSchema = CreateDepartmentSchema.partial();
export type UpdateDepartmentBody = z.infer<typeof UpdateDepartmentSchema>;

import { registerCrudPaths } from '../../../common/lib/openapi-crud.js';
import { z as _z } from 'zod';

registerCrudPaths({
  tags: ['People'],
  basePath: '/api/v1/people/departments',
  entityName: 'Departments',
  schemas: {
    create: CreateDepartmentSchema,
    update: UpdateDepartmentSchema,
    response: _z.any(),
  },
});
