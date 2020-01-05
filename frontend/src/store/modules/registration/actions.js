export function addRegistrationsRequest(data) {
  return {
    type: '@registration/ADD_REGISTRATION_REQUEST',
    payload: { data },
  };
}

export function updateRegistrationsRequest(data) {
  return {
    type: '@registration/UPDATE_REGISTRATION_REQUEST',
    payload: { data },
  };
}

export function addRegistrationsSuccess(data) {
  return {
    type: '@registration/ADD_REGISTRATION_SUCCESS',
    payload: { data },
  };
}

export function updateRegistrationsSuccess(data) {
  return {
    type: '@registration/UPDATE_REGISTRATION_SUCCESS',
    payload: { data },
  };
}

export function addRegistrationsFailure() {
  return {
    type: '@registration/ADD_REGISTRATION_FAILURE',
  };
}

export function updateRegistrationsFailure() {
  return {
    type: '@registration/UPDATE_REGISTRATION_FAILURE',
  };
}
