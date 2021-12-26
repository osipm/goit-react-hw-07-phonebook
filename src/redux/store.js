import phoneReduser from './reducer';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {
  // persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const myMiddeleware = store => next => action => {
  console.log('прослойка', action);
  next(action);
};

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  myMiddeleware,
  logger,
];

const store = configureStore({
  reducer: {
    item: phoneReduser,
  },
  middleware,

  devTools: process.env.NODE_ENV === 'development',
});

// let persistor = persistStore(store);

const stateLs = { store };
export default stateLs;
