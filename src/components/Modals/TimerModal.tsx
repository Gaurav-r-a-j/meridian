import React, { useState, useEffect, useRef } from 'react';
import { useSound, AlarmSound } from '../../hooks/useSound';

interface TimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TimerStatus = 'IDLE' | 'RUNNING' | 'PAUSED' | 'FINISHED';

const TimerModal: React.FC<TimerModalProps> = ({ isOpen, onClose }) => {
  // Inputs
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('15');
  const [seconds, setSeconds] = useState('');
  
  // Settings
  const [selectedSound, setSelectedSound] = useState<AlarmSound>('beep');

  // Running State
  const [status, setStatus] = useState<TimerStatus>('IDLE');
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  
  const timerRef = useRef<number | null>(null);
  const { playClick, playAlarm } = useSound();

  // Wake Lock for Screen
  useEffect(() => {
    let wakeLock: any = null;
    
    const requestWakeLock = async () => {
      if ('wakeLock' in navigator && status === 'RUNNING') {
        try {
          wakeLock = await (navigator as any).wakeLock.request('screen');
        } catch (err: any) {
          // Gracefully fail - feature is progressive enhancement
          // Suppress NotAllowedError as it often happens in restricted environments
          if (err.name !== 'NotAllowedError') {
             console.warn('Wake Lock request failed:', err);
          }
        }
      }
    };

    const handleVisibilityChange = () => {
      // Re-acquire lock when tab becomes visible again, as browsers release it on visibility change
      if (document.visibilityState === 'visible' && status === 'RUNNING') {
        requestWakeLock();
      }
    };

    if (status === 'RUNNING') {
      requestWakeLock();
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }

    return () => {
      if (wakeLock) {
         wakeLock.release().catch(() => {});
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [status]);

  // Alarm Loop Logic
  useEffect(() => {
    let intervalId: number;

    if (status === 'FINISHED') {
      // Play immediately when entering FINISHED state
      playAlarm(selectedSound);
      
      // Loop the alarm every 10 seconds
      intervalId = window.setInterval(() => {
        playAlarm(selectedSound);
      }, 10000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [status, selectedSound, playAlarm]);

  // Timer Logic
  useEffect(() => {
    if (status === 'RUNNING' && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
             // Finished
             setStatus('FINISHED');
             // Sound is handled by the Alarm Loop effect now
             return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, timeLeft]);

  if (!isOpen) return null;

  // Handlers
  const handleStart = () => {
    playClick();
    const h = parseInt(hours || '0', 10);
    const m = parseInt(minutes || '0', 10);
    const s = parseInt(seconds || '0', 10);
    const total = h * 3600 + m * 60 + s;

    if (total > 0) {
      setTotalTime(total);
      setTimeLeft(total);
      setStatus('RUNNING');
    }
  };

  const handlePause = () => {
    playClick();
    setStatus(prev => prev === 'RUNNING' ? 'PAUSED' : 'RUNNING');
  };

  const handleReset = () => {
    playClick();
    setStatus('IDLE');
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleAddTime = (secs: number) => {
    playClick();
    setTimeLeft(prev => prev + secs);
    setTotalTime(prev => Math.max(prev + secs, timeLeft + secs));
    if (status === 'FINISHED') setStatus('RUNNING');
  };

  const handleSoundSelect = (sound: AlarmSound) => {
      setSelectedSound(sound);
      playAlarm(sound); // Preview
  };

  // Helper for Input Change
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, max: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 2) val = val.slice(0, 2);
    setter(val);
  };

  // Visuals
  const formatTimeDisplay = (totalSecs: number) => {
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    
    if (h > 0) {
        return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Circular Progress
  // Using viewBox 0 0 256 256. Center 128 128.
  const radius = 110; // Slightly reduced radius to ensure stroke doesn't clip
  const circumference = 2 * Math.PI * radius;
  const progress = totalTime > 0 ? timeLeft / totalTime : 0;
  const dashOffset = circumference - (progress * circumference);
  
  // Presets
  const presets = [5, 15, 30, 45, 60];
  const sounds: AlarmSound[] = ['beep', 'chime', 'digital', 'retro'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="bg-surface-card rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden ring-1 ring-white/10" 
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-surface-50 px-6 py-4 flex justify-between items-center border-b border-surface-200">
           <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
             <div className={`w-2 h-2 rounded-full ${status === 'RUNNING' ? 'bg-green-500 animate-pulse' : 'bg-brand-500'}`} />
             Focus Timer
           </h2>
           <button onClick={onClose} className="text-text-secondary hover:text-text-primary transition-colors">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
             </svg>
           </button>
        </div>

        <div className="p-6 md:p-8">
           {status === 'IDLE' ? (
             <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-300">
                {/* Time Input */}
                <div className="flex items-center justify-center gap-1 md:gap-3">
                   <div className="flex flex-col items-center gap-1">
                      <input 
                        type="text" 
                        inputMode="numeric"
                        value={hours}
                        onChange={handleInputChange(setHours, 99)}
                        placeholder="00"
                        className="w-16 h-20 md:w-20 md:h-24 text-4xl md:text-5xl font-mono text-center bg-surface-50 rounded-2xl border-2 border-surface-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all placeholder:text-surface-300 text-text-primary"
                      />
                      <span className="text-[10px] md:text-xs font-bold text-text-secondary uppercase tracking-wider">Hrs</span>
                   </div>
                   <span className="text-3xl md:text-4xl text-surface-300 font-light pb-6">:</span>
                   <div className="flex flex-col items-center gap-1">
                      <input 
                        type="text" 
                        inputMode="numeric"
                        value={minutes}
                        onChange={handleInputChange(setMinutes, 59)}
                        placeholder="00"
                        className="w-16 h-20 md:w-20 md:h-24 text-4xl md:text-5xl font-mono text-center bg-surface-50 rounded-2xl border-2 border-surface-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all placeholder:text-surface-300 text-text-primary"
                      />
                      <span className="text-[10px] md:text-xs font-bold text-text-secondary uppercase tracking-wider">Mins</span>
                   </div>
                   <span className="text-3xl md:text-4xl text-surface-300 font-light pb-6">:</span>
                   <div className="flex flex-col items-center gap-1">
                      <input 
                        type="text" 
                        inputMode="numeric"
                        value={seconds}
                        onChange={handleInputChange(setSeconds, 59)}
                        placeholder="00"
                        className="w-16 h-20 md:w-20 md:h-24 text-4xl md:text-5xl font-mono text-center bg-surface-50 rounded-2xl border-2 border-surface-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all placeholder:text-surface-300 text-text-primary"
                      />
                      <span className="text-[10px] md:text-xs font-bold text-text-secondary uppercase tracking-wider">Secs</span>
                   </div>
                </div>
                
                {/* Presets */}
                <div className="grid grid-cols-5 gap-2">
                   {presets.map(min => (
                     <button
                       key={min}
                       onClick={() => {
                         playClick();
                         setHours('');
                         setMinutes(min.toString());
                         setSeconds('');
                       }}
                       className="py-2.5 rounded-xl border border-surface-200 bg-surface-card hover:bg-surface-50 hover:border-brand-300 text-xs md:text-sm font-semibold text-text-secondary transition-all active:scale-95"
                     >
                       {min}m
                     </button>
                   ))}
                </div>

                {/* Sound Selection */}
                <div className="bg-surface-50 rounded-2xl p-3 flex justify-between items-center gap-2">
                    {sounds.map(sound => (
                        <button
                            key={sound}
                            onClick={() => handleSoundSelect(sound)}
                            className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-all ${
                                selectedSound === sound 
                                ? 'bg-white shadow-sm text-brand-600 ring-1 ring-black/5' 
                                : 'text-text-muted hover:text-text-secondary hover:bg-surface-200/50'
                            }`}
                        >
                            {sound}
                        </button>
                    ))}
                </div>

                {/* Start Button */}
                <button 
                  onClick={handleStart}
                  className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl text-lg md:text-xl font-bold shadow-lg shadow-brand-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Start Timer
                </button>
             </div>
           ) : (
             <div className="flex flex-col items-center animate-in zoom-in-95 fade-in duration-300">
                {/* Progress Ring Container */}
                <div className="relative w-64 h-64 mb-8 flex items-center justify-center">
                   {/* Background Ring */}
                   <svg 
                      className="absolute inset-0 w-full h-full transform -rotate-90"
                      viewBox="0 0 256 256"
                   >
                     <circle 
                       cx="128" cy="128" r={radius} 
                       stroke="currentColor" strokeWidth="8" fill="none" 
                       className="text-surface-100 dark:text-surface-800"
                     />
                     <circle 
                       cx="128" cy="128" r={radius} 
                       stroke="currentColor" strokeWidth="8" fill="none" 
                       strokeLinecap="round"
                       className={`${status === 'FINISHED' ? 'text-red-500' : 'text-brand-500'} transition-all duration-1000 ease-linear`}
                       style={{
                         strokeDasharray: circumference,
                         strokeDashoffset: dashOffset
                       }}
                     />
                   </svg>
                   
                   {/* Time Display */}
                   <div className="flex flex-col items-center z-10">
                      <div className={`text-5xl font-mono font-bold tracking-tighter tabular-nums ${status === 'FINISHED' ? 'text-red-500 animate-pulse' : 'text-text-primary'}`}>
                        {formatTimeDisplay(timeLeft)}
                      </div>
                      <div className="text-sm font-bold uppercase tracking-widest text-text-muted mt-2">
                        {status === 'FINISHED' ? 'Time Up' : status === 'PAUSED' ? 'Paused' : 'Remaining'}
                      </div>
                   </div>
                </div>
                
                {/* Controls */}
                <div className="grid grid-cols-2 gap-4 w-full mb-6">
                   {status === 'FINISHED' ? (
                     <button 
                       onClick={handleReset}
                       className="col-span-2 py-3 bg-surface-100 hover:bg-surface-200 text-text-primary rounded-xl font-bold transition-colors"
                     >
                       Reset
                     </button>
                   ) : (
                     <>
                       <button 
                        onClick={handlePause}
                        className={`py-3 rounded-xl font-bold transition-colors shadow-sm ${
                          status === 'PAUSED' 
                            ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-500/25' 
                            : 'bg-surface-100 hover:bg-surface-200 text-text-primary'
                        }`}
                       >
                         {status === 'PAUSED' ? 'Resume' : 'Pause'}
                       </button>
                       <button 
                        onClick={handleReset}
                        className="py-3 bg-surface-card border border-surface-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 text-text-secondary rounded-xl font-bold transition-colors"
                       >
                         Stop
                       </button>
                     </>
                   )}
                </div>
                
                {/* Quick Add Buttons */}
                {status !== 'FINISHED' && (
                  <div className="flex items-center gap-3 w-full">
                     <button 
                       onClick={() => handleAddTime(60)}
                       className="flex-1 py-2 bg-surface-50 border border-surface-200 hover:border-brand-300 hover:bg-brand-50 text-xs font-bold uppercase tracking-wide text-text-secondary hover:text-brand-600 rounded-lg transition-colors"
                     >
                       +1 Min
                     </button>
                     <button 
                       onClick={() => handleAddTime(300)}
                       className="flex-1 py-2 bg-surface-50 border border-surface-200 hover:border-brand-300 hover:bg-brand-50 text-xs font-bold uppercase tracking-wide text-text-secondary hover:text-brand-600 rounded-lg transition-colors"
                     >
                       +5 Min
                     </button>
                  </div>
                )}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default TimerModal;