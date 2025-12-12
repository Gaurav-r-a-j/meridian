import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-label="Meridian Logo"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0" y1="0" x2="100" y2="100">
          <stop offset="0%" stopColor="currentColor" className="text-brand-500" />
          <stop offset="100%" stopColor="currentColor" className="text-brand-700" />
        </linearGradient>
      </defs>
      
      {/* Outer Ring - Day/Night Cycle */}
      <circle cx="50" cy="50" r="42" stroke="url(#logoGradient)" strokeWidth="8" strokeLinecap="round" strokeDasharray="200 64" transform="rotate(-45 50 50)" className="opacity-90" />
      
      {/* Inner Globe/Meridian Lines */}
      <path d="M50 8 A 42 42 0 0 1 50 92" stroke="url(#logoGradient)" strokeWidth="4" fill="none" className="opacity-60" />
      <path d="M20 50 Q 50 20 80 50 Q 50 80 20 50" stroke="url(#logoGradient)" strokeWidth="4" fill="none" className="opacity-60" />
      
      {/* Center Dial/Time Indicator */}
      <circle cx="50" cy="50" r="8" fill="url(#logoGradient)" />
      <path d="M50 50 L70 30" stroke="url(#logoGradient)" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
};

export default Logo;