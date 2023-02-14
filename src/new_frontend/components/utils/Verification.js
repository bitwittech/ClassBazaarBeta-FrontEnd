import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
// import Store from '../store/Context';
import { useDispatch } from 'react-redux';
import { welcome, newLogin } from '../services/services';
import { setAuth, setAlert } from '../../redux/action/action';

const Verified = withRouter(({ history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    autoSinging();
  }, []);

  async function autoSinging() {
    let data = history.location.search.split('&');

    data = {
      email_address: data[0].split('=')[1],
      password: data[1].split('=')[1],
    };

    await welcome(data.email_address);

    let response = await newLogin(data);

    if (response.status === 200) {
      dispatch(
        setAuth({
          isAuth: true,
          email: response.data.user.email_address,
          name: response.data.user.name,
          mobile_no: response.data.user.mobile_no,
          token: response.data.token,
        })
      );
      dispatch(
        setAlert({
          open: true,
          variant: 'success',
          message: response.message || 'Log In Successfully !!!',
        })
      );

      return history.push('/');
    } else {
      dispatch(
        setAlert({
          open: true,
          variant: 'error',
          message: response.message || 'User Not Found !!!',
        })
      );
    }
  }

  return (
    <>
      <h1>Redirecting....</h1>
    </>
  );
});

export default Verified;
