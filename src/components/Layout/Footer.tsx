import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 text-center text-text-muted text-sm pb-8">
       <p>Don't see your city? Use the search bar to find it.</p>
       <p className="mt-4 font-medium text-text-secondary">
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
    </footer>
  );
};

export default Footer;