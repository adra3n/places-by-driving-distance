This API provides two main endpoints to list places around a given location. The location can be specified either as coordinates or as an address. It uses the Google Places API to find places and the Google Distance Matrix API to calculate driving times.

## Endpoints

### POST /listPlacesAroundCoordinates

This endpoint takes a location specified as coordinates, and returns a list of places around that location.

#### Request Body

- `location`: The location specified as coordinates in the format "latitude,longitude".
- `radius`: The radius around the location within which to search for places.
- `places`: An array of types of places to search for. The Google Places API can only handle one type of place per request, so the API processes these types in a queue.
- `maxDriveTime`: The maximum driving time from the location to the place.
- `apiKey`: (Optional) The API key to use for the Google Places API. If not provided, the API will use the key from the config.

#### Logic

1. The endpoint first checks if an API key is provided in the request body. If not, it uses the key from the config.
2. It then calls the `getPlaceDetails` function, which uses the Google Places API to find places of the specified types within the specified radius of the location. This is done in a queue because the Google Places API can only handle one type of place per request.
3. Next, it calls the `getDistanceResponses` function, which uses the Google Distance Matrix API to calculate the driving time from the location to each place.
4. It then filters the places by the maximum driving time.
5. Finally, it sorts the places by distance and returns the list to the client.

### POST /listPlacesAroundAdress

This endpoint takes a location specified as an address, and returns a list of places around that location.

#### Request Body

- `location`: The location specified as an address.
- `radius`: The radius around the location within which to search for places.
- `places`: An array of types of places to search for. The Google Places API can only handle one type of place per request, so the API processes these types in a queue.
- `maxDriveTime`: The maximum driving time from the location to the place.
- `apiKey`: (Optional) The API key to use for the Google Places API. If not provided, the API will use the key from the config.

#### Logic

1. The endpoint first checks if an API key is provided in the request body. If not, it uses the key from the config.
2. It then calls the `getCoordinatesFromAdress` function, which uses the Google Geocoding API to convert the address into coordinates.
3. The rest of the logic is the same as the `/listPlacesAroundCoordinates` endpoint.


## Key Setup

To set up the API, you will need to provide a Google Maps API key in the config. This key is used for making requests to the Google services like Places API, Distance Matrix API, Geocoding API.
