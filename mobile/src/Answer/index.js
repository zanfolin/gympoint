import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import Header from '~/components/Header';

import {
  Container,
  HelpOrderContainer,
  HelpOrderHeader,
  HelpOrderHeaderResponse,
  HelpOrderTitle,
  HelpOrderDate,
  HelpOrderMessage,
} from '~/Answer/styles';
import Background from '~/components/Background';

export default function Answer({ navigation }) {
  const helporder = navigation.getParam('help');

  return helporder ? (
    <>
      <Header navigation={navigation} page="HelpOrders" />
      <Container>
        <HelpOrderContainer>
          <HelpOrderHeader>
            <HelpOrderHeaderResponse>
              <HelpOrderTitle>PERGUNTA</HelpOrderTitle>
            </HelpOrderHeaderResponse>
            <HelpOrderDate>{helporder.formatedCreated_at}</HelpOrderDate>
          </HelpOrderHeader>
          <HelpOrderMessage>{helporder.question}</HelpOrderMessage>
          <HelpOrderHeader>
            <HelpOrderHeaderResponse>
              <HelpOrderTitle>RESPOSTA</HelpOrderTitle>
            </HelpOrderHeaderResponse>
            <HelpOrderDate>{helporder.formatedAnswer_at}</HelpOrderDate>
          </HelpOrderHeader>
          <HelpOrderMessage>{helporder.answer}</HelpOrderMessage>
        </HelpOrderContainer>
      </Container>
    </>
  ) : (
    <Text>Nada a publicar</Text>
  );
}

Answer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

Answer.navigationOptions = () => ({
  tabBarVisible: false,
});
