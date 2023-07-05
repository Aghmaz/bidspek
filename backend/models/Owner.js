//models

const mongoose = require("mongoose");

const NewUserSchema = new mongoose.Schema({
  owneremail: {
    type: String,
    required: true,
    unique: true,
  },
  ownerzip: {
    type: Number,
    // required: true,
    // unique: true,
  },
  screenone: [
    {
      type: String,
      // required: true,
      // unique: true,
    },
  ],
  screentwo: [
    {
      type: String,
      // required: true,
      // unique: true,
    },
  ],
});

const Owner = mongoose.model("Owner", NewUserSchema);
module.exports = Owner;
