const PRO_ACCESS_CONFIG = {
  SHEET_NAME: 'Réponses au formulaire 1',
  API_KEY_PROPERTY: 'PRO_API_KEY',
  STATUS_HEADER_CANDIDATES: ['Status', 'Statut'],
  EMAIL_HEADER_CANDIDATES: ['Email', 'Adresse e-mail']
};

function doGet(e) {
  const requestId = Utilities.getUuid().slice(0, 8);
  try {
    const params = e && e.parameter ? e.parameter : {};
    const key = String(params.key || '').trim();
    const email = normalizeEmail_(params.email || '');

    if (!isAuthorized_(key)) {
      return json_({
        ok: false,
        approved: false,
        status: 'unauthorized',
        error: 'unauthorized',
        requestId
      });
    }

    if (!email) {
      return json_({
        ok: false,
        approved: false,
        status: 'invalid_email',
        error: 'missing_or_invalid_email',
        requestId
      });
    }

    const result = findLatestStatusByEmail_(email);
    Logger.log(
      JSON.stringify({
        requestId,
        email,
        status: result.status,
        row: result.row || null
      })
    );

    return json_({
      ok: true,
      approved: result.status === 'approved',
      status: result.status,
      requestId
    });
  } catch (error) {
    Logger.log('doGet error: ' + (error.stack || error));
    return json_({
      ok: false,
      approved: false,
      status: 'error',
      error: 'internal_error',
      requestId
    });
  }
}

function setApiKeyOnce() {
  const key = 'CHANGE_ME_WITH_A_LONG_RANDOM_SECRET';
  PropertiesService.getScriptProperties().setProperty(PRO_ACCESS_CONFIG.API_KEY_PROPERTY, key);
  Logger.log('API key saved.');
}

function findLatestStatusByEmail_(targetEmail) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(PRO_ACCESS_CONFIG.SHEET_NAME) || ss.getSheets()[0];
  const values = sheet.getDataRange().getValues();

  if (values.length < 2) return { status: 'not_found' };

  const headers = values[0].map((v) => String(v || '').trim());
  const emailCol = findHeaderIndex_(headers, PRO_ACCESS_CONFIG.EMAIL_HEADER_CANDIDATES);
  const statusCol = findHeaderIndex_(headers, PRO_ACCESS_CONFIG.STATUS_HEADER_CANDIDATES);

  if (emailCol === -1) throw new Error('Email column not found');
  if (statusCol === -1) throw new Error('Status column not found');

  for (var row = values.length - 1; row >= 1; row--) {
    var rowEmail = normalizeEmail_(values[row][emailCol]);
    if (rowEmail === targetEmail) {
      var rawStatus = normalizeStatus_(values[row][statusCol]);
      return {
        status: rawStatus || 'pending',
        row: row + 1
      };
    }
  }

  return { status: 'not_found' };
}

function isAuthorized_(providedKey) {
  const storedKey = PropertiesService.getScriptProperties().getProperty(PRO_ACCESS_CONFIG.API_KEY_PROPERTY) || '';
  return !!providedKey && !!storedKey && providedKey === storedKey;
}

function findHeaderIndex_(headers, candidates) {
  const lowerHeaders = headers.map((h) => h.toLowerCase());
  for (var i = 0; i < candidates.length; i++) {
    var idx = lowerHeaders.indexOf(String(candidates[i]).toLowerCase());
    if (idx !== -1) return idx;
  }
  return -1;
}

function normalizeEmail_(value) {
  var email = String(value || '').trim().toLowerCase();
  var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return valid ? email : '';
}

function normalizeStatus_(value) {
  var status = String(value || '').trim().toLowerCase();
  if (status === 'approved') return 'approved';
  if (status === 'pending') return 'pending';
  if (status === 'rejected') return 'rejected';
  return '';
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
