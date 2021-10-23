import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import PrescriptionTable from '../Prescription/Table';
import { useParams } from 'react-router-dom';
import { verifyPrescription } from '../api/api';

const Verify = () => {
  const CHECKING = 'checking';
  const VALID = 'valid';
  const INVALID = 'invalid';
  const [status, setStatus] = useState(CHECKING);
  const [prescriptionDetails, setPrescriptionDetails] = useState({
    patientName: '',
    prescriptionList: [],
    date: '',
    validity: '',
  });
  const { id } = useParams();

  useEffect(() => {
    const verify = async () => {
      await verifyPrescription(id)
      .then(result => {
        if(result.status === 200) {
          setPrescriptionDetails(result.data);
          setStatus(VALID);
        }
      })
      .catch(error => {
        console.log(error.response);
      });
    }
    verify();
  }, [id]);


  return (
    <Grid container spacing={2}>
      {status === INVALID && <Grid item xs={12} align='center' style={{marginTop: '20px'}}>
        <h3>Invalid prescription</h3>
      </Grid>}

      {status === VALID && <Grid item contains xs={12} align='center'>
      <Grid item xs={12}>
        <h3>Prescription Verified</h3>
      </Grid>
      <Grid item xs={12} align='center'>Patient Name {prescriptionDetails.patientName}</Grid>
      <Grid item xs={12} align='center'>Prescribed on: {prescriptionDetails.date}</Grid>
      <Grid item xs={12} align='center'>Valid upto: {prescriptionDetails.validity}</Grid>
      </Grid>
      }
      {status === VALID && <PrescriptionTable prescriptionList={prescriptionDetails.prescriptionList} print={true} />}
    </Grid>
  );
}

export default Verify;