const express = require('express');
const { savePresriptionKey, checkPrescriberKey, createPrescription } = require('../controllers/controllers.js');

const app = express();

app.post('/save', savePresriptionKey);
app.post('/check', checkPrescriberKey);
app.post('/create', createPrescription);

module.exports = app;