import React, { useContext, useState } from 'react';
import AlertContext from '../context/alert/alertContext';

const Search = () => {
  const alertContext = useContext(AlertContext);
  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === '') {
      alertContext.setAlert({
        alert: { msg: 'Please, enter text', type: 'light' },
      });
    } else {
      alertContext.removeAlert();
      setText('');
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit} className='search-form'>
        <input
          type='text'
          name='text'
          value={text}
          placeholder='Enter country...'
          onChange={onChange}
        />
        <input type='submit' value='Search' className='btn btn-dark'></input>
      </form>
    </div>
  );
};

export default Search;
