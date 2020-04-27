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
    countryName: '',
    countryLastDay: [],
    countryData: [],
    loading: false,
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
      },
    });
  };
  const autocompleteClick = (e) => {
    e.preventDefault();
    const country = e.target.lastChild.value;
    getCountry(country);
  };

  // Search Country
  const getCountry = async (country) => {
    setLoading();
    // Today data
    const res = await Axios.get(
      `https://api.covid19api.com/dayone/country/${country}`
    );

    state.countryName = country;
    state.countryLastDay = res.data[res.data.length - 1];

    const resWeek = await Axios.get(
      `https://api.covid19api.com/total/country/${country}`
    );

    // Last week data
    state.countryData = resWeek.data
      .splice(resWeek.data.length - 7, res.data.length)
      .reverse();

    // Begin_____Must be simplest way to do this
    const countryDistructData = state.countryData.map((item, i, arr) => {
      return {
        confirmed: item.Confirmed,
        date: item.Date,
        diff: 0,
      };
    });

    const differencArr = countryDistructData.map((item, i, arr) => {
      if (i > 0) {
        return arr[i - 1].confirmed - item.confirmed;
      } else {
        return 0;
      }
    });

    differencArr.shift();
    state.countryData = countryDistructData.map((item, i) => {
      return {
        confirmed: item.confirmed,
        date: item.date.slice(0, 10).split('-').reverse().join('/'),
        diff: differencArr[i],
      };
    });
    console.log(state.countryData);
    // End_____Must be simplest way to do this

    dispatch({
      type: GET_COUNTRY,
      payload: {
        countryName: state.countryName,
        countryLastDay: state.countryLastDay,
        countryData: state.countryData,
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
        countryName: state.countryName,
        countryLastDay: state.countryLastDay,
        countryData: state.countryData,
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
