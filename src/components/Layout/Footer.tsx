import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-surface-50 border-t border-surface-200 dark:border-surface-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="shrink-0 transition-transform group-hover:scale-105">
                <Logo size="sm" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-700 to-brand-500 dark:from-brand-400 dark:to-brand-300">
                Meridian
              </span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed mb-6 max-w-sm">
              Beautiful, modern time zone converter for global teams. Compare times across 200+ cities, plan meetings, and never miss a call.
            </p>
            <div className="flex gap-4">
               {/* Social placeholders or other small links could go here */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-text-secondary hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Time Converter
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-text-secondary hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-text-secondary hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Legal */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Studio</h3>
            <ul className="space-y-3 text-sm">
               <li>
                <a 
                  href="https://studio.designbyte.dev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-brand-600 dark:hover:text-brand-400 transition-colors inline-flex items-center gap-1"
                >
                  Designbyte Studio
                  <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="mailto:hello@designbyte.dev" className="text-text-secondary hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-surface-200 dark:border-surface-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            © {currentYear} Meridian. All rights reserved.
          </p>
          <p className="text-xs text-text-muted flex items-center gap-1">
             Made with <span className="text-red-500 animate-pulse">❤️</span> by Designbyte Studio
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;