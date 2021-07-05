import axios from 'axios';
import {
  basicAuthUserName,
  basicAuthUserPassword,
  SignupAPI,
} from '../backend';

//Config method for Axios
let config = {
  
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
};

export const signUp = (user) => {
  console.log(user);
  return axios
    .post(`${SignupAPI}`, user, config)
    .then((response) => {
      return response;
    })
    .then((data) => {
      return data.data;
    });
};

export const logout = (user) => {
  return fetch(`${SignupAPI}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
