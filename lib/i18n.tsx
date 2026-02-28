import React from 'react';
import { fullLocaleOverrides } from './i18nFullLocales';

type TranslationValue = string | string[] | Record<string, unknown> | Array<Record<string, unknown>>;

export type SupportedLocale =
  | 'fr'
  | 'en'
  | 'de'
  | 'es'
  | 'vi'
  | 'ja'
  | 'ko'
  | 'zh'
  | 'zh_tw'
  | 'th'
  | 'id'
  | 'ms'
  | 'hi';

export interface LanguageOption {
  code: SupportedLocale;
  country: string;
  label: string;
}

const STORAGE_KEY = 'screenfix_locale';

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'fr', country: 'FR', label: 'France' },
  { code: 'en', country: 'GB', label: 'English' },
  { code: 'de', country: 'DE', label: 'Deutsch' },
  { code: 'es', country: 'ES', label: 'Español' },
  { code: 'vi', country: 'VN', label: 'Tiếng Việt' },
  { code: 'ja', country: 'JP', label: '日本語' },
  { code: 'ko', country: 'KR', label: '한국어' },
  { code: 'zh', country: 'CN', label: '简体中文' },
  { code: 'zh_tw', country: 'TW', label: '繁體中文' },
  { code: 'th', country: 'TH', label: 'ไทย' },
  { code: 'id', country: 'ID', label: 'Bahasa Indonesia' },
  { code: 'ms', country: 'MY', label: 'Bahasa Melayu' },
  { code: 'hi', country: 'IN', label: 'हिन्दी' }
];

const DATE_LOCALES: Record<SupportedLocale, string> = {
  fr: 'fr-FR',
  en: 'en-GB',
  de: 'de-DE',
  es: 'es-ES',
  vi: 'vi-VN',
  ja: 'ja-JP',
  ko: 'ko-KR',
  zh: 'zh-CN',
  zh_tw: 'zh-TW',
  th: 'th-TH',
  id: 'id-ID',
  ms: 'ms-MY',
  hi: 'hi-IN'
};

