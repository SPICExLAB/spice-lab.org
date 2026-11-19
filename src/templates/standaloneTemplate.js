import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import { absoluteUrl } from '../components/SEO';
import { projectSeo } from '../components/projectSeo';

// Renders a project page from a hand-written HTML file instead of the MDX
// template. Used when a project's frontmatter sets `standaloneHtml`; the file
// is read in gatsby-node.js and passed in through the page context. The page
// brings its own styles and does not use MainLayout.
export default function StandaloneTemplate({ pageContext }) {
  useEffect(() => {
    // "Copy" button on the BibTeX block, if the page has one.
    const button = document.getElementById('copybib');
    const text = document.getElementById('bibtext');
    if (!button || !text) return undefined;
    const reset = () => {
      button.textContent = 'Copy';
    };
    const onClick = () => {
      const done = () => {
        button.textContent = 'Copied';
        setTimeout(reset, 1600);
      };
      const fallback = () => {
        const range = document.createRange();
        range.selectNodeContents(text);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        button.textContent = 'Selected';
        setTimeout(reset, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text.textContent).then(done, fallback);
      } else {
        fallback();
      }
    };
    button.addEventListener('click', onClick);
    return () => button.removeEventListener('click', onClick);
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: pageContext.html }} />;
}

export function Head({ data, pageContext }) {
  const { fonts } = pageContext;
  const { siteUrl, title: siteName } = data.site.siteMetadata;
  const seo = projectSeo(data.mdx.frontmatter, siteUrl);
  const image = absoluteUrl(siteUrl, seo.image || '/lab.png');
  return (
    <>
      <html lang="en" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={seo.url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={seo.imageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={image} />
      {seo.scholarTags.map(([name, content], i) => (
        <meta key={`${name}-${i}`} name={name} content={content} />
      ))}
      <script type="application/ld+json">{JSON.stringify(seo.jsonLd)}</script>
      {fonts && <link rel="preconnect" href="https://fonts.googleapis.com" />}
      {fonts && <link rel="stylesheet" href={fonts} />}
    </>
  );
}

export const query = graphql`
  query StandaloneProjectByID($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        slug
        title
        subtitle
        authors
        year
        conference
        published
        pdfLink
        bibtex
        coverImage {
          publicURL
          childImageSharp {
            original {
              width
            }
            resize(width: 1200, toFormat: JPG, quality: 85) {
              src
              width
              height
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
  }
`;
