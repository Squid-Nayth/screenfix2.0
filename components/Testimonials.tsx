import React, { useEffect } from 'react';
import { useI18n } from '../lib/i18n';

export const Testimonials: React.FC = () => {
  const { t } = useI18n();

  useEffect(() => {
    // Charger le script EmbedSocial si pas déjà chargé
    const scriptId = 'EmbedSocialHashtagScript';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://embedsocial.com/cdn/ht.js';
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  }, []);

  return (
    <section id="avis" data-anim-section className="py-24 relative bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl sm:text-5xl md:text-[64px] font-bold text-center mb-6 text-slate-900 tracking-tight">
          {t('testimonials.headingLead').toUpperCase()} <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">{t('testimonials.headingAccent').toUpperCase()}</span>
        </h2>

        <p className="text-center text-slate-600 text-lg md:text-xl font-normal mb-20 max-w-2xl mx-auto">
          {t('testimonials.description')}
        </p>

        {/* EmbedSocial Hashtag Widget - responsive zoom */}
        <style>{`
          .embedsocial-wrapper { zoom: 0.8; }
          @media (max-width: 768px) {
            .embedsocial-wrapper { zoom: 0.6; }
          }
        `}</style>
        <div className="embedsocial-wrapper">
          <div
            className="embedsocial-hashtag"
            data-ref="4d2a6be078cda803950d3ec5fa0947d6a4db6a08"
            data-lazyload="yes"
          ></div>
        </div>
      </div>
    </section>
  );
};
