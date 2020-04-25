import React, { useContext } from 'react';
// import CovContext from '../context/cov/covContext';

const Card = ({ country }) => {
  // const covContext = useContext(CovContext);
  // const { countries } = covContext;
  return (
    <div className='card card-cov my-2'>
      <h2 className='bg-light text-center'>{country}</h2>
      <div className='value-top  m-1 '>
        <div className='current-value lead badge badge-primary '>
          Current numbers: <br />
          <span className='large'>29 999</span>
        </div>
        <div className='current-value lead badge badge-primary'>
          Death: <br /> <span className=' large'>999</span>
        </div>
      </div>
      <ul>
        <li className='head-table bg-light py-1 p '>
          <span className='date '>Date</span>
          <span className='number'>Number</span>
          <span className='diff'>Difference</span>
        </li>
        <li className='p'>
          <span className='date text-light'>21.10</span>
          <span className='number'>111000</span>
          <span className='diff text-danger'>+300</span>
        </li>
      </ul>
      <div className='proportion'>
        <div className='value'>
          Population: <br />
          <span className='value-number'>38,7 mln</span>
        </div>
        <div className='value'>
          Percent of population: <br />
          <span className='value-number'>0,03%</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
