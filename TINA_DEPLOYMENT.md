# TinaCMS automatic deployment to Hostinger with GitHub

This is the correct production setup if you want:

1. your client edits content in TinaCMS
2. Tina saves the changes into GitHub
3. GitHub rebuilds the site automatically
4. Hostinger receives the new `dist` automatically

That is the only clean way to make Tina useful on a static Hostinger site.

## How the flow works

The full chain is:

1. client opens `https://screenfix.fr/admin/index.html`
2. client edits an article in TinaCMS
3. TinaCloud saves the change to the linked GitHub repository
4. the push triggers GitHub Actions
5. GitHub Actions runs `npm run tina:build`
6. GitHub Actions uploads `dist` to Hostinger with FTP
7. the site is updated online

## What is already prepared in this repo

Already present:

1. Tina config in `tina/config.ts`
2. Tina admin build in `npm run tina:build`
3. static admin page generated at `dist/admin/index.html`
4. automatic deployment workflow in `.github/workflows/deploy-hostinger.yml`

## Content files used by the blog

- `content/articles/*.json`
- `public/uploads/*`

## Step 1: put the project on GitHub

TinaCloud writes content changes back to GitHub, so the repository must exist there.

Use:

1. one repository for this site
2. branch `main` as production branch

## Step 2: connect TinaCloud to the GitHub repository

In TinaCloud:

1. create or open the project
2. connect the GitHub repository
3. choose the branch `main`
4. in `Site URL(s)`, add:
   - `https://screenfix.fr`
   - `https://www.screenfix.fr`
   - `http://localhost:3000`

Why:

- TinaCloud uses GitHub as the source of truth
- the admin route on your site uses the TinaCloud project to authenticate editors and save content

Official docs:

- https://tina.io/docs/tinacloud/dashboard/projects
- https://tina.io/tinadocs/docs/going-live/tinacloud/configuring-tinacloud

## Step 3: local environment variables

This repo expects these variables:

```bash
NEXT_PUBLIC_TINA_CLIENT_ID=your_tina_client_id
TINA_TOKEN=your_tina_token
TINA_BRANCH=main
```

Where they are used:

- `NEXT_PUBLIC_TINA_CLIENT_ID`: Tina admin auth/config
- `TINA_TOKEN`: Tina build access
- `TINA_BRANCH`: branch Tina writes to

Create `.env.local` from `.env.example` and add the Tina values.

This project loads `.env.local` automatically for:

- `npm run tina:dev`
- `npm run tina:build`

## Step 4: create the GitHub Secrets

Open:

1. GitHub repository
2. `Settings`
3. `Secrets and variables`
4. `Actions`
5. `New repository secret`

Create these secrets:

```txt
NEXT_PUBLIC_TINA_CLIENT_ID
TINA_TOKEN
HOSTINGER_FTP_SERVER
HOSTINGER_FTP_USERNAME
HOSTINGER_FTP_PASSWORD
HOSTINGER_FTP_PORT
HOSTINGER_SERVER_DIR
VITE_GA_MEASUREMENT_ID
VITE_GCAL_BOOKING_WEBAPP_URL
VITE_GCAL_BOOKING_API_KEY
VITE_GCAL_BOOKING_DURATION_MINUTES
```

Recommended values for Hostinger:

```txt
HOSTINGER_FTP_PORT=21
HOSTINGER_SERVER_DIR=/public_html/
```

Where Hostinger FTP values come from:

In hPanel:

1. `Websites`
2. website `Dashboard`
3. `FTP Accounts`

There you will find:

1. FTP IP / server
2. FTP username
3. FTP port
4. upload folder

Official Hostinger doc:

- https://www.hostinger.com/support/1714427-how-to-find-ftp-details-on-hpanel-at-hostinger/

Official GitHub doc for secrets:

- https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets

## Step 5: use the workflow already added in this repo

This file is already present:

- `.github/workflows/deploy-hostinger.yml`

What it does:

1. triggers on every push to `main`
2. installs dependencies with `npm ci`
3. runs `npm run tina:build`
4. uploads `dist` to Hostinger via FTP

The FTP upload action used is:

- https://github.com/SamKirkland/FTP-Deploy-Action

## Step 6: first deployment test

Once the GitHub secrets are set:

1. commit and push to `main`
2. open the `Actions` tab in GitHub
3. wait for the workflow `Deploy ScreenFix to Hostinger`
4. confirm that all steps are green

If the workflow fails:

1. check the failing step
2. most common causes are:
   - wrong FTP password
   - wrong FTP server
   - wrong Tina token
   - missing environment secret

## Step 7: verify the live site

After the first successful workflow:

1. open `https://screenfix.fr`
2. open `https://screenfix.fr/admin/index.html`

Expected result:

1. site loads normally
2. Tina admin loads
3. login works

## Step 8: verify the full editorial flow

This is the real end-to-end test:

1. open `https://screenfix.fr/admin/index.html`
2. log in to Tina
3. edit one article title
4. save
5. verify that TinaCloud writes the change to GitHub
6. check GitHub `Actions`
7. wait for the workflow to finish
8. refresh the public article page on `screenfix.fr`

Expected result:

1. the article is updated online
2. no manual upload to Hostinger is needed

## Step 9: what your client will do in practice

Once everything is configured, your client does only this:

1. open `/admin/index.html`
2. sign in
3. edit an article
4. save

Everything else happens automatically:

1. Tina -> GitHub
2. GitHub -> build
3. build -> Hostinger

## Step 10: what you still manage technically

You still manage:

1. TinaCloud project configuration
2. GitHub repository
3. GitHub secrets
4. Hostinger FTP credentials

The client only manages content.

## Quick checklist

Before giving this to the client, confirm:

1. TinaCloud project connected to GitHub
2. `Site URL(s)` configured
3. GitHub secrets configured
4. workflow green on a test push
5. `/admin/index.html` works online
6. one article edit propagates to Hostinger automatically

## Article structure already prepared in this repo

The article editor is already prepared for:

1. slug
2. title
3. excerpt
4. category
5. author
6. publication date
7. reading time
8. featured flag
9. cover image
10. multiple content sections
11. related article links

Relevant files:

- `tina/config.ts`
- `content/articles/*.json`
- `lib/articles.ts`
- `components/Actualites.tsx`

## Local command summary

Development with Tina:

```bash
npm run tina:dev
```

Production build with Tina:

```bash
npm run tina:build
```

## References

- Tina config: https://tina.io/docs/reference/config/
- Tina schema: https://tina.io/docs/reference/schema/
- Tina CLI usage: https://tina.io/docs/frameworks/11ty/
