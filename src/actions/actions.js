import axios from 'axios';
import config from '../config.json';
import {
  LOADING,
  ALERT
} from '../store/Types'

const {
  API
} = config;

export const register = async (data, dispatch) => {
  dispatch({
    type: LOADING,
    payload: true
  })

  const res = await axios.post(`${API}/register`, data);
  console.log(res)
  dispatch({
    type: LOADING,
    payload: false
  })
  if (res.status === 200) {
    dispatch({
      type: ALERT,
      payload: {
        varient: 'success',
        message: 'Successfully registered.'
      }
    })
  } else {
    dispatch({
      type: ALERT,
      payload: {
        varient: 'danger',
        message: 'Registration failed'
      }
    })
  }
};

export const signin = (data, dispatch) => {
  console.log(data);
  console.log(dispatch);
};