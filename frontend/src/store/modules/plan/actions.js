export function addPlansRequest(data) {
  return {
    type: '@plan/ADD_PLAN_REQUEST',
    payload: { data },
  };
}

export function updatePlansRequest(data) {
  return {
    type: '@plan/UPDATE_PLAN_REQUEST',
    payload: { data },
  };
}

export function addPlansSuccess(data) {
  return {
    type: '@plan/ADD_PLAN_SUCCESS',
    payload: { data },
  };
}

export function updatePlansSuccess(data) {
  return {
    type: '@plan/UPDATE_PLAN_SUCCESS',
    payload: { data },
  };
}

export function addPlansFailure() {
  return {
    type: '@plan/ADD_PLAN_FAILURE',
  };
}

export function updatePlansFailure() {
  return {
    type: '@plan/UPDATE_PLAN_FAILURE',
  };
}
