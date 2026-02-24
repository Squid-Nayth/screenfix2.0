import React from 'react';
import { MapPin, Phone, MessageCircle, Instagram, Facebook, Smartphone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-white/40 backdrop-blur-xl border-t border-white/60 pt-20 pb-10 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          
          <div className="col-span-1 md:col-span-2 space-y-8">
             <div className="flex items-center gap-2">
                <div className="bg-blue-600 p-2 rounded-xl shadow-md">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900 tracking-tight">
                  Screen<span className="text-blue-600">Fix</span>
                </span>
              </div>
            <p className="text-slate-600 text-base md:text-[18px] font-normal max-w-sm leading-relaxed">
              L'expert parisien de la rénovation d'écrans Apple. Qualité d'origine, écologie et économie.
            </p>
            <div className="flex gap-4">
               <a href="#" className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-blue-50 hover:border-blue-100 transition-colors shadow-sm"><Instagram className="w-6 h-6 text-slate-600 hover:text-blue-600" /></a>
               <a href="#" className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-blue-50 hover:border-blue-100 transition-colors shadow-sm"><Facebook className="w-6 h-6 text-slate-600 hover:text-blue-600" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold text-[16px] mb-8">Contact</h4>
            <ul className="space-y-6 text-slate-600">
              <li className="flex items-start gap-4 group cursor-pointer">
                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors"><MapPin className="w-5 h-5 text-blue-600" /></div>
                <span className="font-medium text-[15px]">27 Boulevard de Port Royal,<br/>75013 Paris, France</span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors"><Phone className="w-5 h-5 text-blue-600" /></div>
                <span className="font-medium text-[15px]">+33 6 22 18 85 74</span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors"><MessageCircle className="w-5 h-5 text-green-600" /></div>
                <span className="font-medium text-[15px]">WhatsApp Disponible</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold text-[16px] mb-8">Horaires</h4>
            <ul className="space-y-4 text-slate-600 font-medium text-[15px]">
              <li className="flex justify-between p-3 bg-white/60 rounded-xl border border-slate-200/60 shadow-sm">
                  <span>Lun - Ven</span> 
                  <span className="text-slate-900 font-bold">10h - 19h</span>
              </li>
              <li className="flex justify-between p-3 bg-white/60 rounded-xl border border-slate-200/60 shadow-sm">
                  <span>Samedi</span> 
                  <span className="text-slate-900 font-bold">10h - 19h</span>
              </li>
              <li className="flex justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 opacity-70">
                  <span>Dimanche</span> 
                  <span>Fermé</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200/60 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[14px] font-semibold text-slate-500">
            <p>&copy; {new Date().getFullYear()} ScreenFix Paris. Tous droits réservés.</p>
            <div className="flex gap-8">
                <a href="#" className="hover:text-blue-600 transition-colors">Mentions Légales</a>
                <a href="#" className="hover:text-blue-600 transition-colors">CGV</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Politique de Confidentialité</a>
            </div>
        </div>
      </div>
    </footer>
  );
};