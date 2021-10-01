const mongoose = require('mongoose');

const prescriptionItemSchema = new mongoose.Schema({
  medicineName: {
    type: String,
    required: true,
  },
  dose: {
    type: String,
    required: true,
  },
  timeOfConsumption: {
    type: String,
    required: true,
  },
});

const prescriptionSchema = new mongoose.Schema({
  prescriberEmail: {
    type: String,
  },
  prescription: {
    type: [prescriptionItemSchema],
    default: null,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);


module.exports = Prescription;