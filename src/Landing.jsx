import { useRef, useEffect, useState, lazy, Suspense } from "react";
import { useSpring, animated, to } from "@react-spring/web";
import CountdownTimer from "./components/CountdownTimer";
import SideScrollMenu from "./components/SideScrollMenu";

const AboutSection  = lazy(() => import("./components/Aboutsection"));
const ThemesSection = lazy(() => import("./components/Themessection"));
const Timeline      = lazy(() => import("./components/Timeline"));
const FAQSection    = lazy(() => import("./components/Faq"));
const PrizesSection = lazy(() => import("./components/PrizesSection"));
const Footer        = lazy(() => import("./components/Footer"));

const timelineData = [
  { date: "Till 4th April, 12:00 AM", title: "Registration", description: "Register your team for the hackathon", icon: "📝" },
  { date: "4th April, 12:00 PM", title: "Hacking Period Starts", description: "Begin your innovative journey", icon: "🚀" },
  { date: "4th April, 9:00 PM", title: "Mid Evaluation", description: "Present your progress to the judges", icon: "⚡" },
  { date: "5th April, 12:00 PM", title: "Hacking Period Ends", description: "Time to wrap up your project", icon: "⏰" },
  { date: "5th April, 12:00 PM - 12:30 PM", title: "Project Submission", description: "Submit your final project", icon: "📦" },
  { date: "5th April, 1:00 PM onwards", title: "Final Evaluation", description: "Present your complete project to the judges", icon: "🏆" },
];

const KANJI = ["侍", "武", "道", "剣", "力", "戦", "勇", "魂", "刃", "忍"];

function MistDivider() {
  return (
    <div style={{ position: "relative", width: "100%", height: "120px", overflow: "hidden", zIndex: 100, marginTop: "-60px", marginBottom: "-60px", pointerEvents: "none" }}>
      <style>{`
        @keyframes mistDrift { 0% { transform: translateX(-100px) scaleY(0.8); opacity: 0; } 15% { opacity: 1; } 85% { opacity: 1; } 100% { transform: translateX(calc(100vw + 100px)) scaleY(1.1); opacity: 0; } }
        @keyframes kanjiFloat { 0% { transform: translateX(-60px) translateY(0px) rotate(-5deg); opacity: 0; } 10% { opacity: 0.6; } 50% { transform: translateX(calc(50vw)) translateY(-12px) rotate(3deg); opacity: 0.85; } 90% { opacity: 0.5; } 100% { transform: translateX(calc(100vw + 60px)) translateY(4px) rotate(-2deg); opacity: 0; } }
        @keyframes mistPulse { 0%, 100% { opacity: 0.55; transform: scaleX(1); } 50% { opacity: 0.75; transform: scaleX(1.02); } }
      `}</style>
      {[{ top: "10%", dur: "9s", delay: "0s", width: "70%", opacity: 0.6, blur: 18 }, { top: "30%", dur: "13s", delay: "1.5s", width: "90%", opacity: 0.5, blur: 22 }, { top: "50%", dur: "11s", delay: "0.5s", width: "80%", opacity: 0.65, blur: 16 }, { top: "65%", dur: "15s", delay: "2s", width: "60%", opacity: 0.45, blur: 24 }, { top: "80%", dur: "10s", delay: "3s", width: "75%", opacity: 0.55, blur: 20 }].map((m, i) => (
        <div key={i} style={{ position: "absolute", top: m.top, left: 0, width: m.width, height: "18px", borderRadius: "50%", background: `radial-gradient(ellipse at center, rgba(180,190,210,${m.opacity}) 0%, transparent 70%)`, filter: `blur(${m.blur}px)`, animation: `mistDrift ${m.dur} ${m.delay} infinite linear` }} />
      ))}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 0%, rgba(5,8,15,0.82) 40%, rgba(5,8,15,0.82) 60%, transparent 100%)", animation: "mistPulse 6s ease-in-out infinite" }} />
      {KANJI.map((k, i) => (
        <div key={i} style={{ position: "absolute", top: `${15 + (i % 5) * 14}%`, left: 0, color: i % 3 === 0 ? "rgba(192,57,43,0.75)" : "rgba(255,255,255,0.35)", fontSize: `${16 + (i % 3) * 8}px`, fontFamily: "serif", letterSpacing: "2px", animation: `kanjiFloat ${10 + i * 1.4}s ${i * 0.9}s infinite linear`, textShadow: i % 3 === 0 ? "0 0 12px rgba(192,57,43,0.6), 0 0 24px rgba(192,57,43,0.3)" : "0 0 8px rgba(255,255,255,0.2)", willChange: "transform, opacity" }}>{k}</div>
      ))}
      <div style={{ position: "absolute", top: "50%", left: "5%", right: "5%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(192,57,43,0.6) 30%, rgba(192,57,43,0.6) 70%, transparent)", transform: "translateY(-50%)", boxShadow: "0 0 6px rgba(192,57,43,0.4)" }} />
    </div>
  );
}

