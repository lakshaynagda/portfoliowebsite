import React from 'react';
import styles from './Services.module.css';
import data from '../../data/data.json';
import { motion } from 'framer-motion';
import { FaCircleCheck } from 'react-icons/fa6';

const Services = () => {
  const { services } = data;
  const gradientAccents = [
    'linear-gradient(90deg, #38bdf8, #0ea5e9)',
    'linear-gradient(90deg, #818cf8, #6366f1)',
    'linear-gradient(90deg, #34d399, #10b981)'
  ];

  return (
    <section id="services" className={styles.servicesSection}>
      <div className={styles.container}>
        {/* Header Block */}
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="sectionLabel">Our Expertise</span>
          <h2 className={styles.headline}>{services.headline}</h2>
          <p className={styles.subheadline}>{services.subheadline}</p>
        </motion.div>

        {/* 3-Column Services Stack */}
        <div className={styles.grid}>
          {services.items.map((service, index) => (
            <motion.div 
              key={index}
              className={`${styles.card} glassCard`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.desc}</p>
                <ul className={styles.featureList}>
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className={styles.featureItem}>
                      <FaCircleCheck className={styles.checkIcon} />
                      <span className={styles.featureText}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Bottom Gradient Accent Border */}
              <div 
                className={styles.bottomAccent}
                style={{ background: gradientAccents[index % gradientAccents.length] }}
              ></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
