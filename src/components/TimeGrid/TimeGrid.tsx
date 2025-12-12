import React from 'react';
import TimeCard from './TimeCard';
import { TimeZone } from '../../types';

interface TimeGridProps {
  pinnedZones: TimeZone[];
  otherZones: TimeZone[];
  baseDate: Date;
  onClearSearch: () => void;
  hasSearchQuery: boolean;
  onShowMore: () => void;
  canShowMore: boolean;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

const TimeGrid: React.FC<TimeGridProps> = ({ 
  pinnedZones,
  otherZones, 
  baseDate, 
  onClearSearch, 
  hasSearchQuery, 
  onShowMore, 
  canShowMore,
  favorites,
  onToggleFavorite
}) => {
  const hasPinned = pinnedZones.length > 0;
  const hasOthers = otherZones.length > 0;
  const isEmpty = !hasPinned && !hasOthers;

  return (
    <div className="space-y-10">
      
      {/* Pinned Section */}
      {hasPinned && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-brand-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
            <h2 className="text-lg font-bold text-text-primary">Pinned Locations</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {pinnedZones.map((zone) => (
              <TimeCard 
                key={zone.id} 
                zone={zone} 
                baseDate={baseDate}
                isPinned={true}
                onTogglePin={() => onToggleFavorite(zone.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Divider if both exist */}
      {hasPinned && hasOthers && (
        <div className="border-t border-surface-200 dark:border-surface-800" />
      )}

      {/* Main Grid */}
      {hasOthers && (
         <section>
           {hasPinned && (
             <h2 className="text-lg font-bold text-text-muted mb-4">All Locations</h2>
           )}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {otherZones.map((zone) => (
              <TimeCard 
                key={zone.id} 
                zone={zone} 
                baseDate={baseDate}
                isPinned={favorites.includes(zone.id)}
                onTogglePin={() => onToggleFavorite(zone.id)}
              />
            ))}
          </div>
        </section>
      )}
        
      {isEmpty && (
        <div className="col-span-full text-center py-12 text-text-muted bg-surface-card rounded-3xl border border-dashed border-surface-200">
          <p className="text-lg">
            No locations found.
          </p>
          {hasSearchQuery && (
            <button 
              onClick={onClearSearch}
              className="mt-2 text-brand-600 hover:text-brand-800 font-medium"
            >
              Clear search
            </button>
          )}
        </div>
      )}

      {/* Show More Button */}
      {canShowMore && (
        <div className="mt-4 text-center">
          <button 
            onClick={onShowMore}
            className="inline-flex items-center gap-2 px-8 py-3 bg-surface-card border border-surface-200 hover:border-brand-300 hover:bg-brand-50 text-text-primary font-semibold rounded-full transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            Load More Cities
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default TimeGrid;