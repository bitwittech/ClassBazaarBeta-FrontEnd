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

  try {
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
          varient: 'error',
          message: 'Registration failed'
        }
      })
    }
  } catch (error) {
    dispatch({
      type: ALERT,
      payload: {
        varient: 'error',
        message: 'Registration failed'
      }
    })
  }
};

export const signin = async (data, dispatch) => {
  dispatch({
    type: LOADING,
    payload: true
  })
  try {
    const loginCred = {
      username: data.username,
      password: data.password
    }
    const res = await axios.post(`${API}/login`, loginCred);
    console.log(res)
    dispatch({
      type: LOADING,
      payload: false
    })
    dispatch({
      type: ALERT,
      payload: {
        varient: 'success',
        message: 'Successfully logged in.'
      }
    })
  } catch (error) {
    dispatch({
      type: LOADING,
      payload: false
    })
    dispatch({
      type: ALERT,
      payload: {
        varient: 'error',
        message: 'Login failed'
      }
    })
  }
};