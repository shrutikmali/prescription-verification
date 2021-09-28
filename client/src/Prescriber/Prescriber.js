import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import './prescriber.css';
import Header from '../Header';
import { createPrescription } from '../api/api';

const Prescriber = () => {

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [patientName, setPatientName] = useState('');
  const [prescriberKey, setPrescriberKey] = useState('');
  const [ID, setID] = useState(1);
  const defaultPrescription = {
    id: ID,
    medicineName: '',
    duration: '',
    timeOfConsumption: '',
  };
  const [date, setDate] = useState('1 Jan 2001');
  const [prescriptionList, setPrescriptionList] = useState([]);
  const [newPrescription, setNewPrescription] = useState(defaultPrescription);
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState(-1);



  useEffect(() => {
    const currDate = new Date();
    setDate(`${currDate.getDate()} ${months[currDate.getMonth() - 1]} ${currDate.getFullYear()}`)
  }, []);

  const addPrescription = () => {
    setPrescriptionList([...prescriptionList, newPrescription]);
    setNewPrescription({
      id: ID + 1,
      medicineName: '',
      duration: '',
      timeOfConsumption: '',
    });
    setID(ID + 1);
  }

  const editPrescription = (id) => {
    setEdit(true);
    setNewPrescription(prescriptionList[id-1]);
    setEditID(id)
  }

  const savePrescription = () => {
    prescriptionList[editID-1] = newPrescription;
    setPrescriptionList([...prescriptionList]);
    setNewPrescription({
      id: ID,
      medicineName: '',
      duration: '',
      timeOfConsumption: '',
    });
    setEditID(-1);
    setEdit(false);
  }

  const handleChange = (e) => {
    setNewPrescription({...newPrescription, [e.target.name]: e.target.value});
  }

  const generatePrescription = async () => {
    if(prescriptionList.length === 0) {
      alert('Cannot create empty prescription');
      return;
    }
    await createPrescription(prescriberKey)
    .then(result => {
      if(result.status === 200) {
        // alert('Prescription created');
        console.log(result);
        // Redirect to print (maybe)
      }
    })
    .catch(error => {
      alert(error.response.status);
    })
  }

  return (
    <Grid container>
      <Header date={date} patientName={patientName} setPatientName={setPatientName} prescriberKey={prescriberKey} setPrescriberKey={setPrescriberKey} />
      <Grid item style={{marginTop:'30px'}} xs={12} align='center'>
        <Grid item xs={10}>
          <TableContainer style={{marginBottom: '30px'}} component={Paper}>
            <Table>
              <TableRow>
                <TableCell align='center'><TextField label='Medicine Name' name='medicineName' value={newPrescription.medicineName} variant='outlined' onChange={handleChange} /></TableCell>
                <TableCell align='center'><TextField label='Duration' name='duration' value={newPrescription.duration} variant='outlined' onChange={handleChange} /></TableCell>
                <TableCell align='center'><TextField label='Time of Consumption' name='timeOfConsumption' value={newPrescription.timeOfConsumption} variant='outlined' onChange={handleChange} /></TableCell>
                <TableCell align='center'><Button variant='contained' onClick={edit ? savePrescription : addPrescription}>{edit ? 'Save' : 'Add'}</Button></TableCell>
              </TableRow>
            </Table>
          </TableContainer>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow style={{backgroundColor: 'lightgrey'}}>
                  <TableCell align='center'>Sr. No</TableCell>
                  <TableCell align='center'>Medicine Name</TableCell>
                  <TableCell align='center'>Duration</TableCell>
                  <TableCell align='center'>Time of Consumption</TableCell>
                  <TableCell align='center'></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prescriptionList.map(prescription => (
                  <TableRow key={prescription.id}>
                    <TableCell align='center'>{prescription.id}</TableCell>
                    <TableCell align='center'>{prescription.medicineName}</TableCell>
                    <TableCell align='center'>{prescription.duration}</TableCell>
                    <TableCell align='center'>{prescription.timeOfConsumption}</TableCell>
                    <TableCell align='center'><Button onClick={() => editPrescription(prescription.id)}>Edit</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Grid item align='center' xs={12} style={{marginTop: '50px'}} onClick={generatePrescription}>
        <Button variant='contained'>Generate Prescription</Button>
      </Grid>
    </Grid>
  )
}

export default Prescriber;