import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';

const Footer = ({ prescriberEmail, setPrescriberEmail, prescriberPassword, setPrescriberPassword, OTP, setOTP, getOTP, checkOTP, OTPVerified, printPrescription }) => {
  const [showOTPField, setShowOTPField] = useState(false);
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} align="center">
        <TextField name="email" label="Prescriber Email" type="email" value={prescriberEmail} onChange={(e) => setPrescriberEmail(e.target.value)}/>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField name="password" label="Prescriber Password" type="password" value={prescriberPassword} onChange={(e) => setPrescriberPassword(e.target.value)}/>
      </Grid>
      <Grid item xs={12} align='center'>
        <Button onClick={() => { getOTP(); setShowOTPField(true)}}>Get OTP</Button>
      </Grid>
      {showOTPField && <Grid item xs={12} align='center' style={{marginBottom: '10px',}}>
        <TextField name="otp" label="OTP" value={OTP} onChange={(e) => setOTP(e.target.value)}/>
      </Grid>}
      {showOTPField && <Grid item xs={12} align='center' style={{marginBottom: '10px',}}>
        <Button onClick={checkOTP}>Check</Button>
      </Grid>}
      {OTPVerified && <Grid item xs={12} align='center'>
        <Button onClick={printPrescription}>Print</Button>
      </Grid>}
    </Grid>
  )
}

export default Footer;