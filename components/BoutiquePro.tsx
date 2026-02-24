import React from 'react';
import { Briefcase, Package, Zap, ShieldCheck, UserPlus } from 'lucide-react';

export const BoutiquePro: React.FC = () => {
  return (
    <section id="boutique-pro" className="py-20 md:py-32 bg-transparent relative overflow-hidden">
      {/* Background Decor Removed - Using Global App BG */}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main Glass Container */}
        <div className="bg-white/70 rounded-[3rem] p-8 md:p-16 border border-white/60 shadow-2xl backdrop-blur-xl">
          <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
            
            {/* Left Column */}
            <div className="space-y-10 mb-12 lg:mb-0">
              <div>
                <span className="text-blue-600 font-semibold text-[14px] tracking-wide block mb-4">Solution pour Boutiques & Techniciens</span>
                <h2 className="text-4xl sm:text-5xl md:text-[64px] font-bold text-slate-900 leading-[1.1] tracking-tight mb-6">
                  ESPACE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">PRO</span>
                </h2>
                <p className="text-slate-600 text-base md:text-[20px] font-normal leading-relaxed max-w-lg">
                  Vous êtes un professionnel de la réparation ? Accédez à notre stock de pièces <span className="text-slate-900 font-bold">Originales Reconditionné</span> exclusives aux meilleurs tarifs du marché.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex items-start space-x-5">
                  <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 shrink-0 border border-blue-100">
                    <Package size={28} />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-lg md:text-[18px] mb-2">Stock en Temps Réel</h4>
                    <p className="text-slate-500 text-sm md:text-[14px] font-normal leading-relaxed">Visibilité directe sur notre inventaire et livraison coursier Paris IM.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-5">
                  <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 shrink-0 border border-blue-100">
                    <Zap size={28} />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-lg md:text-[18px] mb-2">Tarifs Revendeur</h4>
                    <p className="text-slate-500 text-sm md:text-[14px] font-normal leading-relaxed">Grilles tarifaires dégressives et conditions de paiement flexibles.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="#contact" className="bg-blue-600 text-white py-4 px-8 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center group text-base font-medium">
                  OUVRIR UN COMPTE
                  <UserPlus className="ml-2 group-hover:scale-110 transition-transform" size={18} />
                </a>
              </div>
            </div>

            {/* Right Column - Preview Card */}
            <div className="relative perspective-1000">
              <div className="bg-white/90 backdrop-blur-sm p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden group transform rotate-1 hover:rotate-0 transition-all duration-500">
                {/* Decoration Icon */}
                <div className="absolute top-[-40px] right-[-40px] p-20 opacity-[0.03] text-blue-600 transform rotate-45 pointer-events-none">
                  <Briefcase size={200} />
                </div>
                
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                    <span className="text-slate-500 font-semibold text-[14px] uppercase tracking-wide">Aperçu B2B</span>
                    <span className="bg-blue-50 border border-blue-100 text-blue-600 px-3 py-1 rounded-full text-[12px] font-bold tracking-wide">ACCÈS PRO</span>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { item: 'Écran iPhone 16 Pro Max (Original Reconditionné)', stock: 'En Stock', price: 'Voir Prix' },
                      { item: 'Écran iPhone 15 Pro Max (Original Reconditionné)', stock: '20+ pcs', price: 'Voir Prix' },
                      { item: 'Écran iPhone 14 Pro Max (Original Reconditionné)', stock: 'Dispo', price: 'Voir Prix' }
                    ].map((row, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-blue-50/50 hover:border-blue-100 transition-colors group/item">
                        <div>
                          <p className="text-slate-900 font-semibold text-[15px]">{row.item}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                            <p className="text-slate-500 text-[13px] font-medium">État: {row.stock}</p>
                          </div>
                        </div>
                        <div className="text-blue-600 font-semibold text-[13px] flex items-center bg-white px-3 py-2 rounded-xl border border-slate-100 group-hover/item:border-blue-200 shadow-sm">
                          <ShieldCheck size={14} className="mr-2" />
                          {row.price}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 flex items-center justify-center gap-2 text-slate-400 text-[13px] font-semibold">
                    <span className="w-2 h-2 bg-slate-300 rounded-full animate-pulse"></span>
                    Connexion requise
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};