const CUSTOMER_BOOKINGS_CONFIG = {
  webAppUrl: import.meta.env.VITE_BOOKINGS_WEBAPP_URL?.trim() || '',
  apiKey: import.meta.env.VITE_BOOKINGS_API_KEY?.trim() || '',
  requestTimeoutMs: 10000
};

export class CustomerBookingError extends Error {
  code: string;
  details?: string;

  constructor(code: string, details?: string) {
    super(code);
    this.name = 'CustomerBookingError';
    this.code = code;
    this.details = details;
  }
}

export interface CustomerBookingPayload {
  bookingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  brand: string;
  model: string;
  repairSummary: string;
  priceDisplay: string;
  priceAmount: number | null;
  grossAmount: number | null;
  reductionPercent: number | null;
  bookingDateLabel: string;
  bookingTimeLabel: string;
  startIso: string;
  endIso: string;
  source?: string;
}

interface CustomerBookingResponse {
  ok: boolean;
  duplicate?: boolean;
  row?: number;
  error?: string;
}

export const isCustomerBookingsConfigured = () =>
  Boolean(CUSTOMER_BOOKINGS_CONFIG.webAppUrl && CUSTOMER_BOOKINGS_CONFIG.apiKey);

export const buildCustomerBookingId = (input: {
  customerEmail: string;
  model: string;
  startIso: string;
}) =>
  [
    input.customerEmail.trim().toLowerCase(),
    input.model.trim().toLowerCase(),
    input.startIso.trim()
  ].join('|');

export const submitCustomerBooking = async (payload: CustomerBookingPayload) => {
  if (!isCustomerBookingsConfigured()) {
    console.warn('[BOOKINGS] Configuration absente, synchronisation Google Sheets ignorée.');
    return null;
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), CUSTOMER_BOOKINGS_CONFIG.requestTimeoutMs);
  const body = new URLSearchParams({
    key: CUSTOMER_BOOKINGS_CONFIG.apiKey,
    booking_id: payload.bookingId,
    customer_name: payload.customerName,
    customer_email: payload.customerEmail,
    customer_phone: payload.customerPhone,
    brand: payload.brand,
    model: payload.model,
    repair_summary: payload.repairSummary,
    price_display: payload.priceDisplay,
    price_amount: payload.priceAmount === null ? '' : String(payload.priceAmount),
    gross_amount: payload.grossAmount === null ? '' : String(payload.grossAmount),
    reduction_percent: payload.reductionPercent === null ? '' : String(payload.reductionPercent),
    booking_date_label: payload.bookingDateLabel,
    booking_time_label: payload.bookingTimeLabel,
    start_iso: payload.startIso,
    end_iso: payload.endIso,
    source: payload.source || 'site_screenfix'
  });

  let response: Response;

  try {
    response = await fetch(CUSTOMER_BOOKINGS_CONFIG.webAppUrl, {
      method: 'POST',
      body,
      signal: controller.signal
    });
  } catch (error) {
    console.error('[BOOKINGS] Erreur reseau Google Sheets:', error);
    throw new CustomerBookingError('booking_sheet_network_error');
  } finally {
    window.clearTimeout(timeoutId);
  }

  const raw = await response.text();
  let parsed: CustomerBookingResponse;

  try {
    parsed = JSON.parse(raw) as CustomerBookingResponse;
  } catch (error) {
    console.error('[BOOKINGS] Reponse non JSON:', raw, error);
    throw new CustomerBookingError('invalid_booking_sheet_response', raw.slice(0, 200));
  }

  if (!parsed.ok) {
    throw new CustomerBookingError(parsed.error || 'booking_sheet_failed');
  }

  console.log('[BOOKINGS] Rendez-vous synchronise dans Google Sheets:', parsed);
  return parsed;
};
