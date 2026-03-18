import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// Files served from /public
const vaultImg      = '/vault_full46.jpeg';
const vaultImgPhone = '/preloader_phone.jpeg';
const vaultLockImg  = '/vault-lock-1.png';
const xenithLogo    = '/xenith_logo.png';
const lockClickSfx  = '/lock-click.mp3';
const doorCreakSfx  = '/door-creak.wav';
const logoWhooshSfx = '/logo-whoosh.mp3';

const isMobile  = typeof window !== 'undefined' && window.innerWidth <= 768;
const bgImg     = isMobile ? vaultImgPhone : vaultImg;
const lockSize  = isMobile ? '130px' : '140px';
const lockLeft  = isMobile ? '50.6%' : '49.23%';

export default function VaultPreloader({ onComplete }) {
  const [hintVisible, setHintVisible] = useState(true);
  const hasStarted = useRef(false);

  // Element refs
  const preloaderRef = useRef(null);
  const lock1Ref     = useRef(null);
  const lock2Ref     = useRef(null);
  const lock3Ref     = useRef(null);
  const row1LeftRef  = useRef(null);
  const row1RightRef = useRef(null);
  const row2LeftRef  = useRef(null);
  const row2RightRef = useRef(null);
  const row3LeftRef  = useRef(null);
  const row3RightRef = useRef(null);
  const fog1Ref      = useRef(null);
  const fog2Ref      = useRef(null);
  const logoRef      = useRef(null);

  // Sound refs
  const lockSoundRef = useRef(null);
  const doorSoundRef = useRef(null);
  const logoSoundRef = useRef(null);

  useEffect(() => {
    lockSoundRef.current = new Audio(lockClickSfx);
    lockSoundRef.current.load();
    lockSoundRef.current.volume = 1;

    doorSoundRef.current = new Audio(doorCreakSfx);
    doorSoundRef.current.load();
    doorSoundRef.current.volume = 1;

    logoSoundRef.current = new Audio(logoWhooshSfx);
    logoSoundRef.current.load();
    logoSoundRef.current.volume = 1;
  }, []);

  const handleClick = () => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    setHintVisible(false);

    const playLock = () => {
      setTimeout(() => {
        lockSoundRef.current.currentTime = 0;
        lockSoundRef.current.play().catch(() => {});
      }, 150);
    };

    const playDoor = () => {
      // Clone so second creak can overlap first
      const sfx = doorSoundRef.current.cloneNode();
      sfx.volume = 1;
      sfx.play().catch(() => {});
    };

    const playLogoZoom = () => {
      logoSoundRef.current.currentTime = 0;
      logoSoundRef.current.play().catch(() => {});
    };

    const tl = gsap.timeline();

    tl
      // ── Phase 1: Locks spin one after another ──────────────────────────────
      .to(lock1Ref.current, {
        rotation: -720, duration: 2.0, ease: 'power2.inOut', onStart: playLock,
      })
      .to(lock2Ref.current, {
        rotation: -720, duration: 2.0, ease: 'power2.inOut', onStart: playLock,
      }, '-=0.8')
      .to(lock3Ref.current, {
        rotation: -720, duration: 2.0, ease: 'power2.inOut', onStart: playLock,
      }, '-=0.8')

      // ── Phase 2: All locks shrink + fade ───────────────────────────────────
      .to([lock1Ref.current, lock2Ref.current, lock3Ref.current], {
        opacity: 0, scale: 0.7, duration: 0.6, ease: 'back.in(4)',
      }, '+=0.1')

      .add('open', '-=0.2')

      // ── Phase 3: Fogs fade out ─────────────────────────────────────────────
      .to(fog1Ref.current, { opacity: 0, duration: 1 }, 'open')
      .to(fog2Ref.current, { opacity: 0, duration: 1 }, 'open')

      // ── Phase 4: Row 2 slides open first ──────────────────────────────────
      .to(row2LeftRef.current,  { x: '-100%', duration: 2.8, ease: 'power2.inOut', onStart: playDoor }, 'open')
      .to(row2RightRef.current, { x:  '100%', duration: 2.8, ease: 'power2.inOut' }, 'open')

      // ── Phase 5: Rows 1 & 3 slide open 1s later ───────────────────────────
      .to(row1LeftRef.current,  { x: '-100%', duration: 2.8, ease: 'power2.inOut', onStart: playDoor }, 'open+=1.0')
      .to(row1RightRef.current, { x:  '100%', duration: 2.8, ease: 'power2.inOut' }, 'open+=1.0')
      .to(row3LeftRef.current,  { x: '-100%', duration: 2.8, ease: 'power2.inOut', onStart: playDoor }, 'open+=1.0')
      .to(row3RightRef.current, { x:  '100%', duration: 2.8, ease: 'power2.inOut' }, 'open+=1.0')

      // ── Phase 6: Logo fades IN, holds, then zooms out ─────────────────────
      .add('vaultDone', 'open+=3.9')
      // Step 1 — fade logo in
      .to(logoRef.current, {
        opacity: 1, duration: 0.8, ease: 'power2.out',
      }, 'vaultDone')
      // Step 2 — hold then zoom + blur out (whoosh plays exactly when zoom starts)
      .to(logoRef.current, {
        scale: 60, opacity: 0, duration: 3.5,
        ease: 'power2.in', filter: 'blur(12px)',
        onStart: playLogoZoom,
      }, 'vaultDone+=1.4')

      // ── Phase 7: Preloader fades out ───────────────────────────────────────
      .to(preloaderRef.current, { opacity: 0, duration: 1 }, 'vaultDone+=2.0')

      .call(() => {
        if (preloaderRef.current) preloaderRef.current.style.display = 'none';
        if (onComplete) onComplete();
      });
  };

  const rows = [
    { id: 'row1', leftRef: row1LeftRef, rightRef: row1RightRef, lockRef: lock1Ref, posY: 'top',    lockTop: '50%' },
    { id: 'row2', leftRef: row2LeftRef, rightRef: row2RightRef, lockRef: lock2Ref, posY: 'center', lockTop: '45%' },
    { id: 'row3', leftRef: row3LeftRef, rightRef: row3RightRef, lockRef: lock3Ref, posY: 'bottom', lockTop: '50%' },
  ];

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'fixed', inset: 0, width: '100%', height: '100%',
        overflow: 'hidden', backgroundColor: '#000',
        cursor: 'pointer', zIndex: 10000,
      }}
    >
      {/* Red radial glow */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 5,
        background: 'radial-gradient(circle at center, rgba(255,0,0,0.12) 0%, rgba(255,0,0,0.08) 30%, rgba(255,0,0,0.04) 55%, transparent 75%)',
      }} />

      {/* Fog layer 1 */}
      <div ref={fog1Ref} style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 6,
        background: 'radial-gradient(ellipse at 30% 60%, rgba(80,0,0,0.18) 0%, transparent 60%)',
        animation: 'xv-fogLeft 8s ease-in-out infinite alternate',
      }} />

      {/* Fog layer 2 */}
      <div ref={fog2Ref} style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 6,
        background: 'radial-gradient(ellipse at 70% 40%, rgba(80,0,0,0.15) 0%, transparent 60%)',
        animation: 'xv-fogRight 10s ease-in-out infinite alternate',
      }} />

      {/* Click hint */}
      {hintVisible && (
        <div style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'rgba(255,255,255,0.85)', fontFamily: 'sans-serif',
          letterSpacing: '3px', textTransform: 'uppercase', fontSize: '10px',
          zIndex: 10001, animation: 'xv-heartbeat 1.2s ease-in-out infinite',
          pointerEvents: 'none',
        }}>
          Tap to Unlock the Vault
        </div>
      )}

      {/* Main preloader wrapper */}
      <div ref={preloaderRef} style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', flexDirection: 'column',
      }}>

        {/* Logo — hidden until vault opens */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2,
          pointerEvents: 'none',
        }}>
          <img
            ref={logoRef}
            src={xenithLogo}
            alt="Xenith Logo"
            style={{ width: '220px', opacity: 0 }}
          />
        </div>

        {/* Vault rows */}
        {rows.map(({ id, leftRef, rightRef, lockRef, posY, lockTop }) => (
          <div key={id} style={{
            flex: 1, display: 'flex', position: 'relative', zIndex: 10, overflow: 'hidden',
          }}>
            {/* Left panel */}
            <div ref={leftRef} style={{
              flex: 1,
              backgroundImage: `url(${bgImg})`,
              backgroundSize: '100vw 100vh',
              backgroundRepeat: 'no-repeat',
              backgroundPositionX: 'left',
              backgroundPositionY: posY,
            }} />

            {/* Lock */}
            <div ref={lockRef} style={{
              position: 'absolute',
              left: lockLeft,
              top: lockTop,
              transform: 'translate(-50%, -50%)',
              width: lockSize,
              height: lockSize,
              zIndex: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img
                src={vaultLockImg}
                alt="lock"
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </div>

            {/* Right panel */}
            <div ref={rightRef} style={{
              flex: 1,
              backgroundImage: `url(${bgImg})`,
              backgroundSize: '100vw 100vh',
              backgroundRepeat: 'no-repeat',
              backgroundPositionX: 'right',
              backgroundPositionY: posY,
            }} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes xv-heartbeat {
          0%   { transform: translate(-50%, -50%) scale(1);    }
          50%  { transform: translate(-50%, -50%) scale(1.08); }
          100% { transform: translate(-50%, -50%) scale(1);    }
        }
        @keyframes xv-fogLeft {
          0%   { transform: translate(0px, 0px);     opacity: 0.9; }
          100% { transform: translate(500px, 300px); opacity: 0.8; }
        }
        @keyframes xv-fogRight {
          0%   { transform: translate(0px, 0px);      opacity: 0.9; }
          100% { transform: translate(-500px, -300px); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}