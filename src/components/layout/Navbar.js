import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
const Navbar = () => {
  return (
    <nav className='navbar bg-primary'>
      <div className='title'>
        <div className='logo'>
          <img src={logo} alt='cov-info' />
        </div>
        <h1>COV-INFO</h1>
      </div>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
