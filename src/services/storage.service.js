import { userToken } from "../backend";

const TOKEN_KEY = userToken;
const USER = sessionStorage.getItem("user_name");

const REFRESH_TOKEN_KEY = "REACT_APP.REFRESH_TOKEN";

// All Token services goes here.
const TokenService = {
  //Return the token stored in sessionStorage.
  getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  },

  //Set the token in the sessionStorage.
  saveToken(accessToken) {
    sessionStorage.setItem(TOKEN_KEY, accessToken);
  },

  //Remove token from sessionStorage.
  removeToken() {
    sessionStorage.removeItem(TOKEN_KEY);
  },

  //Get the refresh token from sessionStorage.
  getRefreshToken() {
    return sessionStorage.getItem(REFRESH_TOKEN_KEY);
  },

  //Save the refresh token from sessionStorage.
  saveRefreshToken(refreshToken) {
    sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  //Remove the refresh token from sessionStorage.
  removeRefreshToken() {
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};

// Set the user according to the admin privileges.
const SetUser = {
  //Get the user from sessionStorage.
  getUser() {
    let user = sessionStorage.getItem(USER);
    return JSON.parse(user);
  },

  //Check whether the user is admin or not.
  isAdmin() {
    let user = this.getUser();
    return user != null ? user.role === "admin" : false;
  },

  //Save the user in the sessionStorage.
  saveUser(user) {
    sessionStorage.setItem(USER, JSON.stringify(user));
  },

  //Remove the user from sessionStorage.
  removeUser() {
    sessionStorage.removeItem(USER);
  },
};

// Check Login Status
const isLogin = () => {
  if (sessionStorage.getItem("user_name")) return true;
  return false;
};


export { TokenService, SetUser, isLogin };
