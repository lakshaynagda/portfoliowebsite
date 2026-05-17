import React from 'react';
import styles from './Contact.module.css';
import data from '../../data/data.json';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhone, FaArrowRight, FaCalendarDays } from 'react-icons/fa6';

const Contact = () => {
  const { contact, personal } = data;

  return (
    <section id="contact" className={styles.contactSection}>
      {/* Background radial glow */}
      <div className={styles.backgroundGlow}></div>
      
      <div className={styles.container}>
        {/* Header Block */}
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="sectionLabel">Get In Touch</span>
          <h2 className={styles.headline}>{contact.headline}</h2>
          <p className={styles.subheadline}>{contact.subheadline}</p>
        </motion.div>

        {/* 2-Card Wrapper Grid */}
        <motion.div 
          className={styles.cardsWrapper}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* WhatsApp Card */}
          <a 
            href={personal.whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${styles.contactCard} ${styles.whatsappCard}`}
          >
            <div className="iconBox iconBoxGreen" style={{ marginBottom: '20px' }}>
              <FaWhatsapp />
            </div>
            <h3 className={styles.cardTitle}>Let's Chat on WhatsApp</h3>
            <p className={styles.cardSubtitle}>Reply within 1 hour · Free consultation</p>
            <div className="btnWhatsapp" style={{ width: '100%' }}>
              Open WhatsApp <FaArrowRight style={{ marginLeft: '6px' }} />
            </div>
          </a>

          {/* Calendly Strategy Call Card */}
          <a 
            href={personal.calendlyLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${styles.contactCard} ${styles.calendlyCard}`}
          >
            <div className="iconBox iconBoxPurple" style={{ marginBottom: '20px' }}>
              <FaCalendarDays />
            </div>
            <h3 className={styles.cardTitle}>Get on a Strategy Call</h3>
            <p className={styles.cardSubtitle}>Free 30-min call · No pitch, just clarity</p>
            <div className="btnPrimary" style={{ width: '100%' }}>
              Book Free Call <FaPhone style={{ marginLeft: '6px', fontSize: '13px' }} />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
