const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  userName: {
    type: String,
    default: "khalil"
  },
  pickUp: {
    address: String,
    name: String,
    latitude: String,
    longitude: String
  },
  dropOff: {
    address: String,
    name: String,
    latitude: String,
    longitude: String
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
