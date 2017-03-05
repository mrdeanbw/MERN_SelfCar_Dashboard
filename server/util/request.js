import fetch from 'isomorphic-fetch';
import { baseUrl } from './udacityHelpers';

export const API_URL = baseUrl;

var CommonHeaders = { 'content-type': 'application/json' };

export default function callApi(endpoint, method = 'get', body, extraHeaders) {
  Object.keys(extraHeaders).forEach(function(key) {
    CommonHeaders[key] = extraHeaders[key];
  }, this);
  console.log(CommonHeaders);
  return fetch(`${API_URL}/${endpoint}`, {
    headers: CommonHeaders,
    method,
    body: JSON.stringify(body),
  })
  .then(response => {
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
