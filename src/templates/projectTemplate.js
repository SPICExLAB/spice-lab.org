import React from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import styled from 'styled-components';
import MainLayout from '../components/MainLayout';
import MDXComponents, {
  MediaGrid,
  MediaItem,
  MDXImage,
} from '../components/MDXcomponents';
import pdfIcon from '../images/pdf.png';
import conferenceIcon from '../images/web.png';
import githubIcon from '../images/github.png';

const ProjectContainer = styled.article`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.section`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  margin-top: 0;
`;

const Authors = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1rem;
`;

const AuthorLink = styled.a`
  text-decoration: none;
  color: #0070f3;
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const LinkItem = styled.a`
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
  text-decoration: none;
  background-color: #555555;
  border-radius: 20px;
  padding: 10px;

  img {
    width: 24px;
    height: 24px;
    margin-right: 0.5rem;
  }

  span {
    color: white;
  }
`;

const Video = styled.section`
  margin-bottom: 2rem;

  iframe {
    width: 100%;
    height: 400px;
    border: none;
  }
`;

const CoverImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const BibTeX = styled.section`
  margin-top: 2rem;
`;

const BibTeXTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const BibTeXCode = styled.div`
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
  color: #333;

  pre {
    margin: 0;
  }

  code {
    background-color: transparent;
    padding: 0;
    color: inherit;
  }
`;

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
    medias,
  } = mdx.frontmatter;

  const teamMembers = allTeamJson.nodes.reduce((acc, member) => {
    acc[member.name] = member;
    return acc;
  }, {});

  const formattedBibTeX = bibtex
    ? bibtex.trim().replace(/\s*\n\s*/g, '\n')
    : '';

  return (
    <MainLayout>
      <ProjectContainer>
        <Header>
          {year && (
            <p>
              {conference && `${conference}`} {award && `${award}`}
            </p>
          )}
          <Title>
            {title}
            {subtitle && `: ${subtitle}`}
          </Title>

          <Authors>
            {authors.map((author, index) => {
              const teamMember = teamMembers[author];
              const website = teamMember ? teamMember.website : null;
              return (
                <React.Fragment key={author}>
                  {index > 0 && ', '}
                  {website ? (
                    <AuthorLink
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {author}
                    </AuthorLink>
                  ) : (
                    <span>{author}</span>
                  )}
                </React.Fragment>
              );
            })}
          </Authors>

          <LinksContainer>
            {pdfLink && (
              <LinkItem
                href={pdfLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={pdfIcon} alt="PDF" />
                <span>paper</span>
              </LinkItem>
            )}
            {conferencePage && (
              <LinkItem
                href={conferencePage}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={conferenceIcon} alt="Link" />
                <span>publication</span>
              </LinkItem>
            )}
            {github && (
              <LinkItem href={github} target="_blank" rel="noopener noreferrer">
                <img src={githubIcon} alt="github" />
                <span>code</span>
              </LinkItem>
            )}
          </LinksContainer>
        </Header>

        {videoLink && (
          <Video>
            <iframe
              src={videoLink}
              title="Project Video"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Video>
        )}

        {coverImage && (
          <CoverImage src={coverImage.publicURL} alt="Cover Image" />
        )}

        <Section>
          <MDXProvider components={MDXComponents}>{children}</MDXProvider>
        </Section>

        {medias && medias.length > 0 && (
          <Section>
            <h2>Media</h2>
            <MediaGrid>
              {medias.map((image) => (
                <MediaItem key={image.publicURL}>
                  <MDXImage src={image.publicURL} alt={image.alt || ''} />
                </MediaItem>
              ))}
            </MediaGrid>
          </Section>
        )}

        {citation && (
          <Section>
            <h2>Citation</h2>
            <p>{citation}</p>
          </Section>
        )}
        {bibtex && (
          <BibTeX>
            <BibTeXTitle>BibTeX</BibTeXTitle>
            <BibTeXCode>
              <pre>
                <code>{formattedBibTeX}</code>
              </pre>
            </BibTeXCode>
          </BibTeX>
        )}
      </ProjectContainer>
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
        medias {
          publicURL
        }
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
