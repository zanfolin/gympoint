import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import history from '~/services/history';

import api from '~/services/api';
import { addAnswerSuccess, addAnswerFailure } from './actions';

export function* addAnswer({ payload }) {
  const { id, answer } = payload.data;
  try {
    const response = yield call(api.put, `help_orders/${id}/answer`, {
      answer,
    });
    toast.success('Resposta adicionada com sucesso');
    yield put(addAnswerSuccess(response.data));
    history.push('/help_order');
  } catch (err) {
    toast.error(`Falou na inclusão da resposta: + ${err.message || err}`);

    yield put(addAnswerFailure());
  }
}

/* export function* updatePlan({ payload }) {
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
*/
export default all([
  takeLatest('@helporder/ADD_ANSWER_REQUEST', addAnswer),
  // takeLatest('@plan/UPDATE_PLAN_REQUEST', updatePlan),
]);
