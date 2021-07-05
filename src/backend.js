/* Base API for all product Fetch */
export const API = process.env.REACT_APP_BASE_API;

/* Image API */
export const ImageAPI = process.env.REACT_APP_ImageAPI;

/* POST APIs */
export const CheckoutOrderInfo = process.env.REACT_APP_CheckoutOrderInfo;
export const CheckoutOrderDetails = process.env.REACT_APP_CheckoutOrderDetails;
export const GetOrderView = process.env.REACT_APP_GetOrderView;
export const GetOrderViewDetails = process.env.REACT_APP_GetOrderViewDetails;

/* Authentication APIs */
export const SignupAPI = process.env.REACT_APP_SignupAPI;
export const LoginAPI = process.env.REACT_APP_LoginAPI;

/* Token Keys */
export const userToken = sessionStorage.getItem('token');

/* Basic Authentication Info */
export const basicAuthUserName = process.env.REACT_APP_UserName;

export const basicAuthUserPassword = process.env.REACT_APP_Password;

/* Google Map API */
export const googleMapApiKey = process.env.REACT_APP_Map_API;
