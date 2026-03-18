import React, { useEffect, useState, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import VaultPreloader from './components/Vaultpreloader';

const Landing = lazy(() => import('./Landing'));
const Petals = lazy(() => import('./components/Petals'));
const CursorSparkle = lazy(() => import('./components/CursorSparkle'));

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

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
      {/* Custom cursor — always on top */}
      <Suspense fallback={null}>
        <CursorSparkle />
      </Suspense>

      {/* Vault preloader — sits on top of everything until dismissed */}
      {!preloaderDone && (
        <VaultPreloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* Rest of site only loads after preloader done */}
      {preloaderDone && (
        <Suspense fallback={null}>
          {/* Layer 1: Particles */}
          <Petals />

          {/* Layer 2: Tint */}
          <div className="absolute inset-0 bg-black/30 pointer-events-none z-[15]" />

          {/* Layer 3: The Main Parallax Page */}
          <Landing />
        </Suspense>
      )}
    </div>
  );
}

export default App;