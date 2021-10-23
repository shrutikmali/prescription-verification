import React, { useEffect } from 'react';
import qrcode from 'qrcode';
import { Grid, Button } from '@mui/material';
import PrescriptionTable from '../Prescription/Table';
import './print.css';

const Print = ({ id, date, patientName, prescriberName, prescriptionList }) => {
  useEffect(() => {
    qrcode.toCanvas(document.getElementById('qrcode'), `https://shrutikmali.github.io/prescription-verification/#/verify/${id}`, function(error) {
      if(error) {
        console.log(error);
      }
    });
  }, [id]);


  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} align='left' style={{paddingLeft: '10%', paddingTop: '50px'}}>
        Date: {date.toString()}<br /><br />
        Patient Name: {patientName}<br />
        Prescriber Name: {prescriberName}
      </Grid>
      <Grid item xs={12} md={6} align='right' style={{paddingRight: '5%', paddingTop: '50px'}}>
        <canvas id='qrcode'></canvas>
      </Grid>
      <Grid item xs={12}>
      </Grid>
      <Grid item xs={12} align='center'>
        <PrescriptionTable prescriptionList={prescriptionList} print={true}/>
      </Grid>
      <Grid item xs={12} align='center' className='printBtn' >
        <Button variant='contained' onClick={() => window.print()}>Print</Button>
      </Grid>
    </Grid>
  );
}

export default Print;