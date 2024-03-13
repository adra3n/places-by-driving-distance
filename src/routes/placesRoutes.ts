import express, { Request, Response } from 'express';
import {
  getPlaceDetails,
  getDistanceResponses,
  filterByDriveTime,
  getCoordinatesFromAdress,
} from '../controllers/placesController';
import { googleApiKey } from '../config';

const router = express.Router();

router.post(
  '/listPlacesAroundCoordinates',
  async (req: Request, res: Response) => {
    try {
      const { location, radius, places, maxDriveTime, apiKey } = req.body;
      let key = apiKey || googleApiKey;
      if (!key) {
        return res.status(400).send('API key is missing');
      }
      console.log(`<<<<listPlacesAroundCoordinates request:`, req.body);

      let placeDetails = await getPlaceDetails(places, location, radius, key);
      console.log('place details:', placeDetails);

      let distanceResponses = await getDistanceResponses(
        placeDetails,
        location,
        key,
      );
      console.log('distance responses:', distanceResponses);

      distanceResponses = filterByDriveTime(distanceResponses, maxDriveTime);

      distanceResponses.sort((a, b) => a.distance.value - b.distance.value);

      res.json(distanceResponses);
    } catch (error) {
      console.error('an error occurred:', error);
      res
        .status(500)
        .send(
          'error occurred while processing listPlacesAroundCoordinates request',
        );
    }
  },
);

router.post('/listPlacesAroundAdress', async (req: Request, res: Response) => {
  try {
    const {
      location: locationString,
      radius,
      places,
      maxDriveTime,
      apiKey,
    } = req.body;
    let key = apiKey || googleApiKey;
    if (!key) {
      return res.status(400).send('API key is missing');
    }

    console.log(`<<<<listPlacesAroundCoordinates request:`, req.body);
    let locationCoordinates = await getCoordinatesFromAdress(
      locationString,
      key,
    );
    console.log('locationCoordinates:', locationCoordinates);

    let location = `${locationCoordinates.lat},${locationCoordinates.lng}`;
    let placeDetails = await getPlaceDetails(places, location, radius, key);
    console.log('place details:', placeDetails);

    let distanceResponses = await getDistanceResponses(
      placeDetails,
      location,
      key,
    );
    console.log('distance responses:', distanceResponses);

    distanceResponses = filterByDriveTime(distanceResponses, maxDriveTime);

    distanceResponses.sort((a, b) => a.distance.value - b.distance.value);

    res.json(distanceResponses);
  } catch (error) {
    console.error('an error occurred:', error);
    res
      .status(500)
      .send(
        'error occurred while processing listPlacesAroundCoordinates request',
      );
  }
});

export default router;
