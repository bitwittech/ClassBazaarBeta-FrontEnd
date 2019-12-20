import { createContext } from 'react';

let initialState = {
  loginModal: false,
  token: localStorage.getItem('cbtoken')
    ? localStorage.getItem('cbtoken')
    : null,
  isAuth: false,
  loading: false,
  user: null,
  alerts: [],
};

const Store = createContext(initialState);

export default Store;
