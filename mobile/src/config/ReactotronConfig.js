import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';
import AsyncStorage from '@react-native-community/async-storage';
import adress from '~/config/Server';

// .configure({ host: '192.168.0.155' })

if (__DEV__) {
  const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure({ host: adress.reactotron_ip })
    .useReactNative()
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect();
  tron.clear();

  console.tron = tron;
}
