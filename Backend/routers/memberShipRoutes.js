const express = require("express");
const {
  create,
  getAll,
} = require("../controllers/membershipController");
const router = express.Router();
router.post("/create", create);
router.get("/getall", getAll);
module.exports = router;
