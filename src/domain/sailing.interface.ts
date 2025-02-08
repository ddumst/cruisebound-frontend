export interface Sailing {
  price: number;
  name: string;
  ship: Ship;
  itinerary: string[];
  region: string;
  departureDate: string;
  returnDate: string;
  duration: number;
}

export interface Ship {
  name: string;
  rating: number;
  reviews: number;
  image: string;
  line: Line;
}

export interface Line {
  logo: string;
  name: string;
}
