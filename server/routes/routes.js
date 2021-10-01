const express = require('express');
const { savePresriptionKey, checkPrescriberKey, createPrescription, signIn, signUp, getOTP, verifyOTP, savePrescription } = require('../controllers/controllers.js');

const app = express();

// app.post('/save', savePresriptionKey);
// app.post('/check', checkPrescriberKey);
// app.post('/create', createPrescription);
// app.post('/signin', signIn);
// app.post('/signup', signUp);
app.post('/getotp', getOTP);
app.post('/verifyotp', verifyOTP)
app.post("/saveprescription", savePrescription);

module.exports = app;