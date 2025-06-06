import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import MainLayout from '../components/MainLayout';
import PublicationCard from '../components/publicationCard';

const PublicationsPage = ({ data }) => {
  const { allMdx: publicationsData, allTeamJson: teamData } = data;

  // Organize publications by year
  const publicationsByYear = publicationsData.nodes.reduce((acc, node) => {
    const year = node.frontmatter.year;
    acc[year] = acc[year] || [];
    acc[year].push(node);
    return acc;
  }, {});

  // Sort publications within each year by dateAdded
  Object.keys(publicationsByYear).forEach((year) => {
    publicationsByYear[year].sort(
      (a, b) =>
        new Date(b.frontmatter.dateAdded) - new Date(a.frontmatter.dateAdded)
    );
  });

  // Create a map for easy lookup of team members by name
  const teamMembers = teamData.nodes.reduce((acc, member) => {
    acc[member.name] = member;
    return acc;
  }, {});

  return (
    <MainLayout>
      <SEO
        title="Publications | SPICE Lab | Northwestern University"
        description="See our publications"
        pathname="/publications"
      />

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
      sort: { frontmatter: { year: DESC } }
    ) {
      nodes {
        id
        frontmatter {
          title
          slug
          subtitle
          authors
          year
          dateAdded
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
          github
          videoLink
          additionalLinks {
            label
            url
          }
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
