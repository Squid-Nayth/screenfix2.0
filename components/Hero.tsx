import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useI18n } from '../lib/i18n';

export const Hero: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useI18n();

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi
      const hour = now.getHours();

      // Fermé le dimanche (jour 0) ou avant 10h ou après 18h
      const isClosed = day === 0 || hour < 10 || hour >= 18;
      setIsOpen(!isClosed);
    };

    // Vérifier immédiatement
    checkOpenStatus();

    // Vérifier toutes les minutes
    const interval = setInterval(checkOpenStatus, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleBookingClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    (window as any).navigateToSection?.('booking');
  };

  return (
    <section
      id="top"
      data-anim-section
      data-anim-hero
      className="relative min-h-[calc(100svh-1rem)] md:min-h-screen flex items-center pt-20 pb-10 sm:pt-24 md:pt-32 md:pb-20 overflow-hidden"
    >
      {/* Local Background Removed - Using Global App Background */}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">

        {/* Content */}
        <div className="space-y-7 sm:space-y-8 md:space-y-10 z-10 w-full flex flex-col items-center">
          <div data-hero-item className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-slate-200/60 shadow-sm w-fit">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isOpen ? 'bg-green-400' : 'bg-red-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
            </span>
            <span className="text-[13px] sm:text-[14px] font-semibold text-slate-700">{isOpen ? t('hero.open') : t('hero.closed')} • Paris 13</span>
          </div>

          <div data-hero-item className="relative">
            <h1 className="text-[2.65rem] sm:text-[64px] lg:text-[80px] font-bold text-slate-900 leading-[1.02] tracking-tight">
              {t('hero.titleLine1')} <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {t('hero.titleAccent', 'Apple.')}
              </span>
            </h1>
            <h2 className="mt-4 sm:mt-6 text-[1.45rem] sm:text-[32px] md:text-[40px] font-bold text-slate-500 leading-tight max-w-3xl mx-auto">
              {t('hero.subtitleLine1')} <br /> <span className="text-slate-900">{t('hero.subtitleLine2')}</span>
            </h2>
          </div>

          <p data-hero-item className="text-[15px] sm:text-[20px] md:text-[22px] font-normal text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>

          <div data-hero-item className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 justify-center w-full">
            <a
              href="#booking"
              onClick={handleBookingClick}
              className="group px-8 sm:px-10 py-4 sm:py-5 bg-slate-900 hover:bg-black text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2 text-base sm:text-lg font-medium cursor-pointer"
            >
              <span>{t('hero.cta')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Trust Signals */}
          <div data-hero-item data-anim-stagger className="pt-6 md:pt-10 border-t border-slate-200/60 flex flex-wrap justify-center items-center gap-4 sm:gap-10 md:gap-16 w-full">
            <div data-anim-item className="flex items-center gap-3">
              <div className="p-2 bg-blue-50/50 rounded-lg text-blue-600"><ShieldCheck size={24} /></div>
              <div className="text-left">
                <p className="text-[13px] sm:text-[14px] font-semibold text-slate-500">{t('hero.warrantyLabel')}</p>
                <p className="text-[16px] sm:text-[18px] font-bold text-slate-900">{t('hero.warrantyValue')}</p>
              </div>
            </div>
            <div data-anim-item className="flex items-center gap-3">
              <div className="p-2 bg-purple-50/50 rounded-lg text-purple-600"><Zap size={24} /></div>
              <div className="text-left">
                <p className="text-[13px] sm:text-[14px] font-semibold text-slate-500">{t('hero.speedLabel')}</p>
                <p className="text-[16px] sm:text-[18px] font-bold text-slate-900">{t('hero.speedValue')}</p>
              </div>
            </div>
            <div data-anim-item className="flex items-center gap-3">
              <div className="p-2 bg-yellow-50/50 rounded-lg">
                <img src="/icones/icons8-google-48.png" alt="Google" className="w-6 h-6 object-contain" />
              </div>
              <div className="text-left">
                <p className="text-[13px] sm:text-[14px] font-semibold text-slate-500">{t('hero.reviewsLabel')}</p>
                <p className="text-[16px] sm:text-[18px] font-bold text-slate-900">{t('hero.reviewsValue')}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
