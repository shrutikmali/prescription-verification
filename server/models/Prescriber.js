const mongoose = require('mongoose');

const prescriberSchema = new mongoose.Schema({
  prescriberKey: {
    type: [String],
    required: true,
  },
});

const Prescriber = mongoose.model("Prescriber", prescriberSchema);

module.exports = Prescriber;