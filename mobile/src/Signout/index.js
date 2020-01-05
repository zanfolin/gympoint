import React, { useState } from 'react';
import { Image, Text, Alert } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import logo from '~/assets/logo.png';
// import Background from '~/components/Background';
import { signOutRequest } from '~/store/modules/auth/actions';

// import { Container, Form, FormInput, SubmitButton } from './styles';
import { Container, Form, SubmitButton } from '~/Signout/styles';

export default function Signout({ navigation }) {
  const [id, setId] = useState('');

  const loading = useSelector(state => state.auth.loading);

  const dispatch = useDispatch();

  function handleSubmit() {
    // Alert.alert('Gympoint', id);
    // dispatch(signInRequest(id));
    dispatch(signOutRequest());
  }

  return (
    // <Background>
    <Container>
      <Image source={logo} />
      <Form>
        <SubmitButton loading={loading} onPress={handleSubmit}>
          Sair do Sistema
        </SubmitButton>
      </Form>
    </Container>
    // </Background>
  );
}

Signout.navigationOptions = {
  tabBarLabel: 'Sair',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="grid-off" size={20} color={tintColor} />
  ),
};
