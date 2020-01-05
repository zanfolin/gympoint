import React, { useMemo, useState } from 'react';

import { useDispatch } from 'react-redux';

import { IoIosArrowBack, IoIosCheckmark } from 'react-icons/io';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { formatPrice } from '~/util/format';
import { Container, Content, Commands, Lista } from './styles';

import { addPlansRequest } from '~/store/modules/plan/actions';

const schema = Yup.object().shape({
  title: Yup.string().required('O titulo do plano é obrigatorio'),
  duration: Yup.number()
    .required('A duração é obrigatoria')
    .typeError('Insira apenas números na duração'),
  price: Yup.number()
    .required('O Preço é obrigatorio')
    .typeError('Insira apenas números no Preço'),
});

export default function AddPlans() {
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);
  const formatedPrice = useMemo(
    () => formatPrice(duration != null && price != null ? duration * price : 0),
    [duration, price]
  );

  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(addPlansRequest(data));
  }
  return (
    <Container>
      <Content>
        <nav>
          <h1>Cadastro de plano</h1>
        </nav>
        <aside>
          <Commands>
            <div>
              <Link to="/plans">
                <IoIosArrowBack />
                VOLTAR
              </Link>
              <button type="submit" form="addPlan">
                <IoIosCheckmark />
                SALVAR
              </button>
            </div>
          </Commands>
        </aside>
        <Lista>
          <Form
            onSubmit={handleSubmit}
            id="addPlan"
            name="addPlan"
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
                      onChange={event => setDuration(event.target.value)}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      label="PREÇO MENSAL"
                      name="price"
                      onChange={event => setPrice(event.target.value)}
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
