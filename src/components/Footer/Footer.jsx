import React from 'react';
import styles from './Footer.module.css';
import data from '../../data/data.json';
import {
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaWhatsapp
} from 'react-icons/fa6';

const Footer = () => {
  const { footer, personal, social, navbar } = data;

  const socialLinks = [
    { icon: <FaLinkedin />,  href: social.linkedin,  label: "LinkedIn"  },
    { icon: <FaInstagram />, href: social.instagram, label: "Instagram" },
    { icon: <FaEnvelope />,  href: social.email,     label: "Email"     },
    { icon: <FaWhatsapp />,  href: social.whatsapp,  label: "WhatsApp"  },
  ];

  return (
    <footer className={styles.footerSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Column 1: Logo & Socials */}
          <div className={styles.col1}>
            <div className={styles.logoWrapper}>
              <img
                src={personal.logo}
                alt={personal.logoAlt}
                className={styles.logoImg}
              />
              <span className={styles.logoText}>{personal.name}</span>
            </div>
            <p className={styles.tagline}>{footer.tagline}</p>

            {/* Social Glass Circles */}
            <div className={styles.socialRow}>
              {socialLinks.map((link, idx) => (
                <a 
                  key={idx}
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={link.label === "WhatsApp" ? `${styles.socialIcon} ${styles.whatsappIcon}` : styles.socialIcon} 
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
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
