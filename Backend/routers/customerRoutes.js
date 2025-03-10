const express = require("express");
const {
  create,
  getAll,
  update,
  remove,
  getCustomerById,
} = require("../controllers/companyController");
const router = express.Router();
router.post("/create", create);
router.get("/getall", getAll);
router.get("/getOne/:id", getCustomerById);
router.put("/update/:id", update);
router.delete("/remove/:id", remove);
module.exports = router;
