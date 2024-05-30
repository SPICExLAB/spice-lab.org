import React from 'react';
import styled from 'styled-components';
import MainLayout from '../components/MainLayout';
import LeafletMap from '../components/leafletmap';

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
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
      <ContactContainer>
        <Heading1>Contact Information</Heading1>
        <Location>
          <Heading2>Location</Heading2>
          {typeof window !== 'undefined' && <LeafletMap />}
        </Location>
      </ContactContainer>
    </MainLayout>
  );
};

export default ContactPage;
