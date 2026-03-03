import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { buildSchema } from '@tinacms/graphql';

const root = process.cwd();
const tinaDir = path.join(root, 'tina');
const generatedDir = path.join(tinaDir, '__generated__');
const configEntry = path.join(tinaDir, 'config.ts');
const bundledConfigPath = path.join(os.tmpdir(), `screenfix-tina-config-${Date.now()}.mjs`);

await fs.mkdir(generatedDir, { recursive: true });

await build({
  entryPoints: [configEntry],
  outfile: bundledConfigPath,
  bundle: true,
  platform: 'node',
  format: 'esm',
  sourcemap: false
});

const configModule = await import(pathToFileURL(bundledConfigPath).href);
const config = configModule.default;
const { graphQLSchema, tinaSchema, lookup } = await buildSchema(config);

const schemaPayload = tinaSchema.schema;
const lockPayload = {
  schema: schemaPayload,
  lookup,
  graphql: graphQLSchema
};

await fs.writeFile(
  path.join(generatedDir, 'config.prebuild.jsx'),
  `// tina/config.ts\nexport { default } from '../config.ts';\n`,
  'utf8'
);
await fs.writeFile(path.join(generatedDir, '_graphql.json'), JSON.stringify(graphQLSchema, null, 2) + '\n', 'utf8');
await fs.writeFile(path.join(generatedDir, '_schema.json'), JSON.stringify(schemaPayload, null, 2) + '\n', 'utf8');
await fs.writeFile(path.join(generatedDir, '_lookup.json'), JSON.stringify(lookup, null, 2) + '\n', 'utf8');
await fs.writeFile(path.join(tinaDir, 'tina-lock.json'), JSON.stringify(lockPayload, null, 2) + '\n', 'utf8');
await fs.unlink(bundledConfigPath).catch(() => {});

console.log(
  `[tina-sync] Collections synchronised: ${schemaPayload.collections.map((collection) => collection.name).join(', ')}`
);
