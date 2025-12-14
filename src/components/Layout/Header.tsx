import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

interface HeaderProps {
  onShare: () => void;
  onReset: () => void;
  onTimer: () => void;
  isLive: boolean;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ onShare, onReset, onTimer, isLive, isDarkMode, toggleTheme }) => {
  return (
    <header className="mb-6 md:mb-10 pt-2">
      <div className="flex items-center justify-between gap-3">
        {/* Brand Section */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
           <div className="shrink-0 transition-transform active:scale-95">
             <Logo size="md" className="drop-shadow-sm" alt="Meridian Logo - Global Time Zone Converter" />
           </div>
           
           <div className="flex flex-col justify-center">
             <h1 className="text-xl md:text-3xl font-extrabold text-text-primary tracking-tight leading-none">
              Meridian
            </h1>
            <p className="text-[10px] md:text-sm text-text-secondary font-medium mt-0.5 hidden min-[360px]:block">
              Global Time & Meeting Planner
            </p>
           </div>
        </Link>
        

        
        {/* Actions Section */}
        <div className="flex items-center gap-1.5 md:gap-3">
           {/* Theme Toggle */}
           <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-text-secondary hover:bg-surface-200 transition-colors border border-transparent hover:border-surface-300 active:scale-90 touch-manipulation"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
           >
             {isDarkMode ? (
               <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
               </svg>
             ) : (
               <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
               </svg>
             )}
           </button>

           {/* Timer Button */}
           <button 
             onClick={onTimer}
             className="p-2.5 rounded-full text-text-secondary hover:bg-surface-200 transition-colors border border-transparent hover:border-surface-300 active:scale-90 touch-manipulation"
             title="Meeting Timer"
             aria-label="Open Timer"
           >
             <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
           </button>
  
           {/* Share Button */}
           <button 
             onClick={onShare}
             className="flex items-center justify-center gap-2 bg-surface-card hover:bg-surface-100 text-text-primary border border-surface-200 p-2.5 md:px-5 md:py-2.5 rounded-full font-semibold transition-all shadow-sm hover:shadow-md active:scale-95 touch-manipulation"
             aria-label="Share Meeting"
           >
             <svg className="w-5 h-5 md:w-5 md:h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
             <span className="hidden md:inline">Share</span>
           </button>

           {/* Reset Button (Conditional) */}
           {!isLive && (
             <button 
               onClick={onReset}
               className="flex items-center justify-center bg-brand-600 hover:bg-brand-700 text-white w-10 h-10 md:w-auto md:h-auto md:px-5 md:py-2.5 rounded-full font-semibold transition-all shadow-md shadow-brand-200 dark:shadow-none active:scale-95 animate-in fade-in zoom-in duration-200"
               title="Reset to Live Time"
             >
                <span className="md:hidden">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </span>
               <span className="hidden md:inline">Reset</span>
             </button>
           )}
        </div>
      </div>
    </header>
  );
};

export default Header;