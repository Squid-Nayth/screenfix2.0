import React, { useState, useEffect } from 'react';
import { Menu, X, Smartphone, Phone } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { LanguageSwitcher } from './ui/LanguageSwitcher';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOnOverlayPage, setIsOnOverlayPage] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detect if we're on an overlay page (Actualites, Legal, Privacy, B2B)
  useEffect(() => {
    const checkOverlayPage = () => {
      const hasOverlay = document.querySelector('[data-overlay-page]') !== null;
      setIsOnOverlayPage(hasOverlay);
    };
    
    checkOverlayPage();
    const observer = new MutationObserver(checkOverlayPage);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, []);

  const navigateToSection = (targetId?: string) => {
    (window as any).navigateToSection?.(targetId);
  };

  const handleLogoClick = () => {
    navigateToSection('top');
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    navigateToSection(targetId);
    setIsOpen(false);
  };

  const handleActualitesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    (window as any).showActualites?.();
    setIsOpen(false);
  };

  return (
    <nav 
      data-anim-navbar
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isOnOverlayPage ? 'bg-white/80 backdrop-blur-xl border-b border-white/20 py-4 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div onClick={handleLogoClick} className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              Screen<span className="text-blue-600">Fix</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#boutique-pro" onClick={(e) => handleSmoothScroll(e, 'boutique-pro')} className="text-slate-600 hover:text-blue-600 transition-colors text-[15px] font-semibold cursor-pointer">{t('navbar.boutiquePro')}</a>
            <a href="#actualites" onClick={handleActualitesClick} className="text-slate-600 hover:text-blue-600 transition-colors text-[15px] font-semibold cursor-pointer">{t('navbar.actualites')}</a>
            <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="text-slate-600 hover:text-blue-600 transition-colors text-[15px] font-semibold cursor-pointer">{t('navbar.reconditioning')}</a>
            <a href="#formation" onClick={(e) => handleSmoothScroll(e, 'formation')} className="text-slate-600 hover:text-blue-600 transition-colors text-[15px] font-semibold cursor-pointer">{t('navbar.training')}</a>
            <LanguageSwitcher />
            
            <a 
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, 'contact')}
              className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-black text-white text-base font-medium flex items-center gap-2 shadow-lg transition-all hover:-translate-y-0.5"
            >
              <Phone size={16} />
              {t('navbar.contact')}
            </a>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-900 p-2"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col gap-6 shadow-xl">
            <a href="#boutique-pro" onClick={(e) => handleSmoothScroll(e, 'boutique-pro')} className="text-slate-900 font-semibold text-lg cursor-pointer hover:text-blue-600 transition-colors">{t('navbar.boutiquePro')}</a>
            <a href="#actualites" onClick={handleActualitesClick} className="text-slate-900 font-semibold text-lg cursor-pointer hover:text-blue-600 transition-colors">{t('navbar.actualites')}</a>
            <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="text-slate-900 font-semibold text-lg cursor-pointer hover:text-blue-600 transition-colors">{t('navbar.reconditioning')}</a>
            <a href="#formation" onClick={(e) => handleSmoothScroll(e, 'formation')} className="text-slate-900 font-semibold text-lg cursor-pointer hover:text-blue-600 transition-colors">{t('navbar.training')}</a>
            <LanguageSwitcher mobile />
            <a 
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, 'contact')}
              className="w-full py-4 rounded-xl bg-blue-600 font-medium text-white shadow-lg text-base text-center flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <Phone size={18} />
              {t('navbar.contact')}
            </a>
        </div>
      )}
    </nav>
  );
};
