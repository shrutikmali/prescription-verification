import React, { useState } from 'react';
import { Grid, Button, TextField } from '@mui/material';
import { signIn, signUp } from '../api/api';

const inputStyle = {
  marginTop: '15px',
};

const buttonStyle = {
  marginTop: '15px',
}

const Prescriber = () => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }
  const authenticate = async () => {
    await signUp(credentials)
    .then(result =>{
      if(result.status === 200) {
        console.log('Success');
      }
    })
    .catch(error => console.log(error.response));
  }

  return (
    <Grid container>
      <Grid item xs={12} align='center' style={{margin: '20px 0px'}}>
        <p>Sign Up</p>
      </Grid>
      <Grid item xs={12} align='center'>
        <TextField variant='filled' name='name' label='Name' style={inputStyle} value={credentials.name} onChange={handleChange} />
      </Grid>
      <Grid item xs={12} align='center'>
        <TextField variant='filled' name='email' label='Email' style={inputStyle} value={credentials.email} onChange={handleChange} />
      </Grid>
      <Grid item xs={12} align='center'>
        <TextField variant='filled' name='password' value={credentials.password} label='Password' type='password' style={inputStyle} onChange={handleChange}/>
      </Grid>
      <Grid item xs={12} align='center'>
        <Button variant='contained' style={buttonStyle} onClick={authenticate}>Sign Up</Button>
      </Grid>
    </Grid>
  )
}

export default Prescriber;