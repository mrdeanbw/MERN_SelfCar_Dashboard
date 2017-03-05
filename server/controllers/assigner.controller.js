import Assigner from '../models/assigner';
import request from '../util/request';
import { projectsUrl } from '../util/udacityHelpers';

export function getProjects(req, res) {
  // TODO: Get the udacity account token
  request(projectsUrl, 'get', undefined, {'Authorization' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozMTk0OSwiZXhwIjoxNDkxMTA4NzY4LCJ0b2tlbl90eXBlIjoiYXBpIn0.iOy3aOT0uQr0uNdOjD9A7uxjWjx0zf6h1p5xa1klORk'}).then(response => {
    res.status(200).json({
      success: true,
      projects: response
    });
  })
}
