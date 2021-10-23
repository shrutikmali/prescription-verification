import React, { useState } from 'react';
import PrescriptionTable from './Table';
import Header from '../Header';
import Footer from './Footer';
import Print from '../Print/Print';
import { getOTP as OTPRequest, verifyOTP, savePrescription as save } from '../api/api';

const Prescription = () => {

  const [date, ] = useState(new Date());
  const [patientName, setPatientName] = useState("");
  const [prescriptionList, setPrescriptionList] = useState([]);
  const [prescriberEmail, setPrescriberEmail] = useState("");
  const [prescriberName, setPrescriberName] = useState("");
  const [prescriberPassword, setPrescriberPassword] = useState("");
  const [validity, setValidity] = useState("");
  const [OTP, setOTP] = useState("");
  const [OTPVerified, setOTPVerified] = useState(false);
  const [prescriptionID, setPrescriptionID] = useState('');
  const [showPrint, setShowPrint] = useState(false);

  const getOTP = async () => {
    await OTPRequest(prescriberEmail, prescriberPassword)
    .then(result => {
      if(result.status === 200) {
        alert("OTP sent to registered email");
        setPrescriberName(result.data.prescriberName);
      }
      else {
        alert("Some error occurred");
      }
    })
    .catch(error => {
      console.log(error.response.status);
    });
  }

  const checkOTP = async () => {
    await verifyOTP(prescriberEmail, OTP)
    .then(result => {
      if(result.status === 200) {
        setOTPVerified(true);
        setPrescriberName(result.data.name);
        alert("OTP Verified!");
      }
    })
    .catch(error => {
      if(error.response.status === 409) {
        alert("Invalid OTP, try again");
      }
    });
  }

  const printPrescription = async () => {
    await save(date, patientName, prescriberEmail, prescriptionList, validity)
    .then(result => {
      console.log(result);
      setPrescriptionID(result.data.id);
      setShowPrint(true);
    })
    .catch(error => {
      console.log(error.response);
    })
  }


  return <>
    {!showPrint && <div><Header date={date} patientName={patientName} setPatientName={setPatientName} validity={validity} setValidity={setValidity} />
    <br />
    <br />
    <PrescriptionTable prescriptionList={prescriptionList} setPrescriptionList={setPrescriptionList} />
    <br />
    <br />
    <br />
    <Footer
    prescriberEmail={prescriberEmail}
    setPrescriberEmail={setPrescriberEmail} 
    prescriberPassword={prescriberPassword} 
    setPrescriberPassword={setPrescriberPassword} 
    OTP={OTP} 
    setOTP={setOTP} 
    getOTP={getOTP} 
    checkOTP={checkOTP} 
    OTPVerified={OTPVerified} 
    printPrescription={printPrescription} /></div>}
    {showPrint && 
    <Print 
    id={prescriptionID} 
    date={date} 
    patientName={patientName} 
    prescriberName={prescriberName} 
    prescriptionList={prescriptionList} />}
  </>
}

export default Prescription;