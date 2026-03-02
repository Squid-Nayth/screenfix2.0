const CALENDAR_BOOKING_CONFIG = {
  webAppUrl: import.meta.env.VITE_GCAL_BOOKING_WEBAPP_URL?.trim() || '',
  apiKey: import.meta.env.VITE_GCAL_BOOKING_API_KEY?.trim() || '',
  durationMinutes: Number(import.meta.env.VITE_GCAL_BOOKING_DURATION_MINUTES || '60')
};

export class CalendarBookingError extends Error {
  code: string;
  details?: string;

  constructor(code: string, details?: string) {
    super(code);
    this.name = 'CalendarBookingError';
    this.code = code;
    this.details = details;
  }
}

export interface CalendarBookingPayload {
  bookingId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  model: string;
  repairSummary: string;
  priceDisplay: string;
  bookingDateLabel: string;
  bookingTimeLabel: string;
  startIso: string;
  endIso: string;
}

interface CalendarBookingResponse {
  ok: boolean;
  duplicate?: boolean;
  eventId?: string;
  error?: string;
}

export const isCalendarBookingConfigured = () =>
  Boolean(CALENDAR_BOOKING_CONFIG.webAppUrl && CALENDAR_BOOKING_CONFIG.apiKey);

export const buildBookingWindow = (
  selectedDate: string | null,
  selectedTime: string | null,
  durationMinutes = CALENDAR_BOOKING_CONFIG.durationMinutes
) => {
  if (!selectedDate || !selectedTime) return null;

  const baseDate = new Date(selectedDate);
  if (Number.isNaN(baseDate.getTime())) return null;

  const [hours, minutes] = selectedTime.split(':').map(Number);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null;

  const start = new Date(baseDate);
  start.setHours(hours, minutes, 0, 0);

  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

  return {
    startIso: start.toISOString(),
    endIso: end.toISOString()
  };
};

const buildBookingId = (payload: CalendarBookingPayload) =>
  [
    payload.customerEmail.trim().toLowerCase(),
    payload.model.trim().toLowerCase(),
    payload.startIso
  ].join('|');

export const createCalendarBooking = async (payload: CalendarBookingPayload) => {
  if (!isCalendarBookingConfigured()) {
    console.warn('[CALENDAR] Configuration absente, création Google Calendar ignorée.');
    return null;
  }

  const bookingId = payload.bookingId?.trim() || buildBookingId(payload);
  const body = new URLSearchParams({
    key: CALENDAR_BOOKING_CONFIG.apiKey,
    booking_id: bookingId,
    customer_name: payload.customerName,
    customer_email: payload.customerEmail,
    customer_phone: payload.customerPhone,
    model: payload.model,
    repair_summary: payload.repairSummary,
    price_display: payload.priceDisplay,
    booking_date_label: payload.bookingDateLabel,
    booking_time_label: payload.bookingTimeLabel,
    start_iso: payload.startIso,
    end_iso: payload.endIso
  });

  let response: Response;

  try {
    response = await fetch(CALENDAR_BOOKING_CONFIG.webAppUrl, {
      method: 'POST',
      body
    });
  } catch (error) {
    console.error('[CALENDAR] Erreur réseau Apps Script:', error);
    throw new CalendarBookingError('calendar_network_error');
  }

  const raw = await response.text();
  let parsed: CalendarBookingResponse;

  try {
    parsed = JSON.parse(raw) as CalendarBookingResponse;
  } catch (error) {
    console.error('[CALENDAR] Réponse non JSON:', raw, error);
    throw new CalendarBookingError('invalid_calendar_response', raw.slice(0, 200));
  }

  if (!parsed.ok) {
    throw new CalendarBookingError(parsed.error || 'calendar_booking_failed');
  }

  console.log('[CALENDAR] Réservation Google Calendar créée:', parsed);
  return parsed;
};
