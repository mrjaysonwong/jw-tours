import { Schema } from 'mongoose';

export const bookingRequestSchema = new Schema({
  tourCost: { type: Number, required: true },
  partySize: { type: Number, required: true },
  perPersonFee: Number,
  totalPerPersonFee: Number,
  serviceFee: { type: Number, required: true },
  totalCost: { type: Number, required: true },
  tourDate: { type: Date, required: true },
  startTime: { type: String, required: true },
}, { _id: false });

export const contactSchema = new Schema({
  fullName: String,
  email: String,
  phone: {
    dialCode: { type: String, trim: true },
    phoneNumber: { type: String, trim: true },
  },
}, { _id: false });

export const meetingAndPickupSchema = new Schema({
  option: String,
}, { _id: false });
