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
