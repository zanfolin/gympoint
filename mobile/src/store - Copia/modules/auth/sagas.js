import { all, takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
// import history from '~/services/history';
import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.post, 'sessions/students', {
      id,
    });

    const { token, user } = response.data;

    if (!user) {
      Alert.alert('Gympoint', 'Usuário não encontrado');
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    // history.push('/');
  } catch (err) {
    yield put(signFailure());
    Alert.alert('Gympoint', 'Falha na autenticação');
  }
}

export function setToken({ payload }) {
  if (!payload) return;
  const { token } = payload.auth;
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  // history.push('/signin');
}
export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
