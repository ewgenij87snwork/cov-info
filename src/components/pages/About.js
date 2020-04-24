import React, { Fragment } from 'react';

function About() {
  return (
    <Fragment>
      <h1>About page</h1>
      <p className='lead'>
        This is just my practice in ReactJS on actual theme
      </p>
      <p>This page about... some statistics</p>

      <div className='my-3'>
        <h3>Contact:</h3>
        <ul>
          <li style={{ display: 'inline-block' }}>
            <a
              href='https://www.linkedin.com/in/ewgenij-sorokin-829b7b18a/'
              className='text-primary m'
            >
              <i class='fa fa-linkedin-square'></i> LinkedIn
            </a>
          </li>
          <li style={{ display: 'inline-block' }}>
            <a
              href='https://github.com/ewgenij87snwork'
              className='text-primary m'
            >
              <i class='fa fa-github-square'></i> Github
            </a>
          </li>
        </ul>
      </div>
    </Fragment>
  );
}

export default About;
