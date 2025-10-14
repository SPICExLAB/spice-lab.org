import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import MainLayout from '../components/MainLayout';
import SEO from '../components/SEO';

const Section = styled.div`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #333;
  border-bottom: 1px solid #767676ff;
  padding-bottom: 0.5rem;
`;

const AwardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const AwardItem = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  flex-wrap: wrap;
`;

const AwardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #5a5a5a;
  margin: 0;
  flex-shrink: 0;
`;

const AwardMeta = styled.span`
  color: #606060;
  font-size: 0.95rem;
`;

const AwardYear = styled.span`
  color: #606060;
  margin-right: 1rem;
`;

const AuthorLink = styled.a`
  color: inherit;
  transition: color 0.3s;

  &:hover {
    color: #663299;
  }
`;

const PaperAwardItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding-left: 0;
  border-left: 3px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
    border-left-color: #4e2a84;
    padding-left: 1.5rem;
  }
`;

const PaperTitleLink = styled(Link)`
  font-size: 1.1rem;
  font-weight: 600;
  color: #5a5a5a;
  margin: 0;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #000;
    text-decoration: underline;
  }
`;

const PaperTitleText = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #5a5a5a;
  margin: 0;
`;

const PaperAuthors = styled.p`
  margin: 0.5rem 0;
  color: #333;
`;

const PaperVenueWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const PaperVenue = styled.p`
  font-style: italic;
  color: #606060;
  margin: 0;
`;

const AwardBadge = styled.span`
  display: inline-block;
  color: #4e2a84;
  font-weight: bold;
  font-size: 15px;
`;

const awardsData = [
  {
    title: 'Red Dot Design Award',
    members: ['Chenfeng Gao'],
    year: '2025',
  },
  {
    title: 'Google Research Scholar Award',
    members: ['Karan Ahuja'],
    year: '2025',
  },
  {
    title: 'ACM SIGCHI Special Recognition Award',
    members: ['Karan Ahuja'],
    year: '2025',
  },
];

// Manually added paper awards
const manualPaperAwards = [
  //   {
  //     title:
  //       'Shape-Kit: A Design Toolkit for Crafting On-Body Expressive Haptics',
  //     authors: [
  //       'Ran Zhou',
  //       'Jianru Ding',
  //       'Chenfeng Gao',
  //       'Wanli Qian',
  //       'Benjamin Erickson',
  //       'Madeline Balaam',
  //       'Daniel Leithinger',
  //       'Ken Nakagaki',
  //     ],
  //     venue:
  //       'CHI 25: Proceedings of the 2025 CHI Conference on Human Factors in Computing Systems',
  //     award: 'Honorable Mention Award',
  //     year: 2025,
  //     slug: null, // No link for manual entries
  //   },
];

const AwardsPage = ({ data }) => {
  const teamMembers = data.allTeamJson.nodes.reduce((acc, member) => {
    acc[member.name] = member;
    return acc;
  }, {});

  const findTeamMember = (name) => {
    const cleanName = name.replace(/[^a-zA-Z0-9]/g, '');
    return Object.entries(teamMembers).find(
      ([memberName, member]) =>
        memberName.replace(/[^a-zA-Z0-9]/g, '') === cleanName
    )?.[1];
  };

  // Get paper awards from publications
  const paperAwardsFromPublications = data.allMdx.nodes
    .filter((node) => node.frontmatter.award)
    .map((node) => ({
      title: node.frontmatter.subtitle
        ? `${node.frontmatter.title}: ${node.frontmatter.subtitle}`
        : node.frontmatter.title,
      authors: node.frontmatter.authors,
      venue: node.frontmatter.conference,
      award: node.frontmatter.award,
      year: node.frontmatter.year,
      slug: node.frontmatter.slug,
    }));

  // Combine and sort all paper awards by year (descending)
  const allPaperAwards = [
    ...manualPaperAwards,
    ...paperAwardsFromPublications,
  ].sort((a, b) => b.year - a.year);

  return (
    <MainLayout>
      <SEO
        title="Awards | SPICE Lab | Northwestern University"
        description="Awards and honors received by SPICE Lab members"
        pathname="/awards"
      />

      <h1>Awards</h1>

      <Section>
        <SectionTitle>Awards and Distinctions</SectionTitle>
        <AwardsList>
          {awardsData.map((award, index) => (
            <AwardItem key={index}>
              <AwardTitle>{award.title}</AwardTitle>
              <AwardMeta>
                <AwardYear>{award.year}</AwardYear>
                {award.members.map((member, idx) => {
                  const teamMember = findTeamMember(member);
                  const website = teamMember ? teamMember.website : null;
                  return (
                    <React.Fragment key={member}>
                      {idx > 0 && ', '}
                      {website ? (
                        <AuthorLink
                          href={website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {member}
                        </AuthorLink>
                      ) : (
                        <span>{member}</span>
                      )}
                    </React.Fragment>
                  );
                })}
              </AwardMeta>
            </AwardItem>
          ))}
        </AwardsList>
      </Section>

      <Section>
        <SectionTitle>Paper Awards</SectionTitle>
        <div>
          {allPaperAwards.map((paper, index) => (
            <PaperAwardItem key={index}>
              {paper.slug ? (
                <PaperTitleLink to={`/projects/${paper.slug}`}>
                  {paper.title}
                </PaperTitleLink>
              ) : (
                <PaperTitleText>{paper.title}</PaperTitleText>
              )}
              <PaperAuthors>
                {paper.authors.map((author, idx) => {
                  const teamMember = findTeamMember(author);
                  const website = teamMember ? teamMember.website : null;
                  return (
                    <React.Fragment key={author}>
                      {idx > 0 && ', '}
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
              </PaperAuthors>
              <PaperVenueWrapper>
                <PaperVenue>{paper.venue}</PaperVenue>
                <AwardBadge>{paper.award}</AwardBadge>
              </PaperVenueWrapper>
            </PaperAwardItem>
          ))}
        </div>
      </Section>
    </MainLayout>
  );
};

export const query = graphql`
  query AwardsQuery {
    allTeamJson {
      nodes {
        name
        website
      }
    }
    allMdx(
      filter: { frontmatter: { type: { eq: "project" }, award: { ne: null } } }
      sort: { frontmatter: { year: DESC } }
    ) {
      nodes {
        frontmatter {
          title
          subtitle
          authors
          conference
          award
          year
          slug
        }
      }
    }
  }
`;

export default AwardsPage;
