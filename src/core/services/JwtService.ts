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

export const saveToken = (token: string): void => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};

export const saveUser = (user: string): void => {
  window.localStorage.setItem(USER, user);
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
};
