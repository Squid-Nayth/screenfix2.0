import React from 'react';
import { MapPin, Phone, Smartphone } from 'lucide-react';
import { useI18n } from '../lib/i18n';

export const Footer: React.FC = () => {
  const { t } = useI18n();

  return (
    <footer id="contact" data-anim-section className="bg-white/40 backdrop-blur-xl border-t border-white/60 pt-10 sm:pt-12 md:pt-20 pb-8 md:pb-10 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div data-anim-stagger className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-16 mb-10 md:mb-16">
          
          <div data-anim-item className="col-span-1 md:col-span-2 space-y-6 md:space-y-8">
             <div className="flex items-center gap-2">
                <div className="bg-blue-600 p-2 rounded-xl shadow-md">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900 tracking-tight">
                  Screen<span className="text-blue-600">Fix</span>
                </span>
              </div>
            <p className="text-slate-600 text-[15px] sm:text-base md:text-[18px] font-normal max-w-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-3 sm:gap-4 flex-wrap">
               <a href="https://www.instagram.com/screenfix_ivry/" target="_blank" rel="noopener noreferrer" title="Instagram" className="p-3 bg-slate-900 rounded-2xl hover:bg-slate-800 transition-colors shadow-sm">
                 <img src="/icones/instagram.png" alt="Instagram" className="w-6 h-6 brightness-0 invert" />
               </a>
               <a href="https://www.tiktok.com/@screenfix75" target="_blank" rel="noopener noreferrer" title="TikTok" className="p-3 bg-slate-900 rounded-2xl hover:bg-slate-800 transition-colors shadow-sm">
                 <img src="/icones/tik-tok.png" alt="TikTok" className="w-6 h-6 brightness-0 invert" />
               </a>
               <a href="https://www.facebook.com/profile.php?id=61578196187566" target="_blank" rel="noopener noreferrer" title="Facebook" className="p-3 bg-slate-900 rounded-2xl hover:bg-slate-800 transition-colors shadow-sm">
                 <img src="/icones/facebook.png" alt="Facebook" className="w-6 h-6 brightness-0 invert" />
               </a>
               <a href="https://youtube.com/@screenfix-y4b?si=ydIahqQmFs62MJfG" target="_blank" rel="noopener noreferrer" title="YouTube" className="p-3 bg-slate-900 rounded-2xl hover:bg-slate-800 transition-colors shadow-sm">
                 <img src="/icones/youtube.png" alt="YouTube" className="w-6 h-6 brightness-0 invert" />
               </a>
            </div>
          </div>

          <div data-anim-item>
            <h4 className="text-slate-900 font-bold text-[16px] mb-6 sm:mb-8">{t('footer.contact')}</h4>
            <ul className="space-y-4 sm:space-y-6 text-slate-600">
              <li>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=27+Boulevard+de+Port+Royal+75013+Paris" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group cursor-pointer hover:text-blue-600 transition-colors"
                >
                  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors"><MapPin className="w-5 h-5 text-blue-600" /></div>
                  <span className="font-medium text-[15px]">27 Boulevard de Port Royal,<br/>75013 Paris, France</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+33622188574" 
                  className="flex items-center gap-4 group cursor-pointer hover:text-blue-600 transition-colors"
                >
                  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors"><Phone className="w-5 h-5 text-blue-600" /></div>
                  <span className="font-medium text-[15px]">+33 6 22 18 85 74</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/33622188574" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group cursor-pointer hover:text-green-600 transition-colors"
                >
                  <div className="p-2 bg-white rounded-lg group-hover:bg-green-50 transition-colors"><img src="/icones/whatsapp.png" alt="WhatsApp" className="w-5 h-5" /></div>
                  <span className="font-medium text-[15px]">{t('footer.whatsapp')}</span>
                </a>
              </li>
            </ul>
          </div>

          <div data-anim-item>
            <h4 className="text-slate-900 font-bold text-[16px] mb-6 sm:mb-8">{t('footer.hours')}</h4>
            <ul className="space-y-4 text-slate-600 font-medium text-[15px]">
              <li className="flex justify-between p-3 bg-white/60 rounded-xl border border-slate-200/60 shadow-sm">
                  <span>{t('footer.weekdays')}</span> 
                  <span className="text-slate-900 font-bold">10h - 19h</span>
              </li>
              <li className="flex justify-between p-3 bg-white/60 rounded-xl border border-slate-200/60 shadow-sm">
                  <span>{t('footer.saturday')}</span> 
                  <span className="text-slate-900 font-bold">10h - 19h</span>
              </li>
              <li className="flex justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 opacity-70">
                  <span>{t('footer.sunday')}</span> 
                  <span>{t('footer.closed')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200/60 pt-8 md:pt-10 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-[13px] md:text-[14px] font-semibold text-slate-500">
            <p>&copy; {new Date().getFullYear()} ScreenFix Paris. {t('footer.rights')}</p>
            <div className="flex gap-5 sm:gap-8 flex-wrap justify-center">
                <button 
                  onClick={() => (window as any).showLegalNotice?.()}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {t('footer.legal')}
                </button>
                <button 
                  onClick={() => (window as any).showPrivacyPolicy?.()}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {t('footer.privacy')}
                </button>
            </div>
        </div>
      </div>
    </footer>
  );
};
