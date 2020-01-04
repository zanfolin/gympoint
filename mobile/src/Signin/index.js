import React, { useRef, useState } from 'react';
import { Image, Text, Alert } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import logo from '~/assets/logo.png';
// import Background from '~/components/Background';
import { signInRequest } from '~/store/modules/auth/actions';

// import { Container, Form, FormInput, SubmitButton } from './styles';
import { Container, Form, SubmitButton, FormInput } from './styles';

export default function Signin({ navigation }) {
  const [id, setId] = useState('');

  const loading = useSelector(state => state.auth.loading);

  const dispatch = useDispatch();

  function handleSubmit() {
    // Alert.alert('Gympoint', id);
    dispatch(signInRequest(id));
  }

  return (
    // <Background>
    <Container>
      <Image source={logo} />
      <Form>
        <FormInput
          placeholder="Informe seu ID de cadastro"
          keyboardType="numeric"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={id}
          onChangeText={setId}
        />
        <SubmitButton loading={loading} onPress={handleSubmit}>
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
    // </Background>
  );
}
