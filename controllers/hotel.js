// TODO: Implement controllers
const Hotel = require("../models/hotel")

exports.getAllHotels = async (req, res) => {
  try {
    // basic filtering name=Name
    const queryObj = { ...req.query }
    const excludedFields = ["page", "sort", "limit", "fields"]
    excludedFields.forEach((el) => delete queryObj[el])

    // advanced filtering
    let queryString = JSON.stringify(queryObj)
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`,
    )

    const query = Hotel.find(JSON.parse(queryString))

    const hotels = await query
    res.status(200).json({
      status: "status",
      results: hotels.length,
      hotels: hotels,
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    })
  }
}
exports.getHotel = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {},
  })
}
exports.createHotel = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {},
  })
}
exports.updateHotel = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {},
  })
}
exports.deleteHotel = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  })
}
