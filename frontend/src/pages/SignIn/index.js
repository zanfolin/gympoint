import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { signInRequest } from '~/store/modules/auth/actions';
import logo from '~/images/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Entre com um e-mail válido')
    .required('E-mail obrigatório'),
  password: Yup.string()
    .min(6, 'A senha precisa ter no mínimo seis caracteres')
    .required('Senha Obrigatória'),
});
// import { Container } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="logo da página" />
      <br />
      <Form onSubmit={handleSubmit} schema={schema}>
        <span>SEU E-MAIL</span>
        <Input name="email" type="email" placeholder="exemplo@email.com.br" />
        <span>SUA SENHA</span>
        <Input
          name="password"
          type="password"
          placeholder="sua senha secreta"
        />
        <button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>
      </Form>
    </>
  );
}
