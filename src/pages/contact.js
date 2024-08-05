import React from 'react';
import styled from 'styled-components';
import SEO from '../components/SEO';
import MainLayout from '../components/MainLayout';
import LeafletMap from '../components/leafletmap';

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0;
`;

const Location = styled.section`
  margin-top: 20px;
`;

const Heading1 = styled.h1`
  color: #333;
`;

const Heading2 = styled.h2`
  color: #333;
`;

const ContactPage = () => {
  return (
    <MainLayout>
      <SEO
        title="Contact | SPICE Lab | Northwestern University"
        description="Welcome to join us and valuable collborations!"
        pathname="/Contact"
      />

      <ContactContainer>
        <Heading1>Contact Information</Heading1>
        <p>Email to xxx</p>
        <p>Interested in research: xxx</p>
        <Location>
          <Heading2>Location</Heading2>
          <p>Mailing address xxx</p>
          {typeof window !== 'undefined' && <LeafletMap />}
        </Location>
        <Heading2>Direction</Heading2>
        <p>where to park xxx, and how to get in xxx</p>
      </ContactContainer>
    </MainLayout>
  );
};

export default ContactPage;
