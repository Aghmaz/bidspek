const { boolean } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    // required: true,
  },
  LastName: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    // required: false,
    // unique: true,
  },
  address: {
    type: String,
    // required: true,
    // unique: true,
  },
  city: {
    type: String,
    // required: true,
    // unique: true,
  },
  state: {
    type: String,
    // required: true,
    // unique: true,
  },
  zipCode: {
    type: Number,
    // required: true,
    // unique: true,
  },
  preferences: [
    {
      type: String,
      // required: true,
      // unique: true,
    },
  ],
  services: [
    {
      type: String,
      // required: true,
      // unique: true,
    },
  ],
  hourlyRate: {
    type: Number,
    // required: true,
    // unique: true,
  },
  licensePE: {
    type: Boolean,
    default: false,
  },
  corrosionEngineer: {
    type: Boolean,
    default: false,
  },
  buildingPermits: {
    type: Boolean,
    default: false,
  },
  permitsRegion: {
    type: String,
  },
  permitsCountry: {
    type: String,
  },
  permitsStates: {
    type: String,
  },
  password: String,
  profileImage: {
    type: String,
  },
  caseImage: [
    {
      type: String,
    },
  ],
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  company: {
    type: Boolean,
  },
  companyName: {
    type: String,
  },
});

const Engineer = mongoose.model("Engineer", UserSchema);
module.exports = Engineer;
