import React, { Fragment } from 'react';

function About() {
  return (
    <Fragment>
      <h1>About page</h1>
      <p className='lead'>
        I've made this site for consolidate knowledge gained from the course of
        the Udemy.
      </p>

      <div className='my-3'>
        <h3>Contact:</h3>
        <ul>
          <li style={{ display: 'inline-block' }}>
            <a
              href='https://www.linkedin.com/in/ewgenij-sorokin-829b7b18a/'
              className='text-primary m'
            >
              <i class='fab fa-linkedin'></i> LinkedIn
            </a>
          </li>
          <li style={{ display: 'inline-block' }}>
            <a
              href='https://github.com/ewgenij87snwork'
              className='text-primary m'
            >
              <i class='fab fa-github-square'></i> Github
            </a>
          </li>
        </ul>
      </div>
    </Fragment>
  );
}

export default About;
