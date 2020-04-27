import React, { useContext } from 'react';
import CovContext from '../context/cov/covContext';

const Card = () => {
  const covContext = useContext(CovContext);
  const { countryName, countryLastDay, countryData } = covContext;

  if (countryLastDay) {
    const { Confirmed, Deaths } = countryLastDay;

    return (
      <div className='card card-cov my-2'>
        <h2 className='bg-light text-center'>{countryName}</h2>
        <div className='value-top  m-1 '>
          <div className='current-value lead badge badge-primary '>
            Current numbers: <br />
            <span className='large'>{Confirmed}</span>
          </div>
          <div className='current-value lead badge badge-primary'>
            Deaths: <br /> <span className=' large'>{Deaths}</span>
          </div>
        </div>
        <ul>
          <li className='head-table bg-light py-1 p '>
            <span className='date '>Date</span>
            <span className='number'>Number</span>
            <span className='diff'>Increase from previous day</span>
          </li>
          {countryData.map((item, i, arr) => {
            return (
              i < arr.length - 1 && (
                <li className='p' key={i}>
                  <span className='date text-light'>{item.date}</span>
                  <span className='number'>{item.confirmed}</span>
                  <span className='diff text-danger p-1'>
                    {item.diff > 0 ? `+ ${item.diff}` : '-'}
                  </span>
                </li>
              )
            );
          })}
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
  } else {
    return <h1>Nothing...</h1>;
  }
};

export default Card;
