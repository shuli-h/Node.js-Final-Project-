const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/user-actions")
    .then(() => console.log("connected to users"))
    .catch(console.log);
};

module.exports = connectDB;
