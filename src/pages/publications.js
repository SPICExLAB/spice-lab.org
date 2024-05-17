import React from 'react';
import { graphql } from 'gatsby';
import MainLayout from '../components/MainLayout';
import PublicationCard from '../components/PublicationCard';

const PublicationsPage = ({ data }) => {
  const { allMdx: publicationsData, allTeamJson: teamData } = data;

  // Organize publications by year
  const publicationsByYear = publicationsData.nodes.reduce((acc, node) => {
    const year = node.frontmatter.year;
    acc[year] = acc[year] || [];
    acc[year].push(node);
    return acc;
  }, {});

  // Create a map for easy lookup of team members by name
  const teamMembers = teamData.nodes.reduce((acc, member) => {
    acc[member.name] = member;
    return acc;
  }, {});

  return (
    <MainLayout>
      <h1>Publications</h1>

      {Object.entries(publicationsByYear)
        .sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA)) // Ensure numerical sorting
        .map(([year, publications]) => (
          <section key={year}>
            <h2>{year}</h2>
            {publications.map((publication) => (
              <PublicationCard
                key={publication.id}
                publication={publication}
                teamMembers={teamMembers}
                slug={`/projects/${publication.frontmatter.slug}`}
              />
            ))}
          </section>
        ))}
    </MainLayout>
  );
};

export const query = graphql`
  query PublicationsQuery {
    allMdx(
      filter: { frontmatter: { type: { eq: "project" } } }
      sort: { fields: frontmatter___year, order: DESC }
    ) {
      nodes {
        id
        frontmatter {
          title
          slug
          subtitle
          authors
          year
          coverImage {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, width: 1080)
            }
          }
          published
          award
          pdfLink
          conference
          citation
          bibtex
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

export default PublicationsPage;
