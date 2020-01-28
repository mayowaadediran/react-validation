import React from 'react';

const Button = ({text, disabled}) => {
  return (
    <div className='submit'>
      <button disabled={disabled}>{text}</button>
    </div>
  );
}

export default Button;
