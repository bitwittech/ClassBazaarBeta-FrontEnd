import {
  ALERT,
  FETCH_USER,
  LOADING,
  LOGIN,
  Pre_LOG_Box,
  LOGIN_MODAL,
  LOGOUT,
  REMOVE_TOKEN,
  UPDATE_BOOKMARK,
  EdubukFrom,
} from '../store/Types';
import ReactGA from 'react-ga';
import config from '../config.json';
import { store } from './../App';
import { trackEvent } from 'react-with-analytics/lib/utils';
import { newLogin, newregister, verifyToken, eduTest } from '../service/commonService';

const { FusionAuthClient } = require('@fusionauth/node-client');

const { API, API_NGROK, API_LOCAL, fusionAuthURL } = config;

let client = new FusionAuthClient(
  config.fusionAuthAPIKey,
  config.fusionAuthURL
);

export const facebookLogin = async (data, dispatch) => {
  console.log('>>>>>>', data);

  if (data.email !== undefined) {
    try {
      function handleResponse(clientResponse) {
        console.info(
          JSON.stringify(clientResponse.successResponse.user, null, 2)
        );
      }

      const userDataForReg = {
        user: {
          username: data.name,
          password: data.id,
          email: data.email,
          mobilePhone: data.phone,
        },
        registration: {
          applicationId: config.fusionAuthApplicationId,
        },
      };

      // yaha par feilds null jaa rahi thi 😃

      const newUserDataForReg = {
        userid: '',
        name: data.name,
        password: data.id,
        email_address: data.email,
        mobile_no: data.phone,
        gender: data.gender,
        school_or_college_name: data.school,
        class_year: data.classYear,
        city: data.city,
      };

      console.log({
        newUserDataForReg,
        userDataForReg,
      });

      newregister(undefined, newUserDataForReg);

      await client
        .register(undefined, userDataForReg)
        .then((response) => {
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
            if (localStorage.getItem('GA-track')) {
              trackEvent('SignUp', 'register', 'Bookmarked_account');
              localStorage.removeItem('GA-track');
            }
            if (localStorage.getItem('GA-track-review')) {
              trackEvent('SignUp', 'register', 'Review_account');
              localStorage.removeItem('GA-track-review');
            }
            trackEvent('SignUp', 'click', 'manually');
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
            dispatch({
              type: Pre_LOG_Box,
              payload: false,
            });
          }
        })
        // edited by Yashwant sahu
        .catch((e) => {
          localStorage.clear();
          console.error(
            '>>>>>>>>',
            Object.values(e.errorResponse.fieldErrors)[0][0].message
          );
          dispatch({
            type: ALERT,
            payload: {
              varient: 'error',
              message: Object.values(e.errorResponse.fieldErrors)[0][0].message,
            },
          });
        });
      dispatch({
        type: LOADING,
        payload: false,
      });
      dispatch({
        type: LOGIN_MODAL,
        payload: false,
      });
    } catch (errMsg) {
      dispatch({
        type: LOADING,
        payload: false,
      });
      // dispatch({
      //   type: ALERT,
      //   payload: {
      //     varient: 'error',
      //     message: "Invalid credentials",
      //   },
      // });
      dispatch({
        type: LOGIN_MODAL,
        payload: false,
      });
      dispatch({
        type: Pre_LOG_Box,
        payload: false,
      });
    }
  } else {
    dispatch({
      type: ALERT,
      payload: {
        varient: 'error',
        message:
          'Email is not provided by facebook. Please Sign-Up with our from. ',
      },
    });
  }

  // this for the identity provider in Fusion Auth
  // client
  //   .identityProviderLogin({
  //     applicationId: 'c8682dc3-adbc-4501-b707-9cde8c8ade0f',
  //     identityProviderId: '56abdcc7-8bd9-4321-9621-4e9bbebae494',
  //     data: {
  //       token: data.accessToken,
  //       redirect_uri: `${config.P_redirecturl}`,
  //     },
  //   })
  //   .then(resp => {
  //     console.log(resp)
  //     user = {
  //       ...resp.successResponse.user,
  //       username
  //     }
  //     store.setItem('user', user);
  //     dispatch({
  //       type: LOGIN,
  //       payload: {
  //         token: resp.successResponse.token,
  //         user,
  //       },
  //     });
  //     dispatch({
  //       type: ALERT,
  //       payload: {
  //         varient: 'success',
  //         message: 'Login successful',
  //       },
  //     });
  //     dispatch({
  //       type: LOGIN_MODAL,
  //       payload: false,
  //     });
  //   }).catch(err => {
  //     console.log(err)
  //     dispatch({
  //       type: ALERT,
  //       payload: {
  //         varient: 'error',
  //         message: 'Login failed',
  //       },
  //     });
  //   })
};
export const googleLogin = async (data, dispatch) => {
  client
    .identityProviderLogin({
      applicationId: 'c8682dc3-adbc-4501-b707-9cde8c8ade0f',
      identityProviderId: '82339786-3dff-42a6-aac6-1f1ceecb6c46 ',
      data: {
        token: data.tokenId,
        redirect_uri: `${config.D_redirecturl}`,
      },
    })
    .then(async (resp) => {
      console.log('Identity Provider Response ', resp);
      if (resp.statusCode === 200) {
        const user = resp.successResponse.user;
        if (!user.username) {
          // Need to fetch details from google and update the user.
          await fetch(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${data.access_token}`
          )
            .then((resp) => resp.json())
            .then((googleDetails) => {
              user.name = googleDetails.name;
              user.username = googleDetails.email;
              updateUser('name', user.id, googleDetails.name);
              updateUser('username', user.id, googleDetails.email);
            })
            .catch((err) => {
              console.error('ERROR', err);
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
        dispatch({
          type: ALERT,
          payload: {
            varient: 'success',
            message: 'Login successful',
          },
        });
        dispatch({
          type: LOGIN_MODAL,
          payload: false,
        });
      }
    })
    .catch((err) => console.log('+++++++', err));
};

export const register = async (data, dispatch) => {
  dispatch({
    type: LOADING,
    payload: true,
  });

  console.log(data);

  try {
    const newUserDataForReg = {
      userid: '',
      name: data.username,
      password: data.password,
      email_address: data.email.toLowerCase(),
      mobile_no: data.phone,
      gender: data.gender,
      school_or_college_name: data.school,
      class_year: data.classYear,
      city: data.city,
      eduTest: data.eduTest,
    };

    console.log('hello ');

    newregister(newUserDataForReg)
      .then((response) => {
        console.log('Response', response);
        if (response.status === 200) {
          localStorage.setItem('flag', 1);
          console.log(response);
          dispatch({
            type: ALERT,
            payload: {
              varient: 'success',
              message: response.data.message,
            },
          });
          if (localStorage.getItem('GA-track')) {
            trackEvent('SignUp', 'register', 'Bookmarked_account');
            localStorage.removeItem('GA-track');
          }
          if (localStorage.getItem('GA-track-review')) {
            trackEvent('SignUp', 'register', 'Review_account');
            localStorage.removeItem('GA-track-review');
          }
          trackEvent('SignUp', 'click', 'manually');
          dispatch({
            type: LOGIN_MODAL,
            payload: false,
          });
        } else {
          localStorage.clear();
          dispatch({
            type: ALERT,
            payload: {
              varient: 'error',
              message: response.data.message,
            },
          });
          dispatch({
            type: LOGIN_MODAL,
            payload: false,
          });
        }
      })
      // edited by Yashwant sahu
      .catch((e) => {
        localStorage.clear();
        localStorage.removeItem('flag');
        dispatch({
          type: ALERT,
          payload: {
            varient: 'error',
            message: Object.values(e.errorResponse.fieldErrors)[0][0].message,
          },
        });
      });
    dispatch({
      type: LOADING,
      payload: false,
    });
    dispatch({
      type: LOGIN_MODAL,
      payload: false,
    });
  } catch (errMsg) {
    dispatch({
      type: LOADING,
      payload: false,
    });
  }
};

export const updateEDUData = async (data, dispatch) => {
  dispatch({
    type: LOADING,
    payload: true,
  });

  let password;

  console.log(data);

  store.getItem('clientSecret').then((res) => {
    password = res;
    console.log('>>>', password);
  });

  store.getItem('user').then((res) => {
    try {
      console.log(res);

      const newUserDataForReg = {
        userid: '',
        name: res.name,
        email_address: res.email_address,
        mobile_no: res.mobile_no,
        gender: data.gender,
        school_or_college_name: data.school,
        class_year: data.classYear,
        city: data.city,
        password: password,
        eduTest: true,
      };

      console.log({
        newUserDataForReg,
      });

      newregister(newUserDataForReg);
      eduTest(undefined,newUserDataForReg)

      dispatch({
        type: LOADING,
        payload: false,
      });
      dispatch({
        type: EdubukFrom,
        payload: false,
      });
    } catch (errMsg) {
      dispatch({
        type: LOADING,
        payload: false,
      });
      dispatch({
        type: ALERT,
        payload: {
          varient: 'error',
          message: 'Invalid credentials',
        },
      });
      dispatch({
        type: EdubukFrom,
        payload: false,
      });
    }
  });
};

export const signin = async (data, dispatch) => {
  // newLogin(data);

  dispatch({
    type: LOADING,
    payload: true,
  });
  console.log(data);

  let password = data.password;
  if (password === undefined) {
    password = data.id;
  }
  try {
    newLogin(data)
      .then(async (response) => {
        if (response.status === 200) {
          localStorage.setItem('user', data.email);

          store.setItem('user', response.data.user);
          store.setItem('clientSecret', password);
          store.setItem('newUserLogin', response.data.user);
          localStorage.setItem(
            'newLogin',
            JSON.parse(JSON.stringify(response.data.user))
          );
          // ReactGA.set({
          //   userId: response.successResponse.user.id,
          // });
          dispatch({
            type: LOGIN,
            payload: {
              token: response.data.token,
              user: response.data.user,
            },
          });
          dispatch({
            type: ALERT,
            payload: {
              varient: 'success',
              message: 'Successfully logged in.',
            },
          });
          trackEvent('Login', 'click', 'manually');
          dispatch({
            type: LOGIN_MODAL,
            payload: false,
          });

          data.eduTest && eduTest(undefined,response.data.user);
          return 0;
        }
      })
      .catch((e) => {
        console.log(e);
        dispatch({
          type: ALERT,
          payload: {
            varient: 'error',
            message: 'Invalid credentials',
          },
        });
        return 0;
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

// export const fetchUser = async (token, dispatch) => {
//   console.log('hey');
//   try {
//     const res = await client.retrieveUserUsingJWT(token);
//     console.log('USER', res.successResponse.user.id);
//     ReactGA.set({
//       userId: res.successResponse.user.id,
//     });
//     dispatch({
//       type: FETCH_USER,
//       payload: res.successResponse.user,
//     });
//   } catch (error) {
//     dispatch({
//       type: REMOVE_TOKEN,
//     });
//   }
// };
export const fetchUser = async (token, dispatch) => {
  console.log('hey');
  try {
    verifyToken({ token: token }).then((data) => {
      console.log(data);
      dispatch({
        type: FETCH_USER,
        payload: data.data.user,
      });
    });
    // console.log('USER', res.successResponse.user.id);
    // ReactGA.set({
    //   userId: res.successResponse.user.id,
    // });
  } catch (error) {
    dispatch({
      type: REMOVE_TOKEN,
    });
  }
};

export const logout = async (dispatch) => {
  localStorage.clear();
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

export const addBookmark = async (
  uuid,
  userId,
  user,
  provider,
  dispatch,
  fromWhere
) => {
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
    const isAlreadyPresent = user.data.bookmarks.find((e) => e.id === uuid);
    console.log('PRESENT', isAlreadyPresent);

    if (isAlreadyPresent) {
      if (fromWhere === 'listing') {
        trackEvent('Profile Action', 'click', 'Unbookmarked_listing');
      }
      if (fromWhere === 'profile') {
        trackEvent('Profile Action', 'click', 'Unbookmarked_profile');
      }
      const newBookmarks = user.data.bookmarks.filter((e) => e.id !== uuid);
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
          location: data,
        },
      },
    });
    console.log(patchedData);
    store.setItem('user', patchedData.successResponse.user);
    if (patchedData.statusCode === 200) {
      return {
        varient: 'success',
        message: 'Location Changed',
      };
    } else {
      return {
        varient: 'error',
        message: 'Unable to update location',
      };
    }
  } catch (error) {
    console.log(error);
    return {
      varient: 'error',
      message: 'Unable to update location',
    };
  }
};

export const updatePassword = async (curPass, newPass, email, userId) => {
  console.log(userId);
  try {
    // const res = await client.retrieveRefreshTokens(
    //   '44a983ba-a135-414d-84d1-e9e33d24e097'
    // );
    console.log(userId, email, newPass, curPass);
    // const res = await client.retrieveRefreshTokens('saran@gmail.com')
    // console.log("RT", res)
    const request = {
      currentPassword: curPass,
      loginId: email,
      password: newPass,
    };
    const res = await client.changePasswordByIdentity(request);

    if (res.statusCode === 200) {
      return {
        varient: 'success',
        message: 'Password changed',
      };
    } else {
      return {
        varient: 'error',
        message: 'Invalid current password',
      };
    }

    console.log(res);
  } catch (error) {
    console.log(error);
    return {
      varient: 'error',
      message: 'Unable to update password',
    };
  }
};
