import React, { useReducer } from 'react';
import {
  GET_COUNTRIES,
  SET_LOADING,
  AUTOCOMPLETE,
  GET_COUNTRY,
} from '../types';
import CovContext from './covContext';
import CovReducer from './covReducer';
import Axios from 'axios';

const CovState = (props) => {
  const initialState = {
    countries: [],
    firstLettersArr: [],
    autocompleteArr: [],
    loading: false,
    countryData: [],
    textInput: '',
  };

  const [state, dispatch] = useReducer(CovReducer, initialState);

  // Set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  // Get Countries
  const getCountries = async () => {
    const res = await Axios.get(`https://api.covid19api.com/countries`);

    // Take names for all countries
    const countries = res.data.map((item) => {
      return item.Country;
    });

    dispatch({
      type: GET_COUNTRIES,
      payload: countries,
    });
  };

  // Autocomplete
  const autocomplete = (text) => {
    // Generate a new array, in which add elements in which the entered letters are equal to the first letters of elements in the array of countries.
    state.firstLettersArr = state.countries.filter(
      (country) =>
        country.substr(0, text.length).toUpperCase() === text.toUpperCase()
    );

    // From every elements from previous array make DOM-elements
    state.autocompleteArr = state.firstLettersArr.map((country) => (
      <div
        key={state.firstLettersArr.indexOf(country)}
        onClick={autocompleteClick}
      >
        <strong>{country.substr(0, text.length)}</strong>
        {''}
        {country.substr(text.length)}
        <input type='hidden' value={country} />
      </div>
    ));

    state.textInput = text;

    dispatch({
      type: AUTOCOMPLETE,
      payload: {
        autocompleteArr: state.autocompleteArr,
        textInput: state.textInput,
      },
    });
  };

  const autocompleteClick = (e) => {
    e.preventDefault();

    const autocompleteBlock = e.target.parentNode;
    autocompleteBlock.innerHTML = '';

    const country = e.target.lastChild.value;
    getCountry(country);
  };

  // Search Country
  const getCountry = async (country) => {
    setLoading();
    const res = await Axios.get(
      `https://api.covid19api.com/total/country/${country}`
    );

    const countryData = res.data.splice(res.data.length - 7, res.data.length);
    console.log(countryData);

    dispatch({
      type: GET_COUNTRY,
      payload: {
        textInput: '',
        autocompleteArr: [],
      },
    });
  };

  return (
    <CovContext.Provider
      value={{
        countries: state.countries,
        loading: state.loading,
        autocompleteArr: state.autocompleteArr,
        textInput: state.textInput,
        getCountries,
        autocomplete,
        getCountry,
      }}
    >
      {props.children}
    </CovContext.Provider>
  );
};

export default CovState;
