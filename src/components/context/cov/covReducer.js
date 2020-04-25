import { SET_LOADING, GET_COUNTRIES, AUTOCOMPLETE } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        loading: false,
      };
    case AUTOCOMPLETE:
      return {
        ...state,
        autocompleteArr: action.payload,
      };

    default:
      return state;
  }
};
