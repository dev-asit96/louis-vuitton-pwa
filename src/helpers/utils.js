export const formatNumber = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
};

//Return the user data from the session storage
export const getUserFromSession = () => {
  const userStr = sessionStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  else return null;
};

//Return the token from the session storage
export const getTokenFromSession = () => {
  return sessionStorage.getItem("token") || null;
};

// remove the token and user from the session storage
export const removeUserFromSession = () => {
  sessionStorage.removeItem("user");
};

// set the token and user from the session storage
export const setUserSession = (token, user) => {
  sessionStorage.setItem("user", JSON.stringify(user));
};
