export type ProStatus =
  | 'approved'
  | 'pending'
  | 'rejected'
  | 'not_found'
  | 'unauthorized'
  | 'invalid_email'
  | 'error';

export interface ProAccessResponse {
  ok: boolean;
  approved: boolean;
  status: ProStatus;
  error?: string;
  requestId?: string;
}

interface StoredProAccess {
  email: string;
  status: 'approved';
  expiresAt: number;
}

export const PRO_ACCESS_CONFIG = {
  webAppUrl: 'https://script.google.com/macros/s/AKfycbxKzs9QZWjQolf00t-SGxmI-vu9AKNa-3v-n22Awcxl-LuhMdX3CCBiR7inf6XCBRCVQw/exec',
  apiKey: 'sumump_9f3a1c7e4d2b8a6f0c1e3d5b7a9f2c4e6d8b0a1f',
  shopUrl: 'https://screenfix.sumupstore.com/produits',
  fallbackUrl: '/#boutique-pro',
  storageKey: 'sumump_pro_access',
  ttlDays: 7
};

const isBrowser = () => typeof window !== 'undefined';

const isPlaceholderValue = (value: string) => value.startsWith('REPLACE_');

export const isProAccessConfigured = () => {
  if (!PRO_ACCESS_CONFIG.webAppUrl || !PRO_ACCESS_CONFIG.apiKey) return false;
  if (isPlaceholderValue(PRO_ACCESS_CONFIG.webAppUrl) || isPlaceholderValue(PRO_ACCESS_CONFIG.apiKey)) return false;
  return true;
};

export const checkProAccess = async (email: string): Promise<ProAccessResponse> => {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail) {
    return { ok: false, approved: false, status: 'invalid_email', error: 'missing_email' };
  }

  if (!isProAccessConfigured()) {
    return { ok: false, approved: false, status: 'error', error: 'config_missing' };
  }

  const url = new URL(PRO_ACCESS_CONFIG.webAppUrl);
  url.searchParams.set('key', PRO_ACCESS_CONFIG.apiKey);
  url.searchParams.set('email', normalizedEmail);
  url.searchParams.set('_ts', String(Date.now()));

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      cache: 'no-store'
    });

    if (!response.ok) {
      return { ok: false, approved: false, status: 'error', error: `http_${response.status}` };
    }

    const raw = (await response.json()) as Partial<ProAccessResponse>;
    const status = normalizeStatus(raw.status);
    return {
      ok: Boolean(raw.ok),
      approved: Boolean(raw.approved),
      status,
      error: raw.error,
      requestId: raw.requestId
    };
  } catch (error) {
    console.error('checkProAccess error:', error);
    return { ok: false, approved: false, status: 'error', error: 'request_failed' };
  }
};

export const saveApprovedProAccess = (email: string) => {
  if (!isBrowser()) return;
  const payload: StoredProAccess = {
    email: email.trim().toLowerCase(),
    status: 'approved',
    expiresAt: Date.now() + PRO_ACCESS_CONFIG.ttlDays * 24 * 60 * 60 * 1000
  };
  window.localStorage.setItem(PRO_ACCESS_CONFIG.storageKey, JSON.stringify(payload));
};

export const readApprovedProAccess = (): StoredProAccess | null => {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(PRO_ACCESS_CONFIG.storageKey);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as StoredProAccess;
    if (!parsed.email || parsed.status !== 'approved' || !parsed.expiresAt) {
      clearProAccessToken();
      return null;
    }
    if (Date.now() > parsed.expiresAt) {
      clearProAccessToken();
      return null;
    }
    return parsed;
  } catch {
    clearProAccessToken();
    return null;
  }
};

export const clearProAccessToken = () => {
  if (!isBrowser()) return;
  window.localStorage.removeItem(PRO_ACCESS_CONFIG.storageKey);
};

export const redirectToShop = () => {
  if (!isBrowser()) return;
  window.location.href = PRO_ACCESS_CONFIG.shopUrl;
};

export const getProStatusMessage = (status: ProStatus) => {
  switch (status) {
    case 'approved':
      return 'Compte approuvé.';
    case 'pending':
      return 'Votre compte est en attente de validation.';
    case 'rejected':
      return 'Votre demande a été refusée. Contactez le support.';
    case 'not_found':
      return "Aucune demande trouvée pour cet email.";
    case 'unauthorized':
      return 'Accès API non autorisé. Vérifiez la clé API.';
    case 'invalid_email':
      return 'Email invalide.';
    case 'error':
    default:
      return 'Vérification impossible pour le moment. Réessayez.';
  }
};

export const guardCurrentBoutiqueAccess = async () => {
  if (!isBrowser()) return;
  const path = window.location.pathname.toLowerCase();
  if (!path.startsWith('/boutique')) return;

  const stored = readApprovedProAccess();
  if (!stored) {
    window.location.replace(PRO_ACCESS_CONFIG.fallbackUrl);
    return;
  }

  const latest = await checkProAccess(stored.email);
  if (!(latest.ok && latest.approved)) {
    clearProAccessToken();
    window.location.replace(PRO_ACCESS_CONFIG.fallbackUrl);
    return;
  }

  saveApprovedProAccess(stored.email);
};

const normalizeStatus = (value?: string): ProStatus => {
  const normalized = String(value || '').trim().toLowerCase();
  if (normalized === 'approved') return 'approved';
  if (normalized === 'pending') return 'pending';
  if (normalized === 'rejected') return 'rejected';
  if (normalized === 'not_found') return 'not_found';
  if (normalized === 'unauthorized') return 'unauthorized';
  if (normalized === 'invalid_email') return 'invalid_email';
  return 'error';
};
