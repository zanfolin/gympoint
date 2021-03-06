import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import { Alert } from 'react-native';
import createStore from './createStore';
import persistReducers from './persistReducers';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor() // R.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleware];

const store = createStore(persistReducers(rootReducer), middlewares);

// Alert.alert('gympoin', store ? 'tem armazenamento' : 'não tem armazenamento');

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
