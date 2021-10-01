const Prescriber = require('../models/Prescriber.js');
const Prescription = require('../models/Prescription.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { generateRandomString } = require('../utils/utils.js');
const nodemailer = require('nodemailer');
require('dotenv').config();

const savePresriptionKey = (req, res) => {
  const { prescriberKey } = req.body;
  
  /*
  -Receive prescribers key
  -Check if key valid (if not, return)
  -Generate random string
  -Hash prescriber key with random string
  -Store random string in db along with hashed prescriber key
  -Create QR code of random string
  -Send QR code to client
  */
  console.log("Prescription saved");
}

const checkQRCode = (req, res) => {
  /*
  -Receive string from QR code
  -Check if string found in DB
  -If found, unhash stored prescriber key
  -Check if prescriber exists
  -If found, return valid prescription
  */
}

const createPrescription = async (req, res) => {
  const { prescriberKey } = req.body;
  try {
    // const existingPrescriber = await Prescriber.findOne({prescriberKey: prescriberKey});
    // if(!existingPrescriber) {
    //   res.status(404).json({message: 'Invalid key'});
    // }
    const randomString = generateRandomString(15);
    const token = jwt.sign({prescriberKey}, randomString);
    const result = await Prescriber.create({secret: randomString, token: token});
    // Generate QR code with token
    res.status(200).json({token: token});
  }
  catch (error) {
    res.status(500).json({message: error.message});
  }
}

const signIn = async (req, res) => {
  const { credentials } = req.body;
  try {
    const existingPrescriber = await Prescriber.findOne({email: credentials.email});
    if(!existingPrescriber) {
      res.status(404).send("Email not found");
    }
    const correctPassword = bcrypt.compare(credentials.password, existingPrescriber.password);
    if(!correctPassword) {
      res.status(409).send("Incorrect credentials");
    }
    res.status(200).send("Success");
    // Send OTP
  }
  catch (error) {
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
    // const correctPassword = bcrypt.compare(password, existingPrescriber.password);
    if(password !== existingPrescriber.password) {
      res.status(409).send("Incorrect credentials");
    }
    const otp = generateRandomString(6);
    await Prescriber.findByIdAndUpdate(existingPrescriber._id, {mostRecentOTP: otp});
    // Send OTP by email
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAILID,
        pass: process.env.EMAILPASSWORD,
        clientId: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        refreshToken: process.env.REFRESHTOKEN,
      }
    });
    let mailOptions = {
      from: "shrutik.mali15@gmail.com",
      to: "shrutik.mali15@gmail.com",
      subject: "Prescription OTP",
      html: `<p>OTP is <b>${otp}</b></p>`
    };
    await transporter.sendMail(mailOptions)
    .then((data) => {
      res.status(200).send("OTP sent");
    })
    .catch(err => {
      res.status(500).json({message: err.message});
    })
    
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
    if(existingPrescriber.mostRecentOTP !== otp) {
      res.status(409).send("Invalid OTP, try again");
    }
    else {
      await Prescriber.findByIdAndUpdate(existingPrescriber._id, {mostRecentOTP: ''});
      res.status(200).send("OTP verified!");
    }
  }
  catch(error) {
    res.status(500).json({message: error.message});
  }
}

const savePrescription = async (req, res) => {
  const { date, prescriberEmail, patientName, prescriptionList } = req.body;
  try {
    const result = await Prescription.create({date: date, prescriberEmail: prescriberEmail, patientName: patientName, prescription: prescriptionList});
    // Generate QR code
    res.status(200).json({id: result._id});
  }
  catch(error) {
    res.status(500).json({message: error.message});
  }
}

module.exports = {
  savePresriptionKey,
  checkQRCode,
  createPrescription,
  getOTP,
  verifyOTP,
  savePrescription,
};