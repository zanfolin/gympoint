import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
/* import student from './student/sagas';
import plan from './plan/sagas';
import registration from './registration/sagas';
import helporder from './helporder/sagas'; */

export default function* rootSaga() {
  return yield all([auth]);
}
