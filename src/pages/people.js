import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import SEO from '../components/SEO';
import MainLayout from '../components/MainLayout';
import MemberCard from '../components/memberCard';
import twitterIcon from '../images/twitter.svg';
import scholarIcon from '../images/google-scholar.svg';
import linkedinIcon from '../images/linkedin-in.svg';

const PiSection = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
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
  margin-bottom: 1rem;
  width: 100%;
  max-width: 250px;

  @media (min-width: 768px) {
    margin-right: 2rem;
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

  a {
    color: inherit;
    transition: color 0.3s, text-decoration 0.3s;
    text-decoration: none;
    &:hover {
      color: #663299;
    }
  }
  h3 {
    font-size: 1.2rem;
    margin-top: 0;
  }

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const PiSocialLinks = styled.div`
  margin-top: 1rem;

  a {
    margin-right: 1rem;
  }

  img {
    &:nth-child(1) {
      width: 24px;
      height: 24px;
    }

    &:nth-child(2) {
      width: 22px;
      height: 28px;
    }

    &:nth-child(3) {
      width: 28px;
      height: 28px;
    }

    &:nth-child(4) {
      width: 21px;
      height: 28px;
    }
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
        description="Meet our teammembers"
        pathname="/people"
      />

      <h1>People</h1>
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
              <h3>{pi.name}</h3>
            </a>
            <p>
              I am an incoming Wissner Slivka Assistant Professor in Computer
              Science at Northwestern University (Fall 2024). My research
              develops novel, practical and deployable Machine Learning and
              Sensing systems that aim to overcome challenges in high-impact
              application areas of extended reality (XR), natural user
              interfaces, and health sensing.
            </p>
            <p>{pi.program}</p>

            <PiSocialLinks>
              <p>{pi.email}</p>
              <a
                href="https://twitter.com/realkaranahuja"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={twitterIcon} alt="Twitter" />
              </a>
              <a
                href="https://scholar.google.com/citations?user=zXVYC5AAAAAJ&h"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={scholarIcon} alt="Google Scholar" />
              </a>
              <a
                href="https://www.linkedin.com/in/karanahujax"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={linkedinIcon} alt="LinkedIn" />
              </a>
            </PiSocialLinks>
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
        email
        name
        program
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
