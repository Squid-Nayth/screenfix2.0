/**
 * Web App Google Apps Script
 * Stocke toutes les prises de rendez-vous du site dans Google Sheets.
 *
 * Configuration recommandee :
 * - Projet Apps Script autonome
 * - Spreadsheet cible avec un onglet RENDEZ_VOUS
 * - Deploiement Web App :
 *   - Executer en tant que : Moi
 *   - Qui a acces : Tout le monde avec le lien
 */
const BOOKING_SHEET_CONFIG = {
  API_KEY_PROPERTY: 'BOOKINGS_API_KEY',
  SPREADSHEET_ID: '1KYzmOYhnwhBNW98NlpoMjGbWwfYwwRRKvwU2L4p6pCI',
  SHEET_NAME: 'RENDEZ_VOUS',
  STATS_SHEET_NAME: 'STATS_RDV',
  DEFAULT_STATUS: 'Planifie',
  HEADERS: [
    'Horodatage',
    'Booking ID',
    'Source',
    'Nom client',
    'Email',
    'Telephone',
    'Marque',
    'Modele',
    'Services',
    'Prix affiche',
    'Montant numerique',
    'Montant brut',
    'Reduction %',
    'Date RDV',
    'Heure RDV',
    'Debut',
    'Fin',
    'Statut RDV',
    'Rendez-vous effectue',
    'Chiffre d affaires confirme',
    'Mois',
    'Annee',
    'Note admin'
  ]
};

function doPost(e) {
  const requestId = Utilities.getUuid().slice(0, 8);

  try {
    const params = e && e.parameter ? e.parameter : {};
    const key = String(params.key || '').trim();

    if (!isAuthorized_(key)) {
      return json_({ ok: false, error: 'unauthorized', requestId: requestId });
    }

    const payload = normalizePayload_(params);
    validatePayload_(payload);

    const spreadsheet = getSpreadsheet_();
    const sheet = ensureSheet_(spreadsheet, BOOKING_SHEET_CONFIG.SHEET_NAME);
    ensureHeaders_(sheet);
    ensureStatsSheet_(spreadsheet);

    const existingRow = findBookingRow_(sheet, payload.bookingId);
    if (existingRow > 0) {
      return json_({ ok: true, duplicate: true, row: existingRow, requestId: requestId });
    }

    const row = appendBookingRow_(sheet, payload);

    Logger.log(
      JSON.stringify({
        requestId: requestId,
        row: row,
        bookingId: payload.bookingId,
        email: payload.customerEmail
      })
    );

    return json_({ ok: true, duplicate: false, row: row, requestId: requestId });
  } catch (error) {
    Logger.log('client bookings doPost error: ' + (error.stack || error));
    return json_({
      ok: false,
      error: String(error && error.message ? error.message : error),
      requestId: requestId
    });
  }
}

function doGet() {
  return json_({
    ok: true,
    service: 'client-bookings-webapp',
    sheetName: BOOKING_SHEET_CONFIG.SHEET_NAME
  });
}

function setBookingsApiKeyOnce() {
  const key = 'screenfix_bookings_6f2d9c1a8b4e7f3c5d1a9b6e2c8f4d7a1b5c9e3f6d2a8c4b7e1f3d9a5c2e6b8';
  PropertiesService.getScriptProperties().setProperty(BOOKING_SHEET_CONFIG.API_KEY_PROPERTY, key);
  Logger.log('Bookings API key saved.');
}

function debugBookingsConfig() {
  const props = PropertiesService.getScriptProperties();
  Logger.log('BOOKINGS_API_KEY=' + props.getProperty(BOOKING_SHEET_CONFIG.API_KEY_PROPERTY));
  Logger.log('SPREADSHEET_ID=' + BOOKING_SHEET_CONFIG.SPREADSHEET_ID);
  Logger.log('SHEET_NAME=' + BOOKING_SHEET_CONFIG.SHEET_NAME);
  Logger.log('STATS_SHEET_NAME=' + BOOKING_SHEET_CONFIG.STATS_SHEET_NAME);
}

