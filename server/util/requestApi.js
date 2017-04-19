import fetch from 'isomorphic-fetch';
import { baseUrl, loginUrl } from './udacityHelpers';

export const API_URL = baseUrl;

var CommonHeaders = { 
      // 'Access-Control-Request-Headers'  : 'X-Berlioz-Country',
      // 'Access-Control-Allow-Origin'  : 'X-Berlioz-Country',
      //'access-control-allow-origin' :  'postman-echo.com',
      'Accept-Language': 'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,fr;q=0.2',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
};
export default function callApi(API_URL, endpoint, extraHeaders, method = 'GET', body) {  

  Object.keys(extraHeaders).forEach(function(key) {
    CommonHeaders[key] = extraHeaders[key];
  }, this);
  return fetch(`${API_URL}/${endpoint}`, {
    headers: CommonHeaders,
    method : method,
    body: JSON.stringify(body),
  })
  .then(response => {
    return response.json()
           .then(function(json) {
      return json;
    });
  })
}

export function getAuthToken(body) {
  
  return fetch(loginUrl, {
    headers: {
      
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,fr;q=0.2',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
      'content-type': 'application/json',
      'Accept': 'application/json',
      'Connection': 'keep-alive',
    },
    method: 'POST',
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
    response => response.jwt,
    error => error
  );
}
