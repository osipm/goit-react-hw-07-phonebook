import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import * as actions from './actions';

const contacts = createReducer([], {
  [actions.fetchContactSuccess]: (_, { payload }) => payload,
  [actions.addContactSuccess]: (state, { payload }) => [...state, payload],
  [actions.deleteContactSuccess]: (state, { payload }) =>
    state.filter(contac => contac.id !== payload),
});

const filter = createReducer('', {
  [actions.filter]: (_, { payload }) => payload,
});

export default combineReducers({
  contacts,
  filter,
});
