const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please provide your name"],
    maxlength: [40, "name can be maximum of 40 characters"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Please provide your email"],
    validate: [validator.isEmail, "Please provide a valid email id"],
  },
  image: String,
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Password should of minimum 8 characters"],
  },
})

const User = mongoose.model("User", userSchema)

module.exports = User
