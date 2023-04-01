//models

const mongoose = require("mongoose");

const ContractorSchema = new mongoose.Schema({
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
    // required: true,
    unique: true,
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
  advisor: {
    type: Boolean,
    default: false,
  },
  subscription: {
    type: Boolean,
    default: false,
  },
  priceProject: {
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
});

const Contractor = mongoose.model("Contractor", ContractorSchema);
module.exports = Contractor;
