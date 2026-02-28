const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || '';
const GA_SCRIPT_ID = 'screenfix-ga4-script';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let initialized = false;
let lastTrackedPath = '';

export const isAnalyticsEnabled = Boolean(GA_MEASUREMENT_ID);

const ensureGtagBootstrap = () => {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
  }
};

const injectAnalyticsScript = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById(GA_SCRIPT_ID)) return;

  const script = document.createElement('script');
  script.id = GA_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  document.head.appendChild(script);
};

export const initAnalytics = () => {
  if (!isAnalyticsEnabled || initialized) return;

  ensureGtagBootstrap();
  injectAnalyticsScript();

  window.gtag?.('js', new Date());
  window.gtag?.('config', GA_MEASUREMENT_ID, {
    send_page_view: false,
    anonymize_ip: true
  });

  initialized = true;
};

export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (!isAnalyticsEnabled || typeof window === 'undefined') return;

  initAnalytics();

  if (lastTrackedPath === pagePath) return;
  lastTrackedPath = pagePath;

  const origin = window.location.origin || '';
  const pageLocation = `${origin}${pagePath}`;

  window.gtag?.('event', 'page_view', {
    page_path: pagePath,
    page_title: pageTitle || document.title,
    page_location: pageLocation
  });
};

