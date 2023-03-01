const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String,
  first_name: String,
  last_name: String,
  gender: String,
  date_of_birth: String,
  mobile_number: String,
  bio: String,
});

const User = new mongoose.model("User", usersSchema);

module.exports = User;
