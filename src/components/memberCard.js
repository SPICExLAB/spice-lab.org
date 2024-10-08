import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled, { css } from 'styled-components';

const MemberCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const MemberImageWrapper = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin-bottom: 1rem;
  border-radius: 50%;

  transition: box-shadow 0.3s ease;

  ${(props) =>
    props.$isPi &&
    css`
      width: 300px;
      height: 300px;
    `}

  ${MemberCardWrapper}:hover & {
    box-shadow: 0 5px 15px rgba(78, 42, 132, 0.4);
  }
`;

const MemberPhoto = styled(GatsbyImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  object-position: center;
`;

const MemberRole = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #eee;
  color: #333;
  padding: 0.2rem 0.6rem;
  border-radius: 10px;
  font-size: 0.7rem;
  z-index: 2;
  transition: background-color 0.3s ease, color 0.3s ease;

  ${MemberCardWrapper}:hover & {
    background-color: #4e2a84;
    color: white;
  }
`;

const MemberDetails = styled.div`
  align-items: center;
  h3 {
    margin: 0.5rem 0 0.2rem 0;
    font-size: 1.2rem;
  }

  p {
    margin: 0;
    font-size: 0.8rem;
  }

  a {
    color: inherit;
    transition: color 0.3s, text-decoration 0.3s;
    text-decoration: none;

    &:hover {
      color: #4e2a84;
    }
  }
`;

const MemberCard = ({ person, className, showRole = true }) => {
  const isPi = person.role === 'Principal Investigator';
  const memberImage =
    person.fields && person.fields.memberImage
      ? getImage(person.fields.memberImage)
      : null;

  return (
    <MemberCardWrapper className={className}>
      <MemberImageWrapper $isPi={isPi}>
        <a href={person.website} target="_blank" rel="noopener noreferrer">
          {memberImage ? (
            <MemberPhoto image={memberImage} alt={person.name} />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#f0f0f0',
                borderRadius: '50%',
              }}
            />
          )}
        </a>
        {showRole && person.role && <MemberRole>{person.role}</MemberRole>}
      </MemberImageWrapper>
      <MemberDetails>
        <a href={person.website} target="_blank" rel="noopener noreferrer">
          <h3>{person.name}</h3>
        </a>
        <p>{person.key_Interests}</p>
      </MemberDetails>
    </MemberCardWrapper>
  );
};

export default MemberCard;
