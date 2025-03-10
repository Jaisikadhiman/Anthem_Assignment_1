const mongoose = require("mongoose");
const mongoConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("connected");
    })
    .catch((error) => {
      console.log(error, "not connected");
    });
};
module.exports = mongoConnection;
