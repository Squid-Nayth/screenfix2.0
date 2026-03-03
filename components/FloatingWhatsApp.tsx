import React, { useEffect, useState } from 'react';

export const FloatingWhatsApp: React.FC = () => {
    const [isNearBottom, setIsNearBottom] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            // Hide when within 220px of the bottom (footer zone)
            setIsNearBottom(scrollY + windowHeight >= docHeight - 220);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <style>{`
        @keyframes wa-pop-in {
          0%   { transform: translateX(120%) scale(0.4); opacity: 0; }
          60%  { transform: translateX(-10%) scale(1.1); opacity: 1; }
          80%  { transform: translateX(4%) scale(0.95); }
          100% { transform: translateX(0) scale(1); opacity: 1; }
        }
        @keyframes wa-pop-out {
          0%   { transform: translateX(0) scale(1); opacity: 1; }
          30%  { transform: translateX(-8%) scale(1.08); }
          100% { transform: translateX(130%) scale(0.5); opacity: 0; }
        }
        .wa-btn-visible {
          animation: wa-pop-in 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .wa-btn-hidden {
          animation: wa-pop-out 0.45s cubic-bezier(0.55, 0, 1, 0.45) forwards;
          pointer-events: none;
        }
      `}</style>
            <a
                href="https://wa.me/33622188574"
                target="_blank"
                rel="noopener noreferrer"
                className={`fixed bottom-6 right-6 z-50 cursor-pointer group ${isNearBottom ? 'wa-btn-hidden' : 'wa-btn-visible'
                    }`}
                aria-label="Contactez-nous sur WhatsApp"
            >
                <img
                    src="/icones/whatsapp.png"
                    alt="WhatsApp"
                    className="w-16 h-16 drop-shadow-lg hover:scale-110 transition-transform"
                />
                <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white/60 backdrop-blur-md px-3 py-1 rounded-xl text-slate-900 font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/20 shadow-sm">
                    Devis Gratuit
                </span>
            </a>
        </>
    );
};
