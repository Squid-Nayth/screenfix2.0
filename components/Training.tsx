import React, { useState } from 'react';
import { GraduationCap, ArrowRight, Info, X } from 'lucide-react';
import { useI18n } from '../lib/i18n';

export const Training: React.FC = () => {
  const [showDevMessage, setShowDevMessage] = useState(false);
  const { t, raw } = useI18n();
  const levels = raw<string[]>('training.levels', []);

  const handleDevClick = () => {
    setShowDevMessage(true);
    setTimeout(() => setShowDevMessage(false), 4000);
  };

  return (
    <section id="formation" data-anim-section className="py-14 sm:py-16 md:py-24 relative overflow-hidden bg-transparent">
      {/* Pro Background Removed - using global glass */}

      {/* Development Message Notification - Centered */}
      {showDevMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-blue-200 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md mx-4 relative">
            <button
              onClick={() => setShowDevMessage(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <Info className="text-blue-600" size={32} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xl mb-2">{t('training.devTitle')}</h4>
                <p className="text-slate-600">{t('training.devText')}</p>
              </div>
              <button
                onClick={() => setShowDevMessage(false)}
                className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
              >
                {t('training.understood')}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-white/70 border border-white/60 rounded-2xl md:rounded-[3rem] p-5 sm:p-7 md:p-12 lg:p-20 backdrop-blur-2xl shadow-2xl">
          <div data-anim-stagger className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 md:gap-16">

            <div data-anim-item className="flex-1 space-y-6 sm:space-y-8 md:space-y-10">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-purple-50 text-purple-600 border border-purple-100">
                <GraduationCap size={20} />
                <span className="text-[14px] font-semibold tracking-wide">{t('training.eyebrow')}</span>
              </div>

              <h2 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-[64px] font-bold leading-[1.1] tracking-tight text-slate-900">
                {t('training.titleLead')} <span className="text-purple-600">{t('training.titleAccent')}</span>
              </h2>

              <p className="text-slate-600 text-[15px] sm:text-base md:text-[20px] leading-relaxed font-normal max-w-lg">
                {t('training.description')}
              </p>

              <div data-anim-stagger className="space-y-4">
                {levels.map((item, idx) => (
                  <div data-anim-item key={idx} className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="font-bold text-base md:text-[18px] text-slate-800">{item}</span>
                  </div>
                ))}
              </div>

              <button onClick={handleDevClick} className="px-7 sm:px-10 py-3.5 sm:py-5 bg-slate-900 text-white font-medium text-sm sm:text-base rounded-full hover:bg-black transition-all flex items-center gap-3 shadow-xl cursor-pointer">
                {t('training.cta')} <ArrowRight size={20} />
              </button>
            </div>

            <div data-anim-item className="flex-1 w-full relative perspective-1000">
              {/* Visual */}
              <div className="aspect-video rounded-[2.5rem] overflow-hidden border border-white/60 shadow-2xl relative">
                <video
                  src="/video/processus-separation-verre.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card below video */}
              <div className="mt-6">
                <div className="bg-white/80 backdrop-blur-md border border-white/60 p-4 sm:p-6 rounded-2xl shadow-lg">
                  <p className="text-slate-900 font-bold text-[16px]">{t('training.practicalTitle')}</p>
                  <p className="text-purple-600 font-medium text-[14px] mt-1">{t('training.practicalPlace')}</p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-200 rounded-full blur-[60px] opacity-50 z-[-1]"></div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
