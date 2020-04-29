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
    countryPopulation: null,
    countryPopulationPercentage: null,
    countryData: [],
    loading: false,
    textInput: '',
  };

  const [state, dispatch] = useReducer(CovReducer, initialState);

  // Format number
  const formatNumber = (number) => {
    return number.toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
  };

  // Set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  // Get Countries
  const getCountries = async () => {
    const res = await Axios.get(`https://api.covid19api.com/countries`);

    // Take names for all countries for autocomplete
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
    // Get country name with same first latters which user entering from array of all countries
    state.firstLettersArr = state.countries.filter(
      (country) =>
        country.substr(0, text.length).toUpperCase() === text.toUpperCase()
    );

    // From every elements from previous array make DOM-elements
    state.autocompleteArr = state.firstLettersArr.map((country, i) => (
      <div key={i} onClick={autocompleteClick}>
        <strong>{country.substr(0, text.length)}</strong>
        {''}
        {country.substr(text.length)}
        <input type='hidden' value={country} />
      </div>
    ));

    // Return entered symbol to <input>
    state.textInput = text;

    dispatch({
      type: AUTOCOMPLETE,
      payload: {
        autocompleteArr: state.autocompleteArr,
      },
    });
  };

  //Take selected country name
  const autocompleteClick = (e) => {
    e.preventDefault();
    const country = e.target.lastChild.value;
    getCountry(country);
  };

  // Take country data
  const getCountry = async (country) => {
    setLoading();
    state.countryName = country;

    // Today data
    const res = await Axios.get(
      `https://api.covid19api.com/total/country/${country}`
    );
    state.countryLastDay = res.data[res.data.length - 1];

    // Week data
    const resWeek = await Axios.get(
      `https://api.covid19api.com/total/country/${country}`
    );

    state.countryData = resWeek.data
      .splice(resWeek.data.length - 7, res.data.length)
      .reverse();

    // Begin_____Must be simplest way to do this
    const countryDistructData = state.countryData.map((item, i, arr) => {
      return {
        confirmed: item.Confirmed,
        date: item.Date,
        diff: '-',
      };
    });

    const differencArr = countryDistructData.map((item, i, arr) => {
      if (i > 0) {
        return arr[i - 1].confirmed - item.confirmed;
      } else {
        return '-';
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

    state.countryLastDay.date = state.countryData[0].date;
    // End_____Must be simplest way to do this

    // Population
    const resPopulation = await Axios.get(
      `https://restcountries.eu/rest/v2/name/${country}`
    );
    state.countryPopulation = formatNumber(resPopulation.data[0].population);
    state.countryPopulationPercentage = (
      (state.countryLastDay.Confirmed / resPopulation.data[0].population) *
      100
    ).toFixed(4);

    dispatch({
      type: GET_COUNTRY,
      payload: {
        countryName: state.countryName,
        countryLastDay: state.countryLastDay,
        countryData: state.countryData,
        countryPopulation: state.countryPopulation,
        countryPopulationPercentage: state.countryPopulationPercentage,
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
        countryPopulationPercentage: state.countryPopulationPercentage,
        countryPopulation: state.countryPopulation,
        countryLastDay: state.countryLastDay,
        countryData: state.countryData,
        getCountries,
        autocomplete,
        getCountry,
        formatNumber,
      }}
    >
      {props.children}
    </CovContext.Provider>
  );
};

export default CovState;
