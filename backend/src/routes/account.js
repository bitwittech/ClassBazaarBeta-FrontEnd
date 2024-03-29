/**
 * Copyright © 2016-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* @flow */

import { Router } from 'express';
import URL from 'url';
import db from './../db';
import passport from 'passport';
import validator from 'validator';
var bcrypt = require('bcryptjs');

const router = new Router();

// External login providers. Also see src/passport.js.
const loginProviders = [
  {
    // https://developers.facebook.com/docs/facebook-login/permissions/
    provider: 'facebook',
    options: { scope: ['public_profile', 'email'] },
  },
  {
    provider: 'google',
    options: {
      scope: 'profile email',
      accessType: 'offline',
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    },
  },
  {
    provider: 'twitter',
    options: {},
  },
];

// '/about' => ''
// http://localhost:3000/some/page => http://localhost:3000
function getOrigin(url: string) {
  if (!url || url.startsWith('/')) return '';
  return (x => `${String(x.protocol)}//${String(x.host)}`)(URL.parse(url));
}

// '/about' => `true` (all relative URL paths are allowed)
// 'http://localhost:3000/about' => `true` (but only if its origin is whitelisted)
function isValidReturnURL(url: string) {
  if (url.startsWith('/')) return true;
  const whitelist = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',')
    : [];
  return (
    validator.isURL(url, {
      require_tld: false,
      require_protocol: true,
      protocols: ['http', 'https'],
    }) && whitelist.s(getOrigin(url))
  );
}

// Generates a URL for redirecting a user to upon successfull authentication.
// It is intended to support cross-domain authentication in development mode.
// For example, a user goes to http://localhost:3000/login (frontend) to sign in,
// then he's being redirected to http://localhost:8080/login/facebook (backend),
// Passport.js redirects the user to Facebook, which redirects the user back to
// http://localhost:8080/login/facebook/return and finally, user is being redirected
// to http://localhost:3000/?sessionID=xxx where front-end middleware can save that
// session ID into cookie (res.cookie.sid = req.query.sessionID).
function getSuccessRedirect(req) {
  const url = req.query.return || req.body.return || '/';
  if (!isValidReturnURL(url)) return '/';
  if (!getOrigin(url)) return url;
  var maxAge = 60 * 60 * 1000 * 1000;
  req.session.cookie.expires = new Date(Date.now() + maxAge);
  req.session.cookie.maxAge = hour;
  return `${url}${url.includes('?') ? '&' : '?'}sessionID=${req.cookies.sid}${
    maxAge ? `&maxAge=${maxAge}` : ''
  }`;
}

// Registers route handlers for the external login providers
loginProviders.forEach(({ provider, options }) => {
  router.get(
    `/login/${provider}`,
    (req, res, next) => {
      console.log(`Inside ${provider}`);

      req.session.returnTo = getSuccessRedirect(req);
      next();
    },
    passport.authenticate(provider, {
      failureFlash: true,
      prompt: 'select_account',
      ...options,
    }),
  );

  router.get(`/login/${provider}/return`, (req, res, next) =>
    passport.authenticate(provider, {
      successReturnToOrRedirect: true,
      failureFlash: true,
      failureRedirect: `${getOrigin(req.session.returnTo)}/login`,
    })(req, res, next),
  );
});

router.post(
  '/login',
  (req, res, next) => {
    console.log(req.sessionID);
    req.session.returnTo = getSuccessRedirect(req);
    next();
  },
  passport.authenticate('local', {
    failWithError: true,
  }),
  (req, res, next) => {
    console.log(req.sessionID);
    res.status(200).json({
      status: 'Login successful!',
      token: req.cookies.sid,
    });
  },
  (err, req, res, next) => {
    // Handle error
    return res.status(401).send({ success: false, message: err });
  },
);

router.post('/register', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);
  const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

  const user = {
    display_name: name,
    password_hash: hash,
  };

  db.table('users')
    .insert(user)
    .returning('id')
    .then(rows =>
      db
        .table('users')
        .where('id', '=', rows[0])
        .first()
        .then(u =>
          db
            .table('emails')
            .insert({
              user_id: u.id,
              email: email,
            })
            .then(() => u),
        ),
    )
    .then(r => {
      res.send({ statu: 'success' });
    });
});

// Remove the `user` object from the session. Example:
//   fetch('/login/clear', { method: 'POST', credentials: 'include' })
//     .then(() => window.location = '/')
router.post('/login/clear', (req, res) => {
  req.logout();
  res.status(200).send('OK');
});

// Allows to fetch the last login error(s) (which is usefull for single-page apps)
router.post('/login/error', (req, res) => {
  res.send({ errors: req.flash('error') });
});

export default router;
