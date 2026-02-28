import React, { useState } from 'react';
import { Building2, User, Mail, Phone, FileText, Store, AlertCircle } from 'lucide-react';
import {
  checkProAccess,
  clearProAccessToken,
  getProStatusMessage,
  isProAccessConfigured,
  redirectToShop,
  saveApprovedProAccess
} from '../lib/proAccess';

interface B2BSignupProps {
  onClose: () => void;
}

const GOOGLE_FORM_CONFIG = {
  formResponseUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdzP3v1DP4BlE_N7mBwa75Fha3CD6oygipJ-B-aVj2ElvncYw/formResponse',
  entries: {
    email: 'entry.1646931193',
    fullName: 'entry.1999217010',
    company: 'entry.1356289984',
    siret: 'entry.1213234828',
    phone: 'entry.603858928'
  }
};

export const B2BSignup: React.FC<B2BSignupProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    siret: '',
    website: ''
  });

  const [errors, setErrors] = useState({
    email: false,
    phone: false,
    siret: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [accessEmail, setAccessEmail] = useState('');
  const [isCheckingAccess, setIsCheckingAccess] = useState(false);
  const [accessFeedback, setAccessFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+33|0)[1-9](\d{2}){4}$/;
    const siretRegex = /^\d{14}$/;
    const normalizedPhone = formData.phone.replace(/\s/g, '');

    const newErrors = {
      email: !emailRegex.test(formData.email),
      phone: normalizedPhone.length > 0 && !phoneRegex.test(normalizedPhone),
      siret: !siretRegex.test(formData.siret.replace(/\s/g, ''))
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitFeedback(null);

    if (!validateForm()) {
      setSubmitFeedback({
        type: 'error',
        message: 'Merci de corriger les champs en erreur avant de valider.'
      });
      return;
    }

    // Honeypot anti-spam: si rempli, on simule un succès et on ignore.
    if (formData.website.trim()) {
      setSubmitFeedback({
        type: 'success',
        message: 'Demande envoyée. Votre compte est en attente de validation.'
      });
      return;
    }

    const sanitizedSiret = formData.siret.replace(/\s+/g, '').trim();
    const sanitizedPhone = formData.phone.replace(/\s+/g, '').trim();

    const payload: Record<string, string> = {
      [GOOGLE_FORM_CONFIG.entries.email]: formData.email.trim(),
      emailAddress: formData.email.trim(),
      [GOOGLE_FORM_CONFIG.entries.fullName]: formData.name.trim(),
      [GOOGLE_FORM_CONFIG.entries.company]: formData.company.trim(),
      [GOOGLE_FORM_CONFIG.entries.siret]: sanitizedSiret,
      [GOOGLE_FORM_CONFIG.entries.phone]: sanitizedPhone,
      fvv: '1',
      draftResponse: '[]',
      pageHistory: '0',
      fbzx: String(Date.now())
    };

    setIsSubmitting(true);
    try {
      await submitToGoogleForm(payload);

      setSubmitFeedback({
        type: 'success',
        message: 'Demande envoyée. Votre compte est en attente de validation.'
      });
      setAccessEmail(formData.email.trim().toLowerCase());
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        siret: '',
        website: ''
      });
      setErrors({
        email: false,
        phone: false,
        siret: false
      });
    } catch (error) {
      console.error('Erreur soumission Google Forms:', error);
      setSubmitFeedback({
        type: 'error',
        message: 'Erreur réseau. Merci de réessayer dans quelques secondes.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAccessShop = async (e: React.FormEvent) => {
    e.preventDefault();
    setAccessFeedback(null);

    const normalizedEmail = accessEmail.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      setAccessFeedback({
        type: 'error',
        message: 'Merci de saisir une adresse email valide.'
      });
      return;
    }

    if (!isProAccessConfigured()) {
      setAccessFeedback({
        type: 'error',
        message: "Configuration incomplète: ajoute l'URL /exec et la clé API dans lib/proAccess.ts."
      });
      return;
    }

    setIsCheckingAccess(true);
    try {
      const result = await checkProAccess(normalizedEmail);
      if (result.ok && result.approved) {
        saveApprovedProAccess(normalizedEmail);
        setAccessFeedback({
          type: 'success',
          message: 'Compte approuvé. Redirection vers la boutique...'
        });
        window.setTimeout(() => {
          redirectToShop();
        }, 400);
      } else {
        clearProAccessToken();
        setAccessFeedback({
          type: 'error',
          message: getProStatusMessage(result.status)
        });
      }
    } catch (error) {
      console.error('Erreur vérification accès pro :', error);
      setAccessFeedback({
        type: 'error',
        message: 'Erreur technique de vérification. Merci de réessayer.'
      });
    } finally {
      setIsCheckingAccess(false);
    }
  };

  return (
    <div data-anim-section className="max-w-3xl mx-auto px-6 pt-28 md:pt-32 pb-20 md:pb-24">
      <div data-anim-stagger className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[3rem] p-8 md:p-12 shadow-2xl">
        <div data-anim-item className="text-center mb-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-50 text-blue-600 border border-blue-100 mb-6">
            <Building2 size={20} />
            <span className="text-sm font-semibold tracking-wide">Espace Professionnel</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Ouvrir un <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Compte Pro</span>
          </h1>

          <p className="text-slate-600 text-lg">
            Accédez à notre catalogue de pièces détachées aux tarifs revendeurs
          </p>
        </div>

        <form data-anim-item onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            className="absolute left-[-9999px] top-auto w-px h-px opacity-0 pointer-events-none"
          />

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
              <User className="inline mr-2" size={16} />
              Nom complet <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Jean Dupont"
              className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
              <Building2 className="inline mr-2" size={16} />
              Nom de la Société <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Ma Boutique Mobile"
              className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                <Mail className="inline mr-2" size={16} />
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: false });
                }}
                placeholder="contact@exemple.com"
                className={`w-full p-4 rounded-xl bg-slate-50 border focus:bg-white outline-none transition-all font-medium ${
                  errors.email ? 'border-red-400 focus:border-red-500 bg-red-50' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                  <AlertCircle size={12} /> Email invalide
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                <Phone className="inline mr-2" size={16} />
                Téléphone <span className="text-slate-500 font-medium">(facultatif)</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: false });
                }}
                placeholder="06 12 34 56 78"
                className={`w-full p-4 rounded-xl bg-slate-50 border focus:bg-white outline-none transition-all font-medium ${
                  errors.phone ? 'border-red-400 focus:border-red-500 bg-red-50' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                  <AlertCircle size={12} /> Numéro invalide
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
              <FileText className="inline mr-2" size={16} />
              Numéro SIRET <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.siret}
              onChange={(e) => {
                setFormData({ ...formData, siret: e.target.value });
                if (errors.siret) setErrors({ ...errors, siret: false });
              }}
              placeholder="123 456 789 00010"
              maxLength={17}
              className={`w-full p-4 rounded-xl bg-slate-50 border focus:bg-white outline-none transition-all font-medium ${
                errors.siret ? 'border-red-400 focus:border-red-500 bg-red-50' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
              }`}
            />
            {errors.siret && (
              <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <AlertCircle size={12} /> SIRET invalide (14 chiffres requis)
              </p>
            )}
            <p className="text-xs text-slate-500 mt-1 ml-1">14 chiffres - Permet de vérifier votre activité professionnelle</p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-full font-bold text-lg shadow-lg shadow-blue-600/30 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1"
          >
            {isSubmitting ? 'Envoi en cours...' : 'Créer mon compte professionnel'}
          </button>

          {submitFeedback && (
            <p
              className={`text-sm text-center font-semibold ${
                submitFeedback.type === 'success' ? 'text-emerald-600' : 'text-red-500'
              }`}
            >
              {submitFeedback.message}
            </p>
          )}

          <p className="text-xs text-slate-500 text-center">
            Le symbole <span className="text-red-500 font-bold">*</span> indique un champ obligatoire.
          </p>
        </form>

        <div data-anim-item className="mt-8 pt-8 border-t border-slate-200 text-center">
          <p className="text-slate-600 mb-4">Vous êtes déjà inscrit chez nous ?</p>
          <form onSubmit={handleAccessShop} className="max-w-xl mx-auto space-y-3">
            <input
              type="email"
              required
              value={accessEmail}
              onChange={(e) => setAccessEmail(e.target.value)}
              placeholder="Votre email professionnel"
              className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
            />
            <button
              type="submit"
              disabled={isCheckingAccess}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 rounded-full font-bold transition-colors disabled:opacity-60"
            >
              <Store size={18} />
              {isCheckingAccess ? 'Vérification...' : 'Accéder à notre boutique'}
            </button>
          </form>
          {accessFeedback && (
            <p
              className={`mt-3 text-sm font-semibold ${
                accessFeedback.type === 'success' ? 'text-emerald-600' : 'text-red-500'
              }`}
            >
              {accessFeedback.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const submitToGoogleForm = (payload: Record<string, string>) =>
  new Promise<void>((resolve, reject) => {
    if (typeof document === 'undefined') {
      reject(new Error('Document non disponible'));
      return;
    }

    const iframeName = `google-form-target-${Date.now()}`;
    const iframe = document.createElement('iframe');
    iframe.name = iframeName;
    iframe.style.display = 'none';

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = GOOGLE_FORM_CONFIG.formResponseUrl;
    form.target = iframeName;
    form.style.display = 'none';

    Object.entries(payload).forEach(([name, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    let settled = false;

    const cleanup = () => {
      form.remove();
      iframe.remove();
    };

    const timeout = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve();
    }, 3000);

    iframe.onload = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      cleanup();
      resolve();
    };

    iframe.onerror = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      cleanup();
      reject(new Error('Soumission Google Forms impossible.'));
    };

    document.body.appendChild(iframe);
    document.body.appendChild(form);
    form.submit();
  });
