import React from 'react';
import { Display } from './Display';
import { InputButton } from './InputButton';
import { InputField } from './InputField';

const buttonValues = [
  ["7","8","9","+"],
  ["4","5","6","-"],
  ["1","2","3","*"],
  ["0",".","(",")","/"]
];

export class Screen extends React.Component {
  renderInputButton(buttonVal) {
    return(
      <td>
        <InputButton 
          key={buttonVal} 
          value={buttonVal}
          onClick={() => this.props.onClick(buttonVal)} 
        />
      </td>
    );
  }

  render() {
  return ( // how do I split the calc into 
    <div>
      <Display displayValue={this.props.displayValue} />
      <InputField 
        displayValue={this.props.displayValue} 
        onChange={this.props.onChange} 
        onKeyPress={this.props.onKeyPress}
        formPreventDefault={this.props.formPreventDefault}
      />
      <table>
      <tbody>
            <tr>
              {this.renderInputButton("7")}
              {this.renderInputButton("8")}
              {this.renderInputButton("9")}
              {this.renderInputButton("+")}
              {this.renderInputButton("(")}
            </tr>
            <tr>
              {this.renderInputButton("4")}
              {this.renderInputButton("5")}
              {this.renderInputButton("6")}
              {this.renderInputButton("-")}
              {this.renderInputButton(")")}
            </tr>
            <tr>
              {this.renderInputButton("1")}
              {this.renderInputButton("2")}
              {this.renderInputButton("3")}
              {this.renderInputButton("*")}
            </tr>
            <tr>
              {this.renderInputButton("0")}
              {this.renderInputButton(".")}
              <button key="evaluate" onClick={this.props.handleEvaluate} >
                =
              </button>
              {this.renderInputButton("/")}
            </tr>
      </tbody>
      </table>
      <br />
      
        <button key="clear" onClick={this.props.clearScreen} >
          clear
        </button>
    </div>
  );
  }

}

// <Display displayValue={this.state.displayValue} />

// export function Screen() {
//   var displayValue;

//   function handleClick() {
//     alert("I have been clicked");

//   }

//   const buttonValues = [
//     ["7","8","9","+"],
//     ["4","5","6","-"],
//     ["1","2","3","*"],
//     ["0","/"]
//   ];

//   return ( // how do I split the calc into 
//     <div>
//       <Display value={displayValue} />
//       <table>
//         {buttonValues.map((rows, index) => {
//           return (
//             <tr>
//               {rows.map((buttonVal, sIndex) => {
//                 return(
//                   <td>
//                     <InputButton 
//                       key={buttonVal} 
//                       value={buttonVal}
//                       onClick={handleClick} 
//                     />
//                   </td>
//                 );
//               })}
//             </tr>
//           );
//         })}
//       </table>
//       <br />
//       <EvaluationButton />
//     </div>
//   );

// }

