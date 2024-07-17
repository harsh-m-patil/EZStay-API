const express = require("express")
const morgan = require("morgan")

const AppError = require("./utils/appError")
const errorHandler = require("./controllers/error")

const hotelRouter = require("./routes/hotel")
const userRouter = require("./routes/user")

const app = express()

app.use(morgan("dev"))
app.use(express.json())

app.use("/api/v1/hotels", hotelRouter)
app.use("/api/v1/users", userRouter)

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404))
})

app.use(errorHandler)

module.exports = app
