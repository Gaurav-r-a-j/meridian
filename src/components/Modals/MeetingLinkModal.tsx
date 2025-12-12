import React, { useState } from 'react';
import { TimeZone } from '../../types';

interface MeetingLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  baseDate: Date;
  zones: TimeZone[];
}

const MeetingLinkModal: React.FC<MeetingLinkModalProps> = ({ isOpen, onClose, baseDate, zones }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateText = () => {
    const lines = [`📅 Proposed Meeting Time`, `---`];
    
    // Only include visible zones in the summary
    const visibleZones = zones.slice(0, 20); // Limit to 20 to prevent huge clipboards if showing all

    visibleZones.forEach(zone => {
      try {
        const time = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric', minute: '2-digit', hour12: true,
            timeZone: zone.iana, weekday: 'short', month: 'short', day: 'numeric'
        }).format(baseDate);
        lines.push(`${zone.flag} ${zone.city}: ${time}`);
      } catch (e) {
        // ignore invalid zones
      }
    });
    
    lines.push(`---`);
    lines.push(`Shared via Meridian`);
    return lines.join('\n');
  };

  const textContent = generateText();

  const handleCopy = () => {
    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateGoogleCalendarLink = () => {
    const iso = baseDate.toISOString().replace(/-|:|\.\d\d\d/g, ""); 
    const endDate = new Date(baseDate.getTime() + 60 * 60 * 1000);
    const isoEnd = endDate.toISOString().replace(/-|:|\.\d\d\d/g, "");
    
    const text = encodeURIComponent(`Meeting`);
    const details = encodeURIComponent(textContent);
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${iso}/${isoEnd}&details=${details}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/30 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-surface-card rounded-3xl w-full max-w-lg shadow-2xl p-6 ring-1 ring-black/5" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Share Time</h2>
            <p className="text-sm text-text-secondary">Copy the formatted schedule below</p>
          </div>
          <button onClick={onClose} className="p-2 bg-surface-100 rounded-full text-text-secondary hover:bg-surface-200 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="bg-surface-50 p-5 rounded-xl border border-surface-200 mb-6 overflow-y-auto max-h-64 shadow-inner">
          <pre className="text-sm font-mono text-text-primary whitespace-pre-wrap leading-relaxed">{textContent}</pre>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={handleCopy}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-all shadow-sm ${
              copied 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-text-primary hover:bg-gray-800 text-white'
            }`}
          >
            {copied ? 'Copied!' : 'Copy Summary'}
          </button>
          
          <a 
            href={generateGoogleCalendarLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm bg-surface-card hover:bg-surface-50 text-text-primary border border-surface-300 transition-colors shadow-sm"
          >
            Google Calendar
          </a>
        </div>
      </div>
    </div>
  );
};

export default MeetingLinkModal;