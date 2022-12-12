const RoomModel = require("../models/Room.model");
const HotelModel = require("../models/Hotel.model");
const HttpError = require("../models/http-error");
const mongoose = require("mongoose");

const createRoom = async (req, res, next) => {
  const newRoom = new RoomModel(req.body);
  const hotelId = req.params.hotelId;
  console.log(hotelId);
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    const savedRoom = await newRoom.save({ session: sess });
    await HotelModel.findByIdAndUpdate(
      hotelId,
      {
        $push: { rooms: savedRoom._id },
      },
      { session: sess }
    );
    await sess.commitTransaction();

    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await RoomModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatedRoom) {
      const error = new HttpError("Room not found for update", 404);
      return next(error);
    }
    res.status(200).json({ seccuss: true, updatedRoom });
  } catch (error) {
    next(error);
  }
};

const updateRoomAvailability = async (req, res, next) => {
  // req.body.dates.map((date) => console.log(new Date(date)));
  try {
    const newUpdate = await RoomModel.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      },
      { new: true }
    );
    res.status(200).json({
      seccuss: true,
      newUpdate,
      //message: "Room has been updated"
    });
  } catch (error) {
    next(error);
  }
};
const deleteRoom = async (req, res, next) => {
  const HotelId = req.params.HotelId;
  const RoomId = req.params.id;
  try {
    //
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await RoomModel.findByIdAndDelete(RoomId, { session: sess });

    await HotelModel.findByIdAndUpdate(
      HotelId,
      {
        $pull: { rooms: RoomId },
      },
      { session: sess }
    );
    await sess.commitTransaction();

    res.status(200).json({ seccuss: true, message: "Room has been deleted" });
  } catch (error) {
    next(error);
  }
};

const getRoomById = async (req, res, next) => {
  try {
    const room = await RoomModel.findById(req.params.id);

    if (!room) {
      const error = new HttpError("Room not found", 404);
      return next(error);
    }

    res.status(200).json({ seccuss: true, room });
  } catch (error) {
    next(error);
  }
};
const getAllRooms = async (req, res, next) => {
  try {
    const Rooms = await RoomModel.find();

    if (!Rooms) {
      const error = new HttpError("Sorry not found Rooms", 404);
      return next(error);
    }

    res.status(200).json({ seccuss: true, Rooms });
  } catch (error) {
    next(error);
  }
};

exports.createRoom = createRoom;
exports.updateRoom = updateRoom;
exports.deleteRoom = deleteRoom;
exports.getRoomById = getRoomById;
exports.getAllRooms = getAllRooms;
exports.updateRoomAvailability = updateRoomAvailability;
