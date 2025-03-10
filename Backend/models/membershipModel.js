const mongoose = require("mongoose");

const MembershipSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const Membership = mongoose.model("Membership", MembershipSchema);
module.exports = Membership;
