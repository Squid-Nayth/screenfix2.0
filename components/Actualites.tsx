import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, CalendarDays, ChevronLeft, ChevronRight, Clock3, User } from 'lucide-react';
import { getAllArticles, getArticleBySlug, getFeaturedArticles, getRelatedArticles, type ArticleDocument } from '../lib/articles';
import { useI18n } from '../lib/i18n';

interface ActualitesProps {
  selectedSlug: string | null;
  onOpenArticle: (slug: string) => void;
  onClose: () => void;
}

const formatArticleDate = (value: string, locale: string) =>
  new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(value));

const ArticleMeta: React.FC<{ article: ArticleDocument; dateLocale: string }> = ({ article, dateLocale }) => (
  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
    <div className="flex items-center gap-2">
      <CalendarDays size={16} />
      <span>{formatArticleDate(article.publishedAt, dateLocale)}</span>
    </div>
    <div className="flex items-center gap-2">
      <User size={16} />
      <span>{article.author}</span>
    </div>
    <div className="flex items-center gap-2">
      <Clock3 size={16} />
      <span>{article.readingTime}</span>
    </div>
  </div>
);

const ArticleCard: React.FC<{
  article: ArticleDocument;
  onOpenArticle: (slug: string) => void;
  dateLocale: string;
  readMoreLabel: string;
}> = ({ article, onOpenArticle, dateLocale, readMoreLabel }) => (
  <article
    data-anim-item
    className="group bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100"
  >
    <div className="relative h-52 bg-gradient-to-br from-blue-100 to-indigo-100 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <img
          src={article.coverImage}
          alt={article.coverAlt}
          className="w-full h-full object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <span className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
        {article.category}
      </span>
    </div>

    <div className="p-6">
      <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug min-h-[3.5rem]">
        {article.title}
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed min-h-[4.5rem]">
        {article.excerpt}
      </p>

      <div className="mt-5">
        <ArticleMeta article={article} dateLocale={dateLocale} />
      </div>

      <button
        onClick={() => onOpenArticle(article.slug)}
        className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900 text-white font-semibold hover:bg-black transition-colors"
      >
        {readMoreLabel}
        <ArrowRight size={16} />
      </button>
    </div>
  </article>
);

