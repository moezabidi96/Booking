const express = require("express");
const RoomController = require("../controllers/room.controller");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.use(checkAuth.verifyAuth);

router.get("/:id", RoomController.getRoomById);

router.get("/", RoomController.getAllRooms);

router.put("/availability/:id", RoomController.updateRoomAvailability);

router.use(checkAuth.verifyAdmin);

router.post("/:hotelId", RoomController.createRoom);

router.put("/:id", RoomController.updateRoom);

router.delete("/:HotelId/:id", RoomController.deleteRoom);

module.exports = router;
