import React, { useEffect, useRef, useState } from 'react';
import './Timeline.css';

/**
 * Timeline Component
 * Displays hackathon schedule events in a vertical timeline with scroll animations
 * * @param {Array} items - Timeline events data
 * @param {string} className - Additional CSS classes
 */
const Timeline = ({ items = [], className = '' }) => {
  const [visibleItems, setVisibleItems] = useState([]);
  const timelineRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    // IntersectionObserver to trigger animations on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index, 10);
            setVisibleItems((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [items]);

  return (
    <section className={`timeline-container ${className}`} ref={timelineRef}>

      {/* 💥 UPDATED TITLE SECTION: Scaled up and centered! */}
      <div className="timeline-title-wrapper" style={{ textAlign: "center", marginBottom: "40px" }}>
      <img
  src="/event_timeline.png"
  alt="Event Timeline"
  className="timeline-title-img"
  style={{
    width: "clamp(260px, 200vw, 500px)",
    maxWidth: "100%",
    margin: "0 auto",
    display: "block"
  }}
/>
        <span className="timeline-title-jp" style={{ marginTop: "15px", display: "block" }}>行程表</span>
      </div>

      <div className="timeline-wrapper">
        {/* Center vertical line */}
        <div className="timeline-line" />

        <ul className="timeline-list">
          {items.map((item, index) => (
            <li
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              data-index={index}
              className={`timeline-item ${index % 2 === 0 ? 'timeline-item-left' : 'timeline-item-right'
                } ${visibleItems.includes(index) ? 'timeline-item-visible' : ''}`}
            >
              {/* Timeline marker (circle on the line) */}
              <div className="timeline-marker">
                <span className="timeline-icon">{item.icon}</span>
              </div>

              {/* Event card */}
              <div className="timeline-card">
                <time className="timeline-date">{item.date}</time>
                <h3 className="timeline-event-title">{item.title}</h3>
                <p className="timeline-description">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Timeline;