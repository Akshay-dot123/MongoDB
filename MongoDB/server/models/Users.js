const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email must be unique"],
    unique: true,
    lowercase: true,
  },
});
const UsersModel = mongoose.model("users", userSchema); //This will automatically create collections/tables
module.exports = UsersModel;
