import TinaCMSProvider, { TinaAdmin } from 'tinacms';
import tinaConfig from '../tina/config';
import graphQlSchema from '../tina/__generated__/_graphql.json';
import tinaSchema from '../tina/__generated__/_schema.json';

const apiVersion = `${tinaSchema.version.major}.${tinaSchema.version.minor}`;
const graphQlVersion = tinaSchema.version.fullVersion || `${apiVersion}.0`;
const clientId = tinaConfig.clientId || '';
const branch = tinaConfig.branch || 'main';
const apiUrl = clientId
  ? `https://content.tinajs.io/${apiVersion}/content/${clientId}/github/${branch}`
  : '';

const MissingConfigState = () => (
  <main
    style={{
      minHeight: '100vh',
      display: 'grid',
      placeItems: 'center',
      padding: '32px',
      background: '#f6f6f9',
      color: '#252336',
      fontFamily: 'Inter, sans-serif'
    }}
  >
    <div
      style={{
        maxWidth: '560px',
        width: '100%',
        background: '#ffffff',
        borderRadius: '20px',
        padding: '32px',
        boxShadow: '0 12px 32px rgba(37, 35, 54, 0.12)'
      }}
    >
      <p style={{ margin: '0 0 8px', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0084ff' }}>
        TinaCMS
      </p>
      <h1 style={{ margin: '0 0 12px', fontSize: '28px', lineHeight: 1.1 }}>
        Configuration Tina incomplète
      </h1>
      <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, color: '#565165' }}>
        Renseigne <code>NEXT_PUBLIC_TINA_CLIENT_ID</code>, <code>TINA_TOKEN</code> et <code>TINA_BRANCH</code>,
        puis relance <code>npm run tina:build</code>.
      </p>
    </div>
  </main>
);

export default function AdminApp() {
  if (!clientId || !tinaConfig.token) {
    return <MissingConfigState />;
  }

  const schema = { ...tinaConfig.schema, config: tinaConfig };

  return (
    <TinaCMSProvider
      {...tinaConfig}
      client={{ apiUrl } as any}
      schema={schema as any}
      tinaGraphQLVersion={graphQlVersion}
    >
      <TinaAdmin config={tinaConfig as any} schemaJson={graphQlSchema as any} />
    </TinaCMSProvider>
  );
}
