import React from 'react';
import { Check, X } from 'lucide-react';

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 relative overflow-hidden bg-transparent">
       {/* Background gradient spot removed - relying on global App bg */}

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div>
            <span className="text-blue-600 font-semibold tracking-wide text-[14px] uppercase block mb-6">Notre Spécialité</span>
            <h2 className="text-4xl sm:text-5xl md:text-[64px] font-bold text-slate-900 mb-8 leading-[1.1] tracking-tight">
              Reconditionnement <br/> <span className="text-slate-400">VS</span> <br/> Remplacement
            </h2>
            <p className="text-slate-600 text-base md:text-[20px] mb-10 leading-relaxed font-normal">
              La plupart des réparateurs jettent votre écran Apple cassé pour installer une copie de moindre qualité. 
              <br/><br/>
              Chez <strong className="text-slate-900">ScreenFix</strong>, nous séparons le verre cassé de votre écran LCD/OLED grâce à des machines industrielles. Nous posons ensuite une vitre neuve sur <strong className="text-blue-600">votre</strong> écran d'origine.
            </p>
            
            <div className="space-y-6">
               {[
                 { id: '01', text: "Diagnostic tactile et affichage" },
                 { id: '02', text: "Séparation cryogénique de la vitre" },
                 { id: '03', text: "Laminage vitre neuve en salle blanche" }
               ].map((step) => (
               <div key={step.id} className="flex items-center gap-6 group">
                 <div className="w-14 h-14 rounded-2xl bg-white/60 border border-slate-200/60 backdrop-blur-sm flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                    <span className="font-bold text-xl">{step.id}</span>
                 </div>
                 <p className="text-slate-900 font-bold text-base md:text-[18px]">{step.text}</p>
               </div>
               ))}
            </div>
          </div>

          {/* Comparison Card - Pro Inventory Style */}
          <div className="bg-white/70 backdrop-blur-xl rounded-[3rem] p-8 md:p-10 shadow-2xl border border-white/60 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
            
            <div className="flex justify-between items-end mb-10 relative z-10">
                <div>
                    <h3 className="text-2xl md:text-[32px] font-bold text-slate-900 tracking-tight">Comparatif</h3>
                    <p className="text-slate-400 text-xs md:text-[14px] font-semibold mt-1">Qualité d'image</p>
                </div>
                <div className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs md:text-[14px] font-semibold tracking-wide">
                    Original OLED
                </div>
            </div>
            
            <div className="space-y-4 relative z-10">
              {/* Header */}
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-slate-100">
                  <div className="col-span-1"></div>
                  <div className="col-span-1 text-center font-semibold text-xs md:text-[14px] text-slate-400">Boutique X</div>
                  <div className="col-span-1 text-center font-semibold text-xs md:text-[14px] text-blue-600">ScreenFix</div>
              </div>

              {/* Rows */}
              {[
                  { label: "Type d'écran", bad: "Copie LCD", good: "Original OLED" },
                  { label: "Couleurs", bad: "Ternes", good: "Retina Vives" },
                  { label: "Tactile", bad: "Imprécis", good: "Original" },
                  { label: "Message Erreur", bad: "Oui Souvent", good: "Aucun" },
                  { label: "Prix", bad: "Élevé", good: "-60% Éco" },
              ].map((row, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-2 md:gap-4 items-center py-3 border-b border-slate-50/50 last:border-0 hover:bg-white/50 rounded-xl transition-colors px-2">
                      <div className="font-bold text-xs md:text-[15px] text-slate-700 uppercase">{row.label}</div>
                      <div className="flex justify-center items-center gap-2 text-slate-400 font-semibold text-xs md:text-[14px]">
                          <X size={16} className="text-red-400" /> {row.bad}
                      </div>
                      <div className="flex justify-center items-center gap-2 text-slate-900 font-bold text-xs md:text-[14px] bg-white/80 border border-slate-100 py-2 rounded-lg shadow-sm">
                          <Check size={16} className="text-green-500" /> {row.good}
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