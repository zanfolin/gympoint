import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import history from '~/services/history';

import api from '~/services/api';
import {
  addPlansSuccess,
  addPlansFailure,
  updatePlansSuccess,
  updatePlansFailure,
} from './actions';

export function* addPlan({ payload }) {
  const { title, duration, price } = payload.data;
  try {
    const response = yield call(api.post, 'plans', {
      title,
      duration,
      price,
    });
    toast.success('Plano adicionado com sucess');
    yield put(addPlansSuccess(response.data));
    history.push('/plans');
  } catch (err) {
    toast.error('Erro ao cadastrar Plano, confira os dados');

    yield put(addPlansFailure());
  }
}

export function* updatePlan({ payload }) {
  const { id, title, duration, price } = payload.data;
  try {
    const response = yield call(api.put, `plans/${id}`, {
      id,
      title,
      duration,
      price,
    });
    toast.success('Plano atualizado com sucesso');
    history.push('/plans');
    yield put(updatePlansSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar Plano, confira os dados');

    yield put(updatePlansFailure());
  }
}

export default all([
  takeLatest('@plan/ADD_PLAN_REQUEST', addPlan),
  takeLatest('@plan/UPDATE_PLAN_REQUEST', updatePlan),
]);
