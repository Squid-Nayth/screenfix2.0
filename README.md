<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1Z6giUgGlMC8esnXkyyLwINMznX2jCxWQ

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Google Analytics 4 (GA4)

1. Create a file named `.env.local` at the project root.
2. Add:
   - `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
3. Replace `G-XXXXXXXXXX` with your real GA4 Measurement ID.
4. Restart the dev server:
   - `npm run dev`
5. Build again before deployment:
   - `npm run build`

If `VITE_GA_MEASUREMENT_ID` is missing, Google Analytics is disabled automatically.

## Blog / TinaCMS

The news section now uses editable content files in:
- `content/articles/*.json`

Each article has:
- a list card
- a detailed article page
- `Voir plus` buttons linking to the detailed page

TinaCMS preparation files:
- `tina/config.ts`
- `content/articles/*.json`
- `public/uploads/`
- `TINA_DEPLOYMENT.md`

To prepare Tina locally:
1. Copy `.env.example` to `.env.local` and fill:
   - `NEXT_PUBLIC_TINA_CLIENT_ID`
   - `TINA_TOKEN`
   - `TINA_BRANCH`
2. Run:
   - `npm run tina:dev`
3. To build Tina admin + the site:
   - `npm run tina:build`

Notes:
- Tina is pinned in `devDependencies`, so the same Tina version is used locally and in CI.
- The current app remains a Vite React site; Tina edits the JSON files used by the news pages.
- For deployment, Git connection, and client workflow without local source code, see `TINA_DEPLOYMENT.md`.

## Pro access setup (Google Sheets + Apps Script)

1. Open and deploy the Apps Script file:
   [scripts/google-apps-script/pro-access-webapp.gs](scripts/google-apps-script/pro-access-webapp.gs)
2. In Apps Script:
   - Deploy as Web App (`Execute as: Me`, `Who has access: Anyone with the link`)
   - Run `setApiKeyOnce()` once after replacing its key value
3. Update frontend config in:
   [lib/proAccess.ts](lib/proAccess.ts)
   - `webAppUrl` with your `/exec` URL
   - `apiKey` with your Script Property key
   - `shopUrl` with your real B2B shop URL or route
4. Ensure your Google Sheet has `Status` values:
   - `pending`
   - `approved`
   - `rejected`

## Dynamic iPhone prices (Google Sheets -> Website)

1. In your Google Sheet, create a sheet named `PRIX`.
2. Add headers in row 1:
   - `modele`
   - `prix`
3. Add rows like:
   - `iPhone 13 | 399`
   - `iPhone 14 | 499`
4. Create a separate Apps Script project for prices (recommended, to avoid `doGet` conflict with pro access endpoint):
   - https://script.google.com -> New project
5. In Apps Script, paste:
   - [scripts/google-apps-script/prix-webapp.gs](scripts/google-apps-script/prix-webapp.gs)
6. In `PRICE_CONFIG`, set `SPREADSHEET_ID` with your Google Sheet ID.
7. Deploy as Web App (`Execute as: Me`, `Who has access: Anyone with the link`) and copy the `/exec` URL.
8. Verify the frontend API URL in:
   - [lib/sheetPrices.ts](lib/sheetPrices.ts)
   - `apiUrl` must match your prices Web App `/exec` URL.
9. Run:
   - `npm run dev`

The booking form (`Prendre rendez-vous`) auto-refreshes model prices every 60 seconds.
The Google Sheet `prix` value overrides the `Écran Original Reconditionné` price for each iPhone model.

## Automatic booking sync (Website -> Google Calendar)

1. Open Google Apps Script:
   - [scripts/google-apps-script/calendar-booking-webapp.gs](scripts/google-apps-script/calendar-booking-webapp.gs)
2. Create a new standalone Apps Script project and paste this file.
3. In Apps Script:
   - Run `setCalendarApiKeyOnce()` once after replacing the placeholder key
   - Run `setCalendarIdOnce()` once
4. In `setCalendarIdOnce()`:
   - keep `primary` if the calendar owner is the Google account running the script
   - or replace it with a real Google Calendar ID if you want to target another calendar
5. Deploy as Web App:
   - `Execute as: Me`
   - `Who has access: Anyone with the link`
6. Copy the `/exec` URL.
7. Create `.env.local` at the project root and add:

```bash
VITE_GCAL_BOOKING_WEBAPP_URL=https://script.google.com/macros/s/AKFYCB.../exec
VITE_GCAL_BOOKING_API_KEY=your_long_random_secret
VITE_GCAL_BOOKING_DURATION_MINUTES=60
```

8. Restart the app:
   - `npm run dev`
9. For production:
   - `npm run build`

The booking form will then create a Google Calendar event automatically before confirming the appointment.

## Customer bookings database (Website -> Google Forms -> Google Sheets)

1. Create a Google Form dedicated to customer appointments.
2. Add these fields in this exact order:
   - `Booking ID`
   - `Source`
   - `Nom client`
   - `Email`
   - `Telephone`
   - `Marque`
   - `Modele`
   - `Services`
   - `Prix affiche`
   - `Montant numerique`
   - `Montant brut`
   - `Reduction %`
   - `Date RDV`
   - `Heure RDV`
   - `Debut ISO`
   - `Fin ISO`
3. Link the Google Form to a Google Sheet.
4. In the form, click:
   - `⋮` -> `Obtenir un lien pre-rempli`
5. Fill each field with a test value, generate the link, then copy all `entry.xxxxx` IDs from the URL.
6. Update:
   - [components/BookingWizard.tsx](components/BookingWizard.tsx)
   - `BOOKING_GOOGLE_FORM_CONFIG.formResponseUrl`
   - every `BOOKING_GOOGLE_FORM_CONFIG.entries.*`
7. Restart the app:
   - `npm run dev`
8. For production:
   - `npm run build`

Recommended Google Sheet formulas (to the right of the linked response sheet):
- add column `Statut RDV`
- add column `Rendez-vous effectue` with checkboxes
- add column `Chiffre d'affaires confirme` with:

```gs
=ARRAYFORMULA(IF(ROW(A:A)=1,"Chiffre d'affaires confirme",IF(S:S=TRUE,K:K,"")))
```

- add column `Mois` with:

```gs
=ARRAYFORMULA(IF(ROW(A:A)=1,"Mois",IF(P:P<>"",LEFT(P:P,7),"")))
```

- add column `Annee` with:

```gs
=ARRAYFORMULA(IF(ROW(A:A)=1,"Annee",IF(P:P<>"",LEFT(P:P,4),"")))
```
