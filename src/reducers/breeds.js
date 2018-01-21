import { UPDATE_BREEDS } from '../actions/breedsActions';

export const INITIAL_STATE = [];

export default function breeds(state = [], action = {}) {
  switch (action.type) {
    case UPDATE_BREEDS:
      return action.payload.breeds;
    default:
      return state;
  }
}
