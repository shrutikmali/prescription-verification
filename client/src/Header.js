import React from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { checkPrescriberKey as check } from './api/api';

const Header = ({ date, patientName, setPatientName, prescriberKey, setPrescriberKey }) => {

  const handleNameChange = (e) => {
    setPatientName(e.target.value);
  }

  const handleKeyChange = (e) => {
    setPrescriberKey(e.target.value);
  }

  const checkPrescriberKey = async () => {
    await check(prescriberKey)
    .then(e => {
      if(e.status === 200) {
        console.log('Key verified')
      }
    })
    .catch(error => {
      alert(`Incorrect key. Error code: ${error.response.status}`);
    });
  }

  return (
    <Grid container>
      <Grid item xs={12} style={{paddingLeft: '15%', paddingTop: '2%'}}>
        <p>Date: {date}</p>
      </Grid>
      <Grid item container xs={12} style={{paddingLeft: '15%', paddingTop: '2%'}} justifyContent='space-between'>
        <Grid item>
          <TextField variant='outlined' label='Patient Name' name='patientName' value={patientName} onChange={handleNameChange} />
        </Grid>
        <Grid item style={{paddingRight: '15%'}}>
          <TextField variant='outlined' label='Prescriber Key' name={prescriberKey} value={prescriberKey} onChange={handleKeyChange} />
          <Button variant='contained' style={{marginLeft: '15px', marginTop: '8px'}} onClick={checkPrescriberKey}>Check</Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Header;