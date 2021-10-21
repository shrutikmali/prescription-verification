import React, { useState } from 'react';
import { Grid, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";


const PrescriptionTable = ({ prescriptionList, setPrescriptionList, print, validity }) => {

  class Prescription {
    constructor(id, medicineName, dose, timeOfConsumption) {
      this.id = id;
      this.medicineName = medicineName;
      this.dose = dose;
      this.timeOfConsumption = timeOfConsumption;
      this.isVisible = true;
    }
  }
  const [prescription, setPrescription] = useState({
    medicineName: '',
    dose: '',
    timeOfConsumption: '',
    isVisible: true,
  });
  const [editID, setEditID] = useState(-1);

  const handleChange = (e) => {
    setPrescription({...prescription, [e.target.name]: e.target.value});
  }

  const savePrescription = () => {
    if(editID !== -1) {
      prescriptionList[editID].medicineName = prescription.medicineName;
      prescriptionList[editID].dose = prescription.dose;
      prescriptionList[editID].timeOfConsumption = prescription.timeOfConsumption;
      setEditID(-1);
    }
    else {
      const newPrescription = new Prescription();
      newPrescription.medicineName = prescription.medicineName;
      newPrescription.dose = prescription.dose
      newPrescription.timeOfConsumption = prescription.timeOfConsumption;
      newPrescription.id = prescriptionList.length;
      newPrescription.isVisible = true;
      setPrescriptionList([...prescriptionList, newPrescription]);
      document.getElementsByName("medicineName")[0].focus();
    }
    setPrescription({
      medicineName: '',
      dose: '',
      timeOfConsumption: '',
      isVisible: true,
    });
  }

  const editPrescription = (id) => {
    const toEdit = prescriptionList[id];
    setPrescription(toEdit);
    setEditID(id);
  }


  return (
    <Grid container>
        {!print && <Grid item xs={12} md={3} align="center">
          <TextField label="Medicine Name" name="medicineName" value={prescription.medicineName} onChange={handleChange} />
        </Grid>}
        {!print && <Grid item xs={12} md={3} align="center">
          <TextField label="Dose" name="dose" value={prescription.dose} onChange={handleChange} />
        </Grid>}
        {!print && <Grid item xs={12} md={3} align="center">
          <TextField label="Time of Consumption" name="timeOfConsumption" value={prescription.timeOfConsumption} onChange={handleChange} />
        </Grid>}
        {!print && <Grid item xs={12} md={3} align="center">
          <Button variant="contained" onClick={savePrescription}>{editID === -1 ? "Add" : "Save"}</Button>
        </Grid>}
      <Grid item xs={12} align="center" style={{marginTop: '20px'}}>
        <Grid item xs={10} align="center">
        <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Sr. No.</TableCell>
                  <TableCell align="center">Medicine Name</TableCell>
                  <TableCell align="center">Dose</TableCell>
                  <TableCell align="center">Time of Consumption</TableCell>
                  {!print && <TableCell align="center">Edit</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {prescriptionList.map(prescription => (
                  <TableRow key={prescription.id}>
                    <TableCell align="center">{prescription.id+1}</TableCell>
                    <TableCell align="center">{prescription.medicineName}</TableCell>
                    <TableCell align="center">{prescription.dose}</TableCell>
                    <TableCell align="center">{prescription.timeOfConsumption}</TableCell>
                    {!print && <TableCell align="center"><Button onClick={() => editPrescription(prescription.id)}>Edit</Button></TableCell>}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PrescriptionTable;