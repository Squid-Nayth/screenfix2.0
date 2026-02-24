import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Services } from './components/Services';
import { BoutiquePro } from './components/BoutiquePro';
import { Testimonials } from './components/Testimonials';
import { Training } from './components/Training';
import { Footer } from './components/Footer';
import { BookingWizard } from './components/BookingWizard';
import { LegalNotice } from './components/LegalNotice';

const App: React.FC = () => {
  const [showLegalNotice, setShowLegalNotice] = useState(false);

  // Expose function to window for Footer to use
  React.useEffect(() => {
    (window as any).showLegalNotice = () => {
      setShowLegalNotice(true);
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    };
    (window as any).hideLegalNotice = () => {
      setShowLegalNotice(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }, []);

  if (showLegalNotice) {
    return (
      <div className="bg-white text-slate-900 selection:bg-blue-200 min-h-screen font-sans relative overflow-hidden">
        {/* GLOBAL LIQUID BACKGROUND - FIXED */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[50rem] h-[50rem] bg-blue-100/60 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob"></div>
          <div className="absolute top-[10%] right-[-10%] w-[40rem] h-[40rem] bg-indigo-100/60 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-10%] left-[20%] w-[45rem] h-[45rem] bg-purple-100/60 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-[20%] right-[10%] w-[35rem] h-[35rem] bg-pink-100/60 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-6000"></div>
        </div>
        <Navbar />
        <LegalNotice />
      </div>
    );
  }

  return (
    <div className="bg-white text-slate-900 selection:bg-blue-200 min-h-screen font-sans relative overflow-hidden">
      
      {/* GLOBAL LIQUID BACKGROUND - FIXED */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[50rem] h-[50rem] bg-blue-100/60 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob"></div>
        <div className="absolute top-[10%] right-[-10%] w-[40rem] h-[40rem] bg-indigo-100/60 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[45rem] h-[45rem] bg-purple-100/60 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[35rem] h-[35rem] bg-pink-100/60 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-6000"></div>
      </div>

      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        
        {/* Booking Section */}
        <section id="booking" className="py-12 px-4">
            <BookingWizard />
        </section>

        {/* Moved Boutique Pro here as requested */}
        <BoutiquePro />

        <Features />
        <Services />
        <Training />
        <Testimonials />
      </main>

      <Footer />

      {/* Floating WhatsApp CTA */}
      <a 
        href="https://wa.me/33622188574" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 hover:scale-110 transition-transform cursor-pointer group"
      >
        <img src="/icones/whatsapp.png" alt="WhatsApp" className="w-16 h-16 drop-shadow-lg" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white/60 backdrop-blur-md px-3 py-1 rounded-xl text-slate-900 font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/20 shadow-sm">
          Devis Gratuit
        </span>
      </a>
    </div>
  );
};

export default App;