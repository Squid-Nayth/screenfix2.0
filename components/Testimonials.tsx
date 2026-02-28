import React, { useEffect } from 'react';
import { useI18n } from '../lib/i18n';

export const Testimonials: React.FC = () => {
  const { t } = useI18n();

  useEffect(() => {
    // Charger le script Elfsight si pas déjà chargé
    const scriptId = 'elfsight-platform';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://elfsightcdn.com/platform.js';
      script.async = true;
      document.body.appendChild(script);
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

        {/* Elfsight Google Reviews Widget */}
        <div className="elfsight-app-0f197ef3-ac80-471f-8a2f-a316a8656f10" data-elfsight-app-lazy></div>
      </div>
    </section>
  );
};
