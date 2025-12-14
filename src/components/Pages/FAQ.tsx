import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Layout/Logo';
import Footer from '../Layout/Footer';
import FAQSection from './FAQSection';

const FAQ: React.FC = () => {
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
             {/* Simple Header for FAQ Page */}
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

            <main className="flex-grow pt-12">
               <FAQSection />

               <div className="max-w-4xl mx-auto px-4 pb-20 sm:px-6 lg:px-8">
                    <div className="bg-brand-50 dark:bg-brand-900/20 rounded-3xl p-8 md:p-12 border border-brand-200 dark:border-brand-800 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                        Still have questions?
                    </h2>
                    <p className="text-text-secondary mb-8 max-w-lg mx-auto">
                        Can't find the answer you're looking for? Reach out to our support team and we'll get back to you as soon as possible.
                    </p>
                    <a
                        href="https://studio.designbyte.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-semibold transition-colors shadow-lg shadow-brand-500/20"
                    >
                        Contact Designbyte Studio
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                    </div>
               </div>
            </main>

            <Footer />
        </div>
    );
};

export default FAQ;
