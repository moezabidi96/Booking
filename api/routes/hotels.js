const express = require("express");
const {
  creatHotel,
  updateHotel,
  deleteHotel,
  getHotelById,
  getAllHotels,
  countByCity,
  countByType,
  getHotelRooms,
} = require("../controllers/hotel.controller");

const router = express.Router();

router.post("/", creatHotel);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

router.put("/:id", updateHotel);

router.delete("/:id", deleteHotel);

router.get("/:id", getHotelById);

router.get("/", getAllHotels);
router.get("/room/:id", getHotelRooms);

module.exports = router;
