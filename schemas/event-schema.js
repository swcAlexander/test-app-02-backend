import Joi from 'joi';

const eventAddSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': `"title" must be exist`,
  }),
  description: Joi.string().required().messages({
    'any.required': `"description" must be exist`,
  }),
  eventDate: Joi.date().required().messages({
    'any.required': `"event date" must be exist`,
  }),
  organizer: Joi.string().required(),
  subscribers: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    })
  ),
});

const eventPutSchema = Joi.object({
  title: Joi.string(),
  description: Joi.date(),
  eventDate: Joi.string(),
  organizer: Joi.string(),
  subscribers: Joi.array().items(
    Joi.object({
      name: Joi.string(),
      email: Joi.string().email(),
    })
  ),
});

export default { eventAddSchema, eventPutSchema };
