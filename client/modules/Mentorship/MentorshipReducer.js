// import { combineReducers } from 'redux';
import {  SELECT_STUDENT, 
          UPDATE_SESSION_TOKEN, 
          SELECT_TEACHER
           } from './MentorshipActions';

// Initial State
const initialState = {
  selectedStudentId: null,
  selectedTeacherID: 0,
  sessionToken  : '',
};

const MentorshipReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_STUDENT:
      return {
        selectedStudentId: action.selectedStudentId,
        sessionToken: state.sessionToken,
        selectedTeacherID : state.selectedTeacherID,
        
      };
      break;

    case UPDATE_SESSION_TOKEN:
      return {
        sessionToken : action.sessionToken,
        selectedStudentId: state.selectedStudentId,
        selectedTeacherID : state.selectedTeacherID,
        
      };
      break;
    case SELECT_TEACHER:
      return {
        selectedTeacherID : action.selectedTeacherID,
        selectedStudentId : state.selectedStudentId,
        sessionToken      : state.sessionToken,
        
      };
      break;

    default:
      return state;
  }
};

export const getSelectedStudentId = state => state.mentorship.selectedStudentId;
export const getSessionToken = state => state.mentorship.sessionToken;
export const getSelectedTeacherID = state => state.mentorship.selectedTeacherID;

export default MentorshipReducer;
