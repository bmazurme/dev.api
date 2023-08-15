import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';

import livereload from 'livereload';
import connectLivereload from 'connect-livereload';

import { errors } from 'celebrate';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { config as dotEnvConfig } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { requestLogger, errorLogger } from './middlewares/logger-middleware';
import { corsOptions, limiter } from './utils';

import index from './routes';
import { NotFoundError } from './errors';

import errorHandler from './middlewares/error-handler-middleware';

dotEnvConfig();

const helmetConfig = {
  useDefaults: true,
  directives: {
    defaultSrc: ["'self'", 'https://ya-praktikum.tech/api/v2/', 'http://localhost:3000/api/'],
    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
    connectSrc: ["'self'", 'https://ya-praktikum.tech/api/v2/', 'http://localhost:3000/api/'],
    // styleSrc: ["'self'", "'unsafe-inline'"],
    // imgSrc: ["'self'", '*'],
  },
};

const port = process.env.PORT ?? 3000;
const pth = process.env.PTH ?? 'mongodb://127.0.0.1:27017/devapi';

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(pth, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

app.use(requestLogger);

app.use(limiter);

if (process.env.NODE_ENV === 'production') {
  app.use(helmet.hidePoweredBy());
  app.use(helmet.contentSecurityPolicy(helmetConfig));
}

if (process.env.NODE_ENV === 'development') {
  const liveReloadServer = livereload.createServer();

  liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
      liveReloadServer.refresh('/');
    }, 100);
  });

  app.use(connectLivereload());
}

app.use('/api/', index);

app.use('*', () => {
  throw new NotFoundError('HTTP 404 Not Found');
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
