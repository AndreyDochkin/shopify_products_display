const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");

module.exports = async function database() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection error:", err);
    throw err; 
  }
};
