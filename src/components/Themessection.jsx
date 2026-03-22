import { animated } from "@react-spring/web";
import Themes from "../components/Themes";

export default function ThemesSection({ sectionRef, shift }) {
  return (
    <section ref={sectionRef} style={{ position: "relative", width: "100%", minHeight: "100vh", overflow: "hidden", flexShrink: 0, backgroundColor: "#050810", height: "auto" }}>
      <animated.div style={{ position: "absolute", inset: 0, zIndex: 1, transform: shift.to((s) => `translateY(${s}px)`) }}>
        <div className="w-full h-full" style={{ background: "linear-gradient(rgba(5, 6, 8, 0.7), rgba(5, 6, 8, 0.9)), url('/images/themes/bgnew.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
      </animated.div>
      <div style={{ position: "relative", zIndex: 30, display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "100vh", overflow: "auto" }}>
        <Themes />
      </div>
    </section>
  );
}