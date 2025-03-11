require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoConnection = require("./Connection/dbConnection");
const app = express();
const customerRoutes = require("./routers/customerRoutes");
const membershipRoutes = require("./routers/memberShipRoutes");

const corsOptions = {
  origin: ["https://anthem-assignment-1.vercel.app"], // No trailing slash
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome Jaisika" });
});

app.use("/api/customer", customerRoutes);
app.use("/api/membership", membershipRoutes);
mongoConnection();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
