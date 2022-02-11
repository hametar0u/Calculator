import React from 'react';

export function Display(props) {
  //render the value it is given from screen
  const displayValue = (
    props.displayValue != '' ? 
      <h2>{props.displayValue}</h2> : 
      <h2>Start by clicking the buttons below or typing in the input field</h2> 
  );

  return (
    displayValue
  );    

}