/* eslint-disable no-console */
const dotenv = require("dotenv")
const mongoose = require("mongoose")

dotenv.config()
const app = require("./app")

mongoose.connect(process.env.DB_URI, {}).then(() => {
  console.log("DATABASE connected")
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
