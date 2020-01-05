import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import history from '~/services/history';

/* import {
  parseISO,
  format,
  setHours,
  setMinutes,
  setSeconds,
  setDate,
  subMonths,
} from 'date-fns';
import pt from 'date-fns/locale/pt'; */
import api from '~/services/api';
import {
  addStudentsSuccess,
  addStudentsFailure,
  updateStudentsSuccess,
  updateStudentsFailure,
} from './actions';

export function* addStudent({ payload }) {
  const { name, email, age, weight, height } = payload.data;
  try {
    const response = yield call(api.post, 'students', {
      name,
      email,
      age,
      weight,
      height,
    });
    toast.success('Estudantes adicionado com sucess');
    yield put(addStudentsSuccess(response.data));
    history.push('/students');
  } catch (err) {
    toast.error('Erro ao cadastrar estudante, confira os dados');

    yield put(addStudentsFailure());
  }
}

export function* updateStudent({ payload }) {
  const { id, name, email, age, weight, height } = payload.data;
  try {
    const response = yield call(api.put, `students/${id}`, {
      name,
      email,
      age,
      weight,
      height,
    });
    toast.success('Estudantes atualizado com sucesso');
    history.pushState('/students');
    yield put(updateStudentsSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar estudante, confira os dados');

    yield put(updateStudentsFailure());
  }
}

export default all([
  takeLatest('@student/ADD_STUDENT_REQUEST', addStudent),
  takeLatest('@student/UPDATE_STUDENT_REQUEST', updateStudent),
]);
