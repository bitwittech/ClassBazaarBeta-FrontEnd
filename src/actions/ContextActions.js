import { ALERT, LOADING } from '../store/Types';

import axios from 'axios';
import config from '../config.json';

const { API, API_NGROK, API_LOCAL } = config;

export const register = async (data, dispatch) => {
  dispatch({
    type: LOADING,
    payload: true,
  });

  try {
    const res = await axios.post(`${API}/register`, data);
    console.log(res);
    dispatch({
      type: LOADING,
      payload: false,
    });
    if (res.status === 200) {
      dispatch({
        type: ALERT,
        payload: {
          varient: 'success',
          message: 'Successfully registered.',
        },
      });
    } else {
      dispatch({
        type: ALERT,
        payload: {
          varient: 'error',
          message: 'Registration failed',
        },
      });
    }
  } catch (error) {
    dispatch({
      type: LOADING,
      payload: false,
    });
    dispatch({
      type: ALERT,
      payload: {
        varient: 'error',
        message: 'Registration failed',
      },
    });
  }
};

export const signin = async (data, dispatch) => {
  dispatch({
    type: LOADING,
    payload: true,
  });
  try {
    let loginCred = {
      username: data.email,
      password: data.password,
    };

    loginCred = {
      username: 'chaks4@gmail.com',
      password: 'pass4',
    };

    // const res = await axios.post(`${API}/login`, loginCred);
    const postData = {
      username: 'chaks4@gmail.com',
      password: 'pass4',
    };
    const body = Object.keys(postData)
      .map(key => {
        return (
          encodeURIComponent(key) + '=' + encodeURIComponent(postData[key])
        );
      })
      .join('&');

    var url = `${API}/login`;
    await fetch(url, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    dispatch({
      type: LOADING,
      payload: false,
    });
    dispatch({
      type: ALERT,
      payload: {
        varient: 'success',
        message: 'Successfully logged in.',
      },
    });
  } catch (error) {
    dispatch({
      type: LOADING,
      payload: false,
    });
    dispatch({
      type: ALERT,
      payload: {
        varient: 'error',
        message: 'Login failed',
      },
    });
  }
};
