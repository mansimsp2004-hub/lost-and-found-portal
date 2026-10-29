
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Lost", "Found"],
      required: true,
    },
    contactName: {
      type: String,
      required: true,
    },
    contactEmail: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Claimed", "Returned"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
