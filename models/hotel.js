const mongoose = require("mongoose")

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    adrress: String,
    district: String,
    city: String,
    state: String,
    pincode: {
      type: Number,
      match: /^[0-9]{6}$/,
    },
  },
  amenities: {
    type: [String],
  },
  description: String,
  images: [String],
  ratingsAverage: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

const Hotel = mongoose.model("Hotel", hotelSchema)

module.exports = Hotel
