/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_GCAL_BOOKING_WEBAPP_URL?: string;
  readonly VITE_GCAL_BOOKING_API_KEY?: string;
  readonly VITE_GCAL_BOOKING_DURATION_MINUTES?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
