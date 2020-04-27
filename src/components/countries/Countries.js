import React, { useContext } from 'react';
import CountryCard from './CountryCard';
import Spinner from '../layout/Spinner';
import CovContext from '../context/cov/covContext';

const Countries = () => {
  const covContext = useContext(CovContext);

  const { loading, countriesStart, countrySelected } = covContext;

  // Spinner while loading countries
  if (loading) {
    return <Spinner />;
  } else {
    return <CountryCard />;
  }

  // if (countrySelected.length === 0) {
  //   return countriesStart.map((country) => {
  //     return (
  //       <CountryCard
  //         key={countriesStart.indexOf(country)}
  //         country={country}
  //       />
  //     );
  //   });
  // } else
  // {
  //   return <CountryCard country={countrySelected} />;
  // }
};

export default Countries;