const translations = {
  fr: {
    navbar: {
      boutiquePro: 'Boutique Pro',
      reconditioning: 'Reconditionnement',
      training: 'Formation',
      contact: 'Contactez-nous',
      language: 'Langue'
    },
    hero: {
      open: 'Ouvert',
      closed: 'Fermé',
      titleLine1: 'Expert',
      titleAccent: 'Apple.',
      subtitleLine1: "Ne changez pas d'écran.",
      subtitleLine2: 'Changez juste la vitre.',
      description:
        "Spécialiste du reconditionnement iPhone, iPad & Watch. Gardez votre écran d'origine Apple et économisez jusqu'à 60%.",
      cta: 'Réserver un créneau',
      warrantyLabel: 'Garantie',
      warrantyValue: '12 Mois',
      speedLabel: 'Chrono',
      speedValue: '30 Minutes',
      reviewsLabel: 'Avis',
      reviewsValue: '5/5 Google'
    },
    features: {
      eyebrow: 'Pourquoi nous ?',
      headingLead: "L'excellence",
      headingAccent: 'ScreenFix',
      description:
        'Stop aux écrans compatibles de mauvaise qualité. Optez pour le reconditionnement constructeur.',
      cards: [
        {
          title: 'Vitre seule',
          subtitle: 'Technologie reconditionnement',
          desc: "Nous remplaçons uniquement la vitre brisée. Vous conservez votre afficheur OLED d'origine."
        },
        {
          title: 'Précision laser',
          subtitle: 'Décollage micronique',
          desc: 'Machines laser de dernière génération : temps réduit à seulement 1h.'
        },
        {
          title: '30 minutes',
          subtitle: 'Service express',
          desc: "90% des interventions sont réalisées sur place. Pas besoin de laisser votre téléphone des jours."
        },
        {
          title: "Garantie jusqu'à 12 mois",
          subtitle: 'Sérénité totale',
          desc: "Toutes nos réparations pièces et main d'œuvre sont couvertes pendant 3 mois."
        }
      ]
    },
    services: {
      eyebrow: 'Notre spécialité',
      heading1: 'Reconditionnement',
      heading2: 'Remplacement',
      paragraph1:
        "La plupart des réparateurs jettent votre écran Apple cassé pour installer une copie de moindre qualité.",
      paragraph2:
        "Chez ScreenFix, nous séparons le verre cassé de votre écran LCD/OLED grâce à des machines industrielles. Nous posons ensuite une vitre neuve sur votre écran d'origine.",
      steps: [
        'Diagnostic tactile et affichage',
        'Séparation cryogénique de la vitre',
        'Laminage vitre neuve en salle blanche'
      ],
      comparisonTitle: 'Comparatif',
      comparisonSubtitle: "Qualité d'image",
      comparisonBadge: 'Original OLED',
      comparisonCompetitor: 'Boutique X',
      comparisonBrand: 'ScreenFix',
      rows: [
        { label: "Type d'écran", bad: 'Copie LCD', good: 'Original OLED' },
        { label: 'Couleurs', bad: 'Ternes', good: 'Retina vives' },
        { label: 'Tactile', bad: 'Imprécis', good: 'Original' },
        { label: "Message d'erreur", bad: 'Oui, souvent', good: 'Aucun' },
        { label: 'Prix', bad: 'Élevé', good: '-60% Éco' }
      ]
    },
    boutique: {
      eyebrow: 'Solution pour boutiques & techniciens',
      heading: 'Espace',
      accent: 'Pro',
      description:
        'Vous êtes un professionnel de la réparation ? Accédez à notre stock de pièces originales reconditionnées exclusives aux meilleurs tarifs du marché.',
      stockTitle: 'Stock en temps réel',
      stockDesc: 'Visibilité directe sur notre inventaire et livraison coursier Paris IM.',
      resellerTitle: 'Tarifs revendeur',
      resellerDesc: 'Grilles tarifaires dégressives et conditions de paiement flexibles.',
      openAccount: 'Ouvrir un compte',
      previewTitle: 'Aperçu B2B',
      previewBadge: 'Accès Pro',
      seePrice: 'Voir prix',
      stateLabel: 'État',
      connectionRequired: 'Connexion requise',
      previewRows: [
        { item: 'Écran iPhone 16 Pro Max (Original reconditionné)', stock: 'En stock' },
        { item: 'Écran iPhone 15 Pro Max (Original reconditionné)', stock: '20+ pcs' },
        { item: 'Écran iPhone 14 Pro Max (Original reconditionné)', stock: 'Dispo' }
      ]
    },
    booking: {
      promoTitle: 'Offre Web',
      promoAccent: 'Exclusif',
      promoText:
        "Réservez en ligne et cumulez les réparations pour débloquer des réductions immédiates.",
      promoNote: "La remise s'applique automatiquement au panier.",
      oneService: '1 Service',
      twoServices: '2 Services',
      threeServices: '3+ Services',
      bestDeal: 'Best Deal',
      progressModel: '01. Modèle',
      progressIssue: '02. Panne',
      progressInfo: '03. Infos',
      modelQuestion: 'Quel est votre iPhone ?',
      missingModel: 'Vous ne trouvez pas votre modèle ?',
      callUs: 'Appelez-nous',
      issueQuestion: 'Quelle est la panne ?',
      issueHint: 'Sélectionnez plusieurs services pour augmenter votre réduction',
      recommended: 'Recommandé',
      otherProblem: 'Autre problème ?',
      otherSubtitle: 'Diagnostic personnalisé',
      customIssuePlaceholder: 'Veuillez décrire brièvement le problème...',
      quote: 'Sur devis',
      reductionApplied: 'Réduction appliquée',
      totalEstimated: 'Total estimé',
      scheduleTitle: 'Choisissez votre créneau',
      day: 'Jour',
      hour: 'Heure',
      summary: 'Récapitulatif',
      specificRequest: 'Demande spécifique',
      discountedTotal: 'Total avec remise',
      contactTitle: 'Vos coordonnées',
      fullName: 'Nom complet',
      email: 'Email',
      phone: 'Téléphone',
      invalidEmail: 'Email invalide',
      invalidPhone: 'Numéro invalide',
      privacyPrefix: 'En remplissant notre formulaire, vous acceptez notre',
      privacyLink: 'politique de confidentialité',
      successThanks: 'Merci',
      successConfirmed: 'Votre rendez-vous pour',
      successConfirmed2: 'est confirmé le',
      chosenServices: 'Prestations choisies',
      confirmationEmail: 'Un email de confirmation a été envoyé à',
      totalLabel: 'Total',
      backHome: "Retour à l'accueil",
      back: 'Retour',
      next: 'Suivant',
      confirm: 'Confirmer le RDV',
      confirming: 'Envoi en cours...',
      calendarSyncError: "Impossible de créer automatiquement le rendez-vous dans l'agenda. Merci de réessayer.",
      namePlaceholder: 'Jean Dupont',
      emailPlaceholder: 'jean@example.com',
      services: [
        { id: 'recond', label: 'Reconditionnement écran', key: 'recond', desc: "Vitre fissurée mais l'image est intacte" },
        { id: 'screen', label: 'Écran original reconditionné', key: 'screen', desc: 'Écran noir, lignes vertes ou tâches' },
        { id: 'back', label: 'Vitre arrière', key: 'back', desc: 'Le dos du téléphone est brisé' },
        { id: 'battery', label: 'Batterie', key: 'battery', desc: "L'autonomie est faible" },
        { id: 'camera', label: 'Appareil photo', key: 'camera', desc: 'Photos floues ou caméra noire' },
        { id: 'charge', label: 'Connecteur de charge', key: 'charge', desc: 'Le téléphone ne charge plus' }
      ]
    },
    training: {
      devTitle: 'En développement',
      devText: 'Cette partie du site est en développement, elle sera bientôt disponible.',
      understood: 'Compris',
      eyebrow: 'Formation Pro',
      titleLead: 'Devenez',
      titleAccent: 'Expert',
      description: 'Apprenez les techniques de reconditionnement industriel.',
      levels: [
        'Niveau 1 : Séries iPhone XR & 11',
        'Niveau 2 : Séries iPhone X à 11 Pro Max',
        'Niveau 3 : Séries iPhone 12 à 14 Pro Max',
        'Niveau 4 : Séries iPhone 15 à 17 Pro Max'
      ],
      cta: 'Télécharger le programme',
      practicalTitle: 'Session pratique',
      practicalPlace: 'Atelier Paris 13'
    },
    testimonials: {
      headingLead: 'Clients',
      headingAccent: 'Vérifiés',
      description: 'Découvrez ce que pensent nos clients de nos services'
    },
    footer: {
      tagline:
        "L'expert parisien de la rénovation d'écrans Apple. Qualité d'origine, écologie et économie.",
      contact: 'Contact',
      whatsapp: 'WhatsApp disponible',
      hours: 'Horaires',
      weekdays: 'Lun - Ven',
      saturday: 'Samedi',
      sunday: 'Dimanche',
      closed: 'Fermé',
      rights: 'Tous droits réservés.',
      legal: 'Mentions légales',
      privacy: 'Politique de confidentialité'
    },
    b2b: {
      eyebrow: 'Espace Professionnel',
      titleLead: 'Ouvrir un',
      titleAccent: 'Compte Pro',
      description: 'Accédez à notre catalogue de pièces détachées aux tarifs revendeurs',
      fullName: 'Nom complet',
      company: 'Nom de la société',
      email: 'Email',
      phone: 'Téléphone',
      optional: '(facultatif)',
      siret: 'Numéro SIRET',
      siretTooltip:
        "Le numéro SIRET sera consulté afin de vérifier l'authenticité de votre activité professionnelle.",
      siretHelper: '14 chiffres - Permet de vérifier votre activité professionnelle',
      namePlaceholder: 'Jean Dupont',
      companyPlaceholder: 'Ma Boutique Mobile',
      emailPlaceholder: 'contact@exemple.com',
      siretPlaceholder: '123 456 789 00010',
      siretInfoAria: 'Information sur la vérification du SIRET',
      invalidEmail: 'Email invalide',
      invalidPhone: 'Numéro invalide',
      invalidSiret: 'SIRET invalide (14 chiffres requis)',
      submit: 'Créer mon compte professionnel',
      submitLoading: 'Envoi en cours...',
      formError: 'Merci de corriger les champs en erreur avant de valider.',
      formSuccess: 'Demande envoyée. Votre compte est en attente de validation.',
      accessPrompt: 'Vous êtes déjà inscrit chez nous ?',
      accessPlaceholder: 'Votre email professionnel',
      accessButton: 'Accéder à notre boutique',
      accessChecking: 'Vérification...',
      requiredNote: 'Le symbole * indique un champ obligatoire.',
      approved: 'Compte approuvé. Redirection vers la boutique...',
      pending: 'Votre compte est en attente de validation.',
      rejected: 'Votre demande a été refusée. Contactez le support.',
      notFound: 'Aucune demande trouvée pour cet email.',
      unauthorized: "Accès API non autorisé. Vérifiez la clé API.",
      invalidAccessEmail: 'Merci de saisir une adresse email valide.',
      configError: "Configuration incomplète : ajoute l'URL /exec et la clé API dans lib/proAccess.ts.",
      technicalError: 'Erreur technique de vérification. Merci de réessayer.'
    },
    phoneInput: {
      countryCodeAria: 'Indicatif pays',
      phoneNumberAria: 'Numéro de téléphone',
      localPlaceholder: '6 12 34 56 78'
    },
    legal: {
      badge: 'Informations légales',
      titleLead: 'Mentions',
      titleAccent: 'légales',
      publisherTitle: 'Éditeur du site',
      publisherStatus: 'Auto-entrepreneur',
      editorTitle: 'Responsable de la publication',
      editorRole: 'Développeur web / Webmaster Freelance',
      hostingTitle: 'Hébergement',
      brandsTitle: 'À propos des marques citées',
      brandParagraph1:
        "ScreenFix est une entreprise totalement indépendante, non affiliée, autorisée ou sponsorisée par Apple Inc.",
      brandParagraph2:
        "Les noms iPhone, Apple, iOS, MacBook, le logo Apple et toutes les autres marques citées sur ce site sont la propriété exclusive d'Apple Inc. et servent uniquement à désigner clairement les appareils sur lesquels nous intervenons ou pour lesquels nous proposons des formations.",
      brandParagraph3:
        "Nos services de réparation, de reconditionnement et de formation sont réalisés de façon indépendante, sans aucun lien commercial ou contractuel avec Apple Inc. ou ses filiales.",
      back: "Retour à l'accueil"
    },
    privacy: {
      badge: 'Protection des données',
      titleLead: 'Politique de',
      titleAccent: 'confidentialité',
      section1Title: '1. Données collectées',
      section1Intro: 'Le site ScreenFix collecte uniquement les données suivantes via son formulaire de commande :',
      section2Title: '2. Finalité de la collecte',
      section2Text: 'Ces informations sont utilisées uniquement pour traiter la demande de réparation du client.',
      section3Title: '3. Conservation des données',
      section3Text: "Les données ne sont pas conservées après traitement. Aucune base de données ni fichier client n'est stocké sur le site.",
      section4Title: '4. Confidentialité',
      section4Text: 'Les données sont traitées de manière confidentielle et ne sont transmises à aucun tiers.',
      section5Title: '5. Vos droits',
      section5Text:
        "Conformément au RGPD, vous pouvez exercer vos droits d'accès, de rectification ou de suppression à l'adresse suivante :",
      section6Title: '6. Services utilisés',
      section6Text: "Le formulaire utilise un service externe d'envoi d'emails nommé EmailJS, conforme au RGPD.",
      back: "Retour à l'accueil"
    }
  },
  en: {
    navbar: {
      boutiquePro: 'Pro Shop',
      reconditioning: 'Reconditioning',
      training: 'Training',
      contact: 'Contact us',
      language: 'Language'
    },
    hero: {
      open: 'Open',
      closed: 'Closed',
      titleLine1: 'Apple',
      titleAccent: 'Expert.',
      subtitleLine1: "Don't replace your screen.",
      subtitleLine2: 'Just replace the glass.',
      description:
        'Specialist in iPhone, iPad and Watch reconditioning. Keep your original Apple screen and save up to 60%.',
      cta: 'Book a slot',
      warrantyLabel: 'Warranty',
      warrantyValue: '12 Months',
      speedLabel: 'Speed',
      speedValue: '30 Minutes',
      reviewsLabel: 'Reviews',
      reviewsValue: '5/5 Google'
    },
    features: {
      eyebrow: 'Why us?',
      headingLead: 'ScreenFix',
      headingAccent: 'Excellence',
      description: 'Stop using low-quality compatible screens. Choose manufacturer-grade reconditioning.',
      cards: [
        {
          title: 'Glass only',
          subtitle: 'Reconditioning technology',
          desc: 'We replace only the broken glass. You keep your original OLED display.'
        },
        {
          title: 'Laser precision',
          subtitle: 'Micronic separation',
          desc: 'Latest-generation laser machines: turnaround reduced to only 1 hour.'
        },
        {
          title: '30 minutes',
          subtitle: 'Express service',
          desc: '90% of repairs are completed on site. No need to leave your phone for days.'
        },
        {
          title: 'Up to 12-month warranty',
          subtitle: 'Total peace of mind',
          desc: 'All repairs, parts and labour are covered for 3 months.'
        }
      ]
    },
    services: {
      eyebrow: 'Our expertise',
      heading1: 'Reconditioning',
      heading2: 'Replacement',
      paragraph1:
        'Most repair shops throw away your broken Apple screen and install a lower-quality copy instead.',
      paragraph2:
        'At ScreenFix, we separate the broken glass from your LCD/OLED screen using industrial machines. We then laminate a new glass layer onto your original screen.',
      steps: [
        'Touchscreen and display diagnostics',
        'Cryogenic glass separation',
        'New glass lamination in a clean room'
      ],
      comparisonTitle: 'Comparison',
      comparisonSubtitle: 'Image quality',
      comparisonBadge: 'Original OLED',
      comparisonCompetitor: 'Other shop',
      comparisonBrand: 'ScreenFix',
      rows: [
        { label: 'Screen type', bad: 'LCD copy', good: 'Original OLED' },
        { label: 'Colours', bad: 'Dull', good: 'Vivid Retina' },
        { label: 'Touch', bad: 'Imprecise', good: 'Original' },
        { label: 'Error message', bad: 'Yes, often', good: 'None' },
        { label: 'Price', bad: 'High', good: '-60% Eco' }
      ]
    },
    boutique: {
      eyebrow: 'Solution for repair shops & technicians',
      heading: 'Pro',
      accent: 'Space',
      description:
        'Are you a repair professional? Access our exclusive stock of reconditioned original parts at reseller prices.',
      stockTitle: 'Live stock',
      stockDesc: 'Direct inventory visibility and Paris courier delivery.',
      resellerTitle: 'Reseller pricing',
      resellerDesc: 'Tiered pricing and flexible payment terms.',
      openAccount: 'Open an account',
      previewTitle: 'B2B preview',
      previewBadge: 'Pro Access',
      seePrice: 'See price',
      stateLabel: 'Status',
      connectionRequired: 'Login required',
      previewRows: [
        { item: 'iPhone 16 Pro Max Screen (Reconditioned Original)', stock: 'In stock' },
        { item: 'iPhone 15 Pro Max Screen (Reconditioned Original)', stock: '20+ pcs' },
        { item: 'iPhone 14 Pro Max Screen (Reconditioned Original)', stock: 'Available' }
      ]
    },
    booking: {
      promoTitle: 'Web Offer',
      promoAccent: 'Exclusive',
      promoText: 'Book online and combine repairs to unlock instant discounts.',
      promoNote: 'Discount is applied automatically to your basket.',
      oneService: '1 Service',
      twoServices: '2 Services',
      threeServices: '3+ Services',
      bestDeal: 'Best Deal',
      progressModel: '01. Model',
      progressIssue: '02. Issue',
      progressInfo: '03. Details',
      modelQuestion: 'Which iPhone do you have?',
      missingModel: "Can't find your model?",
      callUs: 'Call us',
      issueQuestion: 'What is the issue?',
      issueHint: 'Select multiple services to increase your discount',
      recommended: 'Recommended',
      otherProblem: 'Another issue?',
      otherSubtitle: 'Custom diagnosis',
      customIssuePlaceholder: 'Please briefly describe the issue...',
      quote: 'Quote on request',
      reductionApplied: 'Discount applied',
      totalEstimated: 'Estimated total',
      scheduleTitle: 'Choose your slot',
      day: 'Day',
      hour: 'Time',
      summary: 'Summary',
      specificRequest: 'Specific request',
      discountedTotal: 'Total with discount',
      contactTitle: 'Your details',
      fullName: 'Full name',
      email: 'Email',
      phone: 'Phone',
      invalidEmail: 'Invalid email',
      invalidPhone: 'Invalid phone number',
      privacyPrefix: 'By submitting the form, you accept our',
      privacyLink: 'privacy policy',
      successThanks: 'Thank you',
      successConfirmed: 'Your appointment for',
      successConfirmed2: 'is confirmed on',
      chosenServices: 'Selected services',
      confirmationEmail: 'A confirmation email has been sent to',
      totalLabel: 'Total',
      backHome: 'Back to home',
      back: 'Back',
      next: 'Next',
      confirm: 'Confirm booking',
      confirming: 'Sending...',
      calendarSyncError: 'Unable to create the appointment in Google Calendar. Please try again.',
      namePlaceholder: 'John Doe',
      emailPlaceholder: 'john@example.com',
      services: [
        { id: 'recond', label: 'Screen reconditioning', key: 'recond', desc: 'Cracked glass but the image still works' },
        { id: 'screen', label: 'Reconditioned original screen', key: 'screen', desc: 'Black screen, green lines or spots' },
        { id: 'back', label: 'Back glass', key: 'back', desc: 'The back of the phone is broken' },
        { id: 'battery', label: 'Battery', key: 'battery', desc: 'Battery life is weak' },
        { id: 'camera', label: 'Camera', key: 'camera', desc: 'Blurry photos or black camera' },
        { id: 'charge', label: 'Charging port', key: 'charge', desc: 'The phone no longer charges' }
      ]
    },
    training: {
      devTitle: 'In development',
      devText: 'This part of the site is under development and will be available soon.',
      understood: 'Understood',
      eyebrow: 'Pro Training',
      titleLead: 'Become an',
      titleAccent: 'Expert',
      description: 'Learn industrial reconditioning techniques.',
      levels: [
        'Level 1: iPhone XR & 11 series',
        'Level 2: iPhone X to 11 Pro Max series',
        'Level 3: iPhone 12 to 14 Pro Max series',
        'Level 4: iPhone 15 to 17 Pro Max series'
      ],
      cta: 'Download the programme',
      practicalTitle: 'Hands-on session',
      practicalPlace: 'Paris 13 workshop'
    },
    testimonials: {
      headingLead: 'Verified',
      headingAccent: 'Customers',
      description: 'Discover what our customers think about our services'
    },
    footer: {
      tagline:
        "Paris-based expert in Apple screen restoration. Original quality, ecology and savings.",
      contact: 'Contact',
      whatsapp: 'WhatsApp available',
      hours: 'Opening hours',
      weekdays: 'Mon - Fri',
      saturday: 'Saturday',
      sunday: 'Sunday',
      closed: 'Closed',
      rights: 'All rights reserved.',
      legal: 'Legal notice',
      privacy: 'Privacy policy'
    },
    b2b: {
      eyebrow: 'Professional Area',
      titleLead: 'Open a',
      titleAccent: 'Pro Account',
      description: 'Access our spare parts catalogue at reseller prices',
      fullName: 'Full name',
      company: 'Company name',
      email: 'Email',
      phone: 'Phone',
      optional: '(optional)',
      siret: 'SIRET number',
      siretTooltip: 'Your SIRET number will be checked to verify your professional activity.',
      siretHelper: '14 digits - Used to verify your professional activity',
      namePlaceholder: 'John Doe',
      companyPlaceholder: 'My Mobile Shop',
      emailPlaceholder: 'contact@example.com',
      siretPlaceholder: '123 456 789 00010',
      siretInfoAria: 'Information about SIRET verification',
      invalidEmail: 'Invalid email',
      invalidPhone: 'Invalid phone number',
      invalidSiret: 'Invalid SIRET (14 digits required)',
      submit: 'Create my professional account',
      submitLoading: 'Sending...',
      formError: 'Please correct the highlighted fields before submitting.',
      formSuccess: 'Request sent. Your account is pending validation.',
      accessPrompt: 'Already registered with us?',
      accessPlaceholder: 'Your professional email',
      accessButton: 'Access our shop',
      accessChecking: 'Checking...',
      requiredNote: '* indicates a required field.',
      approved: 'Account approved. Redirecting to the shop...',
      pending: 'Your account is pending validation.',
      rejected: 'Your request was rejected. Please contact support.',
      notFound: 'No request found for this email.',
      unauthorized: 'API access is not authorized. Please check the API key.',
      invalidAccessEmail: 'Please enter a valid email address.',
      configError: 'Incomplete configuration: add the /exec URL and API key in lib/proAccess.ts.',
      technicalError: 'Technical verification error. Please try again.'
    },
    phoneInput: {
      countryCodeAria: 'Country calling code',
      phoneNumberAria: 'Phone number',
      localPlaceholder: '6 12 34 56 78'
    },
    legal: {
      badge: 'Legal Information',
      titleLead: 'Legal',
      titleAccent: 'Notice',
      publisherTitle: 'Website publisher',
      publisherStatus: 'Sole trader',
      editorTitle: 'Publishing director',
      editorRole: 'Freelance web developer / webmaster',
      hostingTitle: 'Hosting',
      brandsTitle: 'About the brands mentioned',
      brandParagraph1:
        'ScreenFix is a fully independent company, not affiliated with, authorised by or sponsored by Apple Inc.',
      brandParagraph2:
        'The names iPhone, Apple, iOS, MacBook, the Apple logo and all other trademarks mentioned on this website remain the exclusive property of Apple Inc. and are used only to clearly identify the devices we repair or train on.',
      brandParagraph3:
        'Our repair, reconditioning and training services are carried out independently, without any commercial or contractual link with Apple Inc. or its subsidiaries.',
      back: 'Back to home'
    },
    privacy: {
      badge: 'Data protection',
      titleLead: 'Privacy',
      titleAccent: 'Policy',
      section1Title: '1. Data collected',
      section1Intro: 'ScreenFix only collects the following information through its order form:',
      section2Title: '2. Purpose of collection',
      section2Text: 'This information is used only to process the customer repair request.',
      section3Title: '3. Data retention',
      section3Text: 'Data is not stored after processing. No customer database or customer file is kept on the website.',
      section4Title: '4. Confidentiality',
      section4Text: 'Data is handled confidentially and is not shared with third parties.',
      section5Title: '5. Your rights',
      section5Text:
        'In accordance with the GDPR, you may exercise your rights of access, rectification or deletion at the following address:',
      section6Title: '6. Services used',
      section6Text: 'The form uses an external email delivery service called EmailJS, which is GDPR compliant.',
      back: 'Back to home'
    }
  },
  de: {
    navbar: {
      boutiquePro: 'Pro-Shop',
      reconditioning: 'Refurbishment',
      training: 'Schulung',
      contact: 'Kontaktieren Sie uns',
      language: 'Sprache'
    },
    hero: {
      open: 'Geöffnet',
      closed: 'Geschlossen',
      titleLine1: 'Apple-',
      titleAccent: 'Apple.',
      subtitleLine1: 'Tauschen Sie nicht den Bildschirm.',
      subtitleLine2: 'Tauschen Sie nur das Glas aus.',
      description:
        'Spezialist für iPhone-, iPad- und Watch-Aufbereitung. Behalten Sie Ihr originales Apple-Display und sparen Sie bis zu 60%.',
      cta: 'Termin buchen'
    },
    footer: {
      legal: 'Impressum',
      privacy: 'Datenschutz'
    }
  },
  es: {
    navbar: {
      boutiquePro: 'Tienda Pro',
      reconditioning: 'Reacondicionamiento',
      training: 'Formación',
      contact: 'Contáctanos',
      language: 'Idioma'
    },
    hero: {
      open: 'Abierto',
      closed: 'Cerrado',
      titleLine1: 'Experto',
      titleAccent: 'Apple.',
      subtitleLine1: 'No cambies la pantalla.',
      subtitleLine2: 'Cambia solo el cristal.',
      description:
        'Especialista en reacondicionamiento de iPhone, iPad y Watch. Conserva tu pantalla original Apple y ahorra hasta un 60%.',
      cta: 'Reservar cita'
    }
  },
  vi: {
    navbar: {
      boutiquePro: 'Cửa hàng Pro',
      reconditioning: 'Tái tạo',
      training: 'Đào tạo',
      contact: 'Liên hệ',
      language: 'Ngôn ngữ'
    },
    hero: {
      open: 'Đang mở',
      closed: 'Đã đóng',
      titleLine1: 'Chuyên gia',
      titleAccent: 'Apple.',
      subtitleLine1: 'Đừng thay cả màn hình.',
      subtitleLine2: 'Chỉ thay mặt kính.',
      description:
        'Chuyên gia tái tạo iPhone, iPad và Watch. Giữ lại màn hình Apple chính hãng và tiết kiệm tới 60%.',
      cta: 'Đặt lịch'
    }
  },
  ja: {
    navbar: {
      boutiquePro: 'プロショップ',
      reconditioning: '再生修理',
      training: 'トレーニング',
      contact: 'お問い合わせ',
      language: '言語'
    },
    hero: {
      open: '営業中',
      closed: '営業時間外',
      titleLine1: 'Apple',
      titleAccent: 'Apple.',
      subtitleLine1: '画面全体を交換しないでください。',
      subtitleLine2: 'ガラスだけを交換します。',
      description:
        'iPhone・iPad・Watchの再生修理専門。Apple純正ディスプレイをそのまま活かし、最大60%節約できます。',
      cta: '予約する'
    }
  },
  ko: {
    navbar: {
      boutiquePro: '프로 스토어',
      reconditioning: '재생 수리',
      training: '교육',
      contact: '문의하기',
      language: '언어'
    },
    hero: {
      open: '영업 중',
      closed: '영업 종료',
      titleLine1: 'Apple',
      titleAccent: 'Apple.',
      subtitleLine1: '화면 전체를 바꾸지 마세요.',
      subtitleLine2: '유리만 교체하세요.',
      description:
        'iPhone, iPad, Watch 재생 수리 전문. Apple 정품 디스플레이를 유지하면서 최대 60% 절약하세요.',
      cta: '예약하기'
    }
  },
  zh: {
    navbar: {
      boutiquePro: '专业商城',
      reconditioning: '翻新修复',
      training: '培训',
      contact: '联系我们',
      language: '语言'
    },
    hero: {
      open: '营业中',
      closed: '已关闭',
      titleLine1: 'Apple',
      titleAccent: 'Apple.',
      subtitleLine1: '不要更换整块屏幕。',
      subtitleLine2: '只更换玻璃。',
      description:
        '专注于 iPhone、iPad 和 Watch 的翻新修复。保留原装 Apple 屏幕，最高可节省 60%。',
      cta: '预约时间'
    }
  },
  zh_tw: {
    navbar: {
      boutiquePro: '專業商店',
      reconditioning: '翻新修復',
      training: '培訓',
      contact: '聯絡我們',
      language: '語言'
    },
    hero: {
      open: '營業中',
      closed: '已關閉',
      titleLine1: 'Apple',
      titleAccent: 'Apple.',
      subtitleLine1: '不要更換整個螢幕。',
      subtitleLine2: '只更換玻璃。',
      description:
        '專注於 iPhone、iPad 與 Watch 的翻新修復。保留 Apple 原廠螢幕，最高可節省 60%。',
      cta: '立即預約'
    }
  },
  th: {
    navbar: {
      boutiquePro: 'ร้านค้าโปร',
      reconditioning: 'ซ่อมรีคอนดิชัน',
      training: 'การอบรม',
      contact: 'ติดต่อเรา',
      language: 'ภาษา'
    },
    hero: {
      open: 'เปิดอยู่',
      closed: 'ปิด',
      titleLine1: 'ผู้เชี่ยวชาญ',
      titleAccent: 'Apple.',
      subtitleLine1: 'ไม่ต้องเปลี่ยนทั้งหน้าจอ',
      subtitleLine2: 'เปลี่ยนเฉพาะกระจก',
      description:
        'ผู้เชี่ยวชาญด้านการรีคอนดิชัน iPhone, iPad และ Watch เก็บหน้าจอ Apple แท้ไว้และประหยัดได้สูงสุด 60%',
      cta: 'จองคิว'
    }
  },
  id: {
    navbar: {
      boutiquePro: 'Toko Pro',
      reconditioning: 'Rekondisi',
      training: 'Pelatihan',
      contact: 'Hubungi kami',
      language: 'Bahasa'
    },
    hero: {
      open: 'Buka',
      closed: 'Tutup',
      titleLine1: 'Ahli',
      titleAccent: 'Apple.',
      subtitleLine1: 'Jangan ganti seluruh layar.',
      subtitleLine2: 'Cukup ganti kacanya.',
      description:
        'Spesialis rekondisi iPhone, iPad, dan Watch. Pertahankan layar Apple asli Anda dan hemat hingga 60%.',
      cta: 'Pesan jadwal'
    }
  },
  ms: {
    navbar: {
      boutiquePro: 'Kedai Pro',
      reconditioning: 'Baik pulih',
      training: 'Latihan',
      contact: 'Hubungi kami',
      language: 'Bahasa'
    },
    hero: {
      open: 'Dibuka',
      closed: 'Ditutup',
      titleLine1: 'Pakar',
      titleAccent: 'Apple.',
      subtitleLine1: 'Jangan tukar keseluruhan skrin.',
      subtitleLine2: 'Tukar kaca sahaja.',
      description:
        'Pakar baik pulih iPhone, iPad dan Watch. Kekalkan skrin asal Apple anda dan jimat sehingga 60%.',
      cta: 'Tempah slot'
    }
  },
  hi: {
    navbar: {
      boutiquePro: 'प्रो शॉप',
      reconditioning: 'रीकंडीशनिंग',
      training: 'प्रशिक्षण',
      contact: 'संपर्क करें',
      language: 'भाषा'
    },
    hero: {
      open: 'खुला है',
      closed: 'बंद है',
      titleLine1: 'विशेषज्ञ',
      titleAccent: 'Apple.',
      subtitleLine1: 'पूरी स्क्रीन मत बदलें।',
      subtitleLine2: 'सिर्फ ग्लास बदलें।',
      description:
        'iPhone, iPad और Watch रीकंडीशनिंग विशेषज्ञ। अपनी मूल Apple स्क्रीन बचाइए और 60% तक बचत कीजिए।',
      cta: 'समय बुक करें'
    }
  }
} as const;

const localeAliases: Partial<Record<SupportedLocale, keyof typeof translations>> = {};

type Translations = typeof translations.fr;

interface I18nContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: (key: string, fallback?: string) => string;
  raw: <T = TranslationValue>(key: string, fallback?: T) => T;
  dateLocale: string;
}

const I18nContext = React.createContext<I18nContextValue | null>(null);

const getLocaleMessages = (locale: SupportedLocale): Translations => {
  const sourceLocale = localeAliases[locale] || locale;
  const source = (translations as Record<string, Partial<Translations>>)[sourceLocale] || {};
  const override = (fullLocaleOverrides as Record<string, Partial<Translations>>)[sourceLocale];
  if (sourceLocale === 'fr') return translations.fr;
  if (sourceLocale === 'en') return translations.en as Translations;
  const base = deepMerge(translations.en as Translations, source);
  return override ? deepMerge(base, override) : base;
};

const getNestedValue = (source: Record<string, unknown>, key: string): unknown => {
  return key.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, source);
};

const deepMerge = <T extends Record<string, unknown>>(base: T, override: Partial<T>): T => {
  const output: Record<string, unknown> = Array.isArray(base) ? [...base] : { ...base };

  Object.entries(override || {}).forEach(([key, value]) => {
    const baseValue = output[key];
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      baseValue &&
      typeof baseValue === 'object' &&
      !Array.isArray(baseValue)
    ) {
      output[key] = deepMerge(baseValue as Record<string, unknown>, value as Record<string, unknown>);
      return;
    }

    output[key] = value as unknown;
  });

  return output as T;
};

