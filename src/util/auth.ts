import jwtDecode from 'jwt-decode';
import { GRAPHQL_TYPES } from '../constants';
import { IAuthResponse } from '../types';
import { isNullOrUndefined } from '../util/general';
import path from 'ramda/es/path';

const ID_TOKEN = 'dt65IdToken';
const ACCESS_TOKEN = 'dt65AccessToken';
const EXPIRES_IN = 'dt65ExpiresIn';

const logout = () => {
  localStorage.removeItem(ID_TOKEN);
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(EXPIRES_IN);
};
const getLocalUser = (idToken: string) => {
  if (!idToken) {
    return null;
  }
  try {
    const decoded: any = jwtDecode(idToken);

    return {
      __typename: GRAPHQL_TYPES.LOCAL_USER,
      id: decoded.sub,
      username: decoded.nickname,
    };
  } catch (error) {
    console.error(error);
    logout();
  }
};

const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(ACCESS_TOKEN);
  // if (isNullOrUndefined(token)) {
  //   return {
  //     valid: false,
  //     errorMessage: 'Käyttäjä ei ole kirjautunut sisään',
  //   };
  // }

  // const decoded = jwtDecode(token || '');

  // const expiration: number = path(['exp'], decoded) || 0;

  // if (expiration === 0) {
  //   return {
  //     valid: false,
  //     errorMessage: 'Väärä jwt token',
  //   };
  // }
  // if (expiration < Date.now() / 1000) {
  //   return {
  //     valid: false,
  //     errorMessage: 'Token vanhentunut',
  //   };
  // }
  // return {
  //   valid: true,
  // };
};

const login = (idToken: string, accessToken: string, expiresIn: number) => {
  localStorage.setItem(ID_TOKEN, JSON.stringify(idToken));
  localStorage.setItem(ACCESS_TOKEN, JSON.stringify(accessToken));
  localStorage.setItem(EXPIRES_IN, JSON.stringify(expiresIn));
};

const getAccessToken = () => {
  const value = localStorage.getItem(ACCESS_TOKEN);
  if (value) {
    return JSON.parse(value);
  }
  return null;
};
const getIdToken = () => {
  const value = localStorage.getItem(ID_TOKEN);
  if (value) {
    return JSON.parse(value);
  }
  return null;
};

export {
  login,
  logout,
  getAccessToken,
  getIdToken,
  getLocalUser,
  isAuthenticated,
};
