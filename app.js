import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import 'dotenv/config';

import contactsRouter from './routes/api/contacts-router.js';
import eventsRouter from './routes/api/events-router.js';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/contacts', contactsRouter);
app.use('/api/events', eventsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server Error' } = err;
  res.status(status).json({ message });
});

export default app;
