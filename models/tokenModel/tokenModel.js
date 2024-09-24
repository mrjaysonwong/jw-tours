import { Schema, model, models } from 'mongoose';
import emailSchema from './schemas/emailSchema';
import phoneSchema from './schemas/phoneSchema';

const tokenSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: [emailSchema],
    default: undefined,
  },
  phone: {
    type: [phoneSchema],
    default: undefined,
  },
});

const Token = models?.token || model('token', tokenSchema);

export default Token;
