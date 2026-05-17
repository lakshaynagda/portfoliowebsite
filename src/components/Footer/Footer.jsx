import React from 'react';
import styles from './Footer.module.css';
import data from '../../data/data.json';
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaXTwitter,
  FaWhatsapp
} from 'react-icons/fa6';

const Footer = () => {
  const { footer, personal, social, navbar } = data;

  return (
    <footer className={styles.footerSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Column 1: Logo & Socials */}
          <div className={styles.col1}>
            <div className={styles.logoWrapper}>
              <div className={styles.logoBox}>{navbar.logo}</div>
              <span className={styles.logoText}>{personal.name}</span>
            </div>
            <p className={styles.tagline}>{footer.tagline}</p>

            {/* Social Glass Circles */}
            <div className={styles.socialRow}>
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href={social.instagram} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href={social.twitter} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Twitter">
                <FaXTwitter />
              </a>
              <a href={personal.whatsappLink} target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.whatsappIcon}`} aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
        </div>

        {/* Bottom copyright centered */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>{footer.copyright}</p>
          <p className={styles.madeWith}>{footer.madeWith}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
