import {
  OpenAPIRegistry,
  OpenApiGeneratorV31,
  extendZodWithOpenApi,
} from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const registry = new OpenAPIRegistry();

registry.registerComponent('securitySchemes', 'BearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
  description: 'JWT access token obtained from POST /api/v1/auth/login',
});

export const ErrorSchema = registry.register(
  'Error',
  z.object({
    error: z.string().openapi({ example: 'Something went wrong' }),
    details: z.record(z.array(z.string())).optional(),
  }),
);

export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const UuidParamSchema = z.object({
  id: z.string().uuid(),
});

export function generateOpenAPIDocument() {
  const generator = new OpenApiGeneratorV31(registry.definitions);
  return generator.generateDocument({
    openapi: '3.1.0',
    info: {
      title: 'EcoSphere ESG Platform API',
      version: '1.0.0',
      description: 'Modular Monolith ESG Platform API',
      contact: { name: 'EcoSphere Engineering' },
      license: { name: 'Private' },
    },
    servers: [
      { url: 'http://localhost:8080', description: 'Local development' },
    ],
    tags: [
      { name: 'Auth' },
      { name: 'Platform' },
      { name: 'People' },
      { name: 'Environmental' },
      { name: 'Social' },
      { name: 'Governance' },
      { name: 'Gamification' },
      { name: 'Scoring' },
      { name: 'Analytics' },
      { name: 'Notifications' },
    ],
  });
}
