// Creating cookies
export const createCookie = (name, value, days) => {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

// Get the cookies
export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};

// Clear all the cookies
export const clearCookie = () => {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
};

// Erase Particular Cookies
export const eraseParticularCookie = (name) => {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

// Load Cookie data to session storage before the page load.
export const loadDataFromCookieToSession = () => {
  if (getCookie("user_name")) {
    var user_name = getCookie("user_name");
    var user_number = getCookie("user_number");
    var token = getCookie("token");

    // Load all the data to the session.
    sessionStorage.setItem("user_name", user_name);
    sessionStorage.setItem("user_number", user_number);
    sessionStorage.setItem("token", token);
  }
};
