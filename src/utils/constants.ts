import dotenv from 'dotenv';

dotenv.config();

export const PUBLIC_DEVELOPMENT_URL = process.env
  .PUBLIC_DEVELOPMENT_URL as string;
export const PUBLIC_PRODUCTION_URL = process.env
  .PUBLIC_PRODUCTION_URL as string;
export const PUBLIC_GA_ID = process.env.PUBLIC_GA_ID as string;
export const TURSO_DATABASE_URL = process.env.TURSO_DATABASE_URL as string;
export const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN as string;
export const MODE = process.env.MODE;

export const SENTRY_DSN = process.env.SENTRY_DSN as string;
export const SENTRY_PROJECT = process.env.SENTRY_PROJECT as string;
export const SENTRY_AUTH_TOKEN = process.env.SENTRY_AUTH_TOKEN as string;

export const SITE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://side.my.id'
    : 'http://localhost:4321';

export const ROUTES = {
  home: '/',
  works: '/works',
  notes: '/notes',
  tags: '/tags',
  certificates: '/certificates',
  rss: '/rss.xml',
  work: (slug: string) => `/works/${slug}`,
  note: (slug: string) => `/notes/${slug}`,
  tag: (slug: string) => `/tags/${slug}`,
} as const;
