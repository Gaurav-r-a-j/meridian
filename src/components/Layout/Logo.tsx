import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md',
  rounded = true 
}) => {
  // Size mappings
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const baseClasses = `${sizeClasses[size]} ${rounded ? 'rounded-full' : 'rounded-lg'} object-cover ${className}`;

  return (
    <img 
      src="/logo.webp" 
      alt="Meridian Logo" 
      className={baseClasses}
      loading="eager"
      aria-label="Meridian - Global Time Zone Converter"
    />
  );
};

export default Logo;