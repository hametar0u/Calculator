import React from 'react';

export function InputField(props) {
  //render the value of its key
  //some onClick crap
  return (
    <form onSubmit={props.formPreventDefault} >
        <input 
          type="text" 
          placeholder="Type here"
          value={props.displayValue} 
          onChange={props.onChange} 
          onKeyPress={props.onKeyPress}
        />
    </form>
  );
} 