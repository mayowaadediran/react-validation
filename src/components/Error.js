import React from 'react';
import '../App.css'

const Error = ({error}) => {
  return (
      <span className='error'>{error}</span>
  );
}

export default Error;
