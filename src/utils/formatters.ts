
// Global cache for Intl.DateTimeFormat instances
// Creating these objects is expensive, so we reuse them.
const formatterCache = new Map<string, Intl.DateTimeFormat>();

/**
 * Returns a cached Intl.DateTimeFormat instance.
 * @param iana The IANA time zone string (e.g., "America/New_York")
 * @param options The Intl.DateTimeFormatOptions object
 */
export const getCachedDateTimeFormat = (iana: string, options: Intl.DateTimeFormatOptions): Intl.DateTimeFormat => {
  // Create a stable key based on the options and timezone
  // We stringify the options to create a unique signature for the configuration
  const optionsKey = JSON.stringify(options, Object.keys(options).sort());
  const cacheKey = `${iana}|${optionsKey}`;

  if (!formatterCache.has(cacheKey)) {
    formatterCache.set(cacheKey, new Intl.DateTimeFormat('en-US', { ...options, timeZone: iana }));
  }

  return formatterCache.get(cacheKey)!;
};
