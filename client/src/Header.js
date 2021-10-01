import React from 'react';
import { Grid, TextField } from '@mui/material';


const Header = ({ date, patientName, setPatientName }) => {
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  return (
    <Grid container>
      <Grid item xs={12} style={{paddingLeft: '15%', paddingTop: '2%'}}>
        <p>Date: {date.getDate()} {MONTHS[date.getMonth()]} {date.getFullYear()}</p>
      </Grid>
      <Grid item xs={12} md={6} style={{marginTop: '30px', paddingLeft: '15%'}}>
        <TextField name="patientName" label="Patient Name" value={patientName} onChange={(e) => setPatientName(e.target.value)}/>
      </Grid>
    </Grid>
  )
}

export default Header;