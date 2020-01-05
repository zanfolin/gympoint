import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Route from '~/routes';
import '~/config/ReactotronConfig';

import { store, persistor } from '~/store';

import App from '~/App';

export default function Index() {
  console.disableYellowBox = true; // eslint-disable-line
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor="#fff" />
        <App />
      </PersistGate>
    </Provider>
  );
}
