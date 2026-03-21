import { ReactNode } from 'react';

interface GlitchProps {
  children: ReactNode;
  className?: string;
}

export function Glitch({ children, className = '' }: GlitchProps) {
  return (
    <div className={`glitch ${className}`}>
      <div className="glitch-before">{children}</div>
      {children}
      <div className="glitch-after">{children}</div>
    </div>
  );
}
