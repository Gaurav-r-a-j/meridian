export interface TimeZone {
  id: string;
  city: string;
  country: string;
  iana: string;
  flag: string;
}

export interface ZoneCardProps {
  zone: TimeZone;
  baseDate: Date;
  highlight?: boolean;
}
