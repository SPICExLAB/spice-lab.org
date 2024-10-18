import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const SEO = ({ title, description, image, pathname, article }) => {
  const { site } = useStaticQuery(query);

  const { defaultTitle, defaultDescription, siteUrl, defaultImage } =
    site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || ''}`,
    image: image ? `${siteUrl}${image}` : `${siteUrl}${defaultImage}`,
  };

  return (
    <Helmet title={seo.title}>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      {seo.url && <meta property="og:url" content={seo.url} />}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
    </Helmet>
  );
};

export default SEO;

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        siteUrl
        defaultImage
      }
    }
  }
`;
