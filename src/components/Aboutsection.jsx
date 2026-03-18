import { animated } from "@react-spring/web";

export default function AboutSection({ sectionRef, shift }) {
  return (
    <section ref={sectionRef} style={{ position: "relative", width: "100%", minHeight: "100vh", overflow: "hidden", flexShrink: 0, backgroundColor: "#050810" }}>
      <animated.img src="/about_bg.webp" alt="Lake" className="hs-parallax-img" style={{ zIndex: 1, transform: shift.to((s) => `translateY(${s}px)`) }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 50, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", paddingTop: "0vh", textAlign: "center", paddingLeft: "20px", paddingRight: "20px" }}>
        <img src="/ab.webp" alt="About HackStreet" style={{ width: "clamp(260px, 40vw, 600px)", filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.7))", marginBottom: "20px" }} />
        <div className="glassBox" style={{ width: "min(820px, 90vw)", padding: "30px 38px", borderRadius: "16px", backdropFilter: "blur(16px)", background: "rgba(10,15,25,0.35)", border: "1px solid rgba(120,220,255,0.25)", boxShadow: "0 0 30px rgba(0,255,255,0.15), inset 0 0 25px rgba(0,0,0,0.35)", color: "rgba(230,240,255,0.9)", fontSize: "clamp(15px,1.15vw,18px)", lineHeight: "1.8", fontFamily: "Georgia, serif" }}>
          HackStreet 4.0 is an electrifying hackathon where innovators, developers, and creators unite to build groundbreaking solutions. Over an intense hacking period, participants collaborate, experiment, and transform bold ideas into impactful technology.<br /><br />Join us for 24 hours of creativity, coding, and innovation where technology meets imagination.
        </div>
      </div>
      <animated.img src="/about_trees.png" alt="Trees" className="hs-parallax-img" style={{ zIndex: 40, pointerEvents: "none", opacity: 0.9, transform: shift.to((s) => `translateY(${s * 1.4}px)`) }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.12)", zIndex: 41, pointerEvents: "none" }} />
    </section>
  );
}