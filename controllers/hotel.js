const Hotel = require("../models/hotel")
const APIFeatures = require("../utils/apiFeatures")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")

exports.getAllHotels = catchAsync(async (req, res, next) => {
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
})

exports.getHotel = catchAsync(async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.id)

  if (!hotel) {
    next(new AppError("No hotel with that id", 404))
    return
  }
  res.status(200).json({
    status: "success",
    data: {
      hotel: hotel,
    },
  })
})
exports.createHotel = catchAsync(async (req, res, next) => {
  const newTour = await Hotel.create(req.body)
  res.status(201).json({
    status: "success",
    data: {
      tour: newTour,
    },
  })
})

exports.updateHotel = catchAsync(async (req, res, next) => {
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
})

exports.deleteHotel = catchAsync(async (req, res, next) => {
  await Hotel.findByIdAndDelete(req.params.id)
  res.status(204).json({
    status: "success",
    data: null,
  })
})
