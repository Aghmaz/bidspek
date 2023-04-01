//models

const mongoose = require("mongoose");

const NewUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: { type: String, required: true },
});

const NewUser = mongoose.model("NewUser", NewUserSchema);
module.exports = NewUser;
