import React, { useReducer } from 'react';
import { GET_COUNTRIES, SET_LOADING, AUTOCOMPLETE } from '../types';
import CovContext from './covContext';
import CovReducer from './covReducer';
import Axios from 'axios';

const CovState = (props) => {
  const initialState = {
    countries: [],
    autocompleteArr: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(CovReducer, initialState);

  // Hello! Can You help me with find instructions to use arcgis?
  // I saw your project in group Facebook ("First work in FrontEnd") it is very good! And a lot of code!
  // I also want make something from Udemy course for statistics about Covid. This is will be simplest -- just consolidate my knowledge and go study other lessons... Not yet study Postman...

  // Now I understand what will make site without techology arcgis, but it ist very interesting techology and maybe leter with bette knowledge I try to do something.

  // Set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  // Get Countries
  const getCountries = async () => {
    const res = await Axios.get(`https://api.covid19api.com/countries`);

    let allarray = res.data;
    const countries = allarray.map((item) => {
      return item.Country;
    });
    dispatch({
      type: GET_COUNTRIES,
      payload: countries,
    });
  };

  // Autocomplete
  const autocomplete = (text) => {
    state.autocompleteArr = state.countries.filter(
      (country) =>
        country.substr(0, text.length).toUpperCase() === text.toUpperCase()
    );
    state.autocompleteArr = state.autocompleteArr.map((country) => (
      <div
        key={state.autocompleteArr.indexOf(country)}
        onClick={autocompleteClick}
      >
        <strong>{country.substr(0, text.length)}</strong>
        {''}
        {country.substr(text.length)}
        <input type='hidden' value={country} />
      </div>
    ));

    // onclick + поиск страны + формирование массива из 7 данных
    dispatch({
      type: AUTOCOMPLETE,
      payload: state.autocompleteArr,
    });
  };

  // Take value from click on autocomlete search country
  const autocompleteClick = (e) => {
    e.preventDefault();
    const country = e.target.lastChild.value;
    const autocompleteBlock = e.target.parentNode;

    autocompleteBlock.innerHTML = '';

    getCountry(country);
  };

  // Search Country
  const getCountry = async (country) => {
    setLoading();
    const res = await Axios.get(
      `https://api.covid19api.com/total/country/${country}`
    );
    console.log(res.data);
  };
  return (
    <CovContext.Provider
      value={{
        countries: state.countries,
        loading: state.loading,
        autocompleteArr: state.autocompleteArr,
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
