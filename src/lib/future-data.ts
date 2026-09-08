/** Demo data for the Future Vision screens, ported from extras.js. */

export const FLEXIBLE_DATES = [
  { day: '7 Oct', price: 110000, availability: 'avail_high', tone: 'green', saving: 35000 },
  { day: '13 Oct', price: 115000, availability: 'avail_venues', tone: 'green', saving: 30000, count: 8 },
  { day: '15 Oct', price: 145000, availability: 'avail_demand', tone: 'orange', saving: 0 },
  { day: '16 Oct', price: 133000, availability: 'avail_venues', tone: 'green', saving: 12000, count: 12 },
  { day: '22 Oct', price: 120000, availability: 'avail_datedrop', tone: 'blue', saving: 25000 },
  { day: '29 Oct', price: 125000, availability: 'avail_venues', tone: 'green', saving: 20000, count: 10 },
] as const;

export const DATE_DROPS = [
  { venueId: 'lake-house', name: 'Lake House', area: 'new-cairo', date: '22 Oct', was: 150000, now: 115000, left: '17h 42m' },
  { venueId: 'nile-palace', name: 'Nile Palace', area: 'maadi', date: '29 Oct', was: 165000, now: 128000, left: '31h 10m' },
  { venueId: 'garden-37', name: 'Garden 37', area: 'sheikh-zayed', date: '8 Oct', was: 138000, now: 105000, left: '09h 05m' },
] as const;

export const REVERSE_OFFERS = [
  { name: 'Luma Hall', price: 129000, extra: 'Free basic decoration', time: '6 min', score: 91 },
  { name: 'Royal Garden', price: 135000, extra: 'Visit priority + valet', time: '12 min', score: 95 },
  { name: 'Garden 37', price: 142000, extra: 'Premium sound included', time: '18 min', score: 83 },
] as const;
