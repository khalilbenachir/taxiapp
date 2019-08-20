var express = require("express");
const Booking = require("../model/booking");
var router = express.Router();

router.get("/booking", async (req, res) => {
  res.send("hello");
  const booking = new Booking(req.body);
  try {
    console.log(booking);

    const savedBooking = await booking.save();
    console.log(savedBooking);
    res.json(savedBooking);
  } catch (e) {
    res.json({ message: e });
  }
});

module.exports = router;
