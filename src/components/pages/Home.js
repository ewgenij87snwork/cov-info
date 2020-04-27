import React, { Fragment } from 'react';
import Search from '../layout/Search';
import Countries from '../countries/Countries';

const Home = () => {
  return (
    <Fragment>
      <Search />
      <Countries />
    </Fragment>
  );
};

export default Home;
