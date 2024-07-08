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

    let query = Hotel.find(JSON.parse(queryString))

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ")
      query = query.sort(sortBy)
    } else {
      query.sort("-createdAt")
    }

    const hotels = await query
    res.status(200).json({
      status: "status",
      results: hotels.length,
      data: {
        hotels: hotels,
      },
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    })
  }
}
exports.getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    res.status(200).json({
      status: "success",
      data: {
        hotel: hotel,
      },
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    })
  }
}
exports.createHotel = async (req, res) => {
  try {
    const newTour = await Hotel.create(req.body)
    res.status(200).json({
      status: "success",
      data: {
        tour: newTour,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    })
  }
}
exports.updateHotel = async (req, res) => {
  try {
    const updatedTour = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    res.status(200).json({
      status: "success",
      data: {
        tour: updatedTour,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    })
  }
}
exports.deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id)
    res.status(204).json({
      status: "success",
      data: null,
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    })
  }
}
