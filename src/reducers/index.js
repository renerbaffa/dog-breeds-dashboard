import { combineReducers } from 'redux';

import breeds from './breeds';
import communication from './communication';
import selectedBreed from './selectedBreed';

const appReducer = combineReducers({
  breeds,
  communication,
  selectedBreed,
});

export default function (state, action = {}) {
  return appReducer(state, action);
}
