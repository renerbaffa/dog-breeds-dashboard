export const INITIAL_STATE = {};

export default function communication(state = INITIAL_STATE, action = {}) {
  if (action.meta) {
    const selector = Object.keys(action.meta)[0];
    const value = Object.values(action.meta)[0];

    return {
      ...state,
      [`${selector}`]: value,
    };
  }

  return state;
}
