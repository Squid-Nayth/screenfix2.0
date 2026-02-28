import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { I18nProvider } from './lib/i18n';

// WordPress integration: Check for a specific container ID output by the shortcode
const targetId = 'screenfix-app-root';
const rootElement = document.getElementById(targetId) || document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <I18nProvider>
        <App />
      </I18nProvider>
    </React.StrictMode>
  );
} else {
  console.warn(`ScreenFix App: Target container #${targetId} not found.`);
}
