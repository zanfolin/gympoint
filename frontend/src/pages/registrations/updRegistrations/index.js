import React, { useMemo, useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { IoIosArrowBack, IoIosCheckmark } from 'react-icons/io';
import { Form, Input } from '@rocketseat/unform';
import { Link, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { format, addMonths, parseISO, subDays } from 'date-fns';
import { toast } from 'react-toastify';
import { formatPrice } from '~/util/format';
import { Container, Content, Commands, Lista } from './styles';

import { updateRegistrationsRequest } from '~/store/modules/registration/actions';

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

export default function UpdateRegistrations() {
  const { id } = useParams();
  const [plan, setPlan] = useState('');
  const [registration, setRegistration] = useState({
    start_date: null,
    plan_id: null,
    student_id: null,
  });

  const formatedPrice = useMemo(() => {
    if (plan) {
      return formatPrice(plan.price ? plan.duration * plan.price : 0);
    }
    return formatPrice(0);
  }, [plan]);

  const formatedEndDate = useMemo(() => {
    // console.log(new Date(), 'linha 52');
    if (!registration || !plan) {
      // console.log('linha 54', 'sem registro', registration);
      return format(new Date(), 'dd/MM/yyyy');
    }
    // console.log('linha 57', 'com registro', registration.start_date);
    /* if (registration.end_date != null) {
      console.log('linha 59');
      return format(parseISO(registration.end_date), 'dd/MM/yyyy');
    } */
    if (registration.start_date != null) {
      if (plan && !Array.isArray(plan)) {
        /* console.log('imprimindo o plan', Array.isArray(plan));
        console.log(
          'linha 63',
          format(
            addMonths(registration.start_date, plan.duration),
            'dd/MM/yyyy'
          )
        ); */
        return format(
          subDays(addMonths(registration.start_date, plan.duration), 1),
          'dd/MM/yyyy'
        );
      }

      /* return format(
        addMonths(parseISO(registration.start_date), plan.duration),
        'dd/MM/yyyy'
      ); */
      // return format(registration.start_date, 'dd/MM/yyyy');
    }

    return format(new Date(), 'dd/MM/yyyy');
  }, [registration, plan]);

  const dispatch = useDispatch();

  function handleSubmit(data) {
    // console.log('entrou no botão de salvar ');
    /* console.log({
      id,
      student_id: data.student_id,
      plan_id: data.plan_id,
      // price: plan.price * plan.duration,
      start_date: data.start_date.toISOString(),
    }); */
    try {
      dispatch(
        updateRegistrationsRequest({
          id,
          student_id: data.student_id,
          plan_id: data.plan_id,
          // price: plan.price * plan.duration,
          start_date: data.start_date.toISOString(),
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

  async function getRegistration() {
    try {
      // console.log(id);
      // console.log('entrou na função');
      const { data } = await api.get(`/registrations/${id}`);
      // console.log(data);

      setRegistration({
        ...data[0],
        start_date: parseISO(data[0].start_date),
        end_date: parseISO(data[0].end_date),
      });
      // console.log('linha 147', data[0].start_date);
      // console.log('linha 148', data[0].end_date);
      getPlan(data.plan_id, setPlan);
      
      // console.tron.log(data);
      // toast.success(`Buscou os dados corretamente: ${data.name}`);
    } catch (error) {
      toast.error('Error ao buscar o matrícula, verifique suas permissões');
      // history.push(`/registration`);
    }
  }

  useEffect(() => {
    if (id) getRegistration();
  }, []); // eslint-disable-line

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
            initialData={registration}
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
