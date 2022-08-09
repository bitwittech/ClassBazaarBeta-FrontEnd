import React, {useContext} from 'react'
import {
    register,
    signin,
  } from '../actions/ContextActions';
  import { withRouter } from 'react-router';
  import Store from '../store/Context';



const Verified =  withRouter (
  ({ history }) =>  {
    const { state, dispatch } = useContext(Store);

    const autoSingin = async () =>{
      let data = history.location.search.split('&')
      
      data = {
        email_address : data[0].split('=')[1],
        password :  data[1].split('=')[1]
      }

      await signin(data,dispatch);

      history.push('/')
    }

    return (
      <>
    <h1>Redirecting</h1>
      {autoSingin()}
</>
  )
})

export default Verified;
