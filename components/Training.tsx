import React from 'react';
import { GraduationCap, ArrowRight } from 'lucide-react';

export const Training: React.FC = () => {
  // Helper to get correct asset path whether in Dev or WordPress
  const getAssetUrl = (path: string) => {
    // @ts-ignore - variable injected by WordPress wp_localize_script
    const baseUrl = typeof window !== 'undefined' && window.SCREENFIX_ASSETS_URL 
      // @ts-ignore
      ? window.SCREENFIX_ASSETS_URL 
      : '';
    return `${baseUrl}${path}`;
  };

  return (
    <section id="formation" className="py-24 relative overflow-hidden bg-transparent">
        {/* Pro Background Removed - using global glass */}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-white/70 border border-white/60 rounded-[3rem] p-10 md:p-20 backdrop-blur-2xl shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            
            <div className="flex-1 space-y-10">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-purple-50 text-purple-600 border border-purple-100">
                    <GraduationCap size={20} />
                    <span className="text-[14px] font-semibold tracking-wide">Formation Pro</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl md:text-[64px] font-bold leading-[1.1] tracking-tight text-slate-900">
                    Devenez <span className="text-purple-600">Expert</span>
                </h2>
                
                <p className="text-slate-600 text-base md:text-[20px] leading-relaxed font-normal max-w-lg">
                    Apprenez les techniques de reconditionnement industriel.
                </p>
                
                <div className="space-y-4">
                    {['Niveau 1 : Séries iPhone XR & 11', 'Niveau 2 : Séries iPhone X à 11 Pro Max', 'Niveau 3 : Séries iPhone 12 à 14 Pro Max', 'Niveau 4 : Séries iPhone 15 à 17 Pro Max'].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                            <span className="font-bold text-base md:text-[18px] text-slate-800">{item}</span>
                        </div>
                    ))}
                </div>

                <button className="px-10 py-5 bg-slate-900 text-white font-medium text-base rounded-full hover:bg-black transition-all flex items-center gap-3 shadow-xl">
                    Télécharger le programme <ArrowRight size={20} />
                </button>
            </div>
            
            <div className="flex-1 w-full relative group perspective-1000">
                 {/* Visual */}
                 <div className="aspect-video rounded-[2.5rem] overflow-hidden border border-white/60 shadow-2xl relative transform group-hover:rotate-1 transition-all duration-500">
                    <img 
                        src={getAssetUrl('/atelier.jpg')}
                        alt="Atelier Formation ScreenFix Paris 13" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent flex items-end p-10">
                        <div className="bg-white/80 backdrop-blur-md border border-white/60 p-6 rounded-2xl shadow-lg">
                             <p className="text-slate-900 font-bold text-[16px]">Session Pratique</p>
                             <p className="text-purple-600 font-medium text-[14px] mt-1">Atelier Paris 13</p>
                        </div>
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