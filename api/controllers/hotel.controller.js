const HotelModel = require("../models/Hotel.model");
const RoomModel = require("../models/Room.model");
const HttpError = require("../models/http-error");

const creatHotel = async (req, res, next) => {
  const newHotel = new HotelModel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await HotelModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatedHotel) {
      const error = new HttpError("hotel not found for update", 404);
      return next(error);
    }
    res.status(200).json({ seccuss: true, updatedHotel });
  } catch (error) {
    next(error);
  }
};
const deleteHotel = async (req, res, next) => {
  try {
    await HotelModel.findByIdAndDelete(req.params.id);

    res.status(200).json({ seccuss: true, message: "hotel has been deleted" });
  } catch (error) {
    next(error);
  }
};

const getHotelById = async (req, res, next) => {
  try {
    const hotel = await HotelModel.findById(req.params.id);

    if (!hotel) {
      const error = new HttpError("hotel not found", 404);
      return next(error);
    }

    res.status(200).json({ seccuss: true, hotel });
  } catch (error) {
    next(error);
  }
};
const getAllHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;

  try {
    const hotels = await HotelModel.find({
      ...others,
      cheapestPrice: { $gte: parseInt(min) || 1, $lt: parseInt(max) || 999 },
    }).limit(req.query.limit);

    if (!hotels) {
      const error = new HttpError("Sorry not found hotels", 404);
      return next(error);
    }

    res.status(200).json({ seccuss: true, hotels });
  } catch (error) {
    // console.log(error);
    next(error);
  }
};
const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");

  try {
    const list = await Promise.all(
      cities.map((city) => {
        return HotelModel.countDocuments({ city: city });
      })
    );

    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
const countByType = async (req, res, next) => {
  try {
    const hotel = await HotelModel.countDocuments({ type: "hotel" });
    const apartmentCount = await HotelModel.countDocuments({
      type: "apartment",
    });
    const resortCount = await HotelModel.countDocuments({ type: "resort" });
    const villaCount = await HotelModel.countDocuments({ type: "villa" });
    const cabinCount = await HotelModel.countDocuments({ type: "cabin" });

    res.status(200).json({
      seccuss: true,
      result: [
        { type: "hotel", count: hotel },
        { type: "apartment", count: apartmentCount },
        { type: "resort", count: resortCount },
        { type: "villa", count: villaCount },
        { type: "cabin", count: cabinCount },
      ],
    });
  } catch (error) {
    next(error);
  }
};

const getHotelRooms = async (req, res, next) => {
  const { id } = req.params;

  try {
    const hotel = await HotelModel.findById(id);
    if (!hotel) {
      const error = new HttpError("Sorry not found hotels", 404);
      return next(error);
    }
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return RoomModel.findById(room);
      })
    );

    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
exports.creatHotel = creatHotel;
exports.updateHotel = updateHotel;
exports.deleteHotel = deleteHotel;
exports.getHotelById = getHotelById;
exports.getAllHotels = getAllHotels;
exports.countByType = countByType;
exports.countByCity = countByCity;
exports.getHotelRooms = getHotelRooms;
