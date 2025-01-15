import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the user who wrote the review
      required: true
    },
    reviewText: {
      type: String,
      required: true,
      trim: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5 // Rating out of 5
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;
