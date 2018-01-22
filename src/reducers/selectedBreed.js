import { UPDATE_SELECTED_BREED } from '../actions/breedsActions';

export const INITIAL_STATE = null;

export default function selectedBreed(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case UPDATE_SELECTED_BREED:
      return action.payload.selectedBreed;
    default:
      return state;
  }
}
