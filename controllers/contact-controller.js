import { HttpError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';
import Contact from '../models/contacts.js';
import Event from '../models/events.js';

const getAll = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({}, '-createdAt -updatedAt', {
    skip,
    limit,
  });
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findOne({ _id: contactId });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const add = async (req, res) => {
  const { eventId, name, email, birthDate, source } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      birthDate,
      source,
    });
    await newContact.save();

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Подія не знайдена' });
    }

    event.subscribers.push({ name, email });

    await event.save();

    res
      .status(200)
      .json({ message: 'Користувач успішно підписаний на подію', event });
  } catch (error) {
    console.error('Помилка під час приєднання до події:', error);
    res.status(500).json({ message: 'Щось пішло не так, спробуйте знову' });
  }
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findOneAndUpdate({ _id: contactId }, req.body, {
    new: true,
  });
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findOneAndDelete({ _id: contactId });
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
