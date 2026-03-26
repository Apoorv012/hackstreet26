import React, { useState } from "react";
import "./Themes.css";

/* ===============================
   THEMES DATA
================================ */
const themesData = [
  {
    id: 1,
    title: "⁠Digital Health and Smart Healthcare",
    tagline: "Innovate solutions to transform learning",
    description: "Develop technology that improves healthcare accessibility, mental wellness, and overall well-being.",
    icon: "🏥",
    variant: "theme-card--shadow",
   
  },
  {
    id: 2,
    title: "Sustainability & Climate Tech",
    tagline: "Innovate with blockchain and Web3 technologies",
    description: "Create solutions that promote environmental sustainability and responsible resource management.",
    icon: "🌍",
    variant: "theme-card--crimson",
    
  },
  {
    id: 3,
    title: "Build for Bharat",
    tagline: "Wellness Through Technology",
    description: "Use technology to solve meaningful challenges faced by rural communities, small towns, and underserved populations across India.",
    icon: "🇮🇳",
    variant: "",
   
  },
  {
    id: 4,
    title: "Cybersecurity & Privacy",
    tagline: "Create tech for a sustainable planet",
    description: "Develop systems that protect digital information, systems, and user privacy in an increasingly connected world",
    icon: "🔐",
    variant: "theme-card--shadow",
   
  },
  {
    id: 5,
    title: "Open Innovation",
    tagline: "Explore ideas beyond boundaries",
    description: "Participants can build any idea without restriction, encouraging creativity and experimentation",
    icon: "✨",
    variant: "theme-card--crimson",
   
  }
];

/* ===============================
   SUB-COMPONENT: THEME CARD
================================ */
const ThemeCard = ({ theme }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`theme-card ${theme.variant} ${isFlipped ? 'is-flipped' : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className="theme-card__inner">
        {/* FAN FRONT */}
        <div className="theme-card__fan"></div>

        {/* BACK: ORIGINAL CARD */}
        <div className="theme-card__back">
          <div
            className="theme-card__bg"
            style={{ backgroundImage: `url(${theme.bgImage})` }}
          ></div>

          <div className="theme-card__icon">{theme.icon}</div>

          <div className="theme-card__content">
            <h3 className="theme-card__heading">
              {theme.title} <span style={{ color: "#b3001b" }}>影</span>
            </h3>
            <p className="theme-card__desc">{theme.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ===============================
   MAIN COMPONENT
================================ */
const Themes = () => {
  return (
    <section className="themes" id="themes">
      <div className="themes__header">
  <img
    src="/themes_title.png"
    alt="Hackathon Themes"
    className="themes__title-img"
  />
</div>
<div className="themes__mobile-instruction">
          <span className="tech-bracket">{'<'}</span>
          <span className="glitch-text">TAP TO DECRYPT</span>
          <span className="tech-bracket">{'>'}</span>
        </div>
        
      <div className="themes__grid">
        {themesData.map((theme) => (
          <ThemeCard key={theme.id} theme={theme} />
        ))}
      </div>
    </section>
  );
};

export default Themes;