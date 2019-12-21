import {
  ALERT,
  LOGIN,
  LOADING,
  REMOVE_TOKEN,
  FETCH_USER,
  LOGOUT,
  LOGIN_MODAL,
  UPDATE_BOOKMARK,
} from '../store/Types';

import config from '../config.json';
import localForage from 'localforage';

const {
  FusionAuthClient
} = require('@fusionauth/node-client');

const {
  API,
  API_NGROK,
  API_LOCAL,
  fusionAuthURL
} = config;

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
      .then(response => {
        console.log(response);
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

export const addBookmark = async (uuid, userId, user, provider, dispatch) => {
  console.log(uuid, userId, user, provider);

  //check if it is already there if then remove and dispatch update
  //else add and dispatch updated
  const presentCheck = () => {
    if (user.data.bookmarks.find(e => uuid === e.id) === undefined) return false
    else
      return true
  }
  const isPresentAlready = presentCheck()

  console.log(isPresentAlready)

  const updateData = async (newBookmarks) => {
    try {
      const patchedData = await client.patchUser(
        userId, {
          user: {
            data: {
              ...user.data,
              bookmarks: newBookmarks
            }
          }
        }
      )
      console.log(patchedData)
      console.log("DISPATCHING DATA", patchedData.successResponse.user.data.bookmarks)


      dispatch({
        type: UPDATE_BOOKMARK,
        payload: patchedData.successResponse.user.data.bookmarks
      })

    } catch (error) {
      dispatch({
        type: ALERT,
        payload: {
          varient: 'error',
          message: 'Could not bookmark.',
        },
      });
    }
  }

  if (isPresentAlready) {
    const newBookmarks = user.data.bookmarks.filter(e => e.id !== uuid)
    console.log("ALREADY PRESENT", newBookmarks)
    await updateData(newBookmarks)
  } else {
    const oldBookmarks = user.data.bookmarks
    console.log("oldBookmarks", oldBookmarks)

    const newBookmarks = [...oldBookmarks, {
      id: uuid,
      provider
    }]
    console.log("NEW ADDED", newBookmarks)
    await updateData(newBookmarks)
  }



};