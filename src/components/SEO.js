import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

// Head tags for every MainLayout page: title, description, canonical URL,
// Open Graph / Twitter cards (link previews in Slack, iMessage, X), optional
// JSON-LD structured data, and any extra tags passed as children (project
// pages pass Google Scholar citation_* tags this way).
export const absoluteUrl = (siteUrl, path) => {
  if (!path) return null;
  if (/^https?:\/\//.test(path)) return path;
  return `${siteUrl}${path.startsWith('/') ? '' : '/'}${path}`;
};

// Gatsby serves every page with a trailing slash; canonical URLs must match.
export const canonicalPath = (pathname = '/') => {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  // decode first so an already-encoded path is not encoded twice
  return encodeURI(decodeURI(path.endsWith('/') ? path : `${path}/`));
};

const SEO = ({
  title,
  description,
  image,
  imageAlt,
  pathname,
  article,
  noindex,
  jsonLd,
  children,
}) => {
  const { site } = useStaticQuery(query);
  const { siteName, defaultTitle, defaultDescription, siteUrl, defaultImage } =
    site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: absoluteUrl(siteUrl, canonicalPath(pathname)),
    image: absoluteUrl(siteUrl, image || defaultImage),
    imageAlt: imageAlt || `${siteName} logo`,
  };

  return (
    <Helmet htmlAttributes={{ lang: 'en' }} title={seo.title}>
      <meta name="description" content={seo.description} />
      {noindex && <meta name="robots" content="noindex" />}
      {!noindex && <link rel="canonical" href={seo.url} />}

      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:alt" content={seo.imageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
      {children}
    </Helmet>
  );
};

export default SEO;

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        siteName: title
        defaultTitle: titleLong
        defaultDescription: description
        siteUrl
        defaultImage
      }
    }
  }
`;
