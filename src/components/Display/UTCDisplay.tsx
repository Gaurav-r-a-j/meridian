import React from 'react';

interface UTCDisplayProps {
  displayDate: Date;
}

const UTCDisplay: React.FC<UTCDisplayProps> = ({ displayDate }) => {
  // UTC Formatting
  const utcFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  });
  const utcDateFormatter = new Intl.DateTimeFormat('en-US', {
     weekday: 'short',
     month: 'short', 
     day: 'numeric',
     timeZone: 'UTC'
  });
  
  const utcTimeString = utcFormatter.format(displayDate);
  const utcDateString = utcDateFormatter.format(displayDate);

  return (
    <div className="flex justify-center mb-8">
      <div className="bg-slate-900 text-slate-50 px-5 py-3 md:px-8 md:py-4 rounded-2xl shadow-xl flex items-center gap-4 md:gap-6 border border-slate-700 max-w-full overflow-hidden">
         <div className="text-right">
            <span className="block text-[10px] md:text-xs font-bold tracking-widest text-slate-400 uppercase">Universal Time</span>
            <span className="block text-xl md:text-3xl font-mono font-bold tracking-tight text-white">{utcTimeString}</span>
         </div>
         <div className="h-8 md:h-10 w-px bg-slate-700"></div>
         <div className="text-left">
            <span className="block text-[10px] md:text-xs font-bold tracking-widest text-slate-400 uppercase">Date</span>
            <span className="block text-sm md:text-base font-medium text-slate-300 whitespace-nowrap">{utcDateString}</span>
         </div>
      </div>
    </div>
  );
};

export default UTCDisplay;