const Prescriber = require('../models/Prescriber.js');
const Prescription = require('../models/Prescription.js');
const jwt = require('jsonwebtoken');
const { generateRandomString } = require('../utils/utils.js');

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

const checkPrescriberKey = async (req, res) => {
  const { prescriberKey } = req.body;
  console.log(prescriberKey);
  try {
    const prescriber = await Prescriber.findOne({prescriberKey: prescriberKey})
    if(!prescriber) {
      res.status(404).send();
    }
    res.status(200).send();
  }
  catch (error) {
    res.status(404).json({message: error.message})
  }
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

module.exports = {
  savePresriptionKey,
  checkPrescriberKey,
  checkQRCode,
  createPrescription,
};