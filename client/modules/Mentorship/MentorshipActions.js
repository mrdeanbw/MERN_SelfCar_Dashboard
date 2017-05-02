// Export Constants
export const SELECT_STUDENT = 'SELECT_STUDENT';
export const UPDATE_SESSION_TOKEN = 'UPDATE_SESSION_TOKEN';
export const SELECT_TEACHER = 'SELECT_TEACHER';
export const Fetch_MESSAGES = 'Fetch_MESSAGES';
export const MARK_UNREAD = 'MARK_UNREAD';


// Export Actions
export function selectStudent(selectedStudentId){
    return{
        type : SELECT_STUDENT,
        selectedStudentId,
    };
}

export function updateSessionToken(sessionToken){
    return{
        type : UPDATE_SESSION_TOKEN,
        sessionToken,
    };
}

export function selectTeacher(selectedTeacherID){
    return{
        type : SELECT_TEACHER,
        selectedTeacherID,
    };
}

export function markUnreadMessage(markUnreadStuID){
    return{
        type : MARK_UNREAD,
        markUnreadStuID,
    };
}

export function fetchMessages(fetchedMessages){
    return{
        type : Fetch_MESSAGES,
        fetchedMessages,
    };
}


