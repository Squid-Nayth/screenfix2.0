import { createClient } from 'tinacms';
import tinaSchema from './_schema.json';
import tinaConfig from '../config';

const apiVersion = tinaSchema.version?.fullVersion || `${tinaSchema.version?.major}.${tinaSchema.version?.minor}.0`;
const branch = tinaConfig.branch || 'main';
const clientId = tinaConfig.clientId || '';
const token = tinaConfig.token || '';

// Tina Cloud content API endpoint for the current project/branch
const apiUrl = clientId
  ? `https://content.tinajs.io/${apiVersion}/content/${clientId}/github/${branch}`
  : '';

let cachedClient: ReturnType<typeof createClient> | null = null;

export const createTinaClient = () => {
  if (!apiUrl) return null;
  if (cachedClient) return cachedClient;

  cachedClient = createClient({
    url: apiUrl,
    token,
    // Tina Admin relies mainly on the generic request client; we don't need typed queries here.
    queries: () => ({})
  });

  return cachedClient;
};

export default createTinaClient;
export const client = createTinaClient;
