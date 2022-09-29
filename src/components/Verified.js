import React, { useContext } from 'react';
import { register, signin } from '../actions/ContextActions';
import { withRouter } from 'react-router';
import Store from '../store/Context';
import {welcome} from '../service/commonService'

const Verified = withRouter(({ history }) => {
  const { state, dispatch } = useContext(Store);

  const autoSingin = async () => {
    let data = history.location.search.split('&');

    data = {
      email_address: data[0].split('=')[1],
      password: data[1].split('=')[1],
    };

    welcome(data.email_address)
    await signin(data, dispatch);
    
    return history.push('/');
  };

  return (
    <>
      <h1>Redirecting</h1>
      {autoSingin()}
    </>
  );
});

export default Verified;
