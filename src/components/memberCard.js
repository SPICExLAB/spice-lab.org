import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled, { css } from 'styled-components';

const MemberCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

const MemberImageWrapper = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin-bottom: 1rem;

  ${(props) =>
    props.$isPi &&
    css`
      width: 300px;
      height: 300px;
    `}
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
  padding: 0.2rem 0.6rem;
  border-radius: 10px;
  font-size: 0.7rem;
  z-index: 2;
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



const MemberCard = ({ person }) => {
  const isPi = person.role === 'Principal Investigator';

  return (
    <MemberCardWrapper>
      <MemberImageWrapper $isPi={isPi}>
        <a href={person.website} target="_blank" rel="noopener noreferrer">
          {person.fields.memberImage && (
            <MemberPhoto
              image={getImage(person.fields.memberImage)}
              alt={person.name}
            />
          )}
        </a>
        <MemberRole>{person.role}</MemberRole>
      </MemberImageWrapper>
      <MemberDetails>
        <a href={person.website} target="_blank" rel="noopener noreferrer">
          <h3>{person.name}</h3>
        </a>
        {/* <p>{person.email}</p> */}
      </MemberDetails>
    </MemberCardWrapper>
  );
};

export default MemberCard;
