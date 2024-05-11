import { Schema, model } from 'mongoose';
import { handlleSaveError, runValidateAtupdate } from './hooks.js';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set full name for contact'],
      validate: {
        validator: function (v) {
          return /^[A-Z][a-z]+\s[A-Z][a-z]+$/.test(v);
        },
        message: (props) =>
          `${props.value} не є правильним ім'ям та прізвищем!`,
      },
    },
    email: {
      type: String,
      validate: {
        validator: function (v) {
          return /\S+@\S+\.\S+/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
      unique: true,
    },
    birthDate: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{2}\.\d{2}\.\d{4}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not the correct date of birth (dd.mm.yyyy)!`,
      },
    },
    source: {
      type: String,
      enum: ['Social media', 'Frends', 'Found myself'],
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactsSchema.pre('findOneAndUpdate', runValidateAtupdate);
contactsSchema.post('findOneAndUpdate', handlleSaveError);
contactsSchema.post('save', handlleSaveError);

const Contact = model('contact', contactsSchema);

export default Contact;
