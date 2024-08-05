import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import SEO from '../components/Seo';
import MainLayout from '../components/MainLayout';
import MemberCard from '../components/memberCard';

const PiSection = styled.div`
  margin: 5rem 0;
  padding: 3rem 0;
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

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  @media (min-width: 481px) and (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 769px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const PeoplePage = ({ data }) => {
  const pi = data.allTeamJson.nodes.find(
    (person) => person.role === 'Principal Investigator'
  );
  const currentPostDocs = data.allTeamJson.nodes.filter(
    (person) => person.role === 'Post-doc' && person.active
  );
  const currentPhDs = data.allTeamJson.nodes.filter(
    (person) => person.role === 'PhD Student' && person.active
  );
  const currentResearchAssistants = data.allTeamJson.nodes.filter(
    (person) => person.role === 'Research Assistant' && person.active
  );
  const currentMasters = data.allTeamJson.nodes.filter(
    (person) => person.role === 'Masters Student' && person.active
  );
  const currentUndergrads = data.allTeamJson.nodes.filter(
    (person) => person.role === 'Undergraduate Student' && person.active
  );
  const currentothers = data.allTeamJson.nodes.filter(
    (person) =>
      person.active &&
      ![
        'Principal Investigator',
        'Post-doc',
        'PhD Student',
        'Research Assistant',
        'Masters Student',
        'Undergraduate Student',
      ].includes(person.role)
  );
  const formerPostDocs = data.allTeamJson.nodes.filter(
    (person) => person.role === 'Post-doc' && !person.active
  );
  const formerPhDs = data.allTeamJson.nodes.filter(
    (person) => person.role === 'PhD Student' && !person.active
  );
  const formerResearchAssistants = data.allTeamJson.nodes.filter(
    (person) => person.role === 'Research Assistant' && !person.active
  );
  const formerMasters = data.allTeamJson.nodes.filter(
    (person) => person.role === 'Masters Student' && !person.active
  );
  const formerUndergrads = data.allTeamJson.nodes.filter(
    (person) => person.role === 'Undergraduate Student' && !person.active
  );
  const otherFormerMembers = data.allTeamJson.nodes.filter(
    (person) =>
      !person.active &&
      ![
        'Principal Investigator',
        'Post-doc',
        'PhD Student',
        'Research Assistant',
        'Masters Student',
        'Undergraduate Student',
      ].includes(person.role)
  );

  const hasFormerMembers =
    formerPostDocs.length > 0 ||
    formerPhDs.length > 0 ||
    formerResearchAssistants.length > 0 ||
    formerMasters.length > 0 ||
    formerUndergrads.length > 0 ||
    otherFormerMembers.length > 0;

  return (
    <MainLayout>
      <SEO
        title="Team | SPICE Lab | Northwestern University"
        description="Meet our team"
        pathname="/team"
      />

      <h1>Team</h1>
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
              Professor in Computer Science at Northwestern University where he
              directs the Sensing, Perception, Interactive Computing and
              Experiences (SPICE) Lab. His research interests are in the areas
              of Machine Learning and Sensing, Ubiquitous Computing and
              Human-Computer Interaction. He received his Ph.D. in
              Human-Computer Interaction from Carnegie Mellon University in 2023
              and B.Tech. in Computer Science in 2017. Karan is a recipient of
              the Forbes 30 under 30 (2024), ACM SIGCHI Outstanding Dissertation
              Award (2024), and Siebel Fellowship (2022).
            </p>
          </PiDetails>
        </PiInfo>
      </PiSection>
      <MemberSection>
        <h2>Current Members</h2>
        <MemberGrid>
          {currentPostDocs.map((person) => (
            <MemberCard key={person.name} person={person} />
          ))}
          {currentPhDs.map((person) => (
            <MemberCard key={person.name} person={person} />
          ))}
          {currentResearchAssistants.map((person) => (
            <MemberCard key={person.name} person={person} />
          ))}
          {currentMasters.map((person) => (
            <MemberCard key={person.name} person={person} />
          ))}
          {currentUndergrads.map((person) => (
            <MemberCard key={person.name} person={person} />
          ))}
          {currentothers.map((person) => (
            <MemberCard key={person.name} person={person} />
          ))}
        </MemberGrid>
      </MemberSection>
      {hasFormerMembers && (
        <MemberSection>
          <h2>Former Members</h2>
          <MemberGrid>
            {formerPostDocs.map((person) => (
              <MemberCard key={person.name} person={person} />
            ))}
            {formerPhDs.map((person) => (
              <MemberCard key={person.name} person={person} />
            ))}
            {formerResearchAssistants.map((person) => (
              <MemberCard key={person.name} person={person} />
            ))}
            {formerMasters.map((person) => (
              <MemberCard key={person.name} person={person} />
            ))}
            {formerUndergrads.map((person) => (
              <MemberCard key={person.name} person={person} />
            ))}
            {otherFormerMembers.map((person) => (
              <MemberCard key={person.name} person={person} />
            ))}
          </MemberGrid>
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
      }
    }
  }
`;

export default PeoplePage;
