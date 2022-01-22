export interface Location {
  longitude: number;
  latitude: number;
}

export interface Driver {
  id: number;
  name: string;
  telephone: string;
  estimateTime: number;
  location: Location;
}
