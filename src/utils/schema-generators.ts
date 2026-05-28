/**
 * JSON-LD Schema Generator Utilities
 * Generates structured data for SEO and AEO optimization
 */

export interface SchemaContext {
  '@context': 'https://schema.org';
}

export interface PersonSchema extends SchemaContext {
  '@type': 'Person';
  name: string;
  url: string;
  image?: string;
  email?: string;
  jobTitle?: string;
  affiliation?: {
    '@type': 'Organization';
    name: string;
  };
  sameAs?: string[];
  description?: string;
}

export interface OrganizationSchema extends SchemaContext {
  '@type': 'Organization';
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
  contactPoint?: {
    '@type': 'ContactPoint';
    contactType: string;
    url?: string;
  };
}

export interface ArticleSchema extends SchemaContext {
  '@type': 'Article';
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: {
    '@type': 'Person';
    name: string;
    url?: string;
  };
  publisher?: {
    '@type': 'Organization';
    name: string;
    logo?: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  mainEntity?: {
    '@type': 'WebPage';
    '@id': string;
  };
}

export interface BreadcrumbSchema extends SchemaContext {
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

/**
 * Generate Person schema with credentials and social links
 */
export function generatePersonSchema(options: {
  name: string;
  url: string;
  jobTitle?: string;
  description?: string;
  image?: string;
  email?: string;
  sameAs?: string[];
}): PersonSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: options.name,
    url: options.url,
    ...(options.image && { image: options.image }),
    ...(options.email && { email: options.email }),
    ...(options.jobTitle && { jobTitle: options.jobTitle }),
    ...(options.sameAs &&
      options.sameAs.length > 0 && { sameAs: options.sameAs }),
    ...(options.description && { description: options.description }),
  };
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema(options: {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
}): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: options.name,
    url: options.url,
    ...(options.logo && { logo: options.logo }),
    ...(options.description && { description: options.description }),
    ...(options.sameAs &&
      options.sameAs.length > 0 && { sameAs: options.sameAs }),
  };
}

/**
 * Generate Article schema for blog posts and notes
 */
export function generateArticleSchema(options: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
  image?: string;
  publisherName?: string;
  publisherLogo?: string;
}): ArticleSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: options.headline,
    description: options.description,
    datePublished: options.datePublished,
    ...(options.dateModified && { dateModified: options.dateModified }),
    ...(options.image && { image: options.image }),
    author: {
      '@type': 'Person',
      name: options.author.name,
      ...(options.author.url && { url: options.author.url }),
    },
    ...(options.publisherName && {
      publisher: {
        '@type': 'Organization',
        name: options.publisherName,
        ...(options.publisherLogo && {
          logo: {
            '@type': 'ImageObject',
            url: options.publisherLogo,
          },
        }),
      },
    }),
    mainEntity: {
      '@type': 'WebPage',
      '@id': options.url,
    },
  };
}

/**
 * Generate Breadcrumb schema
 */
export function generateBreadcrumbSchema(options: {
  items: Array<{
    name: string;
    url: string;
  }>;
}): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: options.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Combine multiple schemas using @graph
 */
export function generateGraphSchema(schemas: Array<Record<string, any>>): Record<string, any> | null {
  if (schemas.length === 0) return null;
  if (schemas.length === 1) return schemas[0];

  return {
    '@context': 'https://schema.org',
    '@graph': schemas.map((schema) => {
      // Remove @context from individual schemas when using @graph
      const { '@context': _context, ...rest } = schema;
      return rest;
    }),
  };
}

/**
 * Format date to ISO string for schema.org
 */
export function formatSchemaDate(date: Date | string): string {
  if (typeof date === 'string') {
    return new Date(date).toISOString();
  }
  return date.toISOString();
}
