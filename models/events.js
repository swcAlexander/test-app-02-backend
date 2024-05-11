import { Schema, model } from 'mongoose';
import moment from 'moment';
import { handlleSaveError, runValidateAtupdate } from './hooks.js';

const iventSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    eventDate: {
      type: Date,
      validate: {
        validator: function (v) {
          // Перетворення дати у рядок у форматі "yyyy-mm-dd"
          const dateString = moment(v).format('YYYY-MM-DD');
          // Перевірка на валідну дату у форматі ISO
          return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
        },
        message: (props) =>
          `${props.value} is not a valid date in ISO format (yyyy-mm-dd)!`,
      },
    },
    organizer: {
      type: String,
    },
    subscribers: [
      {
        name: { type: String },
        email: { type: String },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

iventSchema.pre('findOneAndUpdate', runValidateAtupdate);
iventSchema.post('findOneAndUpdate', handlleSaveError);
iventSchema.post('save', handlleSaveError);

const Event = model('ivent', iventSchema);

export default Event;
