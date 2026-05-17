import React, { useState, useEffect, useRef } from 'react';
import styles from './Testimonials.module.css';
import data from '../../data/data.json';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const Testimonials = () => {
  const { testimonials } = data;
  const videos = testimonials.videos;
  const totalVideos = videos.length;
  
  const [activeIndex, setActiveIndex] = useState(2); // Default to middle card (Arjun) on desktop
  const [currentDotIndex, setCurrentDotIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper to compute relative offset for the 5-card carousel
  const getRelativeOffset = (index, active) => {
    let diff = index - active;
    while (diff < -2) diff += totalVideos;
    while (diff > 2) diff -= totalVideos;
    return diff;
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalVideos) % totalVideos);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalVideos);
  };

  // Mobile scroll dot tracker
  const handleMobileScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = 234; // card width (220px) + gap (14px)
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentDotIndex(Math.max(0, Math.min(newIndex, totalVideos - 1)));
    }
  };

  const handleDotClick = (index) => {
    if (scrollRef.current) {
      const cardWidth = 234;
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setCurrentDotIndex(index);
    }
  };

  // Video hover trigger for Desktop
  const handleVideoHover = (id, play) => {
    if (isMobile) return;
    const video = document.getElementById(`video-${id}`);
    if (video) {
      if (play) {
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  };

  // Video tap trigger for Mobile
  const handleVideoTap = (id) => {
    if (!isMobile) {
      // Desktop click centers the card
      const index = videos.findIndex(v => v.id === id);
      setActiveIndex(index);
      return;
    }

    const video = document.getElementById(`video-${id}`);
    if (video) {
      if (video.paused) {
        // Pause all other videos
        videos.forEach(v => {
          if (v.id !== id) {
            const otherVid = document.getElementById(`video-${v.id}`);
            if (otherVid) otherVid.pause();
          }
        });
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }
  };

  // Inline layout parameters based on relative index offset
  const getDesktopCardStyles = (offset) => {
    switch (offset) {
      case 0: // CENTER - GLOW
        return {
          width: '280px',
          height: '500px',
          x: 0,
          scale: 1.05,
          opacity: 1,
          zIndex: 10,
          border: '2px solid var(--blue)',
          boxShadow: '0 0 35px rgba(56, 189, 248, 0.3)'
        };
      case 1: // Adjacent Right
        return {
          width: '200px',
          height: '380px',
          x: 250,
          scale: 0.92,
          opacity: 0.45,
          zIndex: 5,
          border: '1px solid var(--glass-border)',
          boxShadow: 'none'
        };
      case -1: // Adjacent Left
        return {
          width: '200px',
          height: '380px',
          x: -250,
          scale: 0.92,
          opacity: 0.45,
          zIndex: 5,
          border: '1px solid var(--glass-border)',
          boxShadow: 'none'
        };
      case 2: // Outer Right
        return {
          width: '160px',
          height: '320px',
          x: 430,
          scale: 0.85,
          opacity: 0.25,
          zIndex: 2,
          border: '1px solid var(--glass-border)',
          boxShadow: 'none'
        };
      case -2: // Outer Left
        return {
          width: '160px',
          height: '320px',
          x: -430,
          scale: 0.85,
          opacity: 0.25,
          zIndex: 2,
          border: '1px solid var(--glass-border)',
          boxShadow: 'none'
        };
      default:
        return { opacity: 0, zIndex: 0 };
    }
  };

  return (
    <section id="testimonials" className={styles.testimonialsSection}>
      <div className={styles.container}>
        {/* Header and navigation arrows */}
        <div className={styles.headerRow}>
          <motion.div 
            className={styles.header}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="sectionLabel">Testimonials</span>
            <h2 className={styles.headline}>{testimonials.headline}</h2>
            <p className={styles.subheadline}>{testimonials.subheadline}</p>
          </motion.div>
          
          {!isMobile && (
            <div className={styles.navButtons}>
              <button className={`${styles.navBtn} glassCard`} onClick={handlePrev} aria-label="Previous testimonial">
                <FaChevronLeft />
              </button>
              <button className={`${styles.navBtn} glassCard`} onClick={handleNext} aria-label="Next testimonial">
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>

        {/* Dynamic Carousel Render */}
        {isMobile ? (
          /* Mobile horizontal touch swipe track */
          <div className={styles.mobileTrackWrapper}>
            <div 
              className={`${styles.testimonialsTrack} scrollHide`} 
              ref={scrollRef}
              onScroll={handleMobileScroll}
            >
              {videos.map((vid) => (
                <div 
                  key={vid.id} 
                  className={styles.testimonialCard}
                  onClick={() => handleVideoTap(vid.id)}
                >
                  <video 
                    id={`video-${vid.id}`}
                    src={vid.videoUrl} 
                    poster={vid.videoPoster}
                    className={styles.video}
                    loop 
                    muted 
                    playsInline 
                    preload="none"
                  />
                  <div className={styles.cardOverlay}></div>
                  <div className={styles.cardInfo}>
                    <span className={styles.clientName}>{vid.clientName}</span>
                    <span className={styles.clientRole}>{vid.clientRole}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Touch Indicators */}
            <div className={styles.testimonialDots}>
              {videos.map((_, dotIdx) => (
                <button 
                  key={dotIdx} 
                  className={`${styles.testimonialDot} ${currentDotIndex === dotIdx ? styles.activeDot : ''}`}
                  onClick={() => handleDotClick(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Desktop Focus Carousel using Framer Motion */
          <div className={styles.carouselContainer}>
            {videos.map((vid, idx) => {
              const offset = getRelativeOffset(idx, activeIndex);
              const cardStyle = getDesktopCardStyles(offset);

              return (
                <motion.div
                  key={vid.id}
                  className={styles.desktopCard}
                  animate={cardStyle}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  onMouseEnter={() => handleVideoHover(vid.id, true)}
                  onMouseLeave={() => handleVideoHover(vid.id, false)}
                  onClick={() => handleVideoTap(vid.id)}
                >
                  <video 
                    id={`video-${vid.id}`}
                    src={vid.videoUrl} 
                    poster={vid.videoPoster}
                    className={styles.video}
                    loop 
                    muted 
                    playsInline 
                    preload="none"
                  />
                  <div className={styles.bottomOverlay}>
                    <span className={styles.clientName}>{vid.clientName}</span>
                    <span className={styles.clientRole}>{vid.clientRole}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
