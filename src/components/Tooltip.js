import React from 'react';
import '../App.css';

const Tooltip = ({tip}) => {
  return (
      <div class="popout-menu">{tip}</div>
  );
}

export default Tooltip;
