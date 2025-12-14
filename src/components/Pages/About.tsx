import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Layout/Logo';
import Footer from '../Layout/Footer';

const About: React.FC = () => {
  // Theme State (Duplicated from Home for standalone page consistency)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('meridian-theme');
      if (saved) return saved === 'dark';
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('meridian-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('meridian-theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <div className="min-h-screen bg-surface-50 text-text-primary font-sans flex flex-col transition-colors duration-300">
      
      {/* Simple Header for About Page */}
      <header className="w-full px-4 py-6 sm:px-6 lg:px-8 border-b border-surface-200 dark:border-surface-800 bg-surface-50/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
           <Link to="/" className="flex items-center gap-3 group">
              <div className="shrink-0 transition-transform group-hover:scale-95">
                <Logo size="sm" />
              </div>
              <span className="text-xl font-extrabold text-text-primary tracking-tight">Meridian</span>
           </Link>

           <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-text-secondary hover:bg-surface-200 transition-colors"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
           >
             {isDarkMode ? (
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
               </svg>
             ) : (
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
               </svg>
             )}
           </button>
        </div>
      </header>

      <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-text-primary mb-6 tracking-tight">
            Time, <span className="text-brand-600 dark:text-brand-400">Simplified.</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Meridian is built for global citizens, remote teams, and digital nomads who need to make sense of a world running on different clocks.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12 mb-20">
            <div className="bg-surface-card p-8 rounded-3xl border border-surface-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-2xl flex items-center justify-center text-brand-600 mb-6">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">Global Formatting</h3>
                <p className="text-text-secondary leading-relaxed">
                    Instantly visualize time across 200+ cities. We handle the complex daylight saving transitions so you don't have to mental math.
                </p>
            </div>

            <div className="bg-surface-card p-8 rounded-3xl border border-surface-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">Meeting Planner</h3>
                <p className="text-text-secondary leading-relaxed">
                    Find the perfect overlap. Our visual timeline makes it easy to spot the "golden hours" where everyone is awake.
                </p>
            </div>
            
             <div className="bg-surface-card p-8 rounded-3xl border border-surface-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">Lighting Fast</h3>
                <p className="text-text-secondary leading-relaxed">
                    Built with Vite and React for instant load times. No bloat, just the tools you need to stay synchronized.
                </p>
            </div>

             <div className="bg-surface-card p-8 rounded-3xl border border-surface-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">Privacy First</h3>
                <p className="text-text-secondary leading-relaxed">
                    Your preferences are stored locally on your device. We don't track your location or store any personal data.
                </p>
            </div>
        </div>
        
        <div className="rounded-3xl bg-surface-card border border-surface-200 overflow-hidden">
            <div className="p-8 md:p-12 text-center">
                 <h2 className="text-2xl font-bold text-text-primary mb-4">Crafted by Designbyte Studio</h2>
                 <p className="text-text-secondary max-w-lg mx-auto mb-8">
                     We are a small team of designers and engineers passionate about building software that feels human.
                 </p>
                 <a 
                    href="https://studio.designbyte.dev" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-brand-500/20"
                 >
                    Check out our work
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                 </a>
            </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default About;
