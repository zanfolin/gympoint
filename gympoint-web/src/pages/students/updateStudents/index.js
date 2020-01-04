import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { IoIosArrowBack, IoIosCheckmark } from 'react-icons/io';
import { Form, Input } from '@rocketseat/unform';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Container, Content, Commands, Lista } from './styles';
import api from '~/services/api';

import { updateStudentsRequest } from '~/store/modules/student/actions';
import Datepicker from '~/components/DatePicker';

const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Tem que ter pelo menos três caracteres')
    .required('O nome é obrigatorio'),
  email: Yup.string()
    .email('E-mail inválido')
    .required('Campo obrigatório'),
  age: Yup.string().required('Campo obrigatório'),
  weight: Yup.number()
    .required('Campo obrigatório')
    .typeError('Número inválido'),
  height: Yup.number()
    .positive('Entre com números positivos')
    .required('Campo obrigatório')
    .typeError('Número inválido'),
});

export default function UpdateStudents() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [student, setStudent] = useState({
    name: '',
    email: '',
    age: null,
    height: null,
    weight: null,
  });

  useEffect(() => {
    async function loadStudent() {
      try {
        const response = await api.get(`students/${id}`);
        const s = response.data;
        const std = {
          name: s.name,
          email: s.email,
          age: s.age,
          age_number: s.age_number,
          weight: s.weight,
          height: s.height,
        };
        setStudent(std);
        // setBornDate(std.age);
      } catch (err) {
        toast.error('Erro ao buscar o estudante, verifique suas permissões');
      }
    }

    if (id) loadStudent();
  }, [id]);

  function handleSubmit(data) {
    try {
      dispatch(updateStudentsRequest({ id, ...data }));
    } catch (err) {
      toast.error('Erro ao cadastrar');
    }
  }

  return (
    <Container>
      <Content>
        <nav>
          <h1>Edição de aluno</h1>
        </nav>
        <aside>
          <Commands>
            <div>
              <Link to="/students">
                <IoIosArrowBack />
                VOLTAR
              </Link>
              <button type="submit" form="updateStuds">
                <IoIosCheckmark />
                SALVAR
              </button>
            </div>
          </Commands>
        </aside>
        <Lista>
          <Form
            onSubmit={handleSubmit}
            id="updateStuds"
            initialData={student}
            schema={schema}
          >
            <table>
              <tbody>
                <tr>
                  <td colSpan="3">
                    <Input
                      label="NOME COMPLETO"
                      name="name"
                      placeholder="Seu nome"
                    />
                  </td>
                </tr>

                <tr>
                  <td colSpan="3">
                    <Input
                      label="ENDEREÇO DE E-MAIL"
                      name="email"
                      placeholder="exemplo@email.com"
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <span />
                    <Datepicker
                      label="DATA DE NASCIMENTO"
                      name="age"
                      dateFormat="dd/MM/yyyy"
                      // selected={Date.parse(student.age)}
                      selected={new Date(student.age)}
                      onChange={value =>
                        setStudent({ ...student, age: value.toISOString() })
                      }
                    />
                  </td>
                  <td>
                    <Input name="weight" label="PESO (em kg)" />
                  </td>
                  <td>
                    <Input name="height" label="ALTURA" />
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
