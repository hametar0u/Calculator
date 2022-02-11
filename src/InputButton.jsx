import React from 'react';

export function InputButton(props) {
  //render the value of its key
  //some onClick crap
  return (
    <button onClick={props.onClick}>
      {props.value}
    </button>
  );
} 
