const Customer = require("../models/customerModel");
const mongoose = require("mongoose");
// CREATE Customer

const create = async (req, resp) => {
  const { firstName, lastName, email, contactNumber, membershipID, status } =
    req.body;
  console.log("req.body::::::::::", req.body);
  const ans = await Customer.create({
    firstName,
    lastName,
    email,
    contactNumber,
    membershipID,
    status,
  });

  ans.save();
  return resp.status(200).json({
    message: "Customer created",
    success: true,
    customer: ans,
    status: 200,
  });
};

// READ all customers
const getAll = async (req, res) => {
  try {
    const customers = await Customer.aggregate([
      {
        $lookup: {
          from: "memberships", // Collection name in MongoDB (should match the actual name)
          localField: "membershipID",
          foreignField: "_id",
          as: "membership",
        },
      },
      {
        $unwind: {
          path: "$membership",
          preserveNullAndEmptyArrays: true, // Keeps customers even if they don't have a membership
        },
      },
      {
        $project: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
          contactNumber: 1,
          status: 1,
          membershipID: "$membership._id",
          membershipName: "$membership.name",
        },
      },
    ]);

    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from request params
    console.log(id);
    const customer = await Customer.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "memberships",
          localField: "membershipID",
          foreignField: "_id",
          as: "membership",
        },
      },
      {
        $unwind: {
          path: "$membership",
          preserveNullAndEmptyArrays: true, // Keeps user even if they have no membership
        },
      },
      {
        $project: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
          contactNumber: 1,
          status: 1,
          membershipID: "$membership._id",
          membershipName: "$membership.name",
        },
      },
    ]);

    if (!customer.length) {
      return res
        .status(404)
        .json({ message: "Customer not found", customer: customer });
    }

    res.status(200).json(customer[0]); // Return single object instead of array
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Customer
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedCustomer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE Customer
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await Customer.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "Customer deleted successfully", status: 200 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  create,
  getAll,
  update,
  remove,
  getCustomerById,
};
