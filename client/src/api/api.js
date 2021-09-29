import axios from 'axios';

const URL = 'http://localhost:5000'

export const checkPrescriberKey = (prescriberKey) => axios.post(`${URL}/check`, {prescriberKey});
export const createPrescription = (prescriberKey) => axios.post(`${URL}/create`, {prescriberKey});
export const signIn = (credentials) => axios.post(`${URL}/signin`, credentials);
export const signUp = (credentials) => axios.post(`${URL}/signup`, credentials);
export const getOTP = (email, password) => axios.post(`${URL}/getotp`, {email: email, password: password});
export const verifyOTP = (email, otp) => axios.post(`${URL}/verifyotp`, {email: email, otp: otp});