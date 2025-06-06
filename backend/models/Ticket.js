const { Schema, model } = require("mongoose");

const ticketSchema = new Schema(
  {
    url: { type: String, required: true },
    category: { type: String, enum: ["phishing", "arnaque", "malware", "autres"], required: true },
    danger: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["pending", "valid", "refused"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = model("Ticket", ticketSchema);