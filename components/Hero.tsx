import React from 'react';
import { ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Local Background Removed - Using Global App Background */}

      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Content */}
        <div className="space-y-10 z-10 w-full flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-slate-200/60 shadow-sm w-fit">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-[14px] font-semibold text-slate-700">Ouvert • Paris 13</span>
          </div>

          <div className="relative">
            <h1 className="text-5xl sm:text-[64px] lg:text-[80px] font-bold text-slate-900 leading-[1.05] tracking-tight">
              Expert <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Apple.
              </span>
            </h1>
            <h2 className="mt-6 text-2xl sm:text-[32px] md:text-[40px] font-bold text-slate-500 leading-tight max-w-3xl mx-auto">
              Ne changez pas d'écran. <br/> <span className="text-slate-900">Changez juste la vitre.</span>
            </h2>
          </div>

          <p className="text-base sm:text-[20px] md:text-[22px] font-normal text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Spécialiste du <span className="text-slate-900 font-semibold bg-blue-50/50 px-1 rounded">Reconditionnement</span> iPhone, iPad & Watch. 
            Gardez votre écran d'origine Apple et <span className="text-slate-900 font-semibold bg-blue-50/50 px-1 rounded"> économisez jusqu'à 60%.</span> 
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center w-full">
            <a 
              href="#booking" 
              className="group px-10 py-5 bg-slate-900 hover:bg-black text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2 text-lg font-medium"
            >
              <span>Réserver un créneau</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Trust Signals */}
          <div className="pt-10 border-t border-slate-200/60 flex flex-wrap justify-center items-center gap-8 sm:gap-16 w-full">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50/50 rounded-lg text-blue-600"><ShieldCheck size={24} /></div>
              <div className="text-left">
                <p className="text-[13px] sm:text-[14px] font-semibold text-slate-500">Garantie</p>
                <p className="text-[16px] sm:text-[18px] font-bold text-slate-900">12 Mois</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50/50 rounded-lg text-purple-600"><Zap size={24} /></div>
               <div className="text-left">
                <p className="text-[13px] sm:text-[14px] font-semibold text-slate-500">Chrono</p>
                <p className="text-[16px] sm:text-[18px] font-bold text-slate-900">30 Minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-50/50 rounded-lg text-yellow-600"><Star size={24} /></div>
               <div className="text-left">
                <p className="text-[13px] sm:text-[14px] font-semibold text-slate-500">Avis</p>
                <p className="text-[16px] sm:text-[18px] font-bold text-slate-900">5/5 Google</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};