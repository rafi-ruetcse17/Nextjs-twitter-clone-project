const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  verificationToken: {
    type: String,
    required: true,
  },
  expireIn: {
    type: Date,
    required: true,
  },
});

const Verification =
  mongoose.models?.Verification ||
  mongoose.model("Verification", verificationSchema);

module.exports = Verification;
