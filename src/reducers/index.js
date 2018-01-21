import { combineReducers } from 'redux';

import breeds from './breeds';
import communication from './communication';

const appReducer = combineReducers({
  breeds,
  communication,
});

export default function (state, action = {}) {
  return appReducer(state, action);
}
