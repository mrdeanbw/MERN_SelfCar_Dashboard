// import { combineReducers } from 'redux';
import {  SELECT_STUDENT, 
          UPDATE_SESSION_TOKEN, 
          SELECT_TEACHER,
          Fetch_MESSAGES,
          MARK_UNREAD, 
          UPDATE_TEACHER_BADGE,
           } from './MentorshipActions';

// Initial State
const initialState = {
  selectedStudentId : null,
  selectedTeacherID : 0,
  sessionToken      : '',
  unreadMarkStuID : 0,
  fetchedMessages  : {},
  badgeCount : 0,
  badgeCountChangeState : {
    stuID : null,
    teacherID : null,
    badgeCountToRemove : 0
  }
};

const MentorshipReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_STUDENT:
      return {
        ...state,
        selectedStudentId: action.selectedStudentId,      
      };
      break;

    case UPDATE_SESSION_TOKEN:
      return {
        ...state,
        sessionToken : action.sessionToken,
      };
      break;
    case SELECT_TEACHER:
      return {
        ...state,
        selectedTeacherID : action.selectedTeacherID,
      };
      break;
    case MARK_UNREAD:
      return {
        ...state,
        unreadMarkStuID : action.unreadMarkStuID,
      };
      break;

    case Fetch_MESSAGES:
      return {
        ...state,
        fetchedMessages : action.fetchedMessages,
      };
      break;
    case UPDATE_TEACHER_BADGE:
      return {
        ...state,
        badgeCountChangeState : action.badgeCountChangeState,
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
export const upDateBadgeForTeacher = state => state.mentorship.badgeCountChangeState;

export default MentorshipReducer;
