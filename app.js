const express = require("express")
const morgan = require("morgan")

const hotelRouter = require("./routes/hotel")

const app = express()

app.use(morgan("dev"))
app.use(express.json())

app.use("/api/v1/hotels", hotelRouter)

module.exports = app
