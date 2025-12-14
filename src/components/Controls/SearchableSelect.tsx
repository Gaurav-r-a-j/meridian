import React, { useState, useRef, useEffect, useMemo } from 'react';

export interface SelectOption {
  id: string;
  label: string;
  subLabel?: string;
  icon?: string; // Emoji flag
  rightLabel?: string; // For time difference e.g. "+5h"
}

interface SearchableSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({ 
  options, 
  value, 
  onChange, 
  placeholder = "Select...",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find(opt => opt.id === value);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when opening
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    const lowerQuery = searchQuery.toLowerCase();
    return options.filter(opt => 
      opt.label.toLowerCase().includes(lowerQuery) || 
      (opt.subLabel && opt.subLabel.toLowerCase().includes(lowerQuery))
    );
  }, [options, searchQuery]);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-surface-50 border border-surface-200 rounded-xl text-sm font-medium hover:bg-surface-100 transition-colors focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 outline-none"
      >
        <span className="flex items-center gap-2 truncate text-text-primary">
          {selectedOption ? (
            <>
              <span className="text-lg">{selectedOption.icon}</span>
              <span>{selectedOption.label}</span>
            </>
          ) : (
            <span className="text-text-muted">{placeholder}</span>
          )}
        </span>
        <svg 
          className={`w-4 h-4 text-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-surface-card border border-surface-200 rounded-xl shadow-xl overflow-hidden origin-top">
          {/* Search Header */}
          <div className="p-2 border-b border-surface-200 bg-surface-50/50 backdrop-blur-sm sticky top-0">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search city..."
                className="w-full pl-9 pr-3 py-2 bg-surface-0 border border-surface-200 rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 outline-none"
              />
              <svg 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Options List */}
          <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-surface-300 scrollbar-track-transparent">
            {filteredOptions.length > 0 ? (
              <div className="p-1">
                {filteredOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => {
                      onChange(option.id);
                      setIsOpen(false);
                      setSearchQuery("");
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-sm transition-colors group ${
                      value === option.id 
                        ? 'bg-brand-50 text-brand-900 dark:bg-brand-900/20 dark:text-brand-100' 
                        : 'text-text-primary hover:bg-surface-100'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xl flex-shrink-0">{option.icon}</span>
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium truncate">{option.label}</span>
                        {option.subLabel && (
                          <span className={`text-xs truncate ${value === option.id ? 'text-brand-700/70 dark:text-brand-300/70' : 'text-text-muted'}`}>
                            {option.subLabel}
                          </span>
                        )}
                      </div>
                    </div>
                    {option.rightLabel && (
                      <span className={`text-xs font-mono font-medium ml-2 flex-shrink-0 ${
                        value === option.id ? 'text-brand-700 dark:text-brand-300' : 'text-text-tertiary'
                      }`}>
                        {option.rightLabel}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-sm text-text-muted">
                No cities found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
