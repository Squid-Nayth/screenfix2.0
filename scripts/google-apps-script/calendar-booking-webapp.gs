/**
 * Web App Google Apps Script
 * Crée automatiquement un événement Google Calendar quand un rendez-vous est pris sur le site.
 *
 * Déploiement recommandé :
 * - Nouveau projet Apps Script séparé
 * - Déployer > Nouveau déploiement > Application Web
 * - Exécuter en tant que : Moi
 * - Qui a accès : Tout le monde avec le lien
 */
const CALENDAR_CONFIG = {
  API_KEY_PROPERTY: 'GCAL_BOOKING_API_KEY',
  CALENDAR_ID_PROPERTY: 'GCAL_BOOKING_CALENDAR_ID',
  DEFAULT_CALENDAR_ID: 'primary',
  DEFAULT_LOCATION: '27 Boulevard de Port Royal, 75013 Paris',
  EVENT_PREFIX: 'ScreenFix RDV'
};

function doPost(e) {
  const requestId = Utilities.getUuid().slice(0, 8);

  try {
    const params = e && e.parameter ? e.parameter : {};
    const key = String(params.key || '').trim();

    if (!isAuthorized_(key)) {
      return json_({
        ok: false,
        error: 'unauthorized',
        requestId: requestId
      });
    }

    const payload = normalizePayload_(params);
    validatePayload_(payload);

    const calendar = getTargetCalendar_();
    const existingEvent = findDuplicateEvent_(calendar, payload.bookingId, payload.start, payload.end);

    if (existingEvent) {
      return json_({
        ok: true,
        duplicate: true,
        eventId: existingEvent.getId(),
        requestId: requestId
      });
    }

    const event = calendar.createEvent(payload.title, payload.start, payload.end, {
      description: payload.description,
      location: CALENDAR_CONFIG.DEFAULT_LOCATION
    });

    Logger.log(
      JSON.stringify({
        requestId: requestId,
        eventId: event.getId(),
        bookingId: payload.bookingId,
        email: payload.customerEmail
      })
    );

    return json_({
      ok: true,
      duplicate: false,
      eventId: event.getId(),
      requestId: requestId
    });
  } catch (error) {
    Logger.log('calendar doPost error: ' + (error.stack || error));
    return json_({
      ok: false,
      error: String(error && error.message ? error.message : error),
      requestId: requestId
    });
  }
}

function setCalendarApiKeyOnce() {
  const key = 'screenfix_gcal_4f9a2c7d1e8b6a3c9d5f0b2e7a1c4d8f6b3a9e2c7d1f5a8b4c6e9d2f7a3b1c5';
  PropertiesService.getScriptProperties().setProperty(CALENDAR_CONFIG.API_KEY_PROPERTY, key);
  Logger.log('Calendar API key saved.');
}

function setCalendarIdOnce() {
  const calendarId = 'primary';
  PropertiesService.getScriptProperties().setProperty(CALENDAR_CONFIG.CALENDAR_ID_PROPERTY, calendarId);
  Logger.log('Calendar ID saved.');
}

function normalizePayload_(params) {
  const bookingId = String(params.booking_id || '').trim();
  const customerName = String(params.customer_name || '').trim();
  const customerEmail = String(params.customer_email || '').trim().toLowerCase();
  const customerPhone = String(params.customer_phone || '').trim();
  const model = String(params.model || '').trim();
  const repairSummary = String(params.repair_summary || '').trim();
  const priceDisplay = String(params.price_display || '').trim();
  const bookingDateLabel = String(params.booking_date_label || '').trim();
  const bookingTimeLabel = String(params.booking_time_label || '').trim();
  const startIso = String(params.start_iso || '').trim();
  const endIso = String(params.end_iso || '').trim();

  const start = new Date(startIso);
  const end = new Date(endIso);

  const title = [CALENDAR_CONFIG.EVENT_PREFIX, customerName, model].filter(Boolean).join(' - ');
  const description = [
    'Booking ID: ' + bookingId,
    'Client: ' + customerName,
    'Email: ' + customerEmail,
    'Telephone: ' + customerPhone,
    'Modele: ' + model,
    'Services: ' + repairSummary,
    'Prix: ' + priceDisplay,
    'Date: ' + bookingDateLabel,
    'Heure: ' + bookingTimeLabel
  ].join('\n');

  return {
    bookingId: bookingId,
    customerName: customerName,
    customerEmail: customerEmail,
    customerPhone: customerPhone,
    model: model,
    repairSummary: repairSummary,
    priceDisplay: priceDisplay,
    bookingDateLabel: bookingDateLabel,
    bookingTimeLabel: bookingTimeLabel,
    start: start,
    end: end,
    title: title,
    description: description
  };
}

function validatePayload_(payload) {
  if (!payload.bookingId) throw new Error('missing_booking_id');
  if (!payload.customerName) throw new Error('missing_customer_name');
  if (!payload.customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.customerEmail)) {
    throw new Error('invalid_customer_email');
  }
  if (!payload.model) throw new Error('missing_model');
  if (!payload.repairSummary) throw new Error('missing_repair_summary');
  if (!(payload.start instanceof Date) || isNaN(payload.start.getTime())) throw new Error('invalid_start_date');
  if (!(payload.end instanceof Date) || isNaN(payload.end.getTime())) throw new Error('invalid_end_date');
  if (payload.end.getTime() <= payload.start.getTime()) throw new Error('invalid_date_range');
}

function getTargetCalendar_() {
  const calendarId =
    PropertiesService.getScriptProperties().getProperty(CALENDAR_CONFIG.CALENDAR_ID_PROPERTY) ||
    CALENDAR_CONFIG.DEFAULT_CALENDAR_ID;

  if (calendarId === 'primary') {
    return CalendarApp.getDefaultCalendar();
  }

  const calendar = CalendarApp.getCalendarById(calendarId);
  if (!calendar) throw new Error('calendar_not_found');
  return calendar;
}

function findDuplicateEvent_(calendar, bookingId, start, end) {
  const searchStart = new Date(start.getTime() - 2 * 60 * 60 * 1000);
  const searchEnd = new Date(end.getTime() + 2 * 60 * 60 * 1000);
  const events = calendar.getEvents(searchStart, searchEnd);

  for (var i = 0; i < events.length; i++) {
    var desc = String(events[i].getDescription() || '');
    if (desc.indexOf('Booking ID: ' + bookingId) !== -1) {
      return events[i];
    }
  }

  return null;
}

function isAuthorized_(providedKey) {
  const storedKey =
    PropertiesService.getScriptProperties().getProperty(CALENDAR_CONFIG.API_KEY_PROPERTY) || '';
  return !!providedKey && !!storedKey && providedKey === storedKey;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
