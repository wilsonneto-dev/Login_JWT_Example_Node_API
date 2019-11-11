const mongoose = require("../config/mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  pass: String
});

module.exports = mongoose.model("User", UserSchema);
