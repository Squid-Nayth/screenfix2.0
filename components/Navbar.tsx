import React, { useState, useEffect } from 'react';
import { Menu, X, Smartphone, Phone } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-white/20 py-4 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              Screen<span className="text-blue-600">Fix</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#boutique-pro" className="text-slate-600 hover:text-blue-600 transition-colors text-[15px] font-semibold">Boutique Pro</a>
            <a href="#services" className="text-slate-600 hover:text-blue-600 transition-colors text-[15px] font-semibold">Reconditionnement</a>
            <a href="#formation" className="text-slate-600 hover:text-blue-600 transition-colors text-[15px] font-semibold">Formation</a>
            
            <a 
              href="https://wa.me/33622188574" 
              className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-black text-white text-base font-medium flex items-center gap-2 shadow-lg transition-all hover:-translate-y-0.5"
            >
              <Phone size={16} />
              Prendre RDV
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
            <a href="#boutique-pro" onClick={() => setIsOpen(false)} className="text-slate-900 font-semibold text-lg">Boutique Pro</a>
            <a href="#services" onClick={() => setIsOpen(false)} className="text-slate-900 font-semibold text-lg">Reconditionnement</a>
            <a href="#formation" onClick={() => setIsOpen(false)} className="text-slate-900 font-semibold text-lg">Formation</a>
            <button className="w-full py-4 rounded-xl bg-blue-600 font-medium text-white shadow-lg text-base">
              Prendre Rendez-vous
            </button>
        </div>
      )}
    </nav>
  );
};