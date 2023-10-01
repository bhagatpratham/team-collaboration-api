const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema({
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("Invitation", invitationSchema);
