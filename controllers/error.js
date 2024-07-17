const AppError = require("../utils/appError")

/**
 *  Handle MongoDB cast error
 *  @param {Error} err
 *  @returns Instance of AppError class
 */
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`
  return new AppError(message, 400)
}

/**
 * Handle MongoDB duplicate key error
 * @param {Error} err
 *  @returns Instance of AppError class
 */
const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate field value:${err.keyValue.name}. Please use another value!`
  return new AppError(message, 400)
}

/**
 * Handle Validation Errors from MongoDB
 * @param {Error} err
 *  @returns Instance of AppError class
 */
const handleValidationErrorsDB = (err) => {
  const { message } = err
  return new AppError(message, 400)
}
/**
 * Handle Invalid JWT Token error
 * @returns Instance of AppError class
 */
const handleJWTError = () =>
  new AppError("Invalid token,please login again", 401)

/**
 * Handle JWT Token Expiry error
 * @returns Instance of AppError class
 */
const handleJWTExpiredError = () =>
  new AppError("Your Token has been expired please login again", 401)

/**
 * Send Errors in Dev env
 * @param {Error} err
 * @param {http.ServerResponse} res
 */
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.mistake,
    stack: err.stack,
  })
}

/**
 * Send Errors in production env
 * @param {Error} err
 * @param {http.ServerResponse} res
 */
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })
  } else {
    res.status(500).json({
      status: "error",
      message: "Something Went Wrong",
    })
  }
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || "error"

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res)
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err }
    if (err.name === "CastError") {
      error = handleCastErrorDB(err)
    } else if (err.code === 11000) {
      error = handleDuplicateFieldsDB(err)
    } else if (err.name === "ValidationError") {
      error = handleValidationErrorsDB(err)
    } else if (err.name === "JsonWebTokenError") {
      error = handleJWTError()
    } else if (err.name === "TokenExpiredError") {
      error = handleJWTExpiredError()
    }
    sendErrorProd(error, res)
  }
}
