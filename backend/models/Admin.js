//models

const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    // required: true,
    unique: true,
  },
});

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
