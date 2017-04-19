import fetch from 'isomorphic-fetch';
import Config from '../../server/config';

export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/api`) :
  '/api';

//export const API_URL = `http://localhost:${Config.port}`;

var CommonHeaders = { 'content-type': 'application/json' };

export default function callApi(endpoint, method = 'get', body) {
  //console.log(CommonHeaders);

  console.log(body);
  return fetch(`${API_URL}/${endpoint}`, {
    headers: CommonHeaders,
    method,
    body: JSON.stringify(body),
  })
  .then(response => {
    console.log("project response!");
    console.log(response);
    console.log("project response!!");
    return response.json().then(json => ({ json, response }));
  })
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    return json;
  })
  .then(
    response => response,
    error => error
  );
}

export function setAuthorizationToken(token) {
  if (token) {
    CommonHeaders['Authorization'] = `Bearer ${token}`;
  }
  else {
    delete CommonHeaders['Authorization'];
  }
  //console.log(CommonHeaders);
}
