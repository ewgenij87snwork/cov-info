import React, { useContext } from 'react';
import CovContext from '../context/cov/covContext';

const Card = () => {
  const covContext = useContext(CovContext);
  const {
    countryName,
    countryPopulation,
    countryLastDay,
    countryData,
    countryPopulationPercentage,
    formatNumber,
  } = covContext;

  if (countryLastDay) {
    const { Confirmed, Deaths, date } = countryLastDay;

    return (
      <div className='card card-cov my-2'>
        <h2 className='bg-light text-center'>
          {countryName} <p className='lead text-primary'>{date}</p>
        </h2>
        <div className='value-top  m-1'>
          <div className='current-value lead badge badge-primary '>
            Current numbers: <br />
            <span className='large'>{formatNumber(Confirmed)}</span>
          </div>
          <div className='current-value lead badge badge-primary'>
            Deaths: <br /> <span className=' large'>{Deaths}</span>
          </div>
        </div>
        <ul className='my'>
          <li className='head-table bg-light py'>
            <span className='date '>Date</span>
            <span className='number'>Number</span>
            <span className='diff'>Increase from previous day</span>
          </li>
          {countryData.map((item, i, arr) => {
            return (
              i < arr.length - 1 && (
                <li className='p' key={i}>
                  <span className='date text-light'>{item.date}</span>
                  <span className='number'>{formatNumber(item.confirmed)}</span>
                  <span className='diff text-danger'>
                    {item.diff > 0 ? `+ ${formatNumber(item.diff)}` : '-'}
                  </span>
                </li>
              )
            );
          })}
        </ul>
        <div className='proportion'>
          <div className='value'>
            Country Population: <br />
            <span className='value-number'>{countryPopulation}</span>
          </div>
          <div className='value'>
            Percentage infected: <br />
            <span className='value-number'>
              {countryPopulationPercentage} %
            </span>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Nothing...</h1>;
  }
};

export default Card;
