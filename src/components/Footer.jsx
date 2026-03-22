import React, { useState } from "react";
import {
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaPhoneAlt,
  FaEnvelope
} from "react-icons/fa";

// Helper component for glowing social icons
function SocialIcon({ Icon, link, hoverColor }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        color: hover ? hoverColor : "rgba(255,255,255,0.8)",
        transform: hover ? "scale(1.2) translateY(-4px)" : "scale(1) translateY(0)",
        filter: hover ? `drop-shadow(0 0 10px ${hoverColor})` : "none",
        transition: "all 0.3s ease",
        cursor: "pointer",
        display: "inline-block",
      }}
    >
      <Icon size={24} />
    </a>
  );
}

// Helper component for contact links to handle hover
function ContactLink({ Icon, text, link }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={link}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        color: hover ? "#ef4444" : "rgba(255,255,255,0.8)",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
    >
      <Icon size={14} style={{ filter: hover ? "drop-shadow(0 0 5px #ef4444)" : "none" }} />
      <span>{text}</span>
    </a>
  );
}

function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        background: "linear-gradient(to bottom, transparent 0%, rgba(5,5,5,0.95) 40%, #050505 100%)",
        marginTop: "-80px",
        paddingTop: "120px",
        paddingBottom: "60px",
        color: "rgba(255,255,255,0.85)",
        position: "relative",
        overflow: "hidden",
        zIndex: 50,
      }}
    >
      {/* KATANA SLASH BORDER */}
      <div
        style={{
          position: "absolute",
          top: "80px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "85%",
          height: "2px",
          background: "linear-gradient(90deg, transparent, rgba(220,38,38,1), transparent)",
          boxShadow: "0 0 20px rgba(220,38,38,0.9), 0 0 40px rgba(220,38,38,0.4)",
          opacity: 0.9,
        }}
      />

      {/* 4-COLUMN CONTENT WRAPPER */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center", /* Centers the columns perfectly if they wrap on tablets/mobile */
          alignItems: "flex-start",
          gap: "clamp(20px, 4vw, 50px)", /* Shrinks the gap dynamically on medium screens */
          textAlign: "left",
        }}
      >

        {/* COLUMN 1: TITLE */}
        <div style={{ flex: "1 1 220px" }}> {/* Lowered from 280px to give more room */}
          <h2
            style={{
              fontSize: "32px",
              letterSpacing: "3px",
              fontFamily: "Georgia, serif",
              margin: "0 0 10px 0",
              textShadow: "0 0 15px rgba(220,38,38,0.8)",
              color: "white",
              whiteSpace: "nowrap", /* Strictly prevents line breaks */
            }}
          >
            HACKSTREET 4.0
          </h2>
        </div>

        {/* COLUMN 2: ADDRESS */}
        <div style={{ flex: "1 1 200px" }}> {/* Lowered from 250px */}
          <h3
            style={{
              fontSize: "18px",
              color: "white",
              letterSpacing: "2px",
              marginBottom: "15px",
              textShadow: "0 0 8px rgba(255,255,255,0.3)",
            }}
          >
            © XENITH <span style={{ color: "#ef4444", textShadow: "0 0 10px rgba(220,38,38,0.8)" }}>2026</span>
          </h3>
          <p style={{ fontSize: "14px", lineHeight: "1.8", opacity: 0.8, margin: 0 }}>
            Jaypee Institute Of Information Technology<br />
            Sector-62, Noida<br />
            India
          </p>
        </div>

        {/* COLUMN 3: CONTACT US */}
        <div style={{ flex: "1 1 260px" }}> {/* Lowered from 300px */}
          <h3
            style={{
              fontSize: "18px",
              color: "white",
              letterSpacing: "2px",
              marginBottom: "15px",
              textShadow: "0 0 8px rgba(255,255,255,0.3)",
            }}
          >
            CONTACT US
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px" }}>
            <ContactLink
              Icon={FaPhoneAlt}
              text="Manayav Vatsal: +91 79050 71036"
              link="tel:+917905071036"
            />
            <ContactLink
              Icon={FaPhoneAlt}
              text="Pranshu Sharma: +91 83830 14894"
              link="tel:+918383014894"
            />
            <ContactLink
              Icon={FaEnvelope}
              text="ieeesbjiitdb@gmail.com"
              link="mailto:ieeesbjiitdb@gmail.com"
            />
          </div>
        </div>

        {/* COLUMN 4: SOCIALS */}
        <div style={{ flex: "1 1 150px" }}> {/* Lowered from 180px */}
          <h3
            style={{
              fontSize: "18px",
              color: "white",
              letterSpacing: "2px",
              marginBottom: "15px",
              textShadow: "0 0 8px rgba(255,255,255,0.3)",
              whiteSpace: "nowrap", /* Ensures "FIND US HERE:" stays on one line */
            }}
          >
            FIND US HERE:
          </h3>
          <div style={{ display: "flex", gap: "15px" }}>
            <SocialIcon Icon={FaWhatsapp} link="https://whatsapp.com/channel/0029VajH49o42DcniGpYxj3j" hoverColor="#25D366" />
            <SocialIcon Icon={FaInstagram} link="https://www.instagram.com/ieeesbjiit/" hoverColor="#E1306C" />
            <SocialIcon Icon={FaLinkedin} link="https://www.linkedin.com/company/ieee-student-branch-jiit/" hoverColor="#0077b5" />
            <SocialIcon Icon={FaFacebook} link="https://www.facebook.com/ieeesbjiit/" hoverColor="#1877F2" />
          </div>
        </div>
      </div>

      {/* SUBTLE BACKGROUND GLOW */}
      <div
        style={{
          position: "absolute",
          bottom: "-80px",
          right: "10%",
          width: "500px",
          height: "200px",
          background: "radial-gradient(ellipse, rgba(220,38,38,0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
    </footer>
  );
}

export default Footer;