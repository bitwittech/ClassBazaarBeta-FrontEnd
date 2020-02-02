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
  client_id: `${config.GOAUTH}`,
  redirect_uri: `${config.D_redirecturl}`, // The URL where you is redirected back, and where you perform run the callback() function.
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

export {
  googleClient
};