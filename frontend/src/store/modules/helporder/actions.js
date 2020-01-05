export function addAnswerRequest(data) {
  return {
    type: '@helporder/ADD_ANSWER_REQUEST',
    payload: { data },
  };
}

/* export function updatePlansRequest(data) {
  return {
    type: '@plan/UPDATE_PLAN_REQUEST',
    payload: { data },
  };
} */

export function addAnswerSuccess(data) {
  return {
    type: '@helporder/ADD_ANSWER_SUCCESS',
    payload: { data },
  };
}

/* export function updatePlansSuccess(data) {
  return {
    type: '@plan/UPDATE_PLAN_SUCCESS',
    payload: { data },
  };
} */

export function addAnswerFailure() {
  return {
    type: '@helporder/ADD_ANSWER_FAILURE',
  };
}

/* export function updatePlansFailure() {
  return {
    type: '@plan/UPDATE_PLAN_FAILURE',
  };
} */
