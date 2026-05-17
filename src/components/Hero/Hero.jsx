import React from 'react';
import styles from './Hero.module.css';
import data from '../../data/data.json';
import { motion } from 'framer-motion';
import { FaBolt, FaArrowRight } from 'react-icons/fa6';

const Hero = () => {
  const { personal, stats } = data;

  return (
    <section id="hero" className={styles.heroSection}>
      <div className={`${styles.container} gridTexture`}>
        {/* Left/Main Column */}
        <motion.div 
          className={styles.leftColumn}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Badges container */}
          <div className={styles.badgesWrapper}>
            <span className={styles.availabilityBadge}>
              <span className={styles.pulseDot}></span>
              <FaBolt className={styles.boltIcon} />
              {personal.availability}
            </span>
            <span className={styles.customCodeBadge}>
              {personal.customCodeBadge}
            </span>
          </div>

          <h1 className={styles.headline}>
            We Build Digital<br />
            Systems That Turn<br />
            <span className={styles.gradientText}>Visitors Into Clients</span>
          </h1>

          <p className={styles.subheadline}>
            {personal.subtagline}
          </p>

          <div className={styles.ctaGroup}>
            <a href="#contact" className="btnPrimary">
              Get Free Strategy Call <FaArrowRight />
            </a>
            <a href="#projects" className="btnSecondary">
              See Our Work
            </a>
          </div>

          {/* Stats 2x2 grid */}
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className={`${styles.statCard} glassCard`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Column - Desktop Only */}
        <motion.div 
          className={styles.rightColumn}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className={styles.imageWrapper}>
            {/* Animated Glow Blob */}
            <div className={styles.blobGlow}></div>
            <img 
              src={personal.heroImage} 
              alt={personal.name} 
              className={styles.heroImage} 
              loading="eager"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