const getInitialLocale = (): SupportedLocale => {
  if (typeof window === 'undefined') return 'fr';
  const stored = window.localStorage.getItem(STORAGE_KEY) as SupportedLocale | null;
  if (stored && LANGUAGE_OPTIONS.some((option) => option.code === stored)) {
    return stored;
  }
  return 'fr';
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = React.useState<SupportedLocale>(getInitialLocale);

  const setLocale = React.useCallback((nextLocale: SupportedLocale) => {
    setLocaleState(nextLocale);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, nextLocale);
    }
  }, []);

  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const messages = React.useMemo(() => getLocaleMessages(locale), [locale]);

  const t = React.useCallback(
    (key: string, fallback?: string) => {
      const current = getNestedValue(messages as unknown as Record<string, unknown>, key);
      if (typeof current === 'string') return current;
      const fallbackValue = getNestedValue(translations.fr as unknown as Record<string, unknown>, key);
      if (typeof fallbackValue === 'string') return fallbackValue;
      return fallback || key;
    },
    [messages]
  );

  const raw = React.useCallback(
    <T,>(key: string, fallback?: T): T => {
      const current = getNestedValue(messages as unknown as Record<string, unknown>, key);
      if (current !== undefined) return current as T;
      const fallbackValue = getNestedValue(translations.fr as unknown as Record<string, unknown>, key);
      if (fallbackValue !== undefined) return fallbackValue as T;
      return fallback as T;
    },
    [messages]
  );

  const value = React.useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t,
      raw,
      dateLocale: DATE_LOCALES[locale]
    }),
    [locale, raw, setLocale, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = React.useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
