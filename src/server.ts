import express, { Express } from 'express';

import placesRoutes from './routes/placesRoutes';

import { port } from './config';

const app: Express = express();
app.use(express.json());

app.use('/api', placesRoutes);

app.listen(port, () => console.log(`server is running on port ${port}`));
