import React, { useMemo } from 'react';
import { TimeZone } from '../../types';
import { getPublicHoliday } from '../../utils/holidays';
import { getCachedDateTimeFormat } from '../../utils/formatters';

interface TimeCardProps {
  zone: TimeZone;
  baseDate: Date;
  isPinned?: boolean;
  onTogglePin?: () => void;
}

const TimeCard: React.FC<TimeCardProps> = ({ zone, baseDate, isPinned = false, onTogglePin }) => {
  const { timeString, dateString, isBusinessHours, isNight, holidayName } = useMemo(() => {
    try {
      const iana = zone.iana;
      
      const timeFormatter = getCachedDateTimeFormat(iana, {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });

      const dateFormatter = getCachedDateTimeFormat(iana, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      
      const hourFormatter = getCachedDateTimeFormat(iana, {
        hour: 'numeric',
        hour12: false,
      });

      const timeString = timeFormatter.format(baseDate);
      const dateString = dateFormatter.format(baseDate);
      const localHour = parseInt(hourFormatter.format(baseDate), 10);

      const isBusinessHours = localHour >= 9 && localHour < 18;
      const isNight = localHour >= 22 || localHour < 6;

      const holidayName = getPublicHoliday(baseDate, iana, zone.id);
      
      return { timeString, dateString, isBusinessHours, isNight, holidayName };
    } catch (e) {
      return { timeString: '--:--', dateString: '', isBusinessHours: false, isNight: false, holidayName: null };
    }
  }, [baseDate, zone.iana, zone.id]);

  // Determine dynamic styles
  let bgGradient = 'from-orange-50/50 to-amber-50/50 dark:from-orange-900/20 dark:to-amber-900/20';
  let blobColor = 'from-orange-300 to-yellow-500';
  let hoverTextClass = 'group-hover:text-orange-600 dark:group-hover:text-orange-400';
  let statusBadgeClass = 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700';
  let statusText = '';

  if (holidayName) {
    bgGradient = 'from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20';
    blobColor = 'from-purple-400 to-pink-500';
    hoverTextClass = 'group-hover:text-purple-600 dark:group-hover:text-purple-400';
    statusBadgeClass = 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800';
    statusText = 'HOLIDAY';
  } else if (isBusinessHours) {
    bgGradient = 'from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/20 dark:to-teal-900/20';
    blobColor = 'from-emerald-400 to-teal-600';
    hoverTextClass = 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400';
    statusBadgeClass = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 cursor-help';
    statusText = 'OPEN';
  } else if (isNight) {
    bgGradient = 'from-indigo-50/50 to-blue-50/50 dark:from-indigo-900/20 dark:to-blue-900/20';
    blobColor = 'from-indigo-600 to-blue-900';
    hoverTextClass = 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400';
    statusBadgeClass = 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
    statusText = 'NIGHT';
  }

  return (
    <div className={`
      group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 ease-out
      bg-surface-card border-surface-200 shadow-sm 
      hover:shadow-lg hover:-translate-y-1 hover:border-surface-300 dark:hover:border-surface-600
    `}>
      {/* Pin Button */}
      {onTogglePin && (
        <button 
          onClick={(e) => { e.stopPropagation(); onTogglePin(); }}
          className={`
            absolute top-3 right-3 p-2 rounded-full z-20 transition-all duration-200
            ${isPinned 
               ? 'text-brand-500 bg-brand-50 dark:bg-brand-900/30 opacity-100' 
               : 'text-text-muted opacity-0 group-hover:opacity-100 hover:bg-surface-100 hover:text-text-secondary'
             }
          `}
          title={isPinned ? "Unpin location" : "Pin location to top"}
        >
           <svg className="w-4 h-4" fill={isPinned ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
           </svg>
        </button>
      )}

      {/* Background Ambience */}
      <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${bgGradient}`} />
      <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br opacity-10 dark:opacity-20 blur-3xl rounded-full transition-colors duration-500 -z-10 ${blobColor}`} />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-3 pr-6">
          <div className="flex items-start gap-3">
            <span className="text-3xl drop-shadow-sm mt-1 transition-transform duration-300 group-hover:scale-110 origin-center">
              {zone.flag}
            </span>
            <div>
              <h3 className="font-bold text-text-primary leading-tight text-lg transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-400">
                {zone.country}
              </h3>
              <p className="text-xs text-text-secondary font-medium tracking-wide uppercase">
                {zone.city}
              </p>
            </div>
          </div>
        </div>

        {/* Time Display */}
        <div className="flex items-baseline justify-between mt-4">
          <div className={`text-4xl font-extrabold text-text-primary tracking-tighter tabular-nums transition-all duration-300 group-hover:scale-[1.03] origin-left ${hoverTextClass}`}>
            {timeString}
          </div>
          
           {/* Status Badge (Moved to bottom right of time for better layout with pin button) */}
           {(statusText || holidayName) && (
              <span 
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border truncate max-w-[100px] ml-auto ${statusBadgeClass}`} 
                title={holidayName || (statusText === 'OPEN' ? 'Business Hours: 9:00 AM - 6:00 PM' : statusText)}
              >
                 {holidayName ? 'HOLIDAY' : statusText}
              </span>
          )}
        </div>
        
        <div className="mt-2 pl-0.5 border-t border-surface-100 dark:border-surface-800 pt-2 flex justify-between items-center group-hover:border-surface-300 dark:group-hover:border-surface-700 transition-colors">
            <div className="text-sm text-text-muted font-medium group-hover:text-text-secondary transition-colors">
               {dateString}
            </div>
        </div>
        
        {holidayName && (
          <div className="mt-2 text-xs font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1 animate-pulse">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            {holidayName}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(TimeCard);