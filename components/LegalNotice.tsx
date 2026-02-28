import React from 'react';
import { Scale, Building2, Mail, Phone, Globe, AlertCircle } from 'lucide-react';
import { useI18n } from '../lib/i18n';

export const LegalNotice: React.FC = () => {
  const { t } = useI18n();

  return (
    <section data-anim-section className="py-24 relative bg-transparent min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-50 text-blue-600 border border-blue-100 mb-6">
            <Scale size={20} />
            <span className="text-[14px] font-semibold tracking-wide">{t('legal.badge')}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-[64px] font-bold text-slate-900 tracking-tight mb-6">
            {t('legal.titleLead')} <span className="text-blue-600">{t('legal.titleAccent')}</span>
          </h1>
        </div>

        {/* Content Card */}
        <div data-anim-stagger className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[3rem] p-8 md:p-12 shadow-2xl space-y-10">
          
          {/* Éditeur du site */}
          <div data-anim-item className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{t('legal.publisherTitle')}</h2>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 space-y-2 text-slate-700 font-medium">
              <p className="font-bold text-slate-900">Dao Tien Phong</p>
              <p>{t('legal.publisherStatus')}</p>
              <p>SIRET : 930 951 355 00013</p>
              <p>27 Boulevard de Port Royal, 75005 Paris</p>
              <div className="flex items-center gap-2 pt-2">
                <Phone className="w-4 h-4 text-blue-600" />
                <a href="tel:0622188574" className="text-blue-600 hover:underline font-semibold">
                  06 22 18 85 74
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <a href="mailto:cineeffrance@gmail.com" className="text-blue-600 hover:underline font-semibold">
                  cineeffrance@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Responsable de la publication */}
          <div data-anim-item className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <Globe className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{t('legal.editorTitle')}</h2>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-slate-700 font-medium">
              <a 
                href="https://github.com/Squid-Nayth" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-bold text-lg"
              >
                Nathan Michel
              </a>
              <p className="mt-2">{t('legal.editorRole')}</p>
            </div>
          </div>

          {/* Hébergement */}
          <div data-anim-item className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                <Globe className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{t('legal.hostingTitle')}</h2>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 space-y-2 text-slate-700 font-medium">
              <p className="font-bold text-slate-900">Hostinger International Ltd.</p>
              <p>61 Lordou Vironos Street, 6023 Larnaca, Chypre</p>
              <a 
                href="https://www.hostinger.fr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-semibold inline-block mt-2"
              >
                www.hostinger.fr
              </a>
            </div>
          </div>

          {/* Disclaimer Apple */}
          <div data-anim-item className="bg-blue-50 border border-blue-200 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <h3 className="text-xl font-bold text-slate-900">{t('legal.brandsTitle')}</h3>
            </div>
            <div className="text-slate-700 text-base leading-relaxed space-y-3">
              <p>{t('legal.brandParagraph1')}</p>
              <p>{t('legal.brandParagraph2')}</p>
              <p>{t('legal.brandParagraph3')}</p>
            </div>
          </div>

        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <button 
            onClick={() => (window as any).hideLegalNotice?.()}
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-black transition-all shadow-lg"
          >
            {t('legal.back')}
          </button>
        </div>

      </div>
    </section>
  );
};
