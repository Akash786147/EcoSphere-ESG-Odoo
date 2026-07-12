import { z } from 'zod';
import { CategoryType } from '../../../common/types/enums.js';

export const CreateCategorySchema = z.object({
  name: z.string().min(2),
  type: z.nativeEnum(CategoryType),
});
export type CreateCategoryBody = z.infer<typeof CreateCategorySchema>;

export const UpdateCategorySchema = CreateCategorySchema.partial();
export type UpdateCategoryBody = z.infer<typeof UpdateCategorySchema>;

import { registerCrudPaths } from '../../../common/lib/openapi-crud.js';
import { z as _z } from 'zod';

registerCrudPaths({
  tags: ['Social'],
  basePath: '/api/v1/social/categories',
  entityName: 'Categories',
  schemas: {
    create: CreateCategorySchema,
    update: UpdateCategorySchema,
    response: _z.any(),
  },
});
