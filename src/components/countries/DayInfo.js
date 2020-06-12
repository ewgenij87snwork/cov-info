import React, { useContext } from 'react';
import CovContext from '../context/cov/covContext';

const DayInfo = ({ item: { date, confirmed, diff } }) => {
  const covContext = useContext(CovContext);

  const { formatNumber } = covContext;

  return (
    <li className='p'>
      <span className='date text-light'>{date}</span>
      <span className='number'>{formatNumber(confirmed)}</span>
      <span className='diff text-danger'>
        {diff > 0 ? `+ ${formatNumber(diff)}` : '-'}
      </span>
    </li>
  );
};

export default DayInfo;
