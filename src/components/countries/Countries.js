import React, { useContext } from 'react';
import CountryCard from './CountryCard';
import Spinner from '../layout/Spinner';
import CovContext from '../context/cov/covContext';

const Countries = () => {
  const covContext = useContext(CovContext);

  const { loading, countries } = covContext;

  // Spinner while loading countries
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div>
        <h1>Yessssssssssss</h1>
        {/* {countries.map((country) => {
          return (
            <CountryCard key={countries.indexOf(country)} country={country} />
          );
        })} */}
      </div>
    );
  }
};

export default Countries;
