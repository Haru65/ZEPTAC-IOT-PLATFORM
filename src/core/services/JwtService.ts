const ID_TOKEN_KEY = "id_token" as string;
const USER = "user" as string;

/**
 * @description get token form localStorage
 */
export const getToken = (): string | null => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

/**
 * @description save token into localStorage
 * @param token: string
 */

// cookie auth timeout
function setCookie(cname, cvalue) {
  const d = new Date();
  // 1 day timeout
  d.setTime(d.getTime() + cvalue * 24 * 60 * 60 * 1000);
  cvalue = d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + ";path=/";
}

// if time exceeds delete
export function deleteCookie(cname) {
  document.cookie = cname + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

// get cookie for check
export function getCookie(cname) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function checkCookie() {
  if (new Date(getCookie("Auth")) > new Date()) {
    return true;
  } else {
    return false;
  }
}

export const saveToken = (token: string): void => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};

export const saveUser = (user: string): void => {
  window.localStorage.setItem(USER, user);
  setCookie("Auth", 1);
};

// get id for CRUD operations
export const User = (): string | null => {
  return window.localStorage.getItem(USER);
};

export const destroyUser = (): void => {
  window.localStorage.removeItem(USER);
};

/**
 * @description remove token form localStorage
 */
export const destroyToken = (): void => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};

export default {
  getToken,
  saveToken,
  destroyToken,
  saveUser,
  destroyUser,
  User,
  getCookie,
  checkCookie,
  deleteCookie,
};
