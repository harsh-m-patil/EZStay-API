const jwt = require("jsonwebtoken")
const User = require("../models/user")
const AppError = require("../utils/appError")

const signToken = (id) => {
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    })

    const token = signToken(newUser._id)

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: {
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: `${err.name} ${err.message}`,
    })
  }
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new AppError("Pleasee provide email and password", 400))
  }
}
