
import { useRef, useCallback } from 'react';

export type AlarmSound = 'beep' | 'chime' | 'digital' | 'retro';

export const useSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  }, []);

  const playTick = useCallback(() => {
    initAudio();
    const ctx = audioContextRef.current;
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  }, [initAudio]);

  const playClick = useCallback(() => {
    initAudio();
    const ctx = audioContextRef.current;
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  }, [initAudio]);

  const playAlarm = useCallback((type: AlarmSound = 'beep') => {
    initAudio();
    const ctx = audioContextRef.current;
    if (!ctx) return;
    const now = ctx.currentTime;

    const playTone = (freq: number, type: OscillatorType, startTime: number, duration: number, volume: number = 0.1) => {
       const osc = ctx.createOscillator();
       const gain = ctx.createGain();
       osc.type = type;
       osc.frequency.setValueAtTime(freq, startTime);
       
       // Envelope
       gain.gain.setValueAtTime(0, startTime);
       gain.gain.linearRampToValueAtTime(volume, startTime + (duration * 0.1));
       gain.gain.setValueAtTime(volume, startTime + (duration * 0.8));
       gain.gain.linearRampToValueAtTime(0, startTime + duration);

       osc.connect(gain);
       gain.connect(ctx.destination);
       osc.start(startTime);
       osc.stop(startTime + duration);
    };

    switch (type) {
      case 'beep':
        // Classic electronic alarm
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(880, now + 0.2);
        osc.frequency.setValueAtTime(440, now + 0.4);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.1, now + 0.6);
        gain.gain.linearRampToValueAtTime(0, now + 0.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(now + 0.8);
        break;

      case 'chime':
        // Gentle major chord arpeggio
        playTone(523.25, 'sine', now, 1.2, 0.1);       // C5
        playTone(659.25, 'sine', now + 0.2, 1.2, 0.1); // E5
        playTone(783.99, 'sine', now + 0.4, 1.2, 0.1); // G5
        break;
        
      case 'digital':
        // High pitched rapid pulses
        for(let i=0; i<3; i++) {
           playTone(1200, 'triangle', now + (i*0.15), 0.1, 0.05);
           playTone(1600, 'triangle', now + (i*0.15) + 0.05, 0.1, 0.05);
        }
        break;

      case 'retro':
        // 8-bit style power up
        const oscR = ctx.createOscillator();
        const gainR = ctx.createGain();
        oscR.type = 'sawtooth';
        oscR.frequency.setValueAtTime(220, now);
        oscR.frequency.linearRampToValueAtTime(880, now + 0.4);
        gainR.gain.setValueAtTime(0.05, now);
        gainR.gain.linearRampToValueAtTime(0, now + 0.4);
        oscR.connect(gainR);
        gainR.connect(ctx.destination);
        oscR.start();
        oscR.stop(now + 0.4);
        break;
    }
  }, [initAudio]);

  return { playTick, playClick, playAlarm };
};
