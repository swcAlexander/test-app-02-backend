import { HttpError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';
import Event from '../models/events.js';

const getAll = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Event.find({}, '-createdAt -updatedAt', {
    skip,
    limit,
  });
  res.json(result);
};

const getById = async (req, res) => {
  const { eventId } = req.params;
  const result = await Event.findOne({ _id: eventId });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await Event.create({ ...req.body });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { eventId } = req.params;
  const result = await Event.findOneAndUpdate({ _id: eventId }, req.body, {
    new: true,
  });
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { eventId } = req.params;
  const result = await Event.findOneAndDelete({ _id: eventId });
  if (!result) {
    throw HttpError(404);
  }
  res.status(204).send();
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
