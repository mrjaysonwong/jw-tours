import { Schema, model, models } from 'mongoose';

const reviewSchema = new Schema(
  {
    booking: {
      type: Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
      unique: true, // one review per booking
    },
    tour: {
      type: Schema.Types.ObjectId,
      ref: 'Tour',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      trim: true,
      minlength: 30,
      maxlength: 1000,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

reviewSchema.index({ tour: 1, rating: 1, user: 1, status: 1 });

const Review = models?.Review || model('Review', reviewSchema);

export default Review;
