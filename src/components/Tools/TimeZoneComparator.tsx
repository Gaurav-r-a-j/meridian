import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ALL_ZONES } from '../../constants';
import { TimeZone } from '../../types';

interface TimeZoneComparatorProps {
  baseDate: Date;
}

const TimeZoneComparator: React.FC<TimeZoneComparatorProps> = ({ baseDate }) => {
  const [zone1Id, setZone1Id] = useState<string>('local');
  const [zone2Id, setZone2Id] = useState<string>('gb');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const zone1 = ALL_ZONES.find(z => z.id === zone1Id) || ALL_ZONES[0];
  const zone2 = ALL_ZONES.find(z => z.id === zone2Id) || ALL_ZONES[3];

  // Calculate time difference description
  const diffDescription = useMemo(() => {
     const getWallClockTime = (date: Date, iana: string) => {
        const parts = new Intl.DateTimeFormat('en-US', {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: false,
            timeZone: iana
        }).formatToParts(date);
        
        const getPart = (type: string) => parseInt(parts.find(p => p.type === type)?.value || '0', 10);
        return new Date(Date.UTC(getPart('year'), getPart('month')-1, getPart('day'), getPart('hour'), getPart('minute')));
     };

     const wall1 = getWallClockTime(baseDate, zone1.iana);
     const wall2 = getWallClockTime(baseDate, zone2.iana);
     
     const diffMs = wall2.getTime() - wall1.getTime();
     const diffHours = diffMs / (1000 * 60 * 60);
     
     if (Math.abs(diffHours) < 0.01) return "Same time";
     
     const ahead = diffHours > 0;
     const absHours = Math.abs(diffHours);
     const h = Math.floor(absHours);
     const m = Math.round((absHours - h) * 60);
     
     const timeStr = `${h > 0 ? `${h}h` : ''} ${m > 0 ? `${m}m` : ''}`.trim();
     return `${zone2.city} is ${timeStr} ${ahead ? 'ahead of' : 'behind'} ${zone1.city}`;
  }, [baseDate, zone1, zone2]);

  // Generate next 24 hours for timeline
  const timelineHours = useMemo(() => {
    const blocks = [];
    // Start from current hour
    const startHour = new Date(baseDate);
    startHour.setMinutes(0, 0, 0);

    for (let i = 0; i < 24; i++) {
        const t = new Date(startHour.getTime() + i * 60 * 60 * 1000);
        blocks.push(t);
    }
    return blocks;
  }, [baseDate]);

  const getHourInfo = (date: Date, iana: string) => {
      const hourFormatter = new Intl.DateTimeFormat('en-US', {
          hour: 'numeric', hour12: false, timeZone: iana
      });
      const displayFormatter = new Intl.DateTimeFormat('en-US', {
          hour: 'numeric', hour12: true, timeZone: iana
      });
      const dayFormatter = new Intl.DateTimeFormat('en-US', {
          weekday: 'short', timeZone: iana
      });

      const h24 = parseInt(hourFormatter.format(date), 10);
      const label = displayFormatter.format(date).replace(' ', '').toLowerCase(); // "9am"
      const day = dayFormatter.format(date);
      
      // Standardize Business Hours: 9 AM to 6 PM (18:00)
      const isBusiness = h24 >= 9 && h24 < 18;
      const isNight = h24 >= 22 || h24 < 6;
      
      return { h24, label, day, isBusiness, isNight };
  };

  return (
    <div className="bg-surface-card rounded-3xl shadow-lg border border-surface-200 p-4 md:p-8 mb-8 transition-colors duration-300">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <div>
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                    <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    Compare
                </h2>
                <p className="text-sm text-text-muted mt-1">{diffDescription}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
                <select 
                    value={zone1Id} 
                    onChange={(e) => setZone1Id(e.target.value)}
                    className="w-full sm:flex-1 md:w-48 p-2 bg-surface-50 border border-surface-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 outline-none text-text-primary"
                >
                    {ALL_ZONES.map(z => <option key={`z1-${z.id}`} value={z.id}>{z.flag} {z.city}</option>)}
                </select>
                <span className="text-text-muted hidden sm:inline">vs</span>
                <span className="text-text-muted sm:hidden text-xs">comparing with</span>
                <select 
                    value={zone2Id} 
                    onChange={(e) => setZone2Id(e.target.value)}
                    className="w-full sm:flex-1 md:w-48 p-2 bg-surface-50 border border-surface-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 outline-none text-text-primary"
                >
                    {ALL_ZONES.map(z => <option key={`z2-${z.id}`} value={z.id}>{z.flag} {z.city}</option>)}
                </select>
            </div>
        </div>

        {/* Timeline Visualization */}
        <div className="relative border border-surface-200 rounded-xl bg-surface-50 overflow-hidden">
            <div 
                ref={scrollContainerRef}
                className="overflow-x-auto flex divide-x divide-surface-200 no-scrollbar"
                style={{ scrollBehavior: 'smooth' }}
            >
                {timelineHours.map((time, idx) => {
                    const info1 = getHourInfo(time, zone1.iana);
                    const info2 = getHourInfo(time, zone2.iana);
                    
                    // Highlight logic
                    const bothBusiness = info1.isBusiness && info2.isBusiness;
                    const isNow = idx === 0;

                    return (
                        <div key={idx} className={`flex-shrink-0 w-16 flex flex-col items-center justify-center py-3 px-1 transition-colors ${
                             bothBusiness ? 'bg-green-50 dark:bg-green-900/20' : isNow ? 'bg-brand-50 dark:bg-blue-900/20' : ''
                        }`}>
                            {/* Zone 1 Time */}
                            <div className={`text-xs font-semibold mb-1 ${info1.isNight ? 'text-text-muted opacity-60' : 'text-text-primary'}`}>
                                {info1.label}
                            </div>
                            <div className="text-[10px] text-text-muted uppercase mb-3">{info1.day}</div>
                            
                            {/* Connector Line */}
                            <div className={`w-0.5 h-4 mb-3 rounded-full ${bothBusiness ? 'bg-green-400 dark:bg-green-600' : 'bg-surface-200'}`}></div>

                            {/* Zone 2 Time */}
                            <div className={`text-xs font-semibold mb-1 ${info2.isNight ? 'text-text-muted opacity-60' : 'text-text-primary'}`}>
                                {info2.label}
                            </div>
                             <div className="text-[10px] text-text-muted uppercase">{info2.day}</div>
                        </div>
                    );
                })}
            </div>
            
            {/* Legend / Overlay indicators */}
            <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-surface-50 to-transparent pointer-events-none"></div>
            <div className="absolute top-0 bottom-0 right-0 w-4 bg-gradient-to-l from-surface-50 to-transparent pointer-events-none"></div>
        </div>
        
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3 md:gap-4 text-xs text-text-secondary">
             <div className="flex items-center gap-1.5">
                 <div className="w-3 h-3 rounded bg-green-50 dark:bg-green-900/20 border border-surface-200"></div>
                 <span>Good Overlap (9am-6pm)</span>
             </div>
             <div className="flex items-center gap-1.5">
                 <div className="w-3 h-3 rounded bg-brand-50 dark:bg-blue-900/20 border border-surface-200"></div>
                 <span>Current Hour</span>
             </div>
        </div>
    </div>
  );
};

export default TimeZoneComparator;