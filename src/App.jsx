import React, { useEffect, useState, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import VaultPreloader from './components/Vaultpreloader';
import Landing from './Landing';

const Petals = lazy(() => import('./components/Petals'));
const CursorSparkle = lazy(() => import('./components/CursorSparkle'));

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  // Lock scroll while preloader is active
  useEffect(() => {
    if (!preloaderDone) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
  }, [preloaderDone]);

  useEffect(() => {
    if (!preloaderDone) return;

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
  }, [preloaderDone]);

  return (
    <div className="w-full relative">
      <Suspense fallback={null}>
        <CursorSparkle />
      </Suspense>

      {!preloaderDone && (
        <VaultPreloader onComplete={() => setPreloaderDone(true)} />
      )}

      {preloaderDone && (
        <Suspense fallback={null}>
          <Petals />
        </Suspense>
      )}

      <div className="absolute inset-0 bg-black/30 pointer-events-none z-[15]" />

      <Landing />
    </div>
  );
}

export default App;