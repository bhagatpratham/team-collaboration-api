// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "member", "viewer"],
    default: "member",
  },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
});

module.exports = mongoose.model("User", userSchema);
