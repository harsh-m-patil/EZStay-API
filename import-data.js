/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const mongoose = require("mongoose")
const fs = require("fs")
const Hotel = require("./models/hotel")

const DB_URI = "mongodb://127.0.0.1:27017/ezstayAPI"

mongoose.connect(DB_URI, {}).then(() => {
  console.log("DB Connected")
})

const hotels = JSON.parse(fs.readFileSync("./hotels.json", "utf-8"))

// Import DATA into DB
const importData = async () => {
  try {
    await Hotel.create(hotels)
    console.log("data loaded")
  } catch (error) {
    console.log(error)
  }
  process.exit()
}

// Delete All DATA from DB
const deleteData = async () => {
  try {
    await Hotel.deleteMany()
    console.log("data deleted")
  } catch (error) {
    console.log(error)
  }
  process.exit()
}

if (process.argv[2] === "--import") {
  importData()
} else if (process.argv[2] === "--delete") {
  deleteData()
}
