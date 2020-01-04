import React, { useMemo, useState } from 'react';

import { useDispatch } from 'react-redux';

import { IoIosArrowBack, IoIosCheckmark } from 'react-icons/io';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { format, addMonths, parseISO } from 'date-fns';
import { formatPrice } from '~/util/format';
import { Container, Content, Commands, Lista } from './styles';

import { addRegistrationsRequest } from '~/store/modules/registration/actions';

import Datepicker from '~/components/DatePicker';
import ReactSelect from '~/components/ReactSelect';

import api from '~/services/api';

const schema = Yup.object().shape({
  start_date: Yup.date('Erro de data')
    .required('A data inicial é obrigatoria')
    .typeError('Insira uma data'),
  plan_id: Yup.number()
    .integer('Entre somente com números no plano')
    .required('O plano é obrigatorio')
    .typeError('Insira um plano'),
  student_id: Yup.number()
    .integer('Entre somente com números no estudante')
    .required('O estudante é obrigatorio')
    .typeError('Insira um estudante válido'),
});

export default function AddRegistrations() {
  const [plan, setPlan] = useState('');
  const [registration, setRegistration] = useState({
    start_date: null,
    plan_id: null,
    student_id: null,
  });

  const formatedPrice = useMemo(
    () => formatPrice(plan.price ? plan.duration * plan.price : 0),
    [plan]
  );

  const formatedEndDate = useMemo(() => {
    if (registration.start_date != null && plan.duration != null) {
      return format(
        addMonths(
          parseISO(registration.start_date.toISOString()),
          plan.duration
        ),
        'dd/MM/yyyy'
      );
    }
    return format(new Date(), 'dd/MM/yyyy');
  }, [registration, plan]);

  const dispatch = useDispatch();

  function handleSubmit(data) {
    // console.log('entrou no botão de salvar ');
    try {
      dispatch(
        addRegistrationsRequest({
          student_id: data.student_id,
          plan_id: data.plan_id,
          // price: plan.price * plan.duration,
          start_date: data.start_date,
          // end_date: addMonths(data.start_date, plan.duration),
        })
      );
      // console.log('passou pela funçao sem erro');
    } catch (erro) {
      console.log('erro na função');
    }
  }

  async function getStudent(student_id, setName) {
    const { data } = await api.get(`students/${student_id}`);
    // console.log('Dispagou a busca pelo estudante pelo códgio');
    // console.log(data);
    setName(data.name);
  }

  async function getPlan(plan_id, setName) {
    const { data } = await api.get(`plans/${plan_id}`);
    // console.log('Disparou a busca pelo plano pelo códgio');
    setPlan(data);
    setName(data.title);
  }

  async function loadStudents(inputValue) {
    const { data } = await api.get('students', {
      params: {
        name: inputValue,
      },
    });
    return data;
  }

  async function loadPlans(inputValue) {
    const { data } = await api.get('plans', {
      params: {
        title: inputValue,
      },
    });
    // console.log(data);
    return data;
  }

  return (
    <Container>
      <Content>
        <nav>
          <h1>Cadastro de matrículas</h1>
        </nav>
        <aside>
          <Commands>
            <div>
              <Link to="/registrations">
                <IoIosArrowBack />
                VOLTAR
              </Link>
              <button type="submit" form="frmAddRegistrations">
                <IoIosCheckmark />
                SALVAR
              </button>
            </div>
          </Commands>
        </aside>
        <Lista>
          <Form
            onSubmit={handleSubmit}
            id="frmAddRegistrations"
            name="frmAddRegistrations"
            schema={schema}
          >
            <table>
              <tbody>
                <tr>
                  <td colSpan="4">
                    <ReactSelect
                      label="ALUNO"
                      name="student_id"
                      loadInputValue={getStudent}
                      loadOptions={loadStudents}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <ReactSelect
                      label="PLANO"
                      name="plan_id"
                      loadInputValue={getPlan}
                      loadOptions={loadPlans}
                      setPlan={setPlan}
                    />
                  </td>
                  <td>
                    <Datepicker
                      label="DATA DE INÍCIO"
                      name="start_date"
                      dateFormat="dd/MM/yyyy"
                      selected={registration.start_date}
                      onChange={value =>
                        setRegistration({ ...registration, start_date: value })
                      }
                    />
                  </td>
                  <td>
                    <Input
                      label="DATA DE TÉRMINO"
                      name="end_date"
                      disabled
                      value={formatedEndDate}
                    />
                  </td>
                  <td>
                    <Input
                      name="totalPrice"
                      label="PREÇO TOTAL"
                      disabled
                      value={formatedPrice}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Form>
        </Lista>
      </Content>
    </Container>
  );
}
