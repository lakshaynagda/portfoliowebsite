import React, { useState, useRef } from 'react';
import styles from './Testimonials.module.css';
import data from '../../data/data.json';
import { motion } from 'framer-motion';
import { FaVolumeXmark, FaVolumeHigh } from 'react-icons/fa6';

const Testimonials = () => {
  const { testimonials } = data;
  const videos = testimonials.videos;

  const [unmutedId, setUnmutedId] = useState(null); // only one card unmuted at a time
  const [currentDotIndex, setCurrentDotIndex] = useState(0);
  const scrollRef = useRef(null);
  const videoRefs = useRef({}); // ref for each video by id

  // Toggle mute per card — only one unmuted at a time
  const handleMuteToggle = (e, id) => {
    e.stopPropagation();
    const nextUnmutedId = unmutedId === id ? null : id;
    setUnmutedId(nextUnmutedId);
    
    // Direct DOM sync for cross-browser robust audio toggling
    Object.keys(videoRefs.current).forEach(key => {
      const videoEl = videoRefs.current[key];
      if (videoEl) {
        videoEl.muted = Number(key) !== nextUnmutedId;
      }
    });
  };

  // Dot tracker dynamically reading card sizes
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const firstCard = scrollRef.current.firstElementChild;
      let cardWidth = 276; // fallback
      if (firstCard) {
        const style = window.getComputedStyle(scrollRef.current);
        const gap = parseInt(style.gap) || 16;
        cardWidth = firstCard.offsetWidth + gap;
      }
      const index = Math.round(scrollLeft / cardWidth);
      setCurrentDotIndex(Math.max(0, Math.min(index, videos.length - 1)));
    }
  };

  const handleDotClick = (index) => {
    if (scrollRef.current) {
      const firstCard = scrollRef.current.firstElementChild;
      let cardWidth = 276; // fallback
      if (firstCard) {
        const style = window.getComputedStyle(scrollRef.current);
        const gap = parseInt(style.gap) || 16;
        cardWidth = firstCard.offsetWidth + gap;
      }
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setCurrentDotIndex(index);
    }
  };

  return (
    <section id="testimonials" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.headerRow}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="sectionLabel">Testimonials</span>
            <h2 className={styles.headline}>{testimonials.headline}</h2>
            <p className={styles.subheadline}>{testimonials.subheadline}</p>
          </div>
        </motion.div>
      </div>

      {/* Track — centered */}
      <div className={styles.trackWrapper}>
        <div
          className={styles.track}
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {videos.map((vid, index) => {
            const isUnmuted = unmutedId === vid.id;
            const isImageCard = vid.type === 'image'; // screenshot card

            return (
              <motion.div
                key={vid.id}
                className={styles.card}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >

                {isImageCard ? (
                  /* SCREENSHOT CARD — just show image, no video, no mute button */
                  <img
                    src={vid.videoPoster}
                    alt={vid.clientName}
                    className={styles.screenshotImg}
                  />
                ) : (
                  /* VIDEO CARD — show video + mute button */
                  <>
                    <video
                      ref={el => { if (el) videoRefs.current[vid.id] = el; }}
                      src={vid.videoUrl}
                      poster={vid.videoPoster || undefined}
                      className={styles.video}
                      autoPlay
                      loop
                      muted={!isUnmuted}
                      playsInline
                      preload="auto"
                    />
                    {/* Mute button — only on video cards */}
                    <button
                      className={styles.muteBtn}
                      onClick={(e) => handleMuteToggle(e, vid.id)}
                      aria-label={isUnmuted ? 'Mute' : 'Unmute'}
                    >
                      {isUnmuted ? <FaVolumeHigh /> : <FaVolumeXmark />}
                    </button>
                  </>
                )}

                {/* Bottom gradient — on both types */}
                <div className={styles.overlay} />

                {/* Name + Role — on both types */}
                <div className={styles.cardInfo}>
                  <span className={styles.clientName}>{vid.clientName}</span>
                  {vid.clientRole && (
                    <span className={styles.clientRole}>{vid.clientRole}</span>
                  )}
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      <div className={styles.dots}>
        {videos.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${currentDotIndex === index ? styles.dotActive : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </section>
  );
};

export default Testimonials;
