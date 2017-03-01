const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../config');
import map from 'lodash/map';

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim()
  };

  // find a user by email address
  return User.findOne({ email: userData.email })
    .populate('roles')
    .exec((err, user) => {
      if (err) { return done(err); }

      if (!user) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';

        return done(error);
      }

      // check if a hashed user's password is equal to a value saved in the database
      return user.comparePassword(userData.password, (passwordErr, isMatch) => {
        if (err) { return done(err); }

        if (!isMatch) {
          const error = new Error('Incorrect email or password');
          error.name = 'IncorrectCredentialsError';

          return done(error);
        }

        const payload = {
          sub: user._id,
          name: user.name,
          roles: user.roles ? map(user.roles, 'name') : []
        };

        // create a token string
        const token = jwt.sign(payload, config.default.jwtSecret);
        const data = {
          name: user.name,
          roles: user.roles ? map(user.roles, 'name') : []
        };

        return done(null, token, data);
      });
  });
});