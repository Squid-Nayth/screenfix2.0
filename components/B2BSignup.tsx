import React, { useState } from 'react';
import { Building2, User, Mail, Phone, FileText, Store, AlertCircle, Info } from 'lucide-react';
import {
  checkProAccess,
  clearProAccessToken,
  isProAccessConfigured,
  redirectToShop,
  saveApprovedProAccess
} from '../lib/proAccess';
import { type ProStatus } from '../lib/proAccess';
import { InternationalPhoneInput } from './ui/InternationalPhoneInput';
import {
  DEFAULT_PHONE_COUNTRY,
  buildInternationalPhone,
  isInternationalPhoneValid
} from '../lib/phoneUtils';
import { useI18n } from '../lib/i18n';
import { submitHiddenGoogleForm } from '../lib/googleForms';

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
  const { t } = useI18n();
  const [phoneCountryIso, setPhoneCountryIso] = useState(DEFAULT_PHONE_COUNTRY);
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
    const siretRegex = /^\d{14}$/;
    const fullPhone = buildInternationalPhone(phoneCountryIso, formData.phone);

    const newErrors = {
      email: !emailRegex.test(formData.email),
      phone: !isInternationalPhoneValid(phoneCountryIso, formData.phone, false),
      siret: !siretRegex.test(formData.siret.replace(/\s/g, ''))
    };

    if (!fullPhone) {
      newErrors.phone = false;
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitFeedback(null);

    if (!validateForm()) {
      setSubmitFeedback({
        type: 'error',
        message: t('b2b.formError')
      });
      return;
    }

    // Honeypot anti-spam: si rempli, on simule un succès et on ignore.
    if (formData.website.trim()) {
      setSubmitFeedback({
        type: 'success',
        message: t('b2b.formSuccess')
      });
      return;
    }

    const sanitizedSiret = formData.siret.replace(/\s+/g, '').trim();
    const sanitizedPhone = buildInternationalPhone(phoneCountryIso, formData.phone);

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
      await submitHiddenGoogleForm(GOOGLE_FORM_CONFIG.formResponseUrl, payload);

      setSubmitFeedback({
        type: 'success',
        message: t('b2b.formSuccess')
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
        message: t('b2b.technicalError')
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
        message: t('b2b.invalidAccessEmail')
      });
      return;
    }

    if (!isProAccessConfigured()) {
      setAccessFeedback({
        type: 'error',
        message: t('b2b.configError')
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
          message: t('b2b.approved')
        });
        window.setTimeout(() => {
          redirectToShop();
        }, 400);
      } else {
        clearProAccessToken();
        setAccessFeedback({
          type: 'error',
          message: getLocalizedAccessMessage(result.status, t)
        });
      }
    } catch (error) {
      console.error('Erreur vérification accès pro :', error);
      setAccessFeedback({
        type: 'error',
        message: t('b2b.technicalError')
      });
    } finally {
      setIsCheckingAccess(false);
    }
  };

  return (
    <div data-overlay-page data-anim-section className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 md:pt-32 pb-16 md:pb-24">
      <div data-anim-stagger className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[2rem] md:rounded-[3rem] p-5 sm:p-6 md:p-12 shadow-2xl">
        <div data-anim-item className="text-center mb-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-50 text-blue-600 border border-blue-100 mb-6">
            <Building2 size={20} />
            <span className="text-sm font-semibold tracking-wide">{t('b2b.eyebrow')}</span>
          </div>

          <h1 className="text-[2rem] sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {t('b2b.titleLead')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{t('b2b.titleAccent')}</span>
          </h1>

          <p className="text-slate-600 text-[15px] sm:text-lg">
            {t('b2b.description')}
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
              {t('b2b.fullName')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={t('b2b.namePlaceholder')}
              className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
              <Building2 className="inline mr-2" size={16} />
              {t('b2b.company')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder={t('b2b.companyPlaceholder')}
              className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                <Mail className="inline mr-2" size={16} />
                {t('b2b.email')} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: false });
                }}
                placeholder={t('b2b.emailPlaceholder')}
                className={`w-full p-4 rounded-xl bg-slate-50 border focus:bg-white outline-none transition-all font-medium ${
                  errors.email ? 'border-red-400 focus:border-red-500 bg-red-50' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                  <AlertCircle size={12} /> {t('b2b.invalidEmail')}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                <Phone className="inline mr-2" size={16} />
                {t('b2b.phone')} <span className="text-slate-500 font-medium">{t('b2b.optional')}</span>
              </label>
              <InternationalPhoneInput
                countryIso={phoneCountryIso}
                localNumber={formData.phone}
                onCountryIsoChange={setPhoneCountryIso}
                onLocalNumberChange={(value) => {
                  setFormData({ ...formData, phone: value });
                  if (errors.phone) setErrors({ ...errors, phone: false });
                }}
                error={errors.phone}
                placeholder={t('phoneInput.localPlaceholder')}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                  <AlertCircle size={12} /> {t('b2b.invalidPhone')}
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2 ml-1">
              <label className="block text-sm font-bold text-slate-700">
                <FileText className="inline mr-2" size={16} />
                {t('b2b.siret')} <span className="text-red-500">*</span>
              </label>
              <span className="relative inline-flex group">
                <span
                  className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 cursor-help"
                  aria-label={t('b2b.siretInfoAria')}
                >
                  <Info size={12} />
                </span>
                <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-64 -translate-x-1/2 rounded-xl bg-slate-900 px-3 py-2 text-xs font-medium leading-relaxed text-white opacity-0 shadow-2xl transition-opacity duration-200 group-hover:opacity-100">
                  {t('b2b.siretTooltip')}
                </span>
              </span>
            </div>
            <input
              type="text"
              required
              value={formData.siret}
              onChange={(e) => {
                setFormData({ ...formData, siret: e.target.value });
                if (errors.siret) setErrors({ ...errors, siret: false });
              }}
              placeholder={t('b2b.siretPlaceholder')}
              maxLength={17}
              className={`w-full p-4 rounded-xl bg-slate-50 border focus:bg-white outline-none transition-all font-medium ${
                errors.siret ? 'border-red-400 focus:border-red-500 bg-red-50' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
              }`}
            />
            {errors.siret && (
              <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <AlertCircle size={12} /> {t('b2b.invalidSiret')}
              </p>
            )}
            <p className="text-xs text-slate-500 mt-1 ml-1">{t('b2b.siretHelper')}</p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-full font-bold text-lg shadow-lg shadow-blue-600/30 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1"
          >
            {isSubmitting ? t('b2b.submitLoading') : t('b2b.submit')}
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
            {t('b2b.requiredNote')}
          </p>
        </form>

        <div data-anim-item className="mt-8 pt-8 border-t border-slate-200 text-center">
          <p className="text-slate-600 mb-4">{t('b2b.accessPrompt')}</p>
          <form onSubmit={handleAccessShop} className="max-w-xl mx-auto space-y-3">
            <input
              type="email"
              required
              value={accessEmail}
              onChange={(e) => setAccessEmail(e.target.value)}
              placeholder={t('b2b.accessPlaceholder')}
              className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
            />
            <button
              type="submit"
              disabled={isCheckingAccess}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 rounded-full font-bold transition-colors disabled:opacity-60"
            >
              <Store size={18} />
              {isCheckingAccess ? t('b2b.accessChecking') : t('b2b.accessButton')}
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

const getLocalizedAccessMessage = (
  status: ProStatus,
  t: (key: string, fallback?: string) => string
) => {
  switch (status) {
    case 'pending':
      return t('b2b.pending');
    case 'rejected':
      return t('b2b.rejected');
    case 'not_found':
      return t('b2b.notFound');
    case 'unauthorized':
      return t('b2b.unauthorized');
    case 'invalid_email':
      return t('b2b.invalidAccessEmail');
    default:
      return t('b2b.technicalError');
  }
};
