import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Image, Text, TouchableOpacity, Alert } from 'react-native';
import PropTypes from 'prop-types';

import { Container } from './styles';

import logo from '~/assets/logo-inline.png';

export default function Header({ navigation, page }) {
  return (
    <Container>
      {navigation ? (
        <TouchableOpacity
          onPress={() => {
            // Alert.alert('gympoint', page);
            navigation.navigate(page);
          }}
        >
          <Icon name="chevron-left" size={24} color="#000000" />
        </TouchableOpacity>
      ) : (
        <Text> </Text>
      )}

      <Image source={logo} />
      <Text> </Text>
    </Container>
  );
}

Header.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }),
  page: PropTypes.string,
};

Header.defaultProps = {
  navigation: null,
  page: '',
};
