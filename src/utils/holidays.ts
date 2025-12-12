export const getPublicHoliday = (date: Date, zoneIana: string, zoneId: string): string | null => {
  try {
    // Extract Month and Day in the target timezone
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: zoneIana,
      month: 'numeric',
      day: 'numeric',
    });
    
    const parts = formatter.formatToParts(date);
    const month = parts.find(p => p.type === 'month')?.value;
    const day = parts.find(p => p.type === 'day')?.value;
    
    if (!month || !day) return null;
    
    const key = `${month}-${day}`;
    
    // --- Global / Common Holidays ---
    if (key === '1-1') return "New Year's Day";
    
    // --- Country Specific ---
    // Extract country prefix from ID (e.g., 'us-ny' -> 'us')
    const prefix = zoneId.split('-')[0];

    switch (prefix) {
      case 'us': // USA
        if (key === '7-4') return "Independence Day";
        if (key === '12-25') return "Christmas Day";
        if (key === '11-11') return "Veterans Day";
        if (key === '6-19') return "Juneteenth";
        break;
      
      case 'in': // India
        if (key === '1-26') return "Republic Day";
        if (key === '8-15') return "Independence Day";
        if (key === '10-2') return "Gandhi Jayanti";
        if (key === '12-25') return "Christmas";
        break;
      
      case 'gb': // UK
        if (key === '12-25') return "Christmas Day";
        if (key === '12-26') return "Boxing Day";
        break;
        
      case 'au': // Australia
        if (key === '1-26') return "Australia Day";
        if (key === '4-25') return "Anzac Day";
        if (key === '12-25') return "Christmas Day";
        break;

      case 'ca': // Canada
        if (key === '7-1') return "Canada Day";
        if (key === '11-11') return "Remembrance Day";
        if (key === '12-25') return "Christmas Day";
        break;
        
      case 'de': // Germany
        if (key === '5-1') return "Labor Day";
        if (key === '10-3') return "German Unity Day";
        if (key === '12-25') return "Christmas Day";
        break;
        
      case 'fr': // France
        if (key === '5-1') return "Labor Day";
        if (key === '7-14') return "Bastille Day";
        if (key === '11-11') return "Armistice Day";
        if (key === '12-25') return "Christmas Day";
        break;
        
      case 'jp': // Japan
        if (key === '2-11') return "National Foundation Day";
        if (key === '2-23') return "Emperor's Birthday";
        if (key === '4-29') return "Shōwa Day";
        if (key === '5-3') return "Constitution Memorial Day";
        break;

      case 'cn': // China
        if (key === '10-1') return "National Day";
        if (key === '5-1') return "Labor Day";
        break;

      case 'br': // Brazil
        if (key === '9-7') return "Independence Day";
        if (key === '11-15') return "Republic Day";
        if (key === '12-25') return "Christmas Day";
        break;

      case 'mx': // Mexico
        if (key === '9-16') return "Independence Day";
        if (key === '11-20') return "Revolution Day";
        if (key === '12-25') return "Christmas Day";
        break;
        
      // Default / Western common holidays for others
      default:
        if (key === '12-25') return "Christmas Day";
        if (key === '5-1') return "Labor Day"; // Very common globally
        break;
    }

    return null;
  } catch (e) {
    return null;
  }
};