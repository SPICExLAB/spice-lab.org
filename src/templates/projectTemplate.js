import React from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from '../components/MDXcomponents';
import MainLayout from '../components/MainLayout';
import * as styles from '../components/projectTemplate.module.css';
import pdfIcon from '../images/pdf.png';
import conferenceIcon from '../images/web.png';
import githubIcon from '../images/github.png';

export default function ProjectTemplate({
  data: { mdx, allTeamJson },
  children,
}) {
  const {
    title,
    subtitle,
    authors,
    year,
    coverImage,
    award,
    pdfLink,
    github,
    videoLink,
    conference,
    conferencePage,
    citation,
    bibtex,
  } = mdx.frontmatter;

  const teamMembers = allTeamJson.nodes.reduce((acc, member) => {
    acc[member.name] = member;
    return acc;
  }, {});

  const formattedBibTeX = bibtex.trim().replace(/\s*\n\s*/g, '\n');

  return (
    <MainLayout>
      <article className={styles.projectContainer}>
        <section className={styles.header}>
          {year && (
            <p>
              {year} {conference && `${conference}`} {award && `${award}`}
            </p>
          )}
          <h1 className={styles.title}>
            {title}: {subtitle}
          </h1>

          <p className={styles.authors}>
            {authors.map((author, index) => {
              const teamMember = teamMembers[author];
              const website = teamMember ? teamMember.website : null;
              console.log(website);
              return (
                <React.Fragment key={author}>
                  {index > 0 && ', '}{' '}
                  {website ? (
                    <a
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.authorLink}
                    >
                      {author}
                    </a>
                  ) : (
                    <span>{author}</span>
                  )}
                </React.Fragment>
              );
            })}
          </p>

          <div className={styles.linksContainer}>
            {pdfLink && (
              <a
                href={pdfLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkItem}
              >
                <img src={pdfIcon} alt="PDF" />
                <span>paper</span>
              </a>
            )}
            {conferencePage && (
              <a
                href={conferencePage}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkItem}
              >
                <img src={conferenceIcon} alt="Link" />
                <span>conference</span>
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkItem}
              >
                <img src={githubIcon} alt="github" />
                <span>code</span>
              </a>
            )}
          </div>
        </section>

        {videoLink && (
          <section className={styles.video}>
            <iframe
              src={videoLink}
              title="Project Video"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.videoFrame}
            ></iframe>
          </section>
        )}

        {coverImage && (
          <img
            src={coverImage.publicURL}
            alt="Cover Image"
            className={styles.coverImage}
          />
        )}

        <section>
          <MDXProvider components={MDXComponents}>{children}</MDXProvider>
        </section>

        {citation && (
          <section>
            <h2>Citation</h2>
            <p>{citation}</p>
          </section>
        )}
        {bibtex && (
          <section className={styles.bibtex}>
            <h2 className={styles.bibtexTitle}>BibTeX</h2>
            <div className={styles.bibtexCode}>
              <pre>
                <code>{formattedBibTeX}</code>
              </pre>
            </div>
          </section>
        )}
      </article>
    </MainLayout>
  );
}

export const query = graphql`
  query ProjectByID($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        subtitle
        authors
        year
        coverImage {
          publicURL
        }
        published
        award
        pdfLink
        github
        videoLink
        conference
        conferencePage
        citation
        bibtex
      }
    }
    allTeamJson {
      nodes {
        name
        website
      }
    }
  }
`;
