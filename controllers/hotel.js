const Hotel = require("../models/hotel")
const APIFeatures = require("../utils/apiFeatures")

exports.getAllHotels = async (req, res) => {
  try {
    const features = new APIFeatures(Hotel.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()

    const hotels = await features.query

    res.status(200).json({
      status: "success",
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
    res.status(201).json({
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
