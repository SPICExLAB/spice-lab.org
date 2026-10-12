import React, { useEffect } from 'react';

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

export function Head({ pageContext }) {
  const { title, description, fonts } = pageContext;
  return (
    <>
      <title>{`${title} | SPICE Lab | Northwestern University`}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {fonts && <link rel="preconnect" href="https://fonts.googleapis.com" />}
      {fonts && <link rel="stylesheet" href={fonts} />}
    </>
  );
}
