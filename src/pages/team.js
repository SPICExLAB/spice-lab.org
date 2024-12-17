import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import SEO from '../components/SEO';
import MainLayout from '../components/MainLayout';
import MemberCard from '../components/memberCard';

const PiSection = styled.div`
  margin: 5rem 0;
  padding: 3rem 0;

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
    align-items: flex-start;
  }
`;

const PiImageWrapper = styled.div`
  margin-bottom: 2rem;
  width: 100%;
  max-width: 300px;

  @media (min-width: 768px) {
    margin-right: 3rem;
    margin-bottom: 0;
  }
`;

const PiPhoto = styled(GatsbyImage)`
  width: 100%;
  height: auto;
  border-radius: 50%;
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
    flex: 1;
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

const MemberSection = styled.div`
  margin-bottom: 3rem;
`;

const MemberGrid = styled.div`
  display: grid;
  gap: 2rem;
  justify-content: start;

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const JustifiedParagraph = styled.p`
  text-align: justify;
  color: #555;
  font-size: 1rem;
  margin-bottom: 10px;
  line-height: 1.6;
`;

const FormerMemberGrid = styled(MemberGrid)`
  justify-content: start;
  @media (max-width: 767px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }
`;

const StyledMemberCard = styled(MemberCard)`
  .member-name {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
`;

const PeoplePage = ({ data }) => {
  const allMembers = data.allTeamJson.nodes.filter((node) => node && node.name);

  const pi = allMembers.find(
    (person) => person.role === 'Principal Investigator'
  );

  const sortMembers = (a, b) => {
    const priorityRoles = ['Post-doc', 'PhD Student', 'Research Associate'];
    const aIndex = priorityRoles.indexOf(a.role);
    const bIndex = priorityRoles.indexOf(b.role);

    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return 0;
  };

  const graduateMembers = allMembers
    .filter(
      (person) =>
        person.active &&
        (person.role === 'PhD Student' ||
          person.role === 'Research Associate' ||
          person.role === "Master's Researcher")
    )
    .sort(sortMembers);

  const undergraduateMembers = allMembers
    .filter((person) => person.active && person.role === 'Undergrad Researcher')
    .sort((a, b) => a.name.localeCompare(b.name));

  const formerMembers = allMembers
    .filter(
      (person) => !person.active && person.role !== 'Principal Investigator'
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <MainLayout>
      <SEO
        title="Team | SPICE Lab | Northwestern University"
        description="Meet our team"
        pathname="/team"
      />

      <h1>Team</h1>
      {pi && (
        <PiSection>
          <PiInfo>
            <PiImageWrapper>
              <a href={pi.website} target="_blank" rel="noopener noreferrer">
                {pi.fields.memberImage && (
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
      <MemberSection>
        <h2>Graduate Members</h2>
        <MemberGrid>
          {graduateMembers.map((person) => (
            <MemberCard
              key={person.name}
              person={person}
              showRole={person.role !== "Master's Researcher"}
            />
          ))}
        </MemberGrid>
      </MemberSection>
      <MemberSection>
        <h2>Undergraduate Members</h2>
        <MemberGrid>
          {undergraduateMembers.map((person) => (
            <MemberCard key={person.name} person={person} showRole={false} />
          ))}
        </MemberGrid>
      </MemberSection>
      {formerMembers.length > 0 && (
        <MemberSection>
          <h2>Alumni</h2>
          <FormerMemberGrid>
            {formerMembers.map((person) => (
              <MemberCard key={person.name} person={person} showRole={false} />
            ))}
          </FormerMemberGrid>
        </MemberSection>
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
        website
        fields {
          memberImage {
            childImageSharp {
              gatsbyImageData(
                layout: FULL_WIDTH
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

export default PeoplePage;
