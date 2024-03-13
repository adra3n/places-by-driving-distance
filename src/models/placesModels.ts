export interface PlacesResponse {
  name: string;
  vicinity: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  rating: number;
  user_ratings_total: number;
}

export interface DistanceResponse {
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
  origin: string;

  destination: {
    location: {
      lat: number;
      lng: number;
    };
    place: string;
    rating: number;
    user_ratings_total: number;
  };
}
export interface GeocodingResponse {
  lat: number;
  lng: number;
}
