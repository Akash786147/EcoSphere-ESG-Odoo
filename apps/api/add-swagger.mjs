import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

// Run from apps/api
const schemaFiles = globSync('src/modules/*/**/*.schema.ts').filter(f => !f.includes('auth.schema'));

for (const file of schemaFiles) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('registerCrudPaths')) continue;

  const parts = file.split(/[\\/]/); // e.g. src/modules/environmental/carbon-transactions/carbon-transactions.schema.ts
  const domain = parts[2]; // environmental
  const feature = parts[3]; // carbon-transactions

  const tag = domain.charAt(0).toUpperCase() + domain.slice(1);
  const basePath = `/api/v1/${domain}/${feature}`;
  const entityName = feature.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  let createName = 'undefined';
  let updateName = 'undefined';

  const lines = content.split('\n');
  for (const line of lines) {
    const createMatch = line.match(/export const (Create\w+Schema)/);
    if (createMatch) createName = createMatch[1];
    
    const updateMatch = line.match(/export const (Update\w+Schema)/);
    if (updateMatch) updateName = updateMatch[1];
  }

  // Generate append content
  const append = `
import { registerCrudPaths } from '../../../common/lib/openapi-crud.js';
import { z as _z } from 'zod';

registerCrudPaths({
  tags: ['${tag}'],
  basePath: '${basePath}',
  entityName: '${entityName}',
  schemas: {
    create: ${createName},
    update: ${updateName},
    response: _z.any(),
  },
});
`;

  // Avoid duplicate imports
  let newContent = content.replace(/import \{ z \} from 'zod';/g, "import { z } from 'zod';");
  if (newContent.includes('registerCrudPaths')) continue;

  fs.writeFileSync(file, newContent + '\n' + append.trim() + '\n');
  console.log(`Updated ${file}`);
}
