const Membership = require("../models/membershipModel");

// CREATE Dummy Memberships
const create = async (req, res) => {
  try {
    const { name } = req.body;
    console.log("req.body", req.body);

    const memberships = await Membership.create({ name });
    res.status(201).json(memberships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ all Memberships
const getAll = async (req, res) => {
  try {
    const memberships = await Membership.find();
    res.status(200).json(memberships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { create, getAll };
