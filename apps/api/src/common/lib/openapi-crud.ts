import { registry, ErrorSchema, PaginationQuerySchema, UuidParamSchema } from './openapi.js';
import { z } from 'zod';

export interface CrudPathOptions {
  tags: string[];
  basePath: string;
  entityName: string;
  schemas: {
    create?: z.ZodTypeAny;
    update?: z.ZodTypeAny;
    response?: z.ZodTypeAny;
  };
}

export function registerCrudPaths({ tags, basePath, entityName, schemas }: CrudPathOptions) {
  const security = [{ BearerAuth: [] }];

  if (schemas.response) {
    // List
    registry.registerPath({
      method: 'get',
      path: basePath,
      tags,
      summary: `List ${entityName}s`,
      security,
      request: {
        query: PaginationQuerySchema,
      },
      responses: {
        200: {
          description: `Paginated list of ${entityName}s`,
          content: {
            'application/json': {
              schema: z.object({
                rows: z.array(schemas.response),
                meta: z.object({
                  page: z.number(),
                  limit: z.number(),
                  total: z.number(),
                  totalPages: z.number(),
                }),
              }),
            },
          },
        },
        401: { description: 'Unauthorized', content: { 'application/json': { schema: ErrorSchema } } },
      },
    });

    // Get One
    registry.registerPath({
      method: 'get',
      path: `${basePath}/{id}`,
      tags,
      summary: `Get a single ${entityName}`,
      security,
      request: {
        params: UuidParamSchema,
      },
      responses: {
        200: { description: `${entityName} details`, content: { 'application/json': { schema: schemas.response } } },
        404: { description: 'Not Found', content: { 'application/json': { schema: ErrorSchema } } },
      },
    });
  }

  // Create
  if (schemas.create && schemas.response) {
    registry.registerPath({
      method: 'post',
      path: basePath,
      tags,
      summary: `Create a new ${entityName}`,
      security,
      request: {
        body: { content: { 'application/json': { schema: schemas.create } } },
      },
      responses: {
        201: { description: `Successfully created ${entityName}`, content: { 'application/json': { schema: schemas.response } } },
        400: { description: 'Validation Error', content: { 'application/json': { schema: ErrorSchema } } },
      },
    });
  }

  // Update
  if (schemas.update && schemas.response) {
    registry.registerPath({
      method: 'put',
      path: `${basePath}/{id}`,
      tags,
      summary: `Update ${entityName}`,
      security,
      request: {
        params: UuidParamSchema,
        body: { content: { 'application/json': { schema: schemas.update } } },
      },
      responses: {
        200: { description: `Successfully updated ${entityName}`, content: { 'application/json': { schema: schemas.response } } },
        400: { description: 'Validation Error', content: { 'application/json': { schema: ErrorSchema } } },
        404: { description: 'Not Found', content: { 'application/json': { schema: ErrorSchema } } },
      },
    });
  }

  // Delete
  registry.registerPath({
    method: 'delete',
    path: `${basePath}/{id}`,
    tags,
    summary: `Delete ${entityName}`,
    security,
    request: {
      params: UuidParamSchema,
    },
    responses: {
      204: { description: 'Successfully deleted' },
      404: { description: 'Not Found', content: { 'application/json': { schema: ErrorSchema } } },
    },
  });
}
