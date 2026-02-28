import React from 'react';
import { Check, X } from 'lucide-react';
import { useI18n } from '../lib/i18n';

export const Services: React.FC = () => {
  const { t, raw } = useI18n();
  const steps = raw<string[]>('services.steps', []);
  const rows = raw<Array<{ label: string; bad: string; good: string }>>('services.rows', []);

  return (
    <section id="services" data-anim-section className="py-24 relative overflow-hidden bg-transparent">
       {/* Background gradient spot removed - relying on global App bg */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div data-anim-stagger className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
          
          <div data-anim-item>
            <span className="text-blue-600 font-semibold tracking-wide text-[14px] uppercase block mb-6">{t('services.eyebrow')}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold text-slate-900 mb-6 md:mb-8 leading-[1.1] tracking-tight">
              {t('services.heading1')} <br/> <span className="text-slate-400">VS</span> <br/> {t('services.heading2')}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base md:text-[20px] mb-8 md:mb-10 leading-relaxed font-normal">
              {t('services.paragraph1')}
              <br/><br/>
              {t('services.paragraph2')}
            </p>
            
            <div data-anim-stagger className="space-y-6">
               {steps.map((stepText, index) => (
               <div data-anim-item key={`${index}-${stepText}`} className="flex items-center gap-6 group">
                 <div className="w-14 h-14 rounded-2xl bg-white/60 border border-slate-200/60 backdrop-blur-sm flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                    <span className="font-bold text-xl">{String(index + 1).padStart(2, '0')}</span>
                 </div>
                 <p className="text-slate-900 font-bold text-base md:text-[18px]">{stepText}</p>
               </div>
               ))}
            </div>
          </div>

          {/* Comparison Card - Pro Inventory Style */}
          <div data-anim-item className="bg-white/70 backdrop-blur-xl rounded-2xl md:rounded-[3rem] p-5 sm:p-6 md:p-10 shadow-2xl border border-white/60 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
            
            <div className="flex justify-between items-end mb-10 relative z-10">
                <div>
                    <h3 className="text-2xl md:text-[32px] font-bold text-slate-900 tracking-tight">{t('services.comparisonTitle')}</h3>
                    <p className="text-slate-400 text-xs md:text-[14px] font-semibold mt-1">{t('services.comparisonSubtitle')}</p>
                </div>
                <div className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs md:text-[14px] font-semibold tracking-wide">
                    {t('services.comparisonBadge')}
                </div>
            </div>
            
            <div className="space-y-4 relative z-10">
              {/* Header */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pb-3 md:pb-4 border-b border-slate-100">
                  <div className="col-span-1"></div>
                  <div className="col-span-1 text-center font-semibold text-[10px] sm:text-xs md:text-[14px] text-slate-400">{t('services.comparisonCompetitor')}</div>
                  <div className="col-span-1 text-center font-semibold text-[10px] sm:text-xs md:text-[14px] text-blue-600">{t('services.comparisonBrand')}</div>
              </div>

              {/* Rows */}
              {rows.map((row, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-4 items-center py-2 md:py-3 border-b border-slate-50/50 last:border-0 hover:bg-white/50 rounded-xl transition-colors px-1 sm:px-2">
                      <div className="font-bold text-[10px] sm:text-xs md:text-[15px] text-slate-700 uppercase">{row.label}</div>
                      <div className="flex justify-center items-center gap-1 text-slate-400 font-semibold text-[9px] sm:text-xs md:text-[14px]">
                          <X size={12} className="text-red-400 hidden sm:block" /> <span className="truncate">{row.bad}</span>
                      </div>
                      <div className="flex justify-center items-center gap-1 text-slate-900 font-bold text-[9px] sm:text-xs md:text-[14px] bg-white/80 border border-slate-100 py-1.5 md:py-2 rounded-lg shadow-sm">
                          <Check size={12} className="text-green-500 hidden sm:block" /> <span className="truncate">{row.good}</span>
                      </div>
                  </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
