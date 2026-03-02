# TinaCMS deployment, Git connection, and client workflow

This project is ready for a TinaCMS content workflow, but Tina only becomes useful for a client if the site is deployed from Git.

If you keep deploying the site manually by uploading `dist`, the client will not have a reliable editor workflow. Tina writes content back to the repository, then your host must rebuild automatically.

## Recommended architecture

Use this stack:

1. GitHub repository for the project
2. TinaCloud connected to that GitHub repository
3. Vercel connected to the same repository
4. Client edits articles from `/admin/index.html`
5. Tina commits content changes into `content/articles/*.json`
6. Vercel redeploys the site automatically

Content files used by the blog:

- `content/articles/*.json`
- `public/uploads/*`

## What the client needs

The client does **not** need the project locally.

The client needs:

1. A TinaCloud account or an invited collaborator access
2. Access to the deployed Tina admin
3. Permission to edit content in the Tina project

The client does not need:

1. VS Code
2. `npm run tina:dev`
3. direct manual edits inside the repository

## Step 1: push this project to GitHub

TinaCloud works against a Git repository. Use GitHub for the cleanest path.

1. Create a GitHub repository
2. Push this project to it
3. Keep your production branch as `main`

Important:

- Tina will write article updates into the repo
- the deployed site should rebuild from Git automatically

## Step 2: create the TinaCloud project

In TinaCloud:

1. Create a new project
2. Choose `Add existing GitHub project`
3. Authorize Tina with GitHub if requested
4. Select this repository
5. Select branch `main`

At the end, TinaCloud gives you:

1. `Client ID`
2. `Read only token` or project token
3. the branch name used by Tina

## Step 3: set project environment variables

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

### Local development

Create `.env.local` from `.env.example` and add the Tina values.

### Vercel deployment

In Vercel:

1. Open the project
2. Go to `Settings` -> `Environment Variables`
3. Add:
   - `NEXT_PUBLIC_TINA_CLIENT_ID`
   - `TINA_TOKEN`
   - `TINA_BRANCH`
4. Save

## Step 4: set the correct build command

For a Tina-enabled deployment, the host must build Tina admin before the site build.

Use this build command in Vercel:

```bash
npm run tina:build
```

Output directory:

```bash
dist
```

Do not use only `npm run build` for the Tina-enabled production deployment, because that builds the site without generating Tina admin first.

## Step 5: deploy and verify the admin

After the first successful deployment:

1. Open your site
2. Go to `/admin/index.html`

Expected result:

- Tina admin loads
- you can sign in
- article collection `Articles` is visible

If `/admin/index.html` is missing:

1. check that the build command is `npm run tina:build`
2. check that Tina environment variables are present in Vercel
3. trigger a new deployment

## Step 6: invite the client

In TinaCloud:

1. Open the project
2. Go to collaborators
3. Invite the client
4. Give a content editing role

Recommended:

- client = content editor
- you = admin/technical owner

This keeps the client in the editor UI and keeps project-level technical config under your control.

## Step 7: client workflow

Once deployed correctly, the client workflow is:

1. Open `/admin/index.html`
2. Sign in
3. Open collection `Articles`
4. Create or edit an article
5. Save and publish
6. Tina writes the JSON file to the Git branch
7. Vercel redeploys automatically
8. The updated article appears on the site

No local code access is required for the client.

## Step 8: recommended content workflow

Use a simple production workflow:

1. `main` = production
2. client edits directly in Tina
3. Vercel deploys from `main`

If you want validation before publication:

1. use a second branch such as `staging`
2. point Tina to `staging`
3. review changes there
4. merge into `main`

For a small business site, direct edits on `main` are usually enough.

## Step 9: article structure already prepared in this repo

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

## Important limitation

If you continue with a manual FTP/static upload workflow only:

1. Tina can still edit content in Git
2. but the live site will not update until a deployment runs

So for the client workflow you asked for, the correct setup is:

1. GitHub
2. TinaCloud
3. Vercel auto-deploy

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
- TinaCloud collaborators: https://tina.io/docs/tinacloud/projects/collaborators/
- Add existing GitHub project: https://tina.io/docs/tinacloud/projects/add-existing-project/
