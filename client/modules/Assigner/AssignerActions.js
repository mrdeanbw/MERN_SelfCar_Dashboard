import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_PROJECTS = 'ADD_PROJECTS';
export const TOGGLE_PROJECT = 'TOGGLE_PROJECT';
export const UPDATE_SUBMISSION = 'UPDATE_SUBMISSION';
export const UPDATE_POSITIONS = 'UPDATE_POSITIONS';

// Export Actions
export function addProjects(projects) {
  return {
    type: ADD_PROJECTS,
    projects,
  };
}

export function fetchProjects() {
  return (dispatch) => {
    return callApi('projects').then(res => {
      dispatch(addProjects(res.projects));
    });
  };
}

export function toggleProject(projectId) {
  return {
    type: TOGGLE_PROJECT,
    projectId,
  };
}

export function updateSubmission(submission) {
  return {
    type: UPDATE_SUBMISSION,
    submission,
  };
}

export function postSubmissions(projects) {
  return (dispatch) => {
    return callApi('projects', 'post', projects).then(res => {
      if (!res.submission.error) {
        dispatch(updateSubmission(res.submission));
      }
      if (!res.positions.error) {
        dispatch(updatePositions(res.positions));
      }
    });
  };
}

export function fetchSubmission() {
  return (dispatch) => {
    return callApi('projects/submission').then(res => {
      dispatch(updateSubmission(res.submission));
    });
  };
}

export function updatePositions(positions) {
  return {
    type: UPDATE_POSITIONS,
    positions,
  };
}

export function fetchPositions(submissionId) {
  return (dispatch) => {
    return callApi('projects/positions/' + submissionId, 'get').then(res => {
      dispatch(updatePositions(res.positions));
    });
  };
}