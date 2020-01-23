import FusionAuthClient from './fusionAuth/FusionAuthClient';
import {
  JSO
} from 'jso';
import config from '../config.json';

let client = new FusionAuthClient(
  config.fusionAuthAPIKey,
  config.fusionAuthURL
);

const googleClient = new JSO({
  providerId: 'google',
  client_id: '1032915653860-hhc7nbhp4shg5j0a0i9tk5ru61ksad1j.apps.googleusercontent.com',
  redirect_uri: 'http://localhost:3000', // The URL where you is redirected back, and where you perform run the callback() function.
  authorization: 'https://accounts.google.com/o/oauth2/auth',
  scopes: {
    request: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/user.phonenumbers.read',
      'https://www.googleapis.com/auth/user.birthday.read',
    ],
  },
  debug: true,
});

googleClient.callback();


const facebookClient = new JSO({
  providerId: 'facebook',
  client_id: '2818294571521012',
  redirect_uri: 'http://localhost:3000/', // The URL where you is redirected back, and where you perform run the callback() function.
  authorization: 'https://www.facebook.com/v5.0/dialog/oauth',
  scopes: {
    request: ['email'],
  },
  response_type: 'id_token token',
  debug: true,
})

facebookClient.callback();

export {
  googleClient,
  facebookClient
};