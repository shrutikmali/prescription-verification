const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  secret: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = { Prescription };