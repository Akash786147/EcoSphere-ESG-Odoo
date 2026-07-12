const fs = require('fs');
const path = require('path');
function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (full.endsWith('.ts')) {
      let content = fs.readFileSync(full, 'utf8');
      if (content.includes("req.params['id']!")) {
        content = content.replace(/req\.params\['id'\]!/g, "req.params['id'] as string");
        fs.writeFileSync(full, content);
      }
    }
  }
}
walk('src/modules');
