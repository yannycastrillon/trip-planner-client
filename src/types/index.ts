export interface Trip {
  id: string;
  name: string;
  hostId: string;
  budgetMin: number;
  budgetMax: number;
  maxDuration: number;
  preferredSeasons: String[];
  status: String;
  createdAt: Date;
}

export type Season = 'spring' | 'summer' | 'fall' | 'winter';

export type TripStatus = 'draft' | 'survey' | 'voting' | 'finalized';

export interface Participant {
  id: string;
  tripId: string;
  email: string;
  phone?: string;
  hasResponded: boolean;
}

export interface TravelPreferences {
  id: string;
  participantId: string;
  availability: DateRange[];
  budget: number;
  homeAirport: string;
  maxTravelTime: number;
  travelStyle: TravelStyle[];
  activities: Activity[];
}

export interface DateRange {
  start: Date;
  end: Date;
}

export type TravelStyle = 'cozy' | 'relaxation' | 'outdoor' | 'cultural';

export type Activity = 'hiking' | 'spa' | 'nightlife' | 'sightseeing' | 'food' | 'shopping' | 'beach' | 'adventure';