const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNumber: { type: String, required: true },
  status: { type: String, enum: ["Gold", "Diamond"], required: true },
  membershipID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Membership",
    required: true,
  },
});
const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;
