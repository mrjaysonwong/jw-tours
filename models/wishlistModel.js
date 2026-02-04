import { Schema, model, models } from 'mongoose';

const wishlistSchema = new Schema(
  {
    guestId: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    tours: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tour',
      },
    ],
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

wishlistSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Wishlist = models?.Wishlist || model('Wishlist', wishlistSchema);

export default Wishlist;
