const mongoose = require("mongoose");

const { Schema } = mongoose;

const requiredNumber = {
  type: Number,
  required: true,
};

const defaultrequiredDate = {
  type: Date,
  required: true,
};

const travelLogEntrySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    comments: String,
    Rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    image: String,
    latitude: { ...requiredNumber, min: -90, max: 90 },
    longitude: { ...requiredNumber, min: -180, max: 180 },
    visitDate: {
      ...defaultrequiredDate,
    },
  },

  {
    timestamps: true,
  }
);
const LogEntry = mongoose.model("LogEntry", travelLogEntrySchema);
module.exports = LogEntry;
