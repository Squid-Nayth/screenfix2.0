# Guide de Déploiement - Screenfix 2.0

Le site est maintenant **100% statique** et peut être déployé sur n'importe quelle plateforme d'hébergement.

## 📦 Fichiers de Production

Les fichiers statiques sont générés dans le dossier **`dist/`** après le build.

### Commandes

```bash
# Installer les dépendances
npm install

# Générer les fichiers statiques
npm run build

# Prévisualiser la version de production localement
npm run preview
```

## 🚀 Plateformes de Déploiement

### 1. **Netlify** (Recommandé)

#### Méthode 1 : Déploiement via l'interface
1. Connectez-vous à [netlify.com](https://netlify.com)
2. Glissez-déposez le dossier **`dist/`**
3. ✅ C'est déployé !

#### Méthode 2 : Déploiement Git
1. Connectez votre repo GitHub
2. Configuration :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
3. Le fichier `public/_redirects` gère automatiquement le routing SPA

---

### 2. **Vercel**

#### Via Interface
1. Connectez-vous à [vercel.com](https://vercel.com)
2. Importez votre repo GitHub
3. Configuration automatique détectée via **`vercel.json`**

#### Via CLI
```bash
npm i -g vercel
vercel --prod
```

---

### 3. **GitHub Pages**

1. Créez un repo GitHub
2. Ajoutez le code et poussez
3. Dans Settings → Pages → Source : `gh-pages branch`
4. Ou utilisez GitHub Actions pour automatiser :

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

### 4. **Hébergement Apache/Nginx**

#### Upload via FTP/SFTP
1. Construisez le site : `npm run build`
2. Uploadez tout le contenu de **`dist/`** vers votre serveur
3. Le fichier **`.htaccess`** (déjà inclus) gère le routing

#### Configuration Nginx
Si vous utilisez Nginx, ajoutez cette configuration :

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

---

### 5. **Cloudflare Pages**

1. Connectez votre repo GitHub
2. Configuration :
   - **Build command** : `npm run build`
   - **Build output directory** : `dist`
3. Le routing SPA est géré automatiquement

---

## 📁 Structure des Fichiers de Production

```
dist/
├── index.html              # Page principale
├── assets/                 # JS et CSS compilés
│   └── index-[hash].js
├── icones/                 # Logos et icônes
│   ├── whatsapp.png
│   ├── instagram.png
│   ├── tik-tok.png
│   ├── facebook.png
│   └── youtube.png
├── video/                  # Vidéos
│   └── processus-separation-verre.mp4
├── _redirects             # Config Netlify (routing SPA)
└── .htaccess              # Config Apache (routing SPA)
```

## ⚙️ Configuration du Routing SPA

Les fichiers suivants sont inclus pour gérer le routing côté client :

- **`public/_redirects`** : Pour Netlify
- **`vercel.json`** : Pour Vercel
- **`public/.htaccess`** : Pour Apache

Ces fichiers redirigent toutes les routes vers `index.html` pour que React Router fonctionne correctement.

## 🔒 Variables d'Environnement

Le site utilise EmailJS pour l'envoi d'emails. Les credentials sont déjà intégrés dans le code (fichier `services/emailService.ts`), donc aucune configuration supplémentaire n'est nécessaire.

## ✅ Test Local de la Version de Production

```bash
npm run build
npm run preview
```

Ouvrez http://localhost:4173 pour tester la version optimisée.

## 📊 Optimisations Incluses

- ✅ Minification JS/CSS automatique
- ✅ Compression Gzip
- ✅ Lazy loading des composants
- ✅ Optimisation des images
- ✅ Tree shaking (suppression du code inutilisé)

## 🌐 Domaine Personnalisé

Pour utiliser votre propre domaine :

1. **Netlify/Vercel** : Ajoutez votre domaine dans les paramètres
2. **Apache/Nginx** : Configurez votre VirtualHost
3. Configurez les DNS pour pointer vers votre hébergeur

---

**Le site est maintenant prêt à être déployé sur n'importe quelle plateforme !** 🚀