function normalizePayload_(params) {
  return {
    bookingId: String(params.booking_id || '').trim(),
    source: String(params.source || 'site_screenfix').trim(),
    customerName: String(params.customer_name || '').trim(),
    customerEmail: String(params.customer_email || '').trim().toLowerCase(),
    customerPhone: String(params.customer_phone || '').trim(),
    brand: String(params.brand || '').trim(),
    model: String(params.model || '').trim(),
    repairSummary: String(params.repair_summary || '').trim(),
    priceDisplay: String(params.price_display || '').trim(),
    priceAmount: parseNullableNumber_(params.price_amount),
    grossAmount: parseNullableNumber_(params.gross_amount),
    reductionPercent: parseNullableNumber_(params.reduction_percent),
    bookingDateLabel: String(params.booking_date_label || '').trim(),
    bookingTimeLabel: String(params.booking_time_label || '').trim(),
    start: parseDate_(params.start_iso),
    end: parseDate_(params.end_iso)
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

function getSpreadsheet_() {
  if (!BOOKING_SHEET_CONFIG.SPREADSHEET_ID || BOOKING_SHEET_CONFIG.SPREADSHEET_ID === 'CHANGE_ME_WITH_SPREADSHEET_ID') {
    throw new Error('missing_spreadsheet_id');
  }
  return SpreadsheetApp.openById(BOOKING_SHEET_CONFIG.SPREADSHEET_ID);
}

function ensureSheet_(spreadsheet, sheetName) {
  const existing = spreadsheet.getSheetByName(sheetName);
  if (existing) return existing;
  return spreadsheet.insertSheet(sheetName);
}

function ensureHeaders_(sheet) {
  const headerRange = sheet.getRange(1, 1, 1, BOOKING_SHEET_CONFIG.HEADERS.length);
  const headerValues = headerRange.getValues()[0];
  const isEmpty = headerValues.every(function (cell) {
    return !String(cell || '').trim();
  });

  if (isEmpty) {
    headerRange.setValues([BOOKING_SHEET_CONFIG.HEADERS]);
    headerRange.setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, BOOKING_SHEET_CONFIG.HEADERS.length);
    sheet.getRange('S2:S').insertCheckboxes();
    sheet.getRange('K:K').setNumberFormat('#,##0.00');
    sheet.getRange('L:L').setNumberFormat('#,##0.00');
    sheet.getRange('M:M').setNumberFormat('0.00');
    sheet.getRange('P:Q').setNumberFormat('dd/mm/yyyy hh:mm');
    sheet.getRange('T:T').setNumberFormat('#,##0.00');
  }
}

function ensureStatsSheet_(spreadsheet) {
  var sheet = spreadsheet.getSheetByName(BOOKING_SHEET_CONFIG.STATS_SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(BOOKING_SHEET_CONFIG.STATS_SHEET_NAME);
  }

  if (String(sheet.getRange('A1').getValue() || '').trim()) return;

  sheet.getRange('A1:B7').setValues([
    ['Indicateur', 'Valeur'],
    ['CA confirme total', '=SUM(RENDEZ_VOUS!T2:T)'],
    ['RDV effectues', '=COUNTIF(RENDEZ_VOUS!S2:S,TRUE)'],
    ['RDV planifies', '=COUNTIF(RENDEZ_VOUS!R2:R,"Planifie")'],
    ['RDV annules', '=COUNTIF(RENDEZ_VOUS!R2:R,"Annule")'],
    ['Mois courant', '=TEXT(TODAY(),"yyyy-mm")'],
    ['CA mois courant', '=SUMIF(RENDEZ_VOUS!U2:U,B6,RENDEZ_VOUS!T2:T)']
  ]);
  sheet.getRange('A1:B1').setFontWeight('bold');
  sheet.autoResizeColumns(1, 2);
}

function findBookingRow_(sheet, bookingId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return -1;

  const bookingIdColumn = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
  for (var i = 0; i < bookingIdColumn.length; i++) {
    if (String(bookingIdColumn[i][0] || '').trim() === bookingId) {
      return i + 2;
    }
  }

  return -1;
}

function appendBookingRow_(sheet, payload) {
  const row = sheet.getLastRow() + 1;
  const values = [[
    new Date(),
    payload.bookingId,
    payload.source,
    payload.customerName,
    payload.customerEmail,
    payload.customerPhone,
    payload.brand || 'Apple',
    payload.model,
    payload.repairSummary,
    payload.priceDisplay,
    payload.priceAmount,
    payload.grossAmount,
    payload.reductionPercent,
    payload.bookingDateLabel,
    payload.bookingTimeLabel,
    payload.start,
    payload.end,
    BOOKING_SHEET_CONFIG.DEFAULT_STATUS,
    false,
    '',
    '',
    '',
    ''
  ]];

  sheet.getRange(row, 1, 1, values[0].length).setValues(values);
  sheet.getRange(row, 19).insertCheckboxes();
  sheet.getRange(row, 20).setFormulaR1C1('=IF(RC[-1],IF(ISNUMBER(RC[-9]),RC[-9],0),0)');
  sheet.getRange(row, 21).setFormulaR1C1('=IF(ISNUMBER(RC[-5]),TEXT(RC[-5],"yyyy-mm"),"")');
  sheet.getRange(row, 22).setFormulaR1C1('=IF(ISNUMBER(RC[-6]),YEAR(RC[-6]),"")');

  return row;
}

function parseNullableNumber_(value) {
  if (value === null || value === undefined || value === '') return '';
  const parsed = Number(String(value).replace(/\s/g, '').replace(',', '.'));
  return isNaN(parsed) ? '' : parsed;
}

function parseDate_(value) {
  const date = new Date(String(value || '').trim());
  return isNaN(date.getTime()) ? null : date;
}

function isAuthorized_(providedKey) {
  const storedKey = PropertiesService.getScriptProperties().getProperty(BOOKING_SHEET_CONFIG.API_KEY_PROPERTY) || '';
  return !!providedKey && !!storedKey && providedKey === storedKey;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
