import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import { IoIosArrowBack, IoIosCheckmark } from 'react-icons/io';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Container, Content, Commands, Lista } from './styles';

import Datepicker from '~/components/DatePicker';

import { addStudentsRequest } from '~/store/modules/student/actions';

const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Tem que ter pelo menos três caracteres')
    .required('O nome é obrigatorio'),
  email: Yup.string()
    .email('E-mail inválido')
    .required('Campo obrigatório'),
  age: Yup.date().required('Campo obrigatório'),
  weight: Yup.number()
    .required('Campo obrigatório')
    .typeError('Número inválido'),
  height: Yup.number()
    .positive('Entre com números positivos')
    .required('Campo obrigatório')
    .typeError('Número inválido'),
});

export default function AddStudents() {
  const dispatch = useDispatch();
  const [borndate, setBornDate] = useState('');

  function handleSubmit(data) {
    dispatch(addStudentsRequest(data));
    // console.tron.log(data);
  }
  return (
    <Container>
      <Content>
        <nav>
          <h1>Cadastro de aluno</h1>
        </nav>
        <aside>
          <Commands>
            <div>
              <Link to="/students">
                <IoIosArrowBack />
                VOLTAR
              </Link>
              <button type="submit" form="addStuds">
                <IoIosCheckmark />
                SALVAR
              </button>
            </div>
          </Commands>
        </aside>
        <Lista>
          <Form onSubmit={handleSubmit} id="addStuds" schema={schema}>
            <table>
              <tbody>
                <tr>
                  <td colSpan="3">
                    <label htmlFor="name">NOME COMPLETO</label>
                    <br />
                    <Input name="name" placeholder="Nome Completo" />
                  </td>
                </tr>
                <tr>
                  <td colSpan="3">
                    <label htmlFor="name">ENDEREÇO DE E-MAIL</label>
                    <br />
                    <Input name="email" placeholder="exemplo@email.com" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Datepicker
                      label="DATA DE NASCIMENTO"
                      name="age"
                      dateFormat="dd/MM/yyyy"
                      selected={borndate}
                      onChange={value => setBornDate(value)}
                    />
                  </td>
                  <td>
                    <label htmlFor="weight">PESO (em kg)</label>
                    <Input name="weight" />
                  </td>
                  <td>
                    <label htmlFor="height">PESO (em kg)</label>
                    <Input name="height" />
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
