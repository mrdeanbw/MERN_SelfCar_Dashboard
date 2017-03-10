// Import Actions
import { ADD_PROJECTS, TOGGLE_PROJECT, UPDATE_SUBMISSION, UPDATE_POSITIONS } from './AssignerActions';

// Initial State
const initialState = { data: [], submission: {}, positions:[] };

const AssignerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROJECTS :
      return {
        ...state,
        data: action.projects.reduce((result, item) => {
          item.selected = false;
          if (item.status === 'certified') {
            result.push(item);
          }
          return result;
        }, []),
      };
    case TOGGLE_PROJECT :
      return {
        ...state,
        data: state.data.map(project => {
          if (project.project_id == action.projectId) {
            return Object.assign({}, project, {
              selected: !project.selected
            })
          }
          return project;
        })
      }
    case UPDATE_SUBMISSION :
      return {
        ...state,
        submission: action.submission,
      }
    case UPDATE_POSITIONS :
      return {
        ...state,
        positions: action.positions
      }
    default:
      return state;
  }
};

/* Selectors */

// Get all users
export const getProjects = state => state.assigners.data;
export const getPositions = state => state.assigners.positions;
export const getSelectedProjects = state => state.assigners.data.filter(project => project.selected == true);
export const getSubmission = state => state.assigners.submission;

export default AssignerReducer;