export const Actualites: React.FC<ActualitesProps> = ({ selectedSlug, onOpenArticle, onClose }) => {
  const { t, dateLocale } = useI18n();
  const [currentSlide, setCurrentSlide] = useState(0);

  const articles = useMemo(() => getAllArticles(), []);
  const featuredArticles = useMemo(() => {
    const featured = getFeaturedArticles(3);
    return featured.length > 0 ? featured : articles.slice(0, 3);
  }, [articles]);
  const selectedArticle = selectedSlug ? getArticleBySlug(selectedSlug) : null;
  const relatedArticles = useMemo(
    () => (selectedArticle ? getRelatedArticles(selectedArticle, 3) : []),
    [selectedArticle]
  );

  useEffect(() => {
    if (selectedArticle || featuredArticles.length <= 1) return;
    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, [featuredArticles.length, selectedArticle]);

  const handleBookClick = () => {
    onClose();
    window.setTimeout(() => {
      (window as any).navigateToSection?.('booking');
    }, 80);
  };

  if (selectedArticle) {
    return (
      <div data-overlay-page data-anim-section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 pt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <button
            onClick={() => onOpenArticle('')}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold mb-8"
          >
            <ArrowLeft size={18} />
            {t('actualites.backToNews', 'Retour aux actualites')}
          </button>

          <article className="bg-white/85 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-0">
              <div className="p-8 md:p-12 lg:p-14">
                <span className="inline-flex px-4 py-2 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-sm font-bold mb-5">
                  {selectedArticle.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-5">
                  {selectedArticle.title}
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  {selectedArticle.excerpt}
                </p>
                <ArticleMeta article={selectedArticle} dateLocale={dateLocale} />

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={handleBookClick}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                  >
                    {t('actualites.detailCta', 'Prendre rendez-vous')}
                    <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={onClose}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white font-semibold hover:bg-black transition-colors"
                  >
                    {t('actualites.backHome', "Retour a l'accueil")}
                  </button>
                </div>
              </div>

              <div className="relative min-h-[320px] bg-gradient-to-br from-blue-100 via-indigo-100 to-white">
                <div className="absolute inset-0 flex items-center justify-center p-10">
                  <img
                    src={selectedArticle.coverImage}
                    alt={selectedArticle.coverAlt}
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>

            <div className="px-8 md:px-12 lg:px-14 pb-12">
              <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-10" />

              <div className="space-y-12">
                {selectedArticle.sections.map((section) => (
                  <section key={section.title} className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-4">{section.title}</h2>
                      <div className="space-y-4 text-slate-600 leading-relaxed">
                        {section.paragraphs.map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                    </div>

                    {section.image ? (
                      <div className="rounded-[2rem] bg-slate-50 border border-slate-100 p-6">
                        <img
                          src={section.image}
                          alt={section.imageAlt || section.title}
                          className="w-full h-64 object-contain"
                        />
                      </div>
                    ) : (
                      <div className="hidden lg:block" />
                    )}
                  </section>
                ))}
              </div>
            </div>
          </article>

          <section data-anim-stagger className="mt-14">
            <div className="flex items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
                  {t('actualites.relatedEyebrow', 'A lire aussi')}
                </p>
                <h2 className="text-3xl font-bold text-slate-900">
                  {t('actualites.relatedTitle', 'Articles similaires')}
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  onOpenArticle={onOpenArticle}
                  dateLocale={dateLocale}
                  readMoreLabel={t('actualites.readMore', 'Voir plus')}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div data-overlay-page data-anim-section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 pt-20">
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-2 bg-blue-600 rounded-full text-sm font-bold uppercase tracking-wider">
              {t('actualites.title')}
            </span>
          </div>
          <p className="text-center text-lg text-blue-100 max-w-3xl mx-auto">
            {t('actualites.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 mb-16 relative z-20">
        <div data-anim-item className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-white border border-white/60">
          <div className="relative h-[420px] md:h-[520px]">
            {featuredArticles.map((article, index) => (
              <div
                key={article.slug}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <div className="grid md:grid-cols-2 gap-8 h-full">
                  <div className="relative h-full bg-gradient-to-br from-blue-100 to-indigo-100">
                    <div className="absolute inset-0 flex items-center justify-center p-12">
                      <img
                        src={article.coverImage}
                        alt={article.coverAlt}
                        className="w-full h-full object-contain drop-shadow-2xl"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col justify-center p-8 md:p-12">
                    <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full mb-4 w-fit">
                      {article.category}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                      {article.title}
                    </h2>
                    <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <ArticleMeta article={article} dateLocale={dateLocale} />

                    <button
                      onClick={() => onOpenArticle(article.slug)}
                      className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white font-semibold hover:bg-black transition-colors w-fit"
                    >
                      {t('actualites.readMore', 'Voir plus')}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {featuredArticles.length > 1 && (
            <>
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
              >
                <ChevronLeft className="text-slate-900" size={24} />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % featuredArticles.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
              >
                <ChevronRight className="text-slate-900" size={24} />
              </button>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {featuredArticles.map((article, index) => (
                  <button
                    key={article.slug}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all ${
                      index === currentSlide ? 'w-8 bg-blue-600' : 'w-2 bg-white/60 hover:bg-white/90'
                    } h-2 rounded-full`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
              {t('actualites.latestEyebrow', 'Le journal ScreenFix')}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              {t('actualites.latestTitle', 'Les derniers articles')}
            </h2>
          </div>
          <p className="text-slate-600 max-w-xl">
            {t(
              'actualites.latestDescription',
              "Guides, conseils atelier et actualites Apple : ton client accede a une vraie section contenu, pas a une simple liste d'articles."
            )}
          </p>
        </div>

        <div data-anim-stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              onOpenArticle={onOpenArticle}
              dateLocale={dateLocale}
              readMoreLabel={t('actualites.readMore', 'Voir plus')}
            />
          ))}
        </div>

        <div className="text-center mt-16 pb-8">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-black transition-all shadow-lg"
          >
            {t('actualites.backHome', "Retour a l'accueil")}
          </button>
        </div>
      </div>
    </div>
  );
};
