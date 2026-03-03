import React, { useState } from 'react';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Services } from './components/Services';
import { BoutiquePro } from './components/BoutiquePro';
import { Actualites } from './components/Actualites';
import { Testimonials } from './components/Testimonials';
import { Training } from './components/Training';
import { Footer } from './components/Footer';
import { BookingWizard } from './components/BookingWizard';
import { LegalNotice } from './components/LegalNotice';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { B2BSignup } from './components/B2BSignup';
import { guardCurrentBoutiqueAccess } from './lib/proAccess';
import { initSiteAnimations } from './lib/siteAnimations';
import { initAnalytics, trackPageView } from './lib/analytics';
import { getArticleBySlug } from './lib/articles';

const SECTION_SCROLL_GAP = 18;
const SECTION_EXTRA_GAPS: Record<string, number> = {
  booking: 12,
  'booking-card': 10,
  'boutique-pro': 22,
  expertise: 22,
  services: 22,
  formation: 22,
  avis: 22,
  contact: 12
};

const App: React.FC = () => {
  const [showLegalNotice, setShowLegalNotice] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showB2BSignup, setShowB2BSignup] = useState(false);
  const [showActualites, setShowActualites] = useState(false);
  const [activeArticleSlug, setActiveArticleSlug] = useState<string | null>(null);
  const [pendingSectionTarget, setPendingSectionTarget] = useState<string | null>(null);
  const appRootRef = React.useRef<HTMLDivElement | null>(null);

  const clearOverlayPages = React.useCallback(() => {
    setShowLegalNotice(false);
    setShowPrivacyPolicy(false);
    setShowB2BSignup(false);
    setShowActualites(false);
    setActiveArticleSlug(null);
  }, []);

  const scrollToPageTop = React.useCallback(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    window.history.replaceState({}, '', window.location.pathname);
  }, []);

  const scrollToTarget = React.useCallback((targetId?: string, behavior: ScrollBehavior = 'smooth') => {
    if (typeof window === 'undefined' || !targetId || targetId === 'top') {
      scrollToPageTop();
      return;
    }

    const element = document.getElementById(targetId);
    if (!element) {
      scrollToPageTop();
      return;
    }

    const navbar = document.querySelector('[data-navbar-root]') as HTMLElement | null;
    const navbarHeight = navbar?.offsetHeight ?? 84;
    const targetTop =
      element.getBoundingClientRect().top +
      window.scrollY -
      navbarHeight -
      (SECTION_EXTRA_GAPS[targetId] ?? SECTION_SCROLL_GAP);

    window.scrollTo({
      top: Math.max(0, targetTop),
      left: 0,
      behavior
    });
    window.history.replaceState({}, '', `${window.location.pathname}#${targetId}`);
  }, [scrollToPageTop]);

  const navigateToSection = React.useCallback(
    (targetId?: string) => {
      const hasOverlayPage = showLegalNotice || showPrivacyPolicy || showB2BSignup || showActualites;
      if (hasOverlayPage) {
        clearOverlayPages();
        setPendingSectionTarget(targetId || 'top');
        return;
      }

      scrollToTarget(targetId);
    },
    [clearOverlayPages, scrollToTarget, showB2BSignup, showLegalNotice, showPrivacyPolicy, showActualites]
  );

  // Expose function to window for Footer to use
  React.useEffect(() => {
    (window as any).showLegalNotice = () => {
      scrollToPageTop();
      setPendingSectionTarget(null);
      setShowLegalNotice(true);
      setShowPrivacyPolicy(false);
      setShowB2BSignup(false);
      setShowActualites(false);
      setActiveArticleSlug(null);
    };
    (window as any).hideLegalNotice = () => {
      setShowLegalNotice(false);
      scrollToPageTop();
    };
    (window as any).showPrivacyPolicy = () => {
      scrollToPageTop();
      setPendingSectionTarget(null);
      setShowPrivacyPolicy(true);
      setShowLegalNotice(false);
      setShowB2BSignup(false);
      setShowActualites(false);
      setActiveArticleSlug(null);
    };
    (window as any).hidePrivacyPolicy = () => {
      setShowPrivacyPolicy(false);
      scrollToPageTop();
    };
    (window as any).showB2BSignup = () => {
      scrollToPageTop();
      setPendingSectionTarget(null);
      setShowB2BSignup(true);
      setShowLegalNotice(false);
      setShowPrivacyPolicy(false);
      setShowActualites(false);
      setActiveArticleSlug(null);
    };
    (window as any).hideB2BSignup = () => {
      setShowB2BSignup(false);
      scrollToPageTop();
    };
    (window as any).showActualites = (slug?: string) => {
      scrollToPageTop();
      setPendingSectionTarget(null);
      setShowActualites(true);
      setShowLegalNotice(false);
      setShowPrivacyPolicy(false);
      setShowB2BSignup(false);
      setActiveArticleSlug(slug || null);
    };
    (window as any).showActualiteArticle = (slug: string) => {
      scrollToPageTop();
      setPendingSectionTarget(null);
      setShowActualites(true);
      setShowLegalNotice(false);
      setShowPrivacyPolicy(false);
      setShowB2BSignup(false);
      setActiveArticleSlug(slug);
    };
    (window as any).hideActualites = () => {
      setShowActualites(false);
      setActiveArticleSlug(null);
      scrollToPageTop();
    };
    (window as any).navigateToSection = (targetId?: string) => {
      navigateToSection(targetId);
    };
  }, [navigateToSection, scrollToPageTop]);

  React.useEffect(() => {
    void guardCurrentBoutiqueAccess();
  }, []);

  React.useEffect(() => {
    initAnalytics();
  }, []);

  React.useEffect(() => {
    if (!appRootRef.current) return;
    return initSiteAnimations(appRootRef.current);
  }, [activeArticleSlug, showLegalNotice, showPrivacyPolicy, showB2BSignup, showActualites]);

  React.useLayoutEffect(() => {
    scrollToPageTop();
  }, [activeArticleSlug, showLegalNotice, showPrivacyPolicy, showB2BSignup, showActualites, scrollToPageTop]);

  React.useEffect(() => {
    if (!pendingSectionTarget) return;
    if (showB2BSignup || showLegalNotice || showPrivacyPolicy || showActualites) return;

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        scrollToTarget(pendingSectionTarget);
        setPendingSectionTarget(null);
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [
    pendingSectionTarget,
    scrollToTarget,
    showActualites,
    showB2BSignup,
    showLegalNotice,
    showPrivacyPolicy
  ]);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const syncHashNavigation = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;
      if (showB2BSignup || showLegalNotice || showPrivacyPolicy || showActualites) return;
      window.requestAnimationFrame(() => scrollToTarget(hash, 'auto'));
    };

    syncHashNavigation();
    window.addEventListener('hashchange', syncHashNavigation);
    return () => window.removeEventListener('hashchange', syncHashNavigation);
  }, [scrollToTarget, showActualites, showB2BSignup, showLegalNotice, showPrivacyPolicy]);

  React.useEffect(() => {
    if (showB2BSignup) {
      trackPageView('/ouvrir-compte-pro', 'ScreenFix - Compte Pro');
      return;
    }

    if (showPrivacyPolicy) {
      trackPageView('/politique-de-confidentialite', 'ScreenFix - Politique de confidentialite');
      return;
    }

    if (showLegalNotice) {
      trackPageView('/mentions-legales', 'ScreenFix - Mentions legales');
      return;
    }

    if (showActualites) {
      if (activeArticleSlug) {
        const article = getArticleBySlug(activeArticleSlug);
        trackPageView(
          `/actualites/${activeArticleSlug}`,
          article ? `ScreenFix - ${article.title}` : 'ScreenFix - Actualités'
        );
        return;
      }

      trackPageView('/actualites', 'ScreenFix - Actualités');
      return;
    }

    trackPageView('/', 'ScreenFix - Accueil');
  }, [activeArticleSlug, showB2BSignup, showLegalNotice, showPrivacyPolicy, showActualites]);

  if (showB2BSignup) {
    return (
      <div
        ref={appRootRef}
        data-anim-root
        className="bg-white text-slate-900 selection:bg-blue-200 min-h-screen font-sans relative overflow-hidden"
      >
        {/* GLOBAL LIQUID BACKGROUND - FIXED */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[50rem] h-[50rem] bg-blue-100/60 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob"></div>
          <div className="absolute top-[10%] right-[-10%] w-[40rem] h-[40rem] bg-indigo-100/60 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-10%] left-[20%] w-[45rem] h-[45rem] bg-purple-100/60 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-[20%] right-[10%] w-[35rem] h-[35rem] bg-pink-100/60 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-6000"></div>
        </div>
        <Navbar />
        <B2BSignup onClose={() => setShowB2BSignup(false)} />
        <Footer />

        {/* Floating WhatsApp CTA */}
        <FloatingWhatsApp />
      </div>
    );
  }

  if (showPrivacyPolicy) {
    return (
      <div
        ref={appRootRef}
        data-anim-root
        className="bg-white text-slate-900 selection:bg-blue-200 min-h-screen font-sans relative overflow-hidden"
      >
        {/* GLOBAL LIQUID BACKGROUND - FIXED */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[50rem] h-[50rem] bg-blue-100/60 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob"></div>
          <div className="absolute top-[10%] right-[-10%] w-[40rem] h-[40rem] bg-indigo-100/60 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-10%] left-[20%] w-[45rem] h-[45rem] bg-purple-100/60 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-[20%] right-[10%] w-[35rem] h-[35rem] bg-pink-100/60 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-6000"></div>
        </div>
        <Navbar />
        <PrivacyPolicy />
        <Footer />

        {/* Floating WhatsApp CTA */}
        <FloatingWhatsApp />
      </div>
    );
  }

  if (showActualites) {
    return (
      <div
        ref={appRootRef}
        data-anim-root
        className="bg-white text-slate-900 selection:bg-blue-200 min-h-screen font-sans relative overflow-hidden"
      >
        {/* GLOBAL LIQUID BACKGROUND - FIXED */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[50rem] h-[50rem] bg-blue-100/60 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob"></div>
          <div className="absolute top-[10%] right-[-10%] w-[40rem] h-[40rem] bg-indigo-100/60 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-10%] left-[20%] w-[45rem] h-[45rem] bg-purple-100/60 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-[20%] right-[10%] w-[35rem] h-[35rem] bg-pink-100/60 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-6000"></div>
        </div>
        <Navbar />
        <Actualites
          selectedSlug={activeArticleSlug}
          onOpenArticle={(slug) => setActiveArticleSlug(slug || null)}
          onClose={() => {
            setShowActualites(false);
            setActiveArticleSlug(null);
          }}
        />
        <Footer />

        {/* Floating WhatsApp CTA */}
        <FloatingWhatsApp />
      </div>
    );
  }

  if (showLegalNotice) {
    return (
      <div
        ref={appRootRef}
        data-anim-root
        className="bg-white text-slate-900 selection:bg-blue-200 min-h-screen font-sans relative overflow-hidden"
      >
        {/* GLOBAL LIQUID BACKGROUND - FIXED */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[50rem] h-[50rem] bg-blue-100/60 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob"></div>
          <div className="absolute top-[10%] right-[-10%] w-[40rem] h-[40rem] bg-indigo-100/60 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-10%] left-[20%] w-[45rem] h-[45rem] bg-purple-100/60 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-[20%] right-[10%] w-[35rem] h-[35rem] bg-pink-100/60 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-6000"></div>
        </div>
        <Navbar />
        <LegalNotice />
        <Footer />

        {/* Floating WhatsApp CTA */}
        <FloatingWhatsApp />
      </div>
    );
  }

  return (
    <div
      ref={appRootRef}
      data-anim-root
      className="bg-white text-slate-900 selection:bg-blue-200 min-h-screen font-sans relative overflow-hidden"
    >

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
        <section id="booking" data-anim-section className="py-8 sm:py-10 md:py-12 px-4">
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
      <FloatingWhatsApp />
    </div>
  );
};

export default App;
