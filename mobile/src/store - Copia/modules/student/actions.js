export function addStudentsRequest(data) {
  return {
    type: '@student/ADD_STUDENT_REQUEST',
    payload: { data },
  };
}

export function updateStudentsRequest(data) {
  return {
    type: '@student/UPDATE_STUDENT_REQUEST',
    payload: { data },
  };
}

export function addStudentsSuccess(data) {
  return {
    type: '@student/ADD_STUDENT_SUCCESS',
    payload: { data },
  };
}

export function updateStudentsSuccess(data) {
  return {
    type: '@student/UPDATE_STUDENT_SUCCESS',
    payload: { data },
  };
}

export function addStudentsFailure() {
  return {
    type: '@student/ADD_STUDENT_FAILURE',
  };
}

export function updateStudentsFailure() {
  return {
    type: '@student/UPDATE_STUDENT_FAILURE',
  };
}
