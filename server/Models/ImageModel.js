const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Image", imageSchema);
