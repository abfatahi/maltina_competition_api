/* eslint-disable import/extensions */
import cors from 'cors';
import express from 'express';
import vm from 'v-response';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
// import ApiVersions from '../api/index.js';
import ApiRoutes from '../../routes/index.js';
import { ErrorMiddleware } from '../../middlewares/index.js';
import { Database } from '../../database/index.js';

const app = express();

export default () => {
  // Database Connection
  Database();

  // Server Setup
  app.use(cors());

  app.use(helmet());

  app.set('trust proxy', 1);

  //  apply to all requests
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000, // limit each IP to 100 requests per windowMs
      message: 'Too many requests from this IP. Try again in 15mins.',
    })
  );

  // logger middleware
  app.use((req, _, next) => {
    vm.log(
      `🔥🍕[${new Date().toTimeString()}]: `,
      `${req.method} ${req.url}🔥🍕`
    );
    next();
  });

  // Add middlewares for parsing JSON and urlencoded data and populating `req.body`
  app.use(express.urlencoded({ extended: false }));

  // parse requests of content-type - application/json
  app.use(express.json());

  // simple route
  app.get('/', (_, res) => {
    res.json({ message: 'Welcome to Maltina Competition API' });
  });

  app.use('/api/v1', ApiRoutes); //Api Routes

  app.use(ErrorMiddleware); //Error Middleware

  app.use('*', (_, res) => {
    res.status(404).json({ message: 'Page not found.' });
  });

  // set port, listen for requests
  app.listen(process.env.PORT).on('listening', () => {
    vm.log(`💘 app is listening on ${process.env.PORT} 🚀`);
  });
};
