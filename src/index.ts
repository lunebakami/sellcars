import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';

import { router } from './router';

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL ?? '')
  .then(() => {
    const app = express();

    const port = process.env.PORT;

    app.use(cors());
    app.use(express.json());
    app.use(router);

    app.listen(port, () => {
      console.log(`🚀 Server is running on http:/localhost:${port}`);
    });
  })
  .catch(() => console.log('Error on connecting database'));
