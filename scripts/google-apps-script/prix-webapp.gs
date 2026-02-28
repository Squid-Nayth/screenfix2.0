/**
 * API prix iPhone depuis Google Sheets.
 * Feuille attendue: PRIX
 * Headers attendus (ligne 1): modele | prix
 */
const PRICE_CONFIG = {
  // Optionnel: si script standalone, renseigne l'ID du Google Sheet.
  // Si vide, le script utilise la feuille active (script lie a la spreadsheet).
  SPREADSHEET_ID: '1yk7fF7sM54q1DD3U3Uyo5JrNyXMV0dMMT6oEY2t8rTI',
  SHEET_NAME: 'PRIX',
  HEADER_MODELE: 'modele',
  HEADER_PRIX: 'prix'
};

function doGet() {
  try {
    const items = readPrices_();
    return json_({
      ok: true,
      count: items.length,
      updated_at: new Date().toISOString(),
      items: items
    });
  } catch (error) {
    return json_({
      ok: false,
      error: String(error && error.message ? error.message : error)
    });
  }
}

function readPrices_() {
  const ss = getSpreadsheet_();
  const sheet = findSheet_(ss, PRICE_CONFIG.SHEET_NAME);

  if (!sheet) {
    const sheetNames = ss.getSheets().map((s) => s.getName()).join(', ');
    throw new Error(
      'Feuille "' +
        PRICE_CONFIG.SHEET_NAME +
        '" introuvable. Onglets disponibles: [' +
        sheetNames +
        '].'
    );
  }

  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  const headers = values[0].map((h) => String(h || '').trim().toLowerCase());
  const modeleCol = headers.indexOf(PRICE_CONFIG.HEADER_MODELE);
  const prixCol = headers.indexOf(PRICE_CONFIG.HEADER_PRIX);

  if (modeleCol === -1 || prixCol === -1) {
    throw new Error('Colonnes requises introuvables: "modele" et "prix".');
  }

  const items = [];
  for (var i = 1; i < values.length; i++) {
    const modele = String(values[i][modeleCol] || '').trim();
    if (!modele) continue;

    const prixRaw = values[i][prixCol];
    const prix = parsePrice_(prixRaw);
    items.push({
      modele: modele,
      prix: prix,
      prix_brut: prixRaw
    });
  }

  return items;
}

function getSpreadsheet_() {
  if (PRICE_CONFIG.SPREADSHEET_ID) {
    return SpreadsheetApp.openById(PRICE_CONFIG.SPREADSHEET_ID);
  }
  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (!active) {
    throw new Error('Aucune feuille active. Renseigne SPREADSHEET_ID dans PRICE_CONFIG.');
  }
  return active;
}

function findSheet_(spreadsheet, expectedName) {
  const direct = spreadsheet.getSheetByName(expectedName);
  if (direct) return direct;

  const expected = normalize_(expectedName);
  const sheets = spreadsheet.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    if (normalize_(sheets[i].getName()) === expected) {
      return sheets[i];
    }
  }

  return null;
}

function normalize_(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function parsePrice_(value) {
  if (typeof value === 'number' && isFinite(value)) return value;
  const parsed = Number(String(value || '').replace(/\s/g, '').replace(',', '.'));
  return isFinite(parsed) ? parsed : null;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
