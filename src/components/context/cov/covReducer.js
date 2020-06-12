import {
  SET_LOADING,
  GET_COUNTRIES,
  AUTOCOMPLETE,
  GET_COUNTRY,
} from '../types';

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
        autocompleteArr: action.payload.autocompleteArr,
      };
    case GET_COUNTRY:
      const {
        countryName,
        countryLastDay,
        countryData,
        countryPopulation,
        countryPopulationPercentage,
      } = action.payload;
      return {
        ...state,
        autocompleteArr: [],
        textInput: '',
        countryName,
        countryLastDay,
        countryData,
        countryPopulation,
        countryPopulationPercentage,
        loading: false,
      };

    default:
      return state;
  }
};
