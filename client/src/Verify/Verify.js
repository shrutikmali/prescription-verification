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
  const [prescriptionList, setPrescriptionList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const verify = async () => {
      await verifyPrescription(id)
      .then(result => {
        if(result.status === 200) {
          setPrescriptionList(result.data.prescriptionList)
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
      <Grid item xs={12} align='center' style={{marginTop: '20px'}}>
        {status === INVALID && <h3>Invalid prescription</h3>}
        {status === VALID && <h3>Prescription Verified</h3>}
      </Grid>
      {status === VALID && <PrescriptionTable prescriptionList={prescriptionList} print={true} />}
    </Grid>
  );
}

export default Verify;