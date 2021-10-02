const mongoose = require('mongoose');

const prescriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mostRecentOTP: {
    type: String,
    default: 'placeholder',
  },
});

const Prescriber = mongoose.model("Prescriber", prescriberSchema);

module.exports = Prescriber;