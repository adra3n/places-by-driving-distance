import dotenv from 'dotenv';
dotenv.config();

export const port: string | number = process.env.PORT || 3000;

export const googlePlacesAPI: string =
  'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

export const googleDistanceMatrixAPI: string =
  'https://maps.googleapis.com/maps/api/distancematrix/json';

export const googleGeocodeAPI: string =
  'https://maps.googleapis.com/maps/api/geocode/json';

export const googleApiKey: string | undefined = process.env.GOOGLE_API_KEY;
