import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
  urlId: {
    type: String,
    required: true,
  },
  origUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    index: true, // add index to enable querying by shortUrl
    unique: true, // add unique constraint to ensure uniqueness of shortUrl values
  },
  clicks: [
    {
      geoLocation: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

export const URL =
  mongoose.models.UrlSchema || mongoose.model("Url", UrlSchema);
