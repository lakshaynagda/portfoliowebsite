import { useRef } from 'react'
import { motion } from 'framer-motion'
import { FaEye, FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import data from '../../data/data.json'
import styles from './Projects.module.css'

export default function Projects() {
  const trackRef = useRef(null)

  const scrollLeft = () => {
    trackRef.current?.scrollBy({ left: -320, behavior: 'smooth' })
  }

  const scrollRight = () => {
    trackRef.current?.scrollBy({ left: 320, behavior: 'smooth' })
  }

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>

        {/* Heading */}
        <motion.div
          className={styles.heading}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>Our Work</span>
          <h2 className={styles.title}>{data.projects.headline}</h2>
          <p className={styles.subtitle}>{data.projects.subheadline}</p>
        </motion.div>

        {/* Scroll Controls — desktop only */}
        <div className={styles.controls}>
          <button className={styles.arrowBtn} onClick={scrollLeft} aria-label="Scroll left">
            <FaChevronLeft />
          </button>
          <button className={styles.arrowBtn} onClick={scrollRight} aria-label="Scroll right">
            <FaChevronRight />
          </button>
        </div>

      </div>

      {/* Cards Track — full width horizontal scroll */}
      <div className={styles.trackWrapper}>
        <div className={styles.track} ref={trackRef}>
          {data.projects.items.map((project, index) => (
            <motion.div
              key={project.id}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              {/* Thumbnail */}
              <div className={styles.thumbnail}>
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  loading="lazy"
                />
              </div>

              {/* Card Body */}
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.previewBtn}
                >
                  <FaEye />
                  Preview
                </a>
              </div>

            </motion.div>
          ))}
        </div>
      </div>

    </section>
  )
}
