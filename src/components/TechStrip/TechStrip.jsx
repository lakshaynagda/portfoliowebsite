import React from 'react';
import styles from './TechStrip.module.css';
import data from '../../data/data.json';
import * as SiIcons from 'react-icons/si';

const TechStrip = () => {
  const { techStack } = data;

  // Duplicate the array to create a seamless infinite scroll loop
  const duplicatedTechStack = [...techStack, ...techStack];

  return (
    <section className={styles.stripSection}>
      <div className={styles.labelRow}>
        <span>Technologies We Use</span>
      </div>
      
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack}>
          {duplicatedTechStack.map((tech, index) => {
            const Icon = SiIcons[tech.iconName];
            return (
              <div key={`${tech.name}-${index}`} className={styles.techItem}>
                {Icon && <Icon style={{ color: tech.color }} className={styles.icon} />}
                <span className={styles.techName}>{tech.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStrip;
