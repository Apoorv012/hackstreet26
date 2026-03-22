import { useEffect, useRef } from 'react';
import './CursorSparkle.css';

/**
 * CursorSparkle — Silver trail + dot cursor
 * 
 * Ultra-lightweight: only trail + cursor dot.
 * Glow is handled by CSS filter on the canvas (GPU-composited, free).
 * No fragments, no dust, no per-particle save/restore.
 */

const MAX_TRAIL = 20;

// ─── Trail point ─────────────────────────────────────────────────
class TrailPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.life = 1;
    this.decay = 0.08;  // dies in ~12 frames (~200ms) — short, snappy
  }
  update() { this.life -= this.decay; }
}

// ─── React component ─────────────────────────────────────────────
const CursorSparkle = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let trail = [];
    let animationId;
    let mouseX = -100, mouseY = -100;
    let smoothX = -100, smoothY = -100;
    let prevX = -100, prevY = -100;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Draw trail as one smooth quadratic curve ──
    function drawTrail() {
      if (trail.length < 3) return;

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Build one continuous smooth path
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);

      for (let i = 1; i < trail.length - 1; i++) {
        const mx = (trail[i].x + trail[i + 1].x) * 0.5;
        const my = (trail[i].y + trail[i + 1].y) * 0.5;
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, mx, my);
      }

      const last = trail[trail.length - 1];
      ctx.lineTo(last.x, last.y);

      // Outer stroke — the CSS filter: blur() adds the glow on top of this
      ctx.globalAlpha = 0.35;
      ctx.strokeStyle = 'rgba(190, 200, 220, 0.6)';
      ctx.lineWidth = 5;
      ctx.stroke();

      // Inner bright core
      ctx.globalAlpha = 0.85;
      ctx.strokeStyle = 'rgba(240, 243, 255, 0.95)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // ── Animation loop ──
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Lerp — 0.75 = very responsive, almost no visible lag
      smoothX += (mouseX - smoothX) * 0.75;
      smoothY += (mouseY - smoothY) * 0.75;

      const dx = smoothX - prevX;
      const dy = smoothY - prevY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Only add trail when cursor is actually moving (not hovering)
      if (speed > 2) {
        trail.push(new TrailPoint(smoothX, smoothY));
      }

      prevX = smoothX;
      prevY = smoothY;

      // Update & cull trail
      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].update();
        if (trail[i].life <= 0) trail.splice(i, 1);
      }
      while (trail.length > MAX_TRAIL) trail.shift();

      // Draw trail
      drawTrail();

      // ── Silver dot cursor ──
      if (mouseX > 0 && mouseY > 0) {
        // Outer glow
        ctx.globalAlpha = 0.25;
        ctx.fillStyle = '#c0c8d8';
        ctx.beginPath();
        ctx.arc(smoothX, smoothY, 6, 0, Math.PI * 2);
        ctx.fill();
        // Silver core
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = '#e8ecf4';
        ctx.beginPath();
        ctx.arc(smoothX, smoothY, 3, 0, Math.PI * 2);
        ctx.fill();
        // White center
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(smoothX, smoothY, 1, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationId);
      trail = [];
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-sparkle-canvas" />;
};

export default CursorSparkle;
