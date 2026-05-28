import { useCallback, useEffect, useRef, useState } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

const FORK_URL = 'https://github.com/sempostma/portfolio/fork';
const SHAKE_THRESHOLD = 22;
const SHAKE_INTERVAL_MS = 120;

type ShakeState = 'unsupported' | 'idle' | 'armed' | 'forked';

interface DeviceMotionEventStatic {
  requestPermission?: () => Promise<'granted' | 'denied'>;
}

function isMac(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent);
}

export function ForkPrompt() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [shakeState, setShakeState] = useState<ShakeState>('idle');
  const [cookieToast, setCookieToast] = useState(false);
  const lastShake = useRef({ x: 0, y: 0, z: 0, t: 0 });
  const mac = isMac();

  useEffect(() => {
    if (typeof window !== 'undefined' && !('DeviceMotionEvent' in window)) {
      setShakeState('unsupported');
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const mod = mac ? e.metaKey : e.ctrlKey;
      if (mod && key === 'b') {
        e.preventDefault();
        setCookieToast(true);
        window.setTimeout(() => setCookieToast(false), 3500);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mac]);

  useEffect(() => {
    if (shakeState !== 'armed') return;

    const onMotion = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc || acc.x == null || acc.y == null || acc.z == null) return;
      const now = Date.now();
      const last = lastShake.current;
      const dt = now - last.t;
      if (dt < SHAKE_INTERVAL_MS) return;
      const delta = Math.abs(acc.x - last.x) + Math.abs(acc.y - last.y)
        + Math.abs(acc.z - last.z);
      const speed = (delta / dt) * 1000;
      lastShake.current = { x: acc.x, y: acc.y, z: acc.z, t: now };
      if (speed > SHAKE_THRESHOLD) {
        setShakeState('forked');
        window.open(FORK_URL, '_blank', 'noopener,noreferrer');
      }
    };

    window.addEventListener('devicemotion', onMotion);
    return () => window.removeEventListener('devicemotion', onMotion);
  }, [shakeState]);

  const armShake = useCallback(async () => {
    const Ctor = (window as unknown as { DeviceMotionEvent: DeviceMotionEventStatic })
      .DeviceMotionEvent;
    if (typeof Ctor?.requestPermission === 'function') {
      try {
        const result = await Ctor.requestPermission();
        if (result !== 'granted') {
          setShakeState('unsupported');
          return;
        }
      } catch {
        setShakeState('unsupported');
        return;
      }
    }
    setShakeState('armed');
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label="Fork this site"
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-4 right-4 z-[900] w-12 h-12 rounded-full bg-primary text-dark shadow-lg flex items-center justify-center text-2xl hover:scale-110 active:scale-95 transition-transform cursor-pointer"
      >
        <span aria-hidden>{open ? '×' : '⑂'}</span>
      </button>

      {open && (
        <div
          className="fixed bottom-20 right-4 z-[900] max-w-[90vw] desktop:max-w-sm bg-dark text-white border border-primary/40 rounded-lg shadow-2xl p-4 text-sm leading-snug font-mono"
          role="dialog"
          aria-label="Fork this portfolio"
        >
          {isMobile
            ? <MobileForkBody shakeState={shakeState} onArm={armShake} />
            : <DesktopForkBody mac={mac} />}
        </div>
      )}

      {cookieToast && (
        <div
          role="status"
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[950] bg-secondary text-dark px-4 py-2 rounded-md shadow-xl text-sm font-mono pointer-events-none"
        >
          🍪 sorry, all out — try again in 1970
        </div>
      )}
    </>
  );
}

function MobileForkBody(
  { shakeState, onArm }: { shakeState: ShakeState; onArm: () => void },
) {
  return (
    <div className="space-y-3">
      <p className="text-secondary font-bold">Fork this portfolio</p>
      {shakeState === 'unsupported' && (
        <>
          <p>Your device blocked motion sensors. Tap below to fork the old-fashioned way:</p>
          <a
            href={FORK_URL}
            target="_blank"
            rel="noreferrer"
            className="block text-center bg-primary text-dark! px-3 py-2 rounded-md font-bold"
          >
            ⑂ Fork on GitHub
          </a>
        </>
      )}
      {shakeState === 'idle' && (
        <>
          <p>Shake your phone like an etch-a-sketch to fork on GitHub.</p>
          <button
            type="button"
            onClick={onArm}
            className="w-full bg-primary text-dark px-3 py-2 rounded-md font-bold cursor-pointer"
          >
            📳 Arm shake-to-fork
          </button>
        </>
      )}
      {shakeState === 'armed' && (
        <p className="text-secondary">
          📳 Ready! Give your phone a good shake.
        </p>
      )}
      {shakeState === 'forked' && (
        <>
          <p className="text-secondary">🎉 Opening fork page…</p>
          <a
            href={FORK_URL}
            target="_blank"
            rel="noreferrer"
            className="block text-center underline"
          >
            (didn't open? tap here)
          </a>
        </>
      )}
    </div>
  );
}

function DesktopForkBody({ mac }: { mac: boolean }) {
  const modKey = mac ? '⌘' : 'Ctrl';
  return (
    <div className="space-y-3">
      <p className="text-secondary font-bold">Like this portfolio?</p>
      <a
        href={FORK_URL}
        target="_blank"
        rel="noreferrer"
        className="block text-center bg-primary text-dark! px-3 py-2 rounded-md font-bold hover:scale-[1.02] transition-transform"
      >
        ⑂ Fork it on GitHub
      </a>
      <p className="text-xs opacity-90">
        💡 Press <Kbd>{modKey}</Kbd> + <Kbd>D</Kbd> to bookmark this site.
      </p>
      <p className="text-xs opacity-90">
        🍪 Press <Kbd>{modKey}</Kbd> + <Kbd>B</Kbd> for free cookies.
      </p>
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-block px-1.5 py-0.5 mx-0.5 rounded border border-white/40 bg-white/10 text-[0.7em] font-mono">
      {children}
    </kbd>
  );
}
