import React, { useEffect, useState, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import { Analytics } from '@vercel/analytics/react';
import VaultPreloader from './components/Vaultpreloader';
import Landing from './Landing';

const Petals = lazy(() => import('./components/Petals'));
const CursorSparkle = lazy(() => import('./components/CursorSparkle'));

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [siteReady, setSiteReady] = useState(false);

  // Lock scroll while not ready
  useEffect(() => {
    if (!siteReady) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
  }, [siteReady]);

  // After preloader done, wait for the hero images in DOM to actually load
  useEffect(() => {
    if (!preloaderDone) return;

    // Give browser a moment to start rendering Landing, then check images
    const timer = setTimeout(() => {
      const heroImages = document.querySelectorAll('.hs-parallax-img, .hs-hero-logo');
      if (!heroImages.length) {
        // No images found yet, just show site
        setSiteReady(true);
        return;
      }

      let loaded = 0;
      const total = heroImages.length;
      const checkDone = () => {
        loaded++;
        if (loaded >= total) setSiteReady(true);
      };

      heroImages.forEach((img) => {
        if (img.complete) {
          checkDone();
        } else {
          img.addEventListener('load', checkDone, { once: true });
          img.addEventListener('error', checkDone, { once: true });
        }
      });

      // Safety timeout — don't wait forever (max 8 seconds)
      setTimeout(() => setSiteReady(true), 8000);
    }, 100);

    return () => clearTimeout(timer);
  }, [preloaderDone]);

  // Smooth scroll via Lenis
  useEffect(() => {
    if (!siteReady) return;


    const lenis = new Lenis({
      duration: 2.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [siteReady]);

  return (
    <div className="w-full relative">
      {/* Vault preloader — on top of everything */}
      {!preloaderDone && (
        <VaultPreloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* Landing renders after preloader so images start loading behind the overlay */}
      {preloaderDone && (
        <>
          <div className="absolute inset-0 bg-black/30 pointer-events-none z-[15]" />
          <Landing />
        </>
      )}

      {/* Decorative effects only load AFTER site is ready — no lag competition */}
      {siteReady && (
        <>
          <Suspense fallback={null}>
            <CursorSparkle />
          </Suspense>
          <Suspense fallback={null}>
            <Petals />
          </Suspense>
        </>
      )}

      {/* LOADING OVERLAY — shows after vault until hero images are painted */}
      {preloaderDone && !siteReady && (
        <div
          id="loading-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: '#050810',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '28px',
          }}
        >
          <style>{`
            @keyframes lo-kanjiPulse {
              0%, 100% { opacity: 0.5; text-shadow: 0 0 10px rgba(220,38,38,0.3); transform: scale(1); }
              50% { opacity: 1; text-shadow: 0 0 30px rgba(220,38,38,0.8), 0 0 60px rgba(220,38,38,0.3); transform: scale(1.05); }
            }
            @keyframes lo-slashGlow {
              0%, 100% { opacity: 0.4; }
              50% { opacity: 1; }
            }
            @keyframes lo-dotBounce {
              0%, 80%, 100% { transform: translateY(0); }
              40% { transform: translateY(-6px); }
            }
          `}</style>

          <div style={{
            fontFamily: 'serif',
            fontSize: 'clamp(52px, 10vw, 90px)',
            color: '#dc2626',
            animation: 'lo-kanjiPulse 2s ease-in-out infinite',
            letterSpacing: '12px',
            userSelect: 'none',
          }}>
            準備中
          </div>

          <div style={{
            width: '55%', height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(220,38,38,1), transparent)',
            boxShadow: '0 0 20px rgba(220,38,38,0.6), 0 0 40px rgba(220,38,38,0.2)',
            animation: 'lo-slashGlow 2s ease-in-out infinite',
          }} />

          <div style={{
            fontFamily: "'Cinzel', Georgia, serif",
            fontSize: 'clamp(11px, 1.5vw, 14px)',
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '5px',
            textTransform: 'uppercase',
            display: 'flex', alignItems: 'center', gap: '3px',
          }}>
            LOADING
            <span style={{ display: 'inline-block', animation: 'lo-dotBounce 1.4s 0.0s infinite' }}>.</span>
            <span style={{ display: 'inline-block', animation: 'lo-dotBounce 1.4s 0.2s infinite' }}>.</span>
            <span style={{ display: 'inline-block', animation: 'lo-dotBounce 1.4s 0.4s infinite' }}>.</span>
          </div>
        </div>
      )}
      <Analytics />
    </div>
  );
}

export default App;