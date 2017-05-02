// import { combineReducers } from 'redux';
import {  SELECT_STUDENT, 
          UPDATE_SESSION_TOKEN, 
          SELECT_TEACHER,
          Fetch_MESSAGES,
          MARK_UNREAD
           } from './MentorshipActions';

// Initial State
const initialState = {
  selectedStudentId : null,
  selectedTeacherID : 0,
  sessionToken      : '',
  unreadMarkStuID : 0,
  fetchedMessages  : {},
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
    case MARK_UNREAD:
      return {
        unreadMarkStuID : action.unreadMarkStuID,
        selectedTeacherID : state.selectedTeacherID,
        selectedStudentId : state.selectedStudentId,
        sessionToken      : state.sessionToken,
      };
      break;

    case Fetch_MESSAGES:
      return {
        fetchedMessages : action.fetchedMessages,
        selectedTeacherID : state.selectedTeacherID,
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
export const getFetchedMessages = state => state.mentorship.fetchedMessages;
export const getUnreadMarkStuID = state => state.mentorship.unreadMarkStuID;

export default MentorshipReducer;
