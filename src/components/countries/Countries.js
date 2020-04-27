import React, { useContext } from 'react';
import CountryCard from './CountryCard';
import Spinner from '../layout/Spinner';
import CovContext from '../context/cov/covContext';

const Countries = () => {
  const covContext = useContext(CovContext);

  const { loading, countriesStart, countrySelected, countryName } = covContext;

  // Spinner while loading countries
  if (loading) {
    return <Spinner />;
  } else {
    return countryName ? (
      <CountryCard />
    ) : (
      <h1 style={{ height: '70vh' }}>Please enter country name... </h1>
    );
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
