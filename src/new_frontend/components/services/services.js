import axios from 'axios';
const API = 'http://localhost:8080';

export async function getCourses(data) {
  var url = `${API}/api/v3/courses/?filter=${JSON.stringify(data)}`;
  return await axios.get(url);
}

export async function getCoursesDetails({ uuid, provider }) {
  var url = `${API}/api/course/?uuid=${uuid}&provider=${provider}`;
  return await axios.get(url);
}

export const newLogin = async (data) => {
  console.log(data);
  return await axios.post(API + '/api/loginJWT', data);
};

export const verifyToken = async (token) => {
  // console.log(data);
  return await axios.post(API + '/api/verifyToken', token);
};

//  Apis for resume and Carieer Page

export const submitResume = async (data) => {
  // console.log(data)
  return await axios.post(`${API}/api/meetUp`, data);
};

//  Apis for resume and Carieer Page

export const verifyEmail = async (data) => {
  console.log(data);
  return await axios.post(`${API}/api/verificationMail`, data);
};

// Welcome email APIs
export const welcome = async (data) => {
  console.log(data);
  return await axios.get(`${API}/api/welcome?email_address=${data}`);
};

// search
export const search = async (search) => {
  let response = await axios.get(`${API}/api/search?search=${search}`);
  return response;
};

export const newRegister = async (request) => {
  console.log(request);

  return await axios.post(API + '/api/newregistration', request);
};
