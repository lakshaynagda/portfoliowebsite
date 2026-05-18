import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import data from '../../data/data.json';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaXmark } from 'react-icons/fa6';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { navbar } = data;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active nav links
  useEffect(() => {
    const sections = navbar.links.map(link => link.href.substring(1));
    const observers = [];

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the middle portion
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [navbar.links]);

  return (
    <>
      <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <div className={styles.left}>
            <a href="#hero" className={styles.logoWrapper}>
              <img
                src={data.personal.logo}
                alt={data.personal.logoAlt}
                className={styles.logoImg}
              />
            </a>
          </div>

          <nav className={styles.center}>
            {navbar.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`${styles.navLink} ${activeSection === link.href.substring(1) ? styles.active : ''}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className={styles.right}>
            <a href={navbar.ctaHref} className="btnPrimary">
              {navbar.ctaLabel}
            </a>
            <button 
              className={styles.hamburger}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={styles.mobileOverlay}
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
          >
            <button 
              className={styles.closeButton}
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <FaXmark />
            </button>
            <nav className={styles.mobileNav}>
              {navbar.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={styles.mobileNavLink}
                >
                  {link.label}
                </a>
              ))}
              <a 
                href={navbar.ctaHref} 
                className={`btnPrimary ${styles.mobileCtaButton}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {navbar.ctaLabel}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
