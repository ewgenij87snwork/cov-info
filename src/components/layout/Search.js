import React, { useContext, useState, useEffect } from 'react';
import AlertContext from '../context/alert/alertContext';
import CovContext from '../context/cov/covContext';

const Search = () => {
  const alertContext = useContext(AlertContext);
  const covContext = useContext(CovContext);
  // const [text, setText] = useState('');
  const { getCountry, getCountries, autocompleteArr, textInput } = covContext;

  useEffect(() => {
    getCountries();
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    covContext.autocomplete(e.target.value);
  };
  // setText(textInput);

  const onSubmit = (e) => {
    e.preventDefault();
    if (textInput === '') {
      alertContext.setAlert({
        alert: { msg: 'Please, enter text', type: 'light' },
      });
    } else {
      alertContext.removeAlert();
      getCountry(textInput);
      // setText('');
    }
  };

  return (
    <div className='search-container'>
      <form onSubmit={onSubmit} className='search-form' autoComplete='off'>
        <div className='autocomplete'>
          <input
            type='text'
            name='text'
            value={textInput}
            placeholder='Enter country...'
            onChange={onChange}
          />
          <div className='autocomplete-items'>{autocompleteArr}</div>
        </div>
        <input type='submit' value='Search' className='btn btn-dark'></input>
      </form>
    </div>
  );
};

export default Search;