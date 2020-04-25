import React, { Fragment } from 'react';
import Search from '../layout/Search';
import Countries from '../countries/Countries';
// import Spinner from '../layout/Spinner';

const Home = () => {
  return (
    <Fragment>
      <Search />
      <Countries />
      {/* <Spinner /> */}
    </Fragment>
  );
};

export default Home;
