import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="mt-16 text-center text-text-muted text-sm pb-8">
       <p>Don't see your city? Use the search bar to find it.</p>
       <p className="mt-4 font-medium text-text-secondary opacity-70">
         Built by <span className="text-brand-600 font-bold">DesignByte Studio</span>
       </p>
    </div>
  );
};

export default Footer;