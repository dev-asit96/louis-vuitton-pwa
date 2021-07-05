import { basicAuthUserName, basicAuthUserPassword, LoginAPI } from "../backend";
import axios from "axios";

//Config method for Axios
let config = {
  
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  },
};

export const signIn = (user) => {
  return axios
    .post(`${LoginAPI}`, user, config)
    .then((response) => {
      return response;
    })
    .then((data) => {
      return data;
    });
};
