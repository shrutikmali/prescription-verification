import axios from 'axios';

const URL = 'http://localhost:5000'

export const checkPrescriberKey = (prescriberKey) => axios.post(`${URL}/check`, {prescriberKey});
export const createPrescription = (prescriberKey) => axios.post(`${URL}/create`, {prescriberKey});