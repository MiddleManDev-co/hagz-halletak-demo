/**
 * Demo venue catalogue, ported from the legacy `venues` array in app.js.
 *
 * Copy that used to be baked in as Arabic literals (area, availability label)
 * is modelled as keys here so the message catalogs stay the single source of
 * translated text.
 */

export const VENUE_AREAS = [
  'new-cairo',
  'sheikh-zayed',
  'maadi',
  'nasr-city',
] as const;
export type VenueArea = (typeof VENUE_AREAS)[number];

export const AVAILABILITY_STATES = [
  'available',
  'hold',
  'confirm-required',
  'booked',
] as const;
export type AvailabilityState = (typeof AVAILABILITY_STATES)[number];

/** Maps an availability state to the legacy badge colour. */
export const AVAILABILITY_TONE: Record<
  AvailabilityState,
  'green' | 'orange' | 'blue' | 'red'
> = {
  available: 'green',
  hold: 'orange',
  'confirm-required': 'blue',
  booked: 'red',
};

export type Venue = {
  id: string;
  name: string;
  area: VenueArea;
  capacityMin: number;
  capacityMax: number;
  priceFrom: number;
  rating: number;
  match: number;
  photo: string;
  availability: AvailabilityState;
  nextDate: string;
  features: string[];
  verified: boolean;
  /** Days since the venue last confirmed its dates — the product's core claim. */
  updatedDaysAgo: number;
  /** Typical reply time in hours. */
  respondsInHours: number;
};

const photo = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

export const venues: Venue[] = [
  {
    id: 'royal-garden',
    name: 'Royal Garden',
    area: 'new-cairo',
    capacityMin: 250,
    capacityMax: 450,
    priceFrom: 145000,
    rating: 4.9,
    match: 92,
    photo: photo('photo-1519167758481-83f550bb49b3'),
    availability: 'available',
    nextDate: '2027-10-15',
    features: ['outdoor', 'parking', 'bridal-room', 'valet'],
    verified: true,
    updatedDaysAgo: 2,
    respondsInHours: 4,
  },
  {
    id: 'luma-hall',
    name: 'Luma Hall',
    area: 'new-cairo',
    capacityMin: 200,
    capacityMax: 350,
    priceFrom: 129000,
    rating: 4.8,
    match: 88,
    photo: photo('photo-1507501336603-6e31db2be093'),
    availability: 'available',
    nextDate: '2027-10-15',
    features: ['indoor', 'stage', 'parking'],
    verified: true,
    updatedDaysAgo: 1,
    respondsInHours: 6,
  },
  {
    id: 'nile-palace',
    name: 'Nile Palace',
    area: 'maadi',
    capacityMin: 300,
    capacityMax: 500,
    priceFrom: 135000,
    rating: 4.7,
    match: 84,
    photo: photo('photo-1519225421980-715cb0215aed'),
    availability: 'hold',
    nextDate: '2027-10-16',
    features: ['nile-view', 'outdoor', 'parking'],
    verified: true,
    updatedDaysAgo: 5,
    respondsInHours: 12,
  },
  {
    id: 'garden-37',
    name: 'Garden 37',
    area: 'sheikh-zayed',
    capacityMin: 180,
    capacityMax: 300,
    priceFrom: 118000,
    rating: 4.7,
    match: 81,
    photo: photo('photo-1478146896981-b80fe463b330'),
    availability: 'available',
    nextDate: '2027-10-15',
    features: ['garden', 'sound', 'valet'],
    verified: true,
    updatedDaysAgo: 3,
    respondsInHours: 5,
  },
  {
    id: 'palm-palace',
    name: 'Palm Palace',
    area: 'nasr-city',
    capacityMin: 350,
    capacityMax: 600,
    priceFrom: 158000,
    rating: 4.6,
    match: 79,
    photo: photo('photo-1464366400600-7168b8af9bc3'),
    availability: 'confirm-required',
    nextDate: '2027-10-15',
    features: ['indoor', 'large-stage', 'parking'],
    verified: true,
    updatedDaysAgo: 9,
    respondsInHours: 18,
  },
  {
    id: 'lake-house',
    name: 'Lake House',
    area: 'new-cairo',
    capacityMin: 200,
    capacityMax: 400,
    priceFrom: 142000,
    rating: 4.8,
    match: 86,
    photo: photo('photo-1507501336603-6e31db2be093'),
    availability: 'booked',
    nextDate: '2027-10-22',
    features: ['lake-view', 'outdoor', 'bridal-room'],
    verified: true,
    updatedDaysAgo: 4,
    respondsInHours: 8,
  },
];

export const DEFAULT_VENUE_ID = 'royal-garden';

export function getVenue(id: string): Venue | undefined {
  return venues.find((venue) => venue.id === id);
}

/** Falls back to the demo's hero venue, matching the legacy `|| venues[0]`. */
export function getVenueOrDefault(id: string): Venue {
  return getVenue(id) ?? venues[0]!;
}
