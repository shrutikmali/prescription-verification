import React, { useState } from 'react';
import PrescriptionTable from './Table';
import Header from '../Header';
import Footer from './Footer';
import { getOTP as OTPRequest, verifyOTP } from '../api/api';

const Prescription = () => {

  const [date, setDate] = useState(new Date());
  const [patientName, setPatientName] = useState("");
  const [prescriptionList, setPrescriptionList] = useState([]);
  const [prescriberEmail, setPrescriberEmail] = useState("");
  const [prescriberPassword, setPrescriberPassword] = useState("");
  const [OTP, setOTP] = useState('');
  const [OTPVerified, setOTPVerified] = useState(false);

  const getOTP = async () => {
    await OTPRequest(prescriberEmail, prescriberPassword)
    .then(result => {
      if(result.status === 200) {
        alert("OTP sent to registered email");
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
        alert("OTP Verified!");
      }
    })
    .catch(error => {
      if(error.response.status === 409) {
        alert("Invalid OTP, try again");
      }
    });
  }


  return <>
    <Header date={date} patientName={patientName} setPatientName={setPatientName} />
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
    OTPVerified={OTPVerified} />
  </>
}

export default Prescription;