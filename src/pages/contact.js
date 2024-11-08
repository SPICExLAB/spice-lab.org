import React from 'react';
import styled from 'styled-components';
import SEO from '../components/SEO';
import MainLayout from '../components/MainLayout';

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Section = styled.section`
  margin-top: 20px;
  line-height: 1.6;
`;

const Paragraph = styled.p`
  color: #555;
  font-size: 1rem;
  margin-bottom: 10px;
`;

const Link = styled.a`
  color: #0066cc;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const MapWrapper = styled.div`
  margin-top: 20px;
  height: 470px;
  width: 100%;
  position: relative;

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const ContactPage = () => {
  return (
    <MainLayout>
      <SEO
        title="Contact | SPICE Lab | Northwestern University"
        description="Welcome to visite SPICE Lab!"
        pathname="/Contact"
      />

      <ContactContainer>
        <h1>Contact Information</h1>
        <Paragraph>
          Email to Prof. Karan Ahuja at{' '}
          <Link href="mailto:kahuja@northwestern.edu">
            kahuja@northwestern.edu
          </Link>{' '}
          for more information.
        </Paragraph>
        <Paragraph>
          If you are interested in contributing to research in our lab, fill out
          this{' '}
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSfdsRPRKL-OeMzpjaTii07FaCXI6PYzyzHrRX0w0jVXmdwdcg/viewform"
            target="_blank"
            rel="noopener noreferrer"
          >
            form
          </Link>
          .
        </Paragraph>

        <Section>
          <h2>Location</h2>
          <Paragraph>
            SPICE Lab is located in room 3546 of the Mudd Building (the lower
            pin on the map). <br></br>Visitor parking is available at the North
            Campus Parking Garage (the upper pin on the map).
          </Paragraph>

          <MapWrapper>
            <iframe
              src="https://www.google.com/maps/embed/v1/search?key=AIzaSyDBAtFu9ky96hEcRc-3yBqP4eDNUDxWI44&q=2311+N+Campus+Dr+%232300,+Evanston,+IL+60208|2233+Tech+Dr,+Evanston,+IL+60208&center=42.058982,-87.673500&zoom=17"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </MapWrapper>
        </Section>
      </ContactContainer>
    </MainLayout>
  );
};

export default ContactPage;
