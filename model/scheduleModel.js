const mongoose = require("mongoose")

const scheduleSchema = {
  _id: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    lowercase: true, // convert to lowercase
    trim: true // remove whitespaces
  },
  schedule: {
    type: Array,
    required: true
  }
}

const scheduleModel = new mongoose.model(
  "Schedule",
  new mongoose.Schema(scheduleSchema)
)

module.exports = scheduleModel
