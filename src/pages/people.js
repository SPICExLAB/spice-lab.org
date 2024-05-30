import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import MainLayout from '../components/MainLayout';
import MemberCard from '../components/memberCard';
import * as styles from '../components/people.module.css';
import twitterIcon from '../images/twitter.svg';
import scholarIcon from '../images/google-scholar.svg';
import linkedinIcon from '../images/linkedin-in.svg';

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

  return (
    <MainLayout>
      <h1>People</h1>
      <div className={styles.piSection}>
        <div className={styles.piInfo}>
          <div className={styles.piImageWrapper}>
            <a href={pi.website} target="_blank" rel="noopener noreferrer">
              {pi.fields.memberImage && (
                <GatsbyImage
                  image={getImage(pi.fields.memberImage)}
                  alt={pi.name}
                  className={styles.piPhoto}
                />
              )}
            </a>
          </div>
          <div className={styles.piDetails}>
            <h3>{pi.name}</h3>
            <p>
              I am an incoming Wissner Slivka Assistant Professor in Computer
              Science at Northwestern University (Fall 2024). My research
              develops novel, practical and deployable Machine Learning and
              Sensing systems that aim to overcome challenges in high-impact
              application areas of extended reality (XR), natural user
              interfaces, and health sensing.
            </p>
            <p>{pi.program}</p>

            <div className={styles.piSocialLinks}>
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
            </div>
          </div>
        </div>
      </div>
      <div className={styles.memberSection}>
        <h2>Current Members</h2>
        <div className={styles.memberGrid}>
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
        </div>
      </div>
      <div className={styles.memberSection}>
        <h2>Former Members</h2>
        <div className={styles.memberGrid}>
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
        </div>
      </div>
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
