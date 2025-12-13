import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-surface-200 dark:border-surface-800 pt-8 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-text-primary mb-4">About Meridian</h3>
            <p className="text-sm text-text-secondary mb-4">
              Beautiful, modern time zone converter for global teams. Compare times across 200+ cities, plan meetings, and never miss a call.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-text-primary mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-text-secondary hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Home
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

          {/* Contact */}
          <div>
            <h3 className="font-bold text-text-primary mb-4">Contact</h3>
            <p className="text-sm text-text-secondary mb-4">
              Built by{' '}
              <a 
                href="https://studio.designbyte.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-brand-600 hover:text-brand-700 dark:text-brand-500 dark:hover:text-brand-400 font-bold transition-colors inline-flex items-center gap-1"
              >
                Designbyte Studio
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </p>
          </div>
        </div>

        <div className="text-center text-sm text-text-muted pt-4 border-t border-surface-200 dark:border-surface-800">
          <p>© {currentYear} Meridian. All rights reserved.</p>
          <p className="mt-2">Don't see your city? Use the search bar to find it.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;