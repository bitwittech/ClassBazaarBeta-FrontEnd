import { createContext } from 'react';

let initialState = {
  loginModal: {
    state: 0,
    open: false,
  },
  preLogBox: {
    state: 0,
    open: false,
  },
  edubukFrom: {
    state: 0,
    open: false,
  },
  token: localStorage.getItem('cbtoken')
    ? localStorage.getItem('cbtoken')
    : null,
  isAuth: false,
  loading: false,
  user: null,
  alerts: [],
};

const UserTrack = createContext();

const Store = createContext(initialState);

export default Store;
export { UserTrack };
