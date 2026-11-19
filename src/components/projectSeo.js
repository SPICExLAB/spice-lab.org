import { absoluteUrl, canonicalPath } from './SEO';

// Builds search metadata for a project page from its MDX frontmatter. Shared
// by the MDX template and the standalone-HTML template so both kinds of
// project page carry the same title, description, Google Scholar tags and
// JSON-LD.

const LAB = 'SPICE Lab';
const UNIVERSITY = 'Northwestern University';

const cleanAuthor = (name) => name.replace(/[*†‡§]/g, '').trim();

// Reads one field from a BibTeX entry, e.g. booktitle={...} or doi={...}.
const bibField = (bibtex, field) => {
  if (!bibtex) return null;
  const match = bibtex.match(
    new RegExp(`\\b${field}\\s*=\\s*[{"](.+?)[}"]\\s*,?\\s*$`, 'mi')
  );
  return match ? match[1].replace(/[{}]/g, '').trim() : null;
};

export const projectSeo = (frontmatter, siteUrl) => {
  const {
    slug,
    title,
    subtitle,
    authors,
    year,
    conference,
    published,
    pdfLink,
    bibtex,
    coverImage,
  } = frontmatter;

  const fullTitle = subtitle ? `${title}: ${subtitle}` : title;
  const authorNames = (authors || []).map(cleanAuthor).filter(Boolean);
  const venue = conference ? conference.split(':')[0].trim() : null;
  const pathname = canonicalPath(`/projects/${slug}`);
  const url = absoluteUrl(siteUrl, pathname);
  const image = coverImage?.publicURL || null;
  const isPublished = published === 'yes';

  const description = [
    subtitle || title,
    authorNames.length ? authorNames.join(', ') : null,
    [venue || year, `${LAB}, ${UNIVERSITY}`].filter(Boolean).join(', '),
  ]
    .filter(Boolean)
    .join('. ')
    .concat('.');

  // Google Scholar indexes these Highwire Press tags.
  const scholarTags = [];
  if (isPublished) {
    const booktitle = bibField(bibtex, 'booktitle');
    const journal = bibField(bibtex, 'journal');
    const doi = bibField(bibtex, 'doi');
    scholarTags.push(['citation_title', fullTitle]);
    authorNames.forEach((name) => scholarTags.push(['citation_author', name]));
    if (year) scholarTags.push(['citation_publication_date', String(year)]);
    if (booktitle) scholarTags.push(['citation_conference_title', booktitle]);
    if (journal && !/^arxiv/i.test(journal)) {
      scholarTags.push(['citation_journal_title', journal]);
    }
    if (doi) scholarTags.push(['citation_doi', doi]);
    if (pdfLink) {
      scholarTags.push(['citation_pdf_url', absoluteUrl(siteUrl, pdfLink)]);
    }
    scholarTags.push(['citation_abstract_html_url', url]);
  }

  const doi = bibField(bibtex, 'doi');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: fullTitle,
    name: fullTitle,
    description,
    url,
    ...(image && { image: absoluteUrl(siteUrl, image) }),
    ...(year && { datePublished: String(year) }),
    ...(authorNames.length && {
      author: authorNames.map((name) => ({ '@type': 'Person', name })),
    }),
    ...(conference && {
      publication: { '@type': 'PublicationEvent', name: conference },
    }),
    ...(doi && { sameAs: `https://doi.org/${doi}` }),
    sourceOrganization: {
      '@type': 'ResearchOrganization',
      name: LAB,
      url: absoluteUrl(siteUrl, '/'),
    },
  };

  return {
    title: `${fullTitle} | ${LAB}`,
    description,
    pathname,
    url,
    image,
    imageAlt: `${title} cover image`,
    scholarTags,
    jsonLd,
  };
};
