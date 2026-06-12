import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaEye, FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import data from '../../data/data.json'
import styles from './Projects.module.css'

export default function Projects() {
  const [activeTab, setActiveTab] = useState('Websites') // default = Websites
  const trackRef = useRef(null)

  const categories = data.projects.categories // ["Websites", "Apps", "Automation"]

  // Filter projects by active tab
  const filtered = data.projects.items.filter(p => p.category === activeTab)

  const scrollLeft  = () => trackRef.current?.scrollBy({ left: -300, behavior: 'smooth' })
  const scrollRight = () => trackRef.current?.scrollBy({ left: 300,  behavior: 'smooth' })

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

        {/* Filter Tabs + Arrow buttons row */}
        <div className={styles.controlsRow}>

          {/* Tabs */}
          <div className={styles.tabs}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`${styles.tab} ${activeTab === cat ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Arrow buttons — desktop only */}
          <div className={styles.arrows}>
            <button className={styles.arrowBtn} onClick={scrollLeft}  aria-label="Scroll left">
              <FaChevronLeft />
            </button>
            <button className={styles.arrowBtn} onClick={scrollRight} aria-label="Scroll right">
              <FaChevronRight />
            </button>
          </div>

        </div>
      </div>

      {/* Cards track */}
      <div className={styles.trackWrapper}>
        <div className={styles.track} ref={trackRef}>

          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              filtered.map((project, index) => (
                <motion.div
                  key={project.id}
                  className={styles.card}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                >
                  {/* Thumbnail */}
                  <div className={styles.thumbnail}>
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      loading="lazy"
                    />
                  </div>

                  {/* Card body */}
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{project.title}</h3>

                    {/* Subtext — only show if not empty */}
                    {project.subtext && project.subtext.trim() !== '' && (
                      <p className={styles.cardSubtext}>{project.subtext}</p>
                    )}

                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.previewBtn}
                    >
                      <FaEye /> Preview
                    </a>
                  </div>

                </motion.div>
              ))
            ) : (
              /* Empty state for Apps + Automation */
              <motion.div
                className={styles.emptyState}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.emptyIcon}>🚀</div>
                <h3 className={styles.emptyTitle}>Coming Soon</h3>
                <p className={styles.emptyDesc}>
                  We're currently building out this section.<br />
                  Check back soon or <a href="#contact">get in touch</a>.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

    </section>
  )
}
