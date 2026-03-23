import clsx from 'clsx';
import { HTMLProps, PropsWithChildren, useCallback, useEffect, useRef } from 'react';

type DynamicResizeProps = HTMLProps<HTMLDivElement> & {
  enabled: boolean;
};

const resizeMultiplier = 1.3;
const minRatio = 0.3;

export const DynamicResize: React.FC<PropsWithChildren<DynamicResizeProps>> = (
  { children, className, enabled, ...props },
) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pending = useRef<'waiting' | 'scheduled' | 'cooldown'>('waiting');
  const curRatio = useRef(1);
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  const handleChange = useCallback(() => {
    const measureAndAdjust = () => {
      if (wrapperRef.current) {
        let ratio = 1;
        if (enabledRef.current) {
          // The ratio at which the content overflows the container
          const offsetHeight = wrapperRef.current.offsetHeight;
          const scrollHeight = wrapperRef.current.scrollHeight;
          const measuredDifference = offsetHeight / scrollHeight;
          console.log(wrapperRef.current, { measuredDifference, offsetHeight, scrollHeight });
          // Correct for the current ratio to prevent endless downscaling
          const normalized = measuredDifference * curRatio.current;
          // The difference between the current ratio and the measured ratio
          const delta = normalized - curRatio.current;
          const newRatio = curRatio.current + delta * resizeMultiplier;
          ratio = Math.max(minRatio, Math.min(newRatio, 1));
        }
        if (enabledRef.current) console.log(`Measured ratio: ${ratio.toFixed(2)}`);
        curRatio.current = ratio;
        wrapperRef.current.style.fontSize = `${ratio.toFixed(2)}em`;
      }
      pending.current = 'cooldown';
    };

    if (pending.current === 'waiting') {
      pending.current = 'scheduled';
      requestAnimationFrame(measureAndAdjust);
    } else if (pending.current === 'cooldown') {
      pending.current = 'scheduled';
      setTimeout(() => {
        pending.current = 'waiting';
        requestAnimationFrame(measureAndAdjust);
      }, 1000);
    }
    // we are handling `enabled`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!enabledRef.current) return;
    requestAnimationFrame(handleChange);
    setTimeout(handleChange, 1000);
  }, [handleChange, enabled]);

  return (
    <div
      ref={wrapperRef}
      style={{ fontSize: `${(enabled ? curRatio.current : 1).toFixed(2)}em` }}
      className={clsx(className, 'relative')}
      {...props}
    >
      {children}
    </div>
  );
};
