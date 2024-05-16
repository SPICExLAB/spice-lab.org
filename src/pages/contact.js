import React from 'react';
import MainLayout from '../components/MainLayout';
import LeafletMap from '../components/leafletmap';
import * as styles from '../components/contact.module.css';

const ContactPage = () => {
  return (
    <MainLayout>
      <div className={styles.contactContainer}>
        <h1>Contact Information</h1>
        <section className={styles.location}>
          <h2>Location</h2>
          {typeof window !== 'undefined' && <LeafletMap />}
        </section>
      </div>
    </MainLayout>
  );
};

export default ContactPage;
