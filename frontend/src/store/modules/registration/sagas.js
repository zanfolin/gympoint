import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import history from '~/services/history';

import api from '~/services/api';
import {
  addRegistrationsSuccess,
  addRegistrationsFailure,
  updateRegistrationsSuccess,
  updateRegistrationsFailure,
} from './actions';

export function* addRegistration({ payload }) {
  const { student_id, plan_id, start_date } = payload.data;
  try {
    const response = yield call(api.post, 'registrations', {
      student_id,
      plan_id,
      start_date,
    });
    toast.success('Matrícula adicionada com sucess');
    yield put(addRegistrationsSuccess(response.data));
    history.push('/registrations');
  } catch (err) {
    // toast.error('Erro ao cadastrar Matrícula, confira os dados');
    toast.error(err.message);

    yield put(addRegistrationsFailure());
  }
}

export function* updateRegistration({ payload }) {
  const { id, student_id, plan_id, start_date } = payload.data;

  try {
    const response = yield call(api.put, `registrations/${id}`, {
      student_id,
      plan_id,
      start_date,
    });
    toast.success('Matrícula atualizada com sucesso');
    history.push('/registrations');
    yield put(updateRegistrationsSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar Matrícula, confira os dados');

    yield put(updateRegistrationsFailure());
  }
}

export default all([
  takeLatest('@registration/ADD_REGISTRATION_REQUEST', addRegistration),
  takeLatest('@registration/UPDATE_REGISTRATION_REQUEST', updateRegistration),
]);
