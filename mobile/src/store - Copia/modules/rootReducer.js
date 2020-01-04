import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
// import plan from './plan/reducer';
// import registration from './registration/reducer';

export default combineReducers({ auth });
