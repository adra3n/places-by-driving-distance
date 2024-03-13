import axios, { AxiosResponse } from 'axios';
import {
  PlacesResponse,
  DistanceResponse,
  GeocodingResponse,
} from '../models/placesModels';
import {
  googlePlacesAPI,
  googleDistanceMatrixAPI,
  googleGeocodeAPI,
} from '../config';

export const getPlaceDetails = async (
  places: string[],
  location: string,
  radius: number,
  apiKey: string,
): Promise<PlacesResponse[]> => {
  let placeDetails: PlacesResponse[] = [];
  for (let place of places) {
    const response: AxiosResponse = await axios.get(googlePlacesAPI, {
      params: {
        location: location,
        radius: radius,
        keyword: place,
        key: apiKey,
      },
    });
    placeDetails.push(...response.data.results);
  }
  return placeDetails;
};

export const getDistanceResponses = async (
  placeDetails: PlacesResponse[],
  location: string,
  apiKey: string,
): Promise<DistanceResponse[]> => {
  let destinations: string[] = placeDetails.map(
    (place) => `${place.geometry.location.lat},${place.geometry.location.lng}`,
  );

  let distanceResponses: DistanceResponse[] = [];
  for (let i = 0; i < destinations.length; i++) {
    const distanceResponse: AxiosResponse = await axios.get(
      googleDistanceMatrixAPI,
      {
        params: {
          origins: location,
          destinations: destinations[i],
          key: apiKey,
        },
      },
    );

    const responseElement = distanceResponse.data.rows[0].elements[0];

    distanceResponses.push({
      distance: responseElement.distance,
      duration: responseElement.duration,
      origin: location,
      destination: {
        location: {
          lat: placeDetails[i].geometry.location.lat,
          lng: placeDetails[i].geometry.location.lng,
        },
        place: `${placeDetails[i].name} - ${placeDetails[i].vicinity}`,
        rating: placeDetails[i].rating,
        user_ratings_total: placeDetails[i].user_ratings_total,
      },
    });
  }
  return distanceResponses;
};

export const filterByDriveTime = (
  distanceResponses: DistanceResponse[],
  maxDriveTime: number,
): DistanceResponse[] => {
  return distanceResponses.filter(
    (response) => response.duration.value <= maxDriveTime * 60,
  );
};

export const getCoordinatesFromAdress = async (
  address: string,
  apiKey: string,
): Promise<GeocodingResponse> => {
  const formattedAddress = encodeURIComponent(address);
  const url = `${googleGeocodeAPI}?address=${formattedAddress}&key=${apiKey}`;

  const response = await axios.get(url);

  if (response.data.results && response.data.results[0]) {
    const location = response.data.results[0].geometry.location;
    return { lat: location.lat, lng: location.lng };
  } else {
    throw new Error('unable to geocode address');
  }
};
