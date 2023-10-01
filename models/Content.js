const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
});

module.exports = mongoose.model("Content", contentSchema);
