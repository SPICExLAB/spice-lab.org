import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import MainLayout from '../components/MainLayout';
import SEO from '../components/SEO';


const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const PiSection = styled.div`
  margin: 3rem 0;
  padding: 2rem 0;

  @media (max-width: 768px) {
    margin: 0;
    padding: 0;
  }
`;

const PiInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: stretch;
  }
`;

const PiImageWrapper = styled.div`
  margin-bottom: 2rem;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 1;

  @media (min-width: 768px) {
    margin-right: 3rem;
    margin-bottom: 0;
    width: auto;
    height: 80%;
    flex-basis: 0;
    flex-grow: 1;
    max-width: min(100%, 400px);
  }
`;

const StyledPiPhoto = styled(GatsbyImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;


const PiPhoto = styled(StyledPiPhoto)`
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(78, 42, 132, 0.4);
  }
`;


const PiDetails = styled.div`
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
    flex: 2;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #000;
    &:hover,
    &:focus {
      color: #4e2a84;
    }
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    text-align: justify;
  }

  @media (max-width: 768px) {
    p {
      font-size: 0.9rem;
      line-height: 1.4;
    }
  }

  a {
    color: #000;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s ease;
  }
`;

const Section = styled.div`
  margin-bottom: 4rem;
`;

const Grid = styled.div`
  display: grid;
  gap: ${(props) => props.$gap || '2rem'};
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(
      ${(props) => props.$mdCols || 3},
      minmax(0, 1fr)
    );
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(
      ${(props) => props.$lgCols || 4},
      minmax(0, 1fr)
    );
  }
`;


const MemberCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(78, 42, 132, 0.4);
  }
`;


const Link = styled.a`
  color: inherit;
  text-decoration: none;
  font-weight: ${(props) => props.$weight || 'normal'};
  font-size: ${(props) => props.$size || '1rem'};
  transition: color 0.2s;

  &:hover {
    color: #4e2a84;
  }
`;

const Interests = styled.p`
  text-align: justify;
  margin-top: 0.5rem;
  color: #666;
`;

const MemberLink = styled(Link)`
  padding: 0.8rem 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s, transform 0.2s;
  display: block;
  width: 100%;

  &:hover {
    background-color: #eee;
    transform: translateY(-2px);
  }
`;

const TeamPage = ({ data }) => {
  const allMembers = data.allTeamJson.nodes.filter((node) => node && node.name);

  const pi = allMembers.find(
    (person) => person.role === 'Principal Investigator'
  );
  const phds = allMembers.filter(
    (person) => person.active && person.role === 'PhD Student'
  );

  const sortByRole = (a, b) => {
    if (a.active !== b.active) return b.active - a.active;

    const roleOrder = {
      'Research Associate': 1,
      "Master's Researcher": 2,
      'Undergrad Researcher': 3,
    };
    return (roleOrder[a.role] || 99) - (roleOrder[b.role] || 99);
  };

  const otherMembers = allMembers
    .filter(
      (person) =>
        person.role !== 'Principal Investigator' &&
        person.role !== 'PhD Student'
    )
    .sort(sortByRole);

  return (
    <MainLayout>
      <SEO
        title="Team | SPICE Lab | Northwestern University"
        description="Meet our team"
        pathname="/team"
      />

      {pi && (
        <PiSection>
          <PiInfo>
            <PiImageWrapper>
              <a href={pi.website} target="_blank" rel="noopener noreferrer">
                {pi.fields?.memberImage && (
                  <PiPhoto
                    image={getImage(pi.fields.memberImage)}
                    alt={pi.name}
                  />
                )}
              </a>
            </PiImageWrapper>
            <PiDetails>
              <a href={pi.website} target="_blank" rel="noopener noreferrer">
                <h2>{pi.name}</h2>
              </a>
              <p>
                Karan is the Lisa Wissner-Slivka and Benjamin Slivka Assistant
                Professor in Computer Science at Northwestern University where
                he directs the Sensing, Perception, Interactive Computing and
                Experiences (SPICE) Lab. His research interests are in the areas
                of Machine Learning and Sensing, Ubiquitous Computing and
                Human-Computer Interaction. He received his Ph.D. in
                Human-Computer Interaction from Carnegie Mellon University in
                2023 and B.Tech. in Computer Science in 2017. Karan is a
                recipient of the Forbes 30 under 30 (2024), MIT 35 innovators
                under 35 Asia Pacific (2024), ACM SIGCHI Outstanding
                Dissertation Award (2024), and Siebel Fellowship (2022).
              </p>
            </PiDetails>
          </PiInfo>
        </PiSection>
      )}

      {phds.length > 0 && (
        <Section>
          <SectionTitle>PhD Students</SectionTitle>
          <Grid>
            {phds.map((person) => (
              <MemberCard key={person.name}>
                <Link
                  href={person.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ImageWrapper>
                    {person.fields?.memberImage && (
                      <StyledPiPhoto
                        image={getImage(person.fields.memberImage)}
                        alt={person.name}
                      />
                    )}
                  </ImageWrapper>
                </Link>
                <Link
                  href={person.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  $weight="600"
                  $size="1.25rem"
                >
                  {person.name}
                </Link>
                <Interests>{person.blurb}</Interests>
              </MemberCard>
            ))}
          </Grid>
        </Section>
      )}

      {otherMembers.length > 0 && (
        <Section>
          <SectionTitle>
            Graduate, Undergrad, Visiting Researchers & Alumni
          </SectionTitle>
          <Grid $lgCols={4} $gap="1rem">
            {otherMembers.map((person) => (
              <MemberLink
                key={person.name}
                href={
                  person.website
                    ? person.website.includes('linkedin.com')
                      ? `https://${person.website}`
                      : person.website
                    : `mailto:${person.email}`
                }
                target={person.website ? '_blank' : '_self'}
                rel={person.website ? 'noopener noreferrer' : undefined}
              >
                {person.name}
              </MemberLink>
            ))}
          </Grid>
        </Section>
      )}
    </MainLayout>
  );
};

export const query = graphql`
  query {
    allTeamJson {
      nodes {
        active
        name
        role
        blurb
        website
        email
        program
        fields {
          memberImage {
            childImageSharp {
              gatsbyImageData(
                width: 400
                height: 400
                placeholder: BLURRED
                transformOptions: { fit: COVER, cropFocus: CENTER }
              )
            }
          }
        }
        key_Interests
      }
    }
  }
`;

export default TeamPage;
