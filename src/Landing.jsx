import { useRef, useEffect, useState, useCallback } from "react";
import { useSpring, animated, to } from "@react-spring/web";
import CountdownTimer from "./components/CountdownTimer";
import SideScrollMenu from "./components/SideScrollMenu";
import Timeline from "./components/Timeline";
import Themes from "./components/Themes";
import Footer from "./components/Footer";

const timelineData = [
  { date: "Till 4th April, 12:00 AM", title: "Registration", description: "Register your team for the hackathon", icon: "📝" },
  { date: "4th April, 12:00 PM", title: "Hacking Period Starts", description: "Begin your innovative journey", icon: "🚀" },
  { date: "4th April, 9:00 PM", title: "Mid Evaluation", description: "Present your progress to the judges", icon: "⚡" },
  { date: "5th April, 12:00 PM", title: "Hacking Period Ends", description: "Time to wrap up your project", icon: "⏰" },
  { date: "5th April, 12:00 PM - 12:30 PM", title: "Project Submission", description: "Submit your final project", icon: "📦" },
  { date: "5th April, 1:00 PM onwards", title: "Final Evaluation", description: "Present your complete project to the judges", icon: "🏆" },
];

const KANJI = ["侍", "武", "道", "剣", "力", "戦", "勇", "魂", "刃", "忍"];

const faqs = [
  { q: "Who can participate in HackStreet?", a: "HackStreet is open to all college students. You can participate individually or form a team of up to 3 members. Developers, designers, and innovators from all skill levels are welcome." },
  { q: "Is there any registration fee?", a: "No. HackStreet is completely free to participate in. Simply register before the deadline and you'll receive further details about the online event." },
  { q: "How will the hackathon be conducted?", a: "HackStreet will be conducted entirely online. All announcements, mentoring sessions, and submissions will take place through our official platforms, which will be shared with registered participants." },
  { q: "Can we start working on our project before the hackathon begins?", a: "No. All projects must be built during the official hacking period. However, you are free to brainstorm ideas, research technologies, and prepare beforehand." },
  { q: "How will projects be submitted and judged?", a: "Teams will submit their projects through the official submission platform along with a demo video and project description. Judges will evaluate projects based on innovation, technical implementation, impact, design, and presentation." },
];

function FAQ({ sectionRef }) {
  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Text:ital,wght@0,400;1,400&display=swap');
        .faq-section { position: relative; width: 100%; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding: 9vh 5vw 11vh; overflow: hidden; }
        .faq-bg { position: absolute; inset: 0; background-image: url('/bg_faqs.jpeg'); background-size: cover; background-position: center top; z-index: 0; }
        .faq-bg::after { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 30%, rgba(0,8,28,0.15) 0%, rgba(0,8,28,0.75) 100%); }
        .faq-title-wrap { position: relative; z-index: 10; text-align: center; margin-bottom: 56px; }
        .faq-title { font-family: 'Cinzel', serif; font-size: clamp(24px, 4vw, 52px); font-weight: 900; letter-spacing: 0.2em; color: #fff; text-transform: uppercase; text-shadow: 0 0 18px rgba(120,160,255,0.6), 0 0 40px rgba(120,160,255,0.25), 0 2px 10px rgba(0,0,0,0.9); }
        .faq-title-rule { width: 100px; height: 1.5px; margin: 12px auto 0; background: linear-gradient(90deg, transparent, rgba(120,160,255,0.85), transparent); box-shadow: 0 0 10px rgba(120,160,255,0.4); }
        .faq-lanterns { position: relative; z-index: 10; width: 100%; max-width: 900px; display: flex; flex-direction: column; gap: 18px; }
        .lantern { position: relative; cursor: pointer; border-radius: 10px; }
        .lantern-body { position: relative; padding: 22px 24px 20px; overflow: hidden; background: rgba(8,18,40,0.65); backdrop-filter: blur(12px); border: 1px solid rgba(120,160,255,0.25); border-radius: 10px; transition: all 0.4s ease; box-shadow: 0 0 25px rgba(100,140,255,0.15), inset 0 0 30px rgba(120,160,255,0.05); }
        .lantern:hover .lantern-body { transform: translateY(-6px) scale(1.02); box-shadow: 0 0 35px rgba(120,160,255,0.35), 0 0 80px rgba(70,120,255,0.15); }
        .lantern.is-open .lantern-body { border-color: rgba(160,200,255,0.6); box-shadow: 0 0 45px rgba(120,170,255,0.5), inset 0 0 60px rgba(120,170,255,0.15); }
        .lantern-num { font-family: 'Cinzel', serif; font-size: 10px; font-weight: 700; letter-spacing: 0.18em; color: rgba(150,180,255,0.65); margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
        .lantern-num::after { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg, rgba(150,180,255,0.3), transparent); }
        .lantern-toggle { position: absolute; top: 18px; right: 18px; width: 22px; height: 22px; border-radius: 50%; border: 1px solid rgba(150,180,255,0.4); display: flex; align-items: center; justify-content: center; color: rgba(180,210,255,0.8); font-size: 14px; transition: all 0.3s ease; }
        .lantern.is-open .lantern-toggle { transform: rotate(45deg); border-color: rgba(200,230,255,1); color: #fff; box-shadow: 0 0 10px rgba(120,170,255,0.6); }
        .lantern-q { font-family: 'Cinzel', serif; font-size: clamp(16px, 4vw, 22px); font-weight: 700; color: rgba(220,235,255,0.95); text-shadow: 0 0 10px rgba(120,160,255,0.4); line-height: 1.4; margin: 0; padding-right: 40px; white-space: normal; }
        .lantern-answer { overflow: hidden; max-height: 0; opacity: 0; transition: max-height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease; }
        .lantern.is-open .lantern-answer { max-height: 220px; opacity: 1; }
        .lantern-answer-inner { padding-top: 13px; margin-top: 13px; border-top: 1px solid rgba(150,180,255,0.25); }
        .lantern-a { font-family: 'Crimson Text', Georgia, serif; font-size: clamp(16px, 1.3vw, 18px); color: rgba(210,225,255,0.9); line-height: 1.8; }
      `}</style>
      <section ref={sectionRef} className="faq-section">
        <div className="faq-bg" />
        <div className="faq-title-wrap">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <div className="faq-title-rule" />
        </div>
        <div className="faq-lanterns">
          {faqs.map((faq, i) => (
            <div key={i} className={`lantern${open === i ? " is-open" : ""}`} onClick={() => toggle(i)}>
              <div className="lantern-body">
                <div className="lantern-toggle">+</div>
                <div className="lantern-num">{String(i + 1).padStart(2, "0")}</div>
                <p className="lantern-q">{faq.q}</p>
                <div className="lantern-answer">
                  <div className="lantern-answer-inner">
                    <p className="lantern-a">{faq.a}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

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

// THROTTLED scroll parallax hook — only fires every 16ms (1 frame)
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

    // THROTTLED mouse handler — only fires every 32ms (2 frames)
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

  const heroSpring = useSpring({
    mx: mouse.x,
    my: mouse.y,
    config: { mass: 1, tension: 170, friction: 26 },
  });

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
        .glassBox { position: relative; overflow: hidden; }
        .glassBox::after { content: ""; position: absolute; top: -50%; left: 0; width: 150%; height: 200%; background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.03) 75%, transparent 100%); filter: blur(20px); pointer-events: none; transform: translateX(-150%) rotate(25deg); }
        .glassBox:hover::after { animation: glassReflection 0.6s ease-in-out forwards; }
        .animate-strongPulse { animation: strongPulse 3s ease-in-out infinite; }
        .animate-prizeGlow { animation: prizeGlow 2.5s ease-in-out infinite; }
        .group:hover .animate-shine { animation: shine 0.75s ease-in-out; }
      `}</style>

      <div style={{ display: "flex", flexDirection: "column", width: "100%", position: "relative", overflowX: "hidden" }}>
        <SideScrollMenu scrollToPage={scroll} />

        {/* PAGE 1 — HERO */}
        <section ref={page1Ref} className="hs-section">
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

        <MistDivider />

        {/* PAGE 2 — ABOUT */}
        <section ref={page2Ref} className="hs-section">
          <animated.img src="/about_bg.webp" alt="Lake" className="hs-parallax-img" style={{ zIndex: 1, transform: spring2.shift.to((s) => `translateY(${s}px)`) }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 50, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", paddingTop: "8vh", textAlign: "center", paddingLeft: "20px", paddingRight: "20px" }}>
            <img src="/ab.webp" alt="About HackStreet" style={{ width: "clamp(260px, 40vw, 600px)", filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.7))", marginBottom: "20px" }} />
            <div className="glassBox" style={{ width: "min(820px, 90vw)", padding: "30px 38px", borderRadius: "16px", backdropFilter: "blur(16px)", background: "rgba(10,15,25,0.35)", border: "1px solid rgba(120,220,255,0.25)", boxShadow: "0 0 30px rgba(0,255,255,0.15), inset 0 0 25px rgba(0,0,0,0.35)", color: "rgba(230,240,255,0.9)", fontSize: "clamp(15px,1.15vw,18px)", lineHeight: "1.8", fontFamily: "Georgia, serif" }}>
              HackStreet 4.0 is an electrifying hackathon where innovators, developers, and creators unite to build groundbreaking solutions. Over an intense hacking period, participants collaborate, experiment, and transform bold ideas into impactful technology.<br /><br />Join us for 24 hours of creativity, coding, and innovation where technology meets imagination.
            </div>
          </div>
          <animated.img src="/about_trees.png" alt="Trees" className="hs-parallax-img" style={{ zIndex: 40, pointerEvents: "none", opacity: 0.9, transform: spring2.shift.to((s) => `translateY(${s * 1.4}px)`) }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.12)", zIndex: 41, pointerEvents: "none" }} />
        </section>

        <MistDivider />

        {/* PAGE 3 — THEMES */}
        <section ref={page3Ref} className="hs-section hs-section--auto">
          <animated.div style={{ position: "absolute", inset: 0, zIndex: 1, transform: spring3.shift.to((s) => `translateY(${s}px)`) }}>
            <div className="w-full h-full" style={{ background: "linear-gradient(rgba(5, 6, 8, 0.7), rgba(5, 6, 8, 0.9)), url('/images/themes/bgnew.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
          </animated.div>
          <div style={{ position: "relative", zIndex: 30, display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "100vh", overflow: "auto" }}>
            <Themes />
          </div>
        </section>

        <MistDivider />

        {/* PAGE 4 — TIMELINE */}
        <section ref={page4Ref} className="hs-section hs-section--auto">
          <animated.img src="/Timeline_bg.jpg" alt="Timeline Background" className="hs-parallax-img" style={{ zIndex: 1, transform: spring4.shift.to((s) => `translateY(${s}px)`) }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.05))", zIndex: 10, pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 30, display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: "5vh", paddingBottom: "6vh", minHeight: "100vh", overflow: "auto" }}>
            <Timeline items={timelineData} />
          </div>
        </section>

        <MistDivider />

        {/* PAGE 5 — FAQ */}
        <FAQ sectionRef={page5Ref} />

        <MistDivider />

        {/* PAGE 6 — PRIZES */}
        <section ref={page6Ref} className="hs-section hs-section--auto">
          <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
            <div className="w-full h-full bg-[#050505]">
              <img src="/prizes_bg.png" className="w-full h-full object-cover opacity-50" alt="Prize Background" />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle, transparent 20%, #050505 100%)" }} />
            </div>
          </div>
          <div style={{ position: "relative", zIndex: 40, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", paddingTop: "4vh", minHeight: "100vh" }}>
            <div className="container mx-auto px-6 w-full flex flex-col items-center">
              <div className="w-full flex justify-center mb-4 mt-[-2vh] lg:mt-0">
                <img src="/prizepool.png" alt="Prize Pool" className="w-[80vw] md:w-[60vw] lg:w-[900px] h-auto object-contain drop-shadow-[0_0_25px_rgba(220,38,38,0.7)] transform transition-transform duration-700 hover:scale-105" />
              </div>
              <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-16 w-full max-w-7xl">
                <div className="w-full lg:w-2/5 flex justify-center relative pointer-events-none mt-8 lg:mt-12 translate-y-6 lg:translate-y-12">
                  <div className="absolute -inset-10 bg-red-600/40 blur-[90px] rounded-full animate-strongPulse" />
                  <img src="/cat.png" className="w-[280px] md:w-[450px] lg:w-[650px] relative z-10 opacity-100 drop-shadow-[0_0_20px_rgba(255,0,0,0.3)]" alt="Lucky Cat" />
                </div>
                <div className="w-full lg:w-3/5 flex flex-col gap-4 pb-8">
                  {[
                    { rank: "WINNER", desc: "The Grand Prize will be given to a project that outstands all other submissions.", amount: "₹50,000", color: "from-yellow-500/40", textColor: "text-yellow-500", glow: "0_0_25px_rgba(234,179,8,1)" },
                    { rank: "1ST RUNNER UP", desc: "1st Runner-up prize will be given to the second best project of the hackathon.", amount: "₹30,000", color: "from-slate-400/30", textColor: "text-slate-300", glow: "0_0_25px_rgba(203,213,225,0.9)" },
                    { rank: "2ND RUNNER UP", desc: "2nd Runner-up project of the hackathon will win some awesome prizes.", amount: "₹20,000", color: "from-orange-800/30", textColor: "text-orange-700", glow: "0_0_25px_rgba(194,65,12,0.9)" },
                  ].map((prize, i) => (
                    <div key={i} className="relative group transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.04]" style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards", clipPath: "polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)" }}>
                      <div className={`bg-gradient-to-r ${prize.color} to-transparent p-[2px] transition-all duration-500`}>
                        <div className="bg-[#0a0a0a]/95 backdrop-blur-xl py-6 md:py-5 px-9 flex justify-between items-center relative overflow-hidden">
                          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine pointer-events-none" />
                          <div className="flex-1 pr-4 relative z-10">
                            <h3 className={`text-xl md:text-5xl font-black italic tracking-tighter ${prize.textColor} mb-1 transition-all group-hover:tracking-normal`} style={{ filter: `drop-shadow(${prize.glow})` }}>{prize.rank}</h3>
                            <p className="text-gray-300 text-[7px] md:text-[10px] font-medium max-w-sm uppercase opacity-85">{prize.desc}</p>
                          </div>
                          <div className="text-right shrink-0 relative z-10">
                            <div className="h-[2px] w-12 bg-red-600/50 mb-2 ml-auto transition-all group-hover:w-16 group-hover:bg-red-500" />
                            <span className="text-2xl md:text-5xl font-black text-white italic animate-prizeGlow">{prize.amount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PAGE 7 — FOOTER */}
        <Footer />
      </div>
    </>
  );
}

export default HomeParallax;