const express = require('express');
const { signUp, getOTP, verifyOTP, savePrescription, verifyPrescription } = require('../controllers/controllers.js');

const app = express();

app.post('/signup', signUp);
app.post('/getotp', getOTP);
app.post('/verifyotp', verifyOTP)
app.post("/saveprescription", savePrescription);
app.post('/verifyprescription', verifyPrescription);
module.exports = app;