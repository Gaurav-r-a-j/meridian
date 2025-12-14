import React, { useState, useEffect, useMemo } from 'react';
import { ALL_ZONES } from '../constants';

// Modular Components
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import UTCDisplay from '../components/Display/UTCDisplay';
import TimeTravelControl from '../components/Controls/TimeTravelControl';
import SearchBar from '../components/Controls/SearchBar';
import TimeGrid from '../components/TimeGrid/TimeGrid';
import MeetingLinkModal from '../components/Modals/MeetingLinkModal';
import TimerModal from '../components/Modals/TimerModal';
import TimeZoneComparator from '../components/Tools/TimeZoneComparator';

const Home: React.FC = () => {
  // State
  const [now, setNow] = useState(() => {
    const d = new Date();
    d.setSeconds(0, 0);
    return d;
  });
  
  const [offsetMinutes, setOffsetMinutes] = useState(0);
  const [isLive, setIsLive] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const DEFAULT_LIMIT = 12;
  const [visibleLimit, setVisibleLimit] = useState(DEFAULT_LIMIT);

  // Favorites / Pinned State
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('meridian-favorites');
      if (saved) return JSON.parse(saved);
      return ['local', 'gb', 'us-ny', 'jp']; 
    }
    return ['local', 'gb', 'us-ny', 'jp'];
  });

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavs = prev.includes(id) 
        ? prev.filter(fid => fid !== id)
        : [...prev, id];
      
      localStorage.setItem('meridian-favorites', JSON.stringify(newFavs));
      return newFavs;
    });
  };

  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('meridian-theme');
      if (saved) return saved === 'dark';
      return false;
    }
    return false;
  });

  // Optimized Clock Ticker
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      d.setSeconds(0, 0); 
      setNow(prev => {
        if (prev.getTime() === d.getTime()) return prev;
        return d;
      });
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Theme Effect
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

  // Handlers
  const handleOffsetChange = (val: number) => {
    setIsLive(false);
    setOffsetMinutes(val);
  };

  const resetToNow = () => {
    setIsLive(true);
    setOffsetMinutes(0);
  };
  
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setVisibleLimit(DEFAULT_LIMIT);
  };
  
  const handleLoadMore = () => {
    setVisibleLimit(prev => prev + 12);
  };

  // Logic
  const displayDate = new Date(now.getTime() + offsetMinutes * 60 * 1000);

  // Memoized Filtering Logic
  const filteredZones = useMemo(() => {
    if (searchQuery.trim() === '') return ALL_ZONES;
    
    const lowerQuery = searchQuery.toLowerCase();
    return ALL_ZONES.filter(zone => 
      zone.city.toLowerCase().includes(lowerQuery) || 
      zone.country.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  // Pagination Logic
  const totalCount = filteredZones.length;
  const canShowMore = visibleLimit < totalCount;
  
  const pinnedZones = filteredZones.filter(z => favorites.includes(z.id));
  const unpinnedZones = filteredZones.filter(z => !favorites.includes(z.id));
  
  const visibleUnpinned = unpinnedZones.slice(0, visibleLimit);
  const canShowMoreUnpinned = visibleLimit < unpinnedZones.length;

  return (
    <div className="min-h-screen bg-surface-50 text-text-primary font-sans selection:bg-brand-100 selection:text-brand-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        
        <Header 
          onShare={() => setIsShareModalOpen(true)}
          onReset={resetToNow}
          onTimer={() => setIsTimerModalOpen(true)}
          isLive={isLive}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />

        <UTCDisplay displayDate={displayDate} />

        <TimeTravelControl 
          offsetMinutes={offsetMinutes}
          onOffsetChange={handleOffsetChange}
          isLive={isLive}
        />

        <TimeZoneComparator baseDate={displayDate} />

        <SearchBar 
          query={searchQuery}
          onQueryChange={handleSearchChange}
        />

        <TimeGrid 
          pinnedZones={pinnedZones}
          otherZones={visibleUnpinned}
          baseDate={displayDate}
          onClearSearch={() => handleSearchChange('')}
          hasSearchQuery={searchQuery !== ''}
          onShowMore={handleLoadMore}
          canShowMore={canShowMoreUnpinned}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
        
      </div>
      
      <Footer />

      <MeetingLinkModal 
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        baseDate={displayDate}
        zones={[...pinnedZones, ...visibleUnpinned]}
      />
      
      <TimerModal 
        isOpen={isTimerModalOpen}
        onClose={() => setIsTimerModalOpen(false)}
      />
    </div>
  );
};

export default Home;

