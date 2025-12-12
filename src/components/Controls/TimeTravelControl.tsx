import React from 'react';
import { useSound } from '../../hooks/useSound';

interface TimeTravelControlProps {
  offsetMinutes: number;
  onOffsetChange: (val: number) => void;
  isLive: boolean;
}

const TimeTravelControl: React.FC<TimeTravelControlProps> = ({ offsetMinutes, onOffsetChange, isLive }) => {
  const { playTick } = useSound();

  // Format the offset for display
  const hoursOffset = Math.floor(offsetMinutes / 60);
  const minsOffset = offsetMinutes % 60;
  
  // Clean text formatting
  let offsetText = "Current Time";
  if (offsetMinutes !== 0) {
      const absTotal = Math.abs(offsetMinutes);
      const absH = Math.floor(absTotal / 60);
      const absM = absTotal % 60;
      const dirStr = offsetMinutes > 0 ? '+' : '-';
      offsetText = `${dirStr}${absH}h ${absM > 0 ? `${absM}m` : ''}`.trim();
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Play sound on change
    playTick();
    onOffsetChange(parseInt(e.target.value, 10));
  };

  return (
    <div className="bg-surface-card rounded-3xl shadow-lg border border-surface-100 p-5 md:p-8 mb-8 transition-colors duration-300">
      <div className="flex flex-col items-center justify-center gap-3 md:gap-4">
        <div className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-wide uppercase text-text-muted">
          <span className={isLive ? "text-green-500 flex items-center gap-1.5" : ""}>
            {isLive && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
            {isLive ? "Live Clock" : "Time Travel Mode"}
          </span>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-mono font-bold text-text-primary transition-all duration-300 tracking-tighter">
          {offsetText}
        </h2>

        {/* Slider Container */}
        <div className="w-full max-w-xl relative pt-8 pb-4 px-2">
          <input
            type="range"
            min="-720" // -12 hours
            max="720"  // +12 hours
            step="15"  // 15 min increments
            value={offsetMinutes}
            onChange={handleSliderChange}
            className="w-full h-4 bg-surface-200 rounded-full appearance-none cursor-pointer accent-brand-600 focus:outline-none focus:ring-4 focus:ring-brand-100 touch-none"
            aria-label="Time Travel Slider"
          />
          
          {/* Labels */}
          <div className="flex justify-between text-[10px] md:text-xs text-text-muted font-bold mt-4 font-mono uppercase tracking-widest">
            <span>-12h</span>
            <span className="hidden min-[400px]:inline">-6h</span>
            <span className="text-brand-500">Now</span>
            <span className="hidden min-[400px]:inline">+6h</span>
            <span>+12h</span>
          </div>
          
          {/* Central tick mark */}
          <div className="absolute top-[34px] left-1/2 -translate-x-1/2 w-0.5 h-5 bg-text-muted opacity-30 pointer-events-none rounded-full"></div>
        </div>
        
        {!isLive && (
             <p className="text-xs text-text-muted animate-fade-in text-center max-w-xs">
                 Dragging the slider changes the time for all cities below.
             </p>
        )}
      </div>
    </div>
  );
};

export default TimeTravelControl;