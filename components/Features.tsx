import React from 'react';
import { Layers, Clock, ShieldCheck, Zap } from 'lucide-react';

const features = [
  {
    icon: <Layers className="w-8 h-8 text-blue-600" />,
    bg: "bg-blue-50",
    title: "Vitre Seule",
    subtitle: "Technologie Reconditionnement",
    desc: "Nous remplaçons uniquement la vitre brisée. Vous conservez votre afficheur OLED d'origine."
  },
  {
    icon: <Zap className="w-8 h-8 text-purple-600" />,
    bg: "bg-purple-50",
    title: "Précision Laser",
    subtitle: "Décollage Micronique",
    desc: "Machines Laser de dernière génération réduite du temps seulement 1h"
  },
  {
    icon: <Clock className="w-8 h-8 text-pink-600" />,
    bg: "bg-pink-50",
    title: "30 Minutes",
    subtitle: "Service Express",
    desc: "90% des interventions sont réalisées sur place. Pas besoin de laisser votre téléphone des jours."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
    bg: "bg-green-50",
    title: "Garantie jusqu'à 12 Mois",
    subtitle: "Sérénité Totale",
    desc: "Toutes nos réparations pièces et main d'œuvre sont couvertes de base 3 mois."
  }
];

export const Features: React.FC = () => {
  return (
    <section id="expertise" className="py-24 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
            <span className="text-blue-600 font-semibold tracking-wide text-[14px] uppercase block mb-4">Pourquoi Nous ?</span>
          <h2 className="text-4xl sm:text-5xl md:text-[64px] font-bold text-slate-900 mb-6 tracking-tight">
            L'EXCELLENCE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">SCREENFIX</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-normal text-base md:text-[20px] leading-relaxed">
            Stop aux écrans compatibles de mauvaise qualité. Optez pour le reconditionnement constructeur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="group relative bg-white/60 backdrop-blur-xl border border-white/60 rounded-[2.5rem] p-8 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300 hover:-translate-y-2 overflow-hidden">
              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                </div>
                
                <h3 className="text-xl md:text-[24px] font-bold text-slate-900 mb-2">{feature.title}</h3>
                <span className="text-sm md:text-[14px] font-semibold text-blue-600 mb-4 block">{feature.subtitle}</span>
                
                <p className="text-slate-500 text-sm md:text-[16px] leading-relaxed font-normal mt-auto">
                    {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};