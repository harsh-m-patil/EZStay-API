const express = require("express")
const morgan = require("morgan")

const hotelRouter = require("./routes/hotel")
const userRouter = require("./routes/user")

const app = express()

app.use(morgan("dev"))
app.use(express.json())

app.use("/api/v1/hotels", hotelRouter)
app.use("/api/v1/users", userRouter)

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl}`,
  })
})
module.exports = app
