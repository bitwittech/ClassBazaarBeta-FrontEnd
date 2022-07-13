import axios from 'axios';
import { store } from '../App';
import { API } from '../config.json';
import { LOGIN_MODAL } from '../store/Types';

const officialURL = 'https://api.classbazaar.com/';
const localURL = 'http://0.0.0.0:8080/';
export const eduTest = async (user, val) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    },
  };
  console.log(user, val);

  if (val.school_or_college_name !== null) {
    const url = `https://edubuk.co.in/mitest/User/loginApi?user_id=${user.id}&name=${val.name}&gender=${val.gender}&email_address=${val.email_address}&school_or_college_name=${val.school_or_college_name}&class_year=${val.class_year}&city=${val.city}&mobile_no=${val.mobile_no}&password=${val.password}`;
    //  const url = `https://edubuk.co.in/User/loginApi?user_id=${user.id}&name=${val.name}&gender=${val.gender}&email_address=${val.email_address}&school_or_college_name=${val.school_or_college_name}&class_year=${val.class_year}&city=${val.city}&mobile_no=${val.mobile_no}&password=${val.password}`;
    const res = await axios.get(url).then((res) => {
      console.log(res);
    });
    window.open(url, '_blank');
  } else {
    return false;
  }
};

export const newregister = async (request) => {
  console.log(request);

  if (request.eduTest === false) {
    return await axios.post(API + '/api/newregistration', request);
  }

  await axios.post(API + '/api/newregistration', request);

  var emailVal = request.email_address;
  await axios
    .post(API + '/api/newLoginDetails', { email: emailVal })
    .then((res) => {
      console.log(res.data.data);
      store.setItem('newUserLogin', res.data.data);
      localStorage.setItem(
        'user',
        JSON.parse(JSON.stringify(res.data.data.email_address))
      );
      console.log('consoledata', res.data.data.email_address);

      // Edubuk commented by yashwant

      console.log('EDU DATA :: ', res.data.data);

      let val = res.data.data;

      if (val.school_or_college_name !== null) {
        var id = 'id' + Math.random().toString(16).slice(2);
        const url = `https://edubuk.co.in/mitest/User/loginApi?user_id=${id}&name=${val.name}&gender=${val.gender}&email_address=${val.email_address}&school_or_college_name=${val.school_or_college_name}&class_year=${val.class_year}&city=${val.city}&mobile_no=${val.mobile_no}&password=${val.password}`;
        window.open(url, '_blank');
      }
    });
};

export const newLogin = async (data) => {
  // console.log(data);

  return await axios.post(API + '/api/loginJWT', {
    email: data.email,
    password: data.password,
  });
};

export const verifyToken = async (token) => {
  // console.log(data);
  return await axios.post(API + '/api/verifyToken', token);
};

//  Apis for resume and Carieer Page

export const submitResume = async (data) => {
  // console.log(data)
  return await axios.post(`${officialURL}/api/meetUp`, data);
};
