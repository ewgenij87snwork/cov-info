import React, { useContext } from 'react';
import CountryCard from './CountryCard';
import Spinner from '../layout/Spinner';
import CovContext from '../context/cov/covContext';

const Countries = () => {
  const covContext = useContext(CovContext);

  const { loading, countryName } = covContext;

  // Spinner while loading countries
  return loading ? (
    <Spinner />
  ) : countryName ? (
    <CountryCard />
  ) : (
    <h3 className='conutries-title my-1'>Please enter country name... </h3>
  );
};

// For next step:

// const { loading, countriesStart, countrySelected, countryName } = covContext;
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

export default Countries;