function useRawShift(ref, speed = 0.25) {
  const [shift, setShift] = useState(0);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const viewH = window.innerHeight;
          const progress = (viewH - rect.top) / (viewH + rect.height);
          setShift((progress - 0.5) * viewH * speed);
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref, speed]);
  return shift;
}

function HomeParallax() {
  const page1Ref = useRef();
  const page2Ref = useRef();
  const page3Ref = useRef();
  const page4Ref = useRef();
  const page5Ref = useRef();
  const page6Ref = useRef();

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);

    let mouseFrame = null;
    const handleMouse = (e) => {
      if (mouseFrame) return;
      mouseFrame = requestAnimationFrame(() => {
        setMouse({
          x: (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2),
          y: (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2),
        });
        mouseFrame = null;
      });
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener('resize', handleResize);
      if (mouseFrame) cancelAnimationFrame(mouseFrame);
    };
  }, []);

  const heroSpring = useSpring({ mx: mouse.x, my: mouse.y, config: { mass: 1, tension: 170, friction: 26 } });

  const raw1 = useRawShift(page1Ref, isMobile ? 0.12 : 0.3);
  const raw2 = useRawShift(page2Ref, isMobile ? 0.1 : 0.25);
  const raw3 = useRawShift(page3Ref, isMobile ? 0.1 : 0.25);
  const raw4 = useRawShift(page4Ref, isMobile ? 0.08 : 0.2);

  const spring1 = useSpring({ shift: raw1, config: { mass: 1, tension: 120, friction: 26 } });
  const spring2 = useSpring({ shift: raw2, config: { mass: 1, tension: 120, friction: 26 } });
  const spring3 = useSpring({ shift: raw3, config: { mass: 1, tension: 120, friction: 26 } });
  const spring4 = useSpring({ shift: raw4, config: { mass: 1, tension: 120, friction: 26 } });

  const scroll = (to) => {
    const refs = [page1Ref, page2Ref, page3Ref, page4Ref, page5Ref, page6Ref];
    refs[to]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const pMult = isMobile ? 0 : 1;

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        html, body { overflow-x: hidden; margin: 0; padding: 0; width: 100%; background-color: #050810; }
        .hs-section { position: relative; width: 100%; min-height: 100vh; overflow: hidden; flex-shrink: 0; background-color: #050810; }
        .hs-parallax-img { position: absolute; left: 0; right: 0; top: -15%; width: 100%; height: 130%; object-fit: cover; will-change: transform; }
        @media (max-width: 768px) {
          .hs-section { height: auto; min-height: 100vh; }
          .hs-parallax-img { left: 0 !important; width: 100% !important; top: 0 !important; height: 115% !important; object-position: center top; }
          .animate-strongPulse, .animate-prizeGlow { animation: none; }
          .hs-hero-logo { width: clamp(200px, 75vw, 420px) !important; }
        }
        .hs-section--auto { height: auto; min-height: 100vh; }
        @keyframes scrollHint { 0%, 100% { opacity: 0.4; transform: translateX(-50%) translateY(0); } 50% { opacity: 0.9; transform: translateX(-50%) translateY(8px); } }
        @keyframes strongPulse { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.1); } }
        @keyframes prizeGlow { 0%, 100% { text-shadow: 0 0 10px rgba(255,255,255,0.5); } 50% { text-shadow: 0 0 25px rgba(255,255,255,0.9), 0 0 50px rgba(255,100,100,0.4); } }
        @keyframes shine { 100% { left: 125%; } }
        @keyframes glassReflection { 0% { transform: translateX(-150%) rotate(25deg); opacity: 0; } 20% { opacity: 1; } 100% { transform: translateX(150%) rotate(25deg); opacity: 0; } }
        @keyframes pulseRed {
          0% { box-shadow: 0 0 12px rgba(255,0,0,0.4), inset 0 0 10px rgba(255,0,0,0.2); }
          50% { box-shadow: 0 0 25px rgba(255,0,0,0.9), inset 0 0 15px rgba(255,0,0,0.5); }
          100% { box-shadow: 0 0 12px rgba(255,0,0,0.4), inset 0 0 10px rgba(255,0,0,0.2); }
        }
        .btn-glow { animation: pulseRed 2s infinite ease-in-out; }
        .glassBox { position: relative; overflow: hidden; }
        .glassBox::after { content: ""; position: absolute; top: -50%; left: 0; width: 150%; height: 200%; background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.03) 75%, transparent 100%); filter: blur(20px); pointer-events: none; transform: translateX(-150%) rotate(25deg); }
        .glassBox:hover::after { animation: glassReflection 0.6s ease-in-out forwards; }
        .animate-strongPulse { animation: strongPulse 3s ease-in-out infinite; }
        .animate-prizeGlow { animation: prizeGlow 2.5s ease-in-out infinite; }
        .group:hover .animate-shine { animation: shine 0.75s ease-in-out; }
      `}</style>

      <div style={{ display: "flex", flexDirection: "column", width: "100%", position: "relative", overflowX: "hidden" }}>
        <SideScrollMenu scrollToPage={scroll} />

        {/* PAGE 1 — HERO (always loaded) */}
        <section ref={page1Ref} className="hs-section">

          {/* Register Now Button */}
          <a
            href="https://unstop.com/hackathons/hackstreet-40-xenith26-ieee-student-branch-jiit-noida-1663464"
            target="_blank"
            rel="noopener noreferrer"
            className="glassBox btn-glow"
            style={{
              position: "absolute", top: "30px", right: "40px",
              padding: "12px 26px",
              background: "rgba(10, 15, 25, 0.4)",
              backdropFilter: "blur(10px)",
              color: "#ff2e2e",
              fontWeight: "bold", borderRadius: "6px", textDecoration: "none",
              border: "2px solid rgba(255, 0, 0, 0.7)",
              zIndex: 9999, transition: "all 0.3s ease", letterSpacing: "1px",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255, 0, 0, 0.15)";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(10, 15, 25, 0.4)";
              e.target.style.transform = "scale(1)";
            }}
          >
            Register Now
          </a>


          <animated.img src="/mountain.webp" alt="Mountains" className="hs-parallax-img"

            style={{ zIndex: 1, transform: to([heroSpring.mx, heroSpring.my], (mx, my) => `translate(${mx * -10 * pMult}px, ${my * -10 * pMult}px)`) }}
          />
          <animated.img src="/sun.png" alt="Sun"
            style={{ position: "absolute", top: "8%", left: "50%", width: "clamp(180px, 18vw, 280px)", zIndex: 5, transform: to([heroSpring.mx, heroSpring.my], (mx, my) => `translate(calc(-50% + ${mx * -18 * pMult}px), ${my * -18 * pMult}px)`) }}
          />
          {!isMobile && (
            <animated.img src="/trees.webp" alt="Trees" className="hs-parallax-img"

              style={{ zIndex: 20, opacity: 0.85, transform: to([heroSpring.mx, heroSpring.my, spring1.shift], (mx, my, s) => `translate(${mx * 20 * pMult}px, calc(${my * 20 * pMult}px + ${s}px))`) }}
            />
          )}
          {isMobile && (
            <animated.img src="/trees_phone.png" alt="Mobile Canopy"
              style={{ position: "absolute", top: "-5%", left: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", zIndex: 20, pointerEvents: "none", transform: spring1.shift.to((s) => `translateY(${s * 0.5}px)`) }}
            />
          )}
          <animated.div style={{ position: "absolute", inset: 0, zIndex: 50, display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: "22vh", transform: to([heroSpring.mx, heroSpring.my], (mx, my) => `translate(${mx * -5 * pMult}px, ${my * -5 * pMult}px)`) }}>
            <img src="/logo2.webp" alt="HackStreet Logo" className="hs-hero-logo" style={{ width: "clamp(260px, 48vw, 580px)", filter: "invert(100%) sepia(100%) saturate(400%) hue-rotate(180deg) brightness(200%) contrast(100%) drop-shadow(0 0 3px rgba(0,255,255,0.8)) drop-shadow(0 0 20px rgba(0,100,255,0.5))" }} />
          </animated.div>
          <div style={{ position: "absolute", bottom: "clamp(60px,12vh,120px)", left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 55 }}>
            <div style={{ transform: "scale(0.9)", pointerEvents: "auto" }}><CountdownTimer /></div>
          </div>
          <div style={{ position: "absolute", bottom: "3vh", left: "50%", zIndex: 60, color: "rgba(255,255,255,0.5)", fontSize: "10px", letterSpacing: "4px", textTransform: "uppercase", fontFamily: "Georgia, serif", animation: "scrollHint 2s ease-in-out infinite" }}>scroll ↓</div>
        </section>

        {/* PAGES 2-6 + FOOTER — lazy loaded */}
        <Suspense fallback={null}>

          <MistDivider />
          <AboutSection sectionRef={page2Ref} shift={spring2.shift} />

          <MistDivider />
          <ThemesSection sectionRef={page3Ref} shift={spring3.shift} />

          <MistDivider />
          <section ref={page4Ref} className="hs-section hs-section--auto">
            <animated.img src="/Timeline_bg2.jpg" alt="Timeline Background" className="hs-parallax-img" style={{ zIndex: 1, transform: spring4.shift.to((s) => `translateY(${s}px)`) }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.05))", zIndex: 10, pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 30, display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: "5vh", paddingBottom: "6vh", minHeight: "100vh", overflow: "auto" }}>
              <Timeline items={timelineData} />
            </div>
          </section>

          <MistDivider />
          <FAQSection sectionRef={page5Ref} />

          <MistDivider />
          <PrizesSection sectionRef={page6Ref} />

          <Footer />

        </Suspense>
      </div>
    </>
  );
}

export default HomeParallax;

