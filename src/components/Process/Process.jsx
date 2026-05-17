import React from 'react';
import styles from './Process.module.css';
import data from '../../data/data.json';
import { motion } from 'framer-motion';
import { FaPhone } from 'react-icons/fa6';

const Process = () => {
  const { process } = data;

  return (
    <section id="process" className={styles.processSection}>
      <div className={styles.container}>
        {/* Header Block */}
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="sectionLabel">Our Workflow</span>
          <h2 className={styles.headline}>{process.headline}</h2>
          <p className={styles.subheadline}>{process.subheadline}</p>
        </motion.div>

        {/* Timeline roadmap layout */}
        <div className={styles.stepsWrapper}>
          {process.steps.map((step, index) => (
            <React.Fragment key={index}>
              {/* Connector line for mobile (placed before the card for proper left-side rendering) */}
              {index > 0 && (
                <div className={styles.mobileConnector}>
                  <div className={styles.verticalLine}></div>
                </div>
              )}

              <motion.div 
                className={`${styles.stepCard} glassCard`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                style={{ borderLeftColor: step.color }}
              >
                {/* Giant Watermark Number */}
                <div className={styles.watermark}>{step.number}</div>
                <div className={styles.cardContent}>
                  <h3 className={styles.title}>{step.title}</h3>
                  <div className={styles.subtitle}>{step.subtitle}</div>
                  <p className={styles.desc}>{step.desc}</p>
                </div>
              </motion.div>
              
              {/* Connector line for desktop (placed between cards) */}
              {index < process.steps.length - 1 && (
                <div className={styles.desktopConnector}>
                  <div className={styles.horizontalLine}></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Centered glass CTA button */}
        <motion.div 
          className={styles.ctaWrapper}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href="#contact" className="btnPrimary">
            <FaPhone style={{ marginRight: '8px' }} /> Start With a Free Call
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
