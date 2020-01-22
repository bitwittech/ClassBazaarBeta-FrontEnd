import {
  ALERT,
  FETCH_USER,
  LOADING,
  LOGIN,
  LOGIN_MODAL,
  LOGOUT,
  REMOVE_TOKEN,
  UPDATE_BOOKMARK,
} from '../store/Types';
import config from '../config.json';
import { store } from './../App';

const { FusionAuthClient } = require('@fusionauth/node-client');

const { API, API_NGROK, API_LOCAL, fusionAuthURL } = config;

let client = new FusionAuthClient(
  config.fusionAuthAPIKey,
  config.fusionAuthURL
);

export const googleLogin = async (data, dispatch) => {
  client
    .identityProviderLogin({
      applicationId: 'c8682dc3-adbc-4501-b707-9cde8c8ade0f',
      identityProviderId: '82339786-3dff-42a6-aac6-1f1ceecb6c46 ',
      data: {
        token: data.id_token,
        redirect_uri: 'https://www.classbazaar.com',
      },
    })
    .then(async resp => {
      if (resp.statusCode === 200) {
        const user = resp.successResponse.user;
        if (!user.username) {
          // Need to fetch details from google and update the user.
          await fetch(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${data.access_token}`
          )
            .then(resp => resp.json())
            .then(googleDetails => {
              user.name = googleDetails.name;
              user.username = googleDetails.email;
              updateUser('name', user.id, googleDetails.name);
              updateUser('username', user.id, googleDetails.email);
            })
            .catch(err => {
              console.error(err);
            });
        }
        store.setItem('user', user);
        dispatch({
          type: LOGIN,
          payload: {
            token: resp.successResponse.token,
            user,
          },
        });
      }
    });
};

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
          console.log(response);
          dispatch({
            type: ALERT,
            payload: {
              varient: 'success',
              message: 'Registration successful. Please login',
            },
          });
          dispatch({
            type: LOGIN_MODAL,
            payload: false,
          });
        } else {
          dispatch({
            type: ALERT,
            payload: {
              varient: 'error',
              message: 'Registration failed',
            },
          });
          dispatch({
            type: LOGIN_MODAL,
            payload: false,
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
    dispatch({
      type: LOGIN_MODAL,
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
    dispatch({
      type: LOGIN_MODAL,
      payload: false,
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
      .then(async response => {
        console.log("LOGIN", response)
        if (response.statusCode === 200) {
          store.setItem('user', response.successResponse.user);

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
            message: 'Invalid credentials',
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

  //check for first time new user whose user.data in undefined
  if (user.data === undefined) {
    console.log('NEW USER');
    try {
      const res = await client.patchUser(userId, {
        user: {
          data: {
            bookmarks: [
              {
                id: uuid,
                provider,
              },
            ],
          },
        },
      });
      store.setItem('user', res.successResponse.user);
      dispatch({
        type: UPDATE_BOOKMARK,
        payload: res.successResponse.user.data.bookmarks,
      });
      console.log('ADDED DATA', res);
    } catch (error) {
      console.log(error);
    }
  } else {
    //already bookmarked?
    console.log('UUID', uuid);
    const isAlreadyPresent = user.data.bookmarks.find(e => e.id === uuid);
    console.log('PRESENT', isAlreadyPresent);

    if (isAlreadyPresent) {
      const newBookmarks = user.data.bookmarks.filter(e => e.id !== uuid);
      const res = await client.patchUser(userId, {
        user: {
          data: {
            bookmarks: newBookmarks,
          },
        },
      });
      console.log('ALREADY PRESENT', res);
      store.setItem('user', res.successResponse.user);
      dispatch({
        type: UPDATE_BOOKMARK,
        payload: res.successResponse.user.data.bookmarks,
      });
    } else {
      const res = await client.patchUser(userId, {
        user: {
          data: {
            bookmarks: [
              ...user.data.bookmarks,
              {
                id: uuid,
                provider,
              },
            ],
          },
        },
      });
      store.setItem('user', res.successResponse.user);
      dispatch({
        type: UPDATE_BOOKMARK,
        payload: res.successResponse.user.data.bookmarks,
      });
      console.log('NEW ADDED', res);
    }
  }
};

export const updateUser = async (type, userId, data) => {
  try {
    const patchedData = await client.patchUser(userId, {
      user: {
        [type]: data,
      },
    });
    console.log(patchedData);
    store.setItem('user', patchedData.successResponse.user);
    return {
      varient: 'success',
      message: 'Updated profile.',
    };
  } catch (error) {
    console.log(error);
    return {
      varient: 'error',
      message: 'Unable to update your profile.',
    };
  }
};

export const updateLocation = async (userId, data, user) => {
  try {
    const patchedData = await client.patchUser(userId, {
      user: {
        ...user,
        data: {
          ...user.data,
          location: data
        }
      },
    });
    console.log(patchedData)
    store.setItem('user', patchedData.successResponse.user);
    if (patchedData.statusCode === 200) {
      return {
        varient: 'success',
        message: 'Location Changed'
      }
    } else {
      return {
        varient: 'error',
        message: 'Unable to update location'
      }
    }
  } catch (error) {
    console.log(error)
    return {
      varient: 'error',
      message: 'Unable to update location'
    }
  }
}

export const updatePassword = async (curPass, newPass, email, userId) => {
  console.log(userId);
  try {
    const res = await client.retrieveRefreshTokens(
      '44a983ba-a135-414d-84d1-e9e33d24e097'
    );
  console.log(userId, email, newPass, curPass)
  try {

    // const res = await client.retrieveRefreshTokens('saran@gmail.com')
    // console.log("RT", res)
    const request = {
      currentPassword: curPass,
      loginId: email,
      password: newPass
    }
    const res = await client.changePasswordByIdentity(request)

    if (res.statusCode === 200) {
      return {
        varient: 'success',
        message: 'Password changed'
      }
    } else {
      return {
        varient: 'error',
        message: 'Invalid current password'
      }
    }

    console.log(res);
  } catch (error) {
    console.log(error)
    return {
      varient: 'error',
      message: 'Unable to update password'
    }
  }
};
