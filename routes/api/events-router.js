import express from 'express';
import eventController from '../../controllers/event-controller.js';
import { eventValidate, isValidId } from '../../middleware/index.js';

const eventsRouter = express.Router();

eventsRouter.get('/', eventController.getAll);

eventsRouter.get('/:eventId', isValidId, eventController.getById);

eventsRouter.post('/', eventValidate.addEventValidate, eventController.add);

eventsRouter.put(
  '/:eventId',
  eventValidate.putEventValidate,
  eventController.updateById
);

eventsRouter.patch('/:eventId/favorite', eventController.updateById);
eventsRouter.delete('/:eventId', eventController.deleteById);

export default eventsRouter;
