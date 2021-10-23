const Prescriber = require('../models/Prescriber.js');
const Prescription = require('../models/Prescription.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { generateRandomString } = require('../utils/utils.js');
const nodemailer = require('nodemailer');
require('dotenv').config();


const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingPrescriber = await Prescriber.findOne({email: email});
    if(existingPrescriber) {
      res.status(409).send("This email is already in use");
    }
    else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newPrescriber = await Prescriber.create({email: email, name: name, password: hashedPassword});
      res.status(200).send("Account created");
    }
  }
  catch(error) {
    res.status(500).json({message: error.message});
  }
}

const getOTP = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingPrescriber = await Prescriber.findOne({email: email});
    if(!existingPrescriber) {
      res.status(404).send("Email not found");
    }
    const correctPassword = bcrypt.compare(password, existingPrescriber.password);
    if(!correctPassword) {
      res.status(409).send("Incorrect credentials");
    }
    else {
      const otp = generateRandomString(6);
      await Prescriber.findByIdAndUpdate(existingPrescriber._id, {mostRecentOTP: otp});
      // Send OTP by email
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAILID,
          pass: process.env.EMAILPASSWORD,
        }
      });
      let mailOptions = {
        from: process.env.EMAILID,
        to: email,
        subject: "Prescription OTP",
        html: `<p>OTP is <b>${otp}</b></p>`
      };
      await transporter.sendMail(mailOptions)
      .then((data) => {
        res.status(200).json({prescriberName: existingPrescriber.name});
      })
      .catch(err => {
        throw new Error(err.message);
      });
    }
  }
  catch (error) {
    res.status(500).json({message: error.message});
  }
}

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const existingPrescriber = await Prescriber.findOne({email: email});
    if(!existingPrescriber) {
      res.status(404).send("Invalid email");
    }
    if(existingPrescriber.mostRecentOTP !== otp || otp === '' || otp === 'placeholder') {
      res.status(409).send("Invalid OTP, try again");
    }
    else {
      await Prescriber.findByIdAndUpdate(existingPrescriber._id, {mostRecentOTP: ''});
      res.status(200).json({name: existingPrescriber.name, message: "OTP Verified!"});
    }
  }
  catch(error) {
    res.status(500).json({message: error.message});
  }
}

const savePrescription = async (req, res) => {
  const { date, prescriberEmail, patientName, prescriptionList, validity } = req.body;
  try {
    const result = await Prescription.create({date: date, prescriberEmail: prescriberEmail, patientName: patientName, prescription: prescriptionList, validity: validity});
    res.status(200).json({id: result._id});
  }
  catch(error) {
    res.status(500).json({message: error.message});
  }
}

const verifyPrescription = async (req, res) => {
  const { id } = req.body;
  try {
    const existingPrescription = await Prescription.findById(id);
    if(!existingPrescription) {
      throw new Error("Invalid prescription");
    }
    res.status(200).json({message: "Prescription verified", 
    patientName: existingPrescription.patientName, 
    prescriberEmail: existingPrescription.prescriberEmail, 
    prescriptionList: existingPrescription.prescription, 
    date: existingPrescription.date, 
    validity: existingPrescription.validity,
    });
  }
  catch (error) {
    res.status(404).send(error.message);
  }
}

module.exports = {
  signUp,
  getOTP,
  verifyOTP,
  savePrescription,
  verifyPrescription, 
};