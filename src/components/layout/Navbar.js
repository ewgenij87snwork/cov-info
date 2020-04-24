import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className='navbar bg-primary'>
      <div className='title'>
        <div className='logo'>
          <h4>
            <svg width='20px' height='20px' className='figure-container'>
              <line x1='5px' y1='5px' x2='15px' y2='15px' />
              <circle cx='10px' cy='10px' r='10px' />
            </svg>
            <span>
              C<span className='red-o'>o</span>V
            </span>
          </h4>
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
