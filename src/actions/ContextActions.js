import {
  ALERT,
  FETCH_USER,
  LOADING,
  LOGIN,
  LOGIN_MODAL,
  LOGOUT,
  REMOVE_TOKEN,
} from '../store/Types';

import config from '../config.json';
import localForage from 'localforage';

const { FusionAuthClient } = require('@fusionauth/node-client');

const { API, API_NGROK, API_LOCAL, fusionAuthURL } = config;

let client = new FusionAuthClient(
  config.fusionAuthAPIKey,
  config.fusionAuthURL
);

export const register = async (data, dispatch) => {
  dispatch({
    type: LOADING,
    payload: true,
  });

  try {
    function handleResponse(clientResponse) {
      console.info(
        JSON.stringify(clientResponse.successResponse.user, null, 2)
      );
    }

    const userDataForReg = {
      user: {
        username: data.username,
        password: data.password,
        email: data.email,
        mobilePhone: data.phone,
      },
      registration: {
        applicationId: config.fusionAuthApplicationId,
      },
    };

    console.log({
      userDataForReg,
      client,
    });

    await client
      .register(undefined, userDataForReg)
      .then(response => {
        console.log('Response', response);
        if (response.statusCode === 200) {
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
      })
      .catch(e => {
        console.error(e);
      });
    dispatch({
      type: LOADING,
      payload: false,
    });
  } catch (error) {
    console.log(error);
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
  testEmail();
  dispatch({
    type: LOADING,
    payload: true,
  });
  console.log(data);
  try {
    client
      .login({
        loginId: data.email,
        password: data.password,
      })
      .then(async response => {
        console.log(response.successResponse.user);
        data = {
          bookmarks: [{ id: 'balfjdhfierhjahfjdhfjd', provider: 'edx' }],
        };
        const udpatedUser = await client.patchUser(
          response.successResponse.user.id,
          { user: { data } }
        );
        console.log(udpatedUser);
        if (response.statusCode === 200) {
          dispatch({
            type: LOGIN,
            payload: {
              token: response.successResponse.token,
              user: response.successResponse.user,
            },
          });
          dispatch({
            type: ALERT,
            payload: {
              varient: 'success',
              message: 'Successfully logged in.',
            },
          });
          dispatch({
            type: LOGIN_MODAL,
            payload: false,
          });
        }
      })
      .catch(e => {
        console.log(e);
        dispatch({
          type: ALERT,
          payload: {
            varient: 'error',
            message: 'Login failed',
          },
        });
      });

    dispatch({
      type: LOADING,
      payload: false,
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

export const fetchUser = async (token, dispatch) => {
  console.log('hey');
  try {
    const res = await client.retrieveUserUsingJWT(token);

    dispatch({
      type: FETCH_USER,
      payload: res.successResponse.user,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_TOKEN,
    });
  }
};

export const logout = async dispatch => {
  dispatch({
    type: LOGOUT,
  });
  dispatch({
    type: ALERT,
    payload: {
      varient: 'success',
      message: 'Logged out successfully.',
    },
  });
};

export const updateData = async (userId, data) => {
  client.patchUser(userId, data, console.log);
};

const testEmail = () => {
  client.sendEmail(
    '21e0c3c2-d24b-4d0c-a19f-3ddc17688126',
    {
      bccAddresses: [],
      ccAddresses: ['chaks.gautam@gmail.com'],
      requestData: {
        paymentAmount: 42,
        message:
          'Thank you for purchasing the answer to the universe. We appreciate your business',
      },
      userIds: ['0ba3e0af-5a0c-4a37-b021-10e7ebb05108'],
    },
    e => {
      console.log(e);
    }
  );
};

// "fusionAuthURL": "http://auth.classbazaar.in",
// "fusionAuthURL": "http://139.59.46.103:9011/",
