import { combineReducers } from 'redux';

import breeds from './breeds';

const appReducer = combineReducers({
  breeds,
});

export default function (state, action = {}) {
  return appReducer(state, action);
}
