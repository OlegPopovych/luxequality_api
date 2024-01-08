'use strict';

import express from 'express';
// import session from 'express-session';
// import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import { connect } from './utils/initDb';
import { advertisementRouter } from './routes/advertisement.routes';

connect();

const app = express();
//   .enable('trust proxy');

// const whitelist = process.env.WHITELISTED_DOMAINS
//   ? process.env.WHITELISTED_DOMAINS.split(',')
//   : [];

// 	interface CorsOptions {
// 		origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => void;
// 		credentials: boolean;
// 	}

// const corsOptions: CorsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
// app.use(cookieParser());

// app.use(session({
//   secret: process.env.SESSION_SECRET || 'secret',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     maxAge: 60 * 60 * 24 * 1000,
//     sameSite: 'none',
//     secure: true,
//     httpOnly: true,
//   },
// }));

app.use('/files', express.static('public'));

app.use('/advertisement', advertisementRouter);

app.get('/', (req, res) => {
  res.send('Hi dude!👽');
});

app.listen(process.env.PORT, () => {
  console.log(
    `☄️👽☄️ Server is running and you can not stop it http://localhost:${process.env.PORT} 🚀👽🚀`,
  );
});
