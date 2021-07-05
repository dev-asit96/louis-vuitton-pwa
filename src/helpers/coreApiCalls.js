import axios from 'axios';
import { API, basicAuthUserName, basicAuthUserPassword } from '../backend';

//Config method for Axios
let config = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
};

// Fetch products from the getProducts API.
export async function getProducts() {
  return axios.get(`${API}`, config).then(function (res) {
    console.log(res);
    return res;
  });
}
