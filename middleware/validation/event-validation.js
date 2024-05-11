import eventSchema from '../../schemas/event-schema.js';

import { validateBody } from '../../decorators/index.js';

const addEventValidate = validateBody(eventSchema.eventAddSchema);
const putEventValidate = validateBody(eventSchema.eventPutSchema);

export default {
  addEventValidate,
  putEventValidate,
};
