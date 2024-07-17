/**
 * Class representing the errors in the app.
 * @class
 * @extends {Error}
 */
class AppError extends Error {
  /**
   * Creates an instance of the class AppError.
   * @constructor
   * @param {string} message - Custom error message.
   * @param {number} statusCode - HTTP status code.
   */
  constructor(message, statusCode) {
    super(message)
    /**
     * HTTP status code.
     * @type {number}
     */
    this.statusCode = statusCode

    /**
     * Status of the request, either 'fail' or 'error'.
     * @type {string}
     */
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"

    /**
     * Indicates whether the error is operational.
     * @type {boolean}
     */
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = AppError
