import React, { useEffect, useState, useMemo } from 'react';

import { useDispatch } from 'react-redux';

import { IoIosArrowBack, IoIosCheckmark } from 'react-icons/io';
import { Form, Input } from '@rocketseat/unform';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Container, Content, Commands, Lista } from './styles';
import api from '~/services/api';
import { formatPrice } from '~/util/format';

import { updatePlansRequest } from '~/store/modules/plan/actions';

const schema = Yup.object().shape({
  title: Yup.string()
    .min(3)
    .required('O titulo do plano é obrigatorio'),
  duration: Yup.number()
    .integer('Entre somente com números inteiros')
    .required('A duração é obrigatoria')
    .typeError('Insira apenas números na duração'),
  price: Yup.number()
    .required('O Preço é obrigatorio')
    .typeError('Insira apenas números no Preço'),
});

export default function UpdatePlans() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [plan, setPlan] = useState({
    title: '',
    duration: '',
    price: null,
  });

  const formatedPrice = useMemo(
    () =>
      formatPrice(
        plan.duration != null && plan.price != null
          ? plan.duration * plan.price
          : 0
      ),
    [plan]
  );

  useEffect(() => {
    async function loadPlan() {
      try {
        const response = await api.get(`plans/${id}`);
        const s = response.data;
        const std = {
          title: s.title,
          duration: s.duration,
          price: s.price,
        };
        setPlan(std);
      } catch (err) {
        toast.error('Erro ao buscar o Plano, verifique suas permissões');
      }
    }

    if (id) loadPlan();
  }, [id]);

  function handleSubmit(data) {
    try {
      dispatch(updatePlansRequest({ id, ...data }));
    } catch (err) {
      toast.error('Erro ao cadastrar');
    }
  }

  return (
    <Container>
      <Content>
        <nav>
          <h1>Edição de plano</h1>
        </nav>
        <aside>
          <Commands>
            <div>
              <Link to="/plans">
                <IoIosArrowBack />
                VOLTAR
              </Link>
              <button type="submit" form="frmUpdatePlan">
                <IoIosCheckmark />
                SALVAR
              </button>
            </div>
          </Commands>
        </aside>
        <Lista>
          <Form
            onSubmit={handleSubmit}
            id="frmUpdatePlan"
            name="frmUpdatePlan"
            initialData={plan}
            schema={schema}
          >
            <table>
              <tbody>
                <tr>
                  <td colSpan="3">
                    <Input label="TÍTULO DO PLANO" name="title" />
                  </td>
                </tr>

                <tr>
                  <td>
                    <Input
                      type="text"
                      label="DURAÇÃO (em meses)"
                      name="duration"
                      onChange={event =>
                        setPlan({ ...plan, duration: event.target.value })
                      }
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      label="PREÇO MENSAL"
                      name="price"
                      onChange={event =>
                        setPlan({ ...plan, price: event.target.value })
                      }
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
