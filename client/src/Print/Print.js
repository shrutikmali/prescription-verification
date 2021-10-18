import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import qrcode from 'qrcode';
import { Grid, Button } from '@mui/material';
import PrescriptionTable from '../Prescription/Table';
import './print.css';

const Print = () => {
  const history = useHistory();
  useEffect(() => {
    qrcode.toCanvas(document.getElementById('qrcode'), `http://192.168.0.180:3000/verify/${history.location.state.id}`, function(error) {
      if(error) {
        console.log(error);
      }
    });
  }, [history.location.state.id]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} align='left' style={{paddingLeft: '10%', paddingTop: '50px'}}>
        Date: {history.location.state.date}<br /><br />
        Patient Name: {history.location.state.patientName}<br />
        Prescriber Name: {history.location.state.prescriberName}
      </Grid>
      <Grid item xs={12} md={6} align='right' style={{paddingRight: '5%', paddingTop: '50px'}}>
        <canvas id='qrcode'></canvas>
      </Grid>
      <Grid item xs={12}>
        
      </Grid>
      <Grid item xs={12} align='center'>
        <PrescriptionTable prescriptionList={history.location.state.prescriptionList} print={true}/>
      </Grid>
      <Grid item xs={12} align='center' className='printBtn' >
        <Button variant='contained' onClick={() => window.print()}>Print</Button>
      </Grid>
    </Grid>
  );
}

export default Print;