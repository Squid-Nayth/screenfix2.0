interface PriceItem {
  modele: string;
  prix: number | null;
}

interface PriceApiResponse {
  ok: boolean;
  items?: PriceItem[];
  error?: string;
}

export const SHEET_PRICES_CONFIG = {
  apiUrl: 'https://script.google.com/macros/s/AKfycbzRf28pGPr_8AX2B2eeU-vhF8AOCwYVXwXp_cFvshgSMVvzWvVl6M2DzEc7IJPO0NymmQ/exec',
  requestTimeoutMs: 8000
};

export const normalizeModelKey = (value: string) =>
  String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const parsePrice = (value: unknown): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  const parsed = Number(String(value ?? '').replace(/\s/g, '').replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : null;
};

export const fetchSheetPriceMap = async (): Promise<Record<string, number>> => {
  const priceMap: Record<string, number> = {};

  if (!SHEET_PRICES_CONFIG.apiUrl) {
    console.warn('[PRIX] API URL manquante dans lib/sheetPrices.ts');
    return priceMap;
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), SHEET_PRICES_CONFIG.requestTimeoutMs);

  try {
    const url = new URL(SHEET_PRICES_CONFIG.apiUrl);
    url.searchParams.set('_ts', String(Date.now()));
    console.log('[PRIX] Fetch Google Sheets:', url.toString());

    const response = await fetch(url.toString(), {
      method: 'GET',
      cache: 'no-store',
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = (await response.json()) as PriceApiResponse;
    console.log('[PRIX] JSON recu:', payload);

    if (!payload.ok || !Array.isArray(payload.items)) {
      throw new Error(payload.error || 'Format JSON invalide');
    }

    payload.items.forEach((item) => {
      const key = normalizeModelKey(item.modele);
      const price = parsePrice(item.prix);
      if (key && price !== null) {
        priceMap[key] = price;
      }
    });
  } catch (error) {
    console.error('[PRIX] Erreur chargement prix:', error);
  } finally {
    window.clearTimeout(timeoutId);
  }

  return priceMap;
};
