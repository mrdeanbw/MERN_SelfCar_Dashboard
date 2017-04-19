import Assigner from '../models/assigner';
import Student from '../models/student';
import request from '../util/request';
import { studentsUrl, projectsUrl, submitUrl, listSubmissionsUrl } from '../util/udacityHelpers';

import { getAuthToken } from '../util/request';
import {sendMail} from '../util/mailer';


export function getStudents(req, res) {
  // Get the udacity account token
  req.user.populate('accounts', (err, user) => {
    user.accounts.forEach(function(account) {
      //console.log(account);
      var credentials = {
        email: account.email,
        password: account.password
      }
      console.log("credentials");
      getAuthToken(credentials).then(token => {
        //console.log(token);
        //console.log(credential.email);
        //console.log(credentials.password);
        console.log("get student token");
        console.log(token);
        request(studentsUrl, {'Authorization' : token}).then(response => {
          // TODO: handle multiple accounts, currently return projects of first account only.
         // console.log(response);
          res.status(200).json({
            success: true,
            students: response
          });
        });
      })
    }, this);
  })
  
}
