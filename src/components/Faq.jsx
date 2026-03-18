import { useState } from "react";

const faqs = [
  { q: "Who can participate in HackStreet?", a: "HackStreet is open to all college students. You can participate individually or form a team of up to 3 members. Developers, designers, and innovators from all skill levels are welcome." },
  { q: "Is there any registration fee?", a: "No. HackStreet is completely free to participate in. Simply register before the deadline and you'll receive further details about the online event." },
  { q: "How will the hackathon be conducted?", a: "HackStreet will be conducted entirely online. All announcements, mentoring sessions, and submissions will take place through our official platforms, which will be shared with registered participants." },
  { q: "Can we start working on our project before the hackathon begins?", a: "No. All projects must be built during the official hacking period. However, you are free to brainstorm ideas, research technologies, and prepare beforehand." },
  { q: "How will projects be submitted and judged?", a: "Teams will submit their projects through the official submission platform along with a demo video and project description. Judges will evaluate projects based on innovation, technical implementation, impact, design, and presentation." },
];

export default function FAQ({ sectionRef }) {
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
        <img src="/FAQ.png" />
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