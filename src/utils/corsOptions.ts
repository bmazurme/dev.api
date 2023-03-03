import { CorsOptions } from 'cors';

import { METHODS, ALLOWED_HEADERS, WHITE_LIST } from './constCors';

type CallbackType = (arg: Error | null, bool?: boolean) => [];
type StaticOrigin = boolean | string | RegExp | (boolean | string | RegExp)[];
type CustomOrigin = (requestOrigin: string | undefined, callback
  : (err: Error | null, origin?: StaticOrigin) => void) => void;

const originList = (origin: string, callback: CallbackType) => {
  if (WHITE_LIST.indexOf(origin) !== -1 || !origin) {
    callback(null, true);
  } else {
    callback(new Error('Not allowed by CORS'));
  }
};

const corsOptions: CorsOptions = {
  credentials: true,
  origin: originList as CustomOrigin,
  methods: METHODS,
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ALLOWED_HEADERS,
};

export default corsOptions;
