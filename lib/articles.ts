export interface ArticleSection {
  title: string;
  paragraphs: string[];
  image?: string;
  imageAlt?: string;
}

export interface ArticleDocument {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  featured?: boolean;
  coverImage: string;
  coverAlt: string;
  sections: ArticleSection[];
  relatedSlugs?: string[];
}

const articleModules = import.meta.glob('../content/articles/*.json', {
  eager: true
}) as Record<string, { default: ArticleDocument } | ArticleDocument>;

const normalizeArticle = (moduleValue: { default: ArticleDocument } | ArticleDocument): ArticleDocument => {
  const article = 'default' in moduleValue ? moduleValue.default : moduleValue;
  return {
    ...article,
    featured: Boolean(article.featured),
    relatedSlugs: article.relatedSlugs || []
  };
};

const articles = Object.values(articleModules)
  .map(normalizeArticle)
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

export const getAllArticles = () => articles;

export const getFeaturedArticles = (limit = 3) =>
  articles.filter((article) => article.featured).slice(0, limit);

export const getArticleBySlug = (slug: string) =>
  articles.find((article) => article.slug === slug) || null;

export const getRelatedArticles = (article: ArticleDocument, limit = 3) => {
  const explicit = (article.relatedSlugs || [])
    .map((slug) => getArticleBySlug(slug))
    .filter(Boolean) as ArticleDocument[];

  if (explicit.length >= limit) return explicit.slice(0, limit);

  const fallback = articles.filter(
    (candidate) =>
      candidate.slug !== article.slug &&
      !explicit.some((item) => item.slug === candidate.slug)
  );

  return [...explicit, ...fallback].slice(0, limit);
};
