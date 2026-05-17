import React from 'react';
import styles from './PainPoints.module.css';
import data from '../../data/data.json';
import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa6';

const PainPoints = () => {
  const { painPoints } = data;

  return (
    <section id="pain-points" className={styles.painSection}>
      <div className={styles.container}>
        {/* Header Block */}
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="sectionLabel">Challenges</span>
          <h2 className={styles.headline}>{painPoints.headline}</h2>
          <p className={styles.subheadline}>{painPoints.subheadline}</p>
        </motion.div>

        {/* Grid Block */}
        <div className={styles.grid}>
          {painPoints.points.map((point, index) => (
            <motion.div 
              key={index}
              className={`${styles.card} glassCard`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className={styles.cardTitle}>{point.title}</h3>
              <p className={styles.cardDesc}>{point.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Transition / Callout Link at Bottom */}
        <motion.div 
          className={styles.transitionWrapper}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href="#services" className={styles.transitionLink}>
            {painPoints.transitionText} <FaArrowDown className={styles.bounceIcon} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PainPoints;
