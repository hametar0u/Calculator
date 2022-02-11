import React from 'react';
import { Screen } from './Screen';

export class Calculator extends React.Component {
  //some constructor crap
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.formPreventDefault = this.formPreventDefault.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
    this.clearScreen = this.clearScreen.bind(this);
    this.state = { displayValue: '' };
  }
  //manipulates state and stuff
  handleInput(i) {
    var current = this.state.displayValue;
    this.setState({
      displayValue: current+i,
    });
    console.log(this.state.displayValue);
  }

  handleChange(event) {
    this.setState({displayValue: event.target.value});
  }

  onKeyUp(event) {
    if (event.charCode === 13) {
      this.handleEvaluate();
    }
  }

  formPreventDefault(e) { //prevents page from refreshing on enter
    e.preventDefault();
  }

  handleEvaluate() {
    const expression = this.state.displayValue;
    const result = evaluateInfix(expression);
    if (result != "ERROR: INVALID SYNTAX" && result != "ERROR: DIVIDE BY ZERO") {
      this.setState({ 
        displayValue: result,
      });
    }
    else {
      alert(result);
    }
  }

  clearScreen() {
    this.setState({ displayValue: '' });
  }

  render() {
    return(
      <div>
        <Screen 
          displayValue={this.state.displayValue} 
          onClick={i => this.handleInput(i)}
          onChange={e => this.handleChange(e)}
          onKeyPress={e => this.onKeyUp(e)}
          formPreventDefault={e => this.formPreventDefault(e)}
          handleEvaluate={this.handleEvaluate}
          clearScreen={this.clearScreen}
        />
      </div>
    );
  }
}

//helper functions
function evaluateInfix(expression) { //return a string that is either the result or an error message

    var nums = [];
    var operations = [];
    var i = 0;

    while (i < expression.length) {
        if (isdigit(expression[i])) {
            var num = "";
            while(i < expression.length && isdigit(expression[i])) {
                num += expression[i];
                i++;
            }
            nums.push(num);
        }
        else if (expression[i] == '.') {
            if (i+1 == expression.length || !isdigit(expression[i+1])) {
                return "ERROR: INVALID SYNTAX";
            }
            var num = ".";
            var trailing = false;
            if (i != 0 && isdigit(expression[i-1])) {
                trailing = true;
            }
            i++;
            while(i < expression.length && isdigit(expression[i])) {
                num += expression[i];
                i++;
            }
            if (trailing) {
                nums[nums.length-1] += num;
            }
            else {
                nums.push(num);
            }
        }
        else if (expression[i] == '(') {
            if (i+1 == expression.length || (isOperator(expression[i+1] && expression[i+1] != '-'))) {
                return "ERROR: INVALID SYNTAX";
            }
            operations.push(expression[i]);
            i++;
        }
        else if (expression[i] == ')') {
            //evaluate stuff in between brackets
            if (i == 0 || expression[i-1] == '(') {
                return "ERROR: INVALID SYNTAX";
            }
            while(top(operations) != '(') {
                if (!evaluateSingleOperation(nums, operations)) {
                    return "ERROR: DIVIDE BY 0";
                }
            }
            operations.pop(); //discard (
            i++;
        }
        else if (expression[i] == '-' && (i == 0 || isOperator(expression[i-1]) || expression[i-1] == '(')) { //'-' used as negative
            var num = "-";
            i++;
            while(i < expression.length && isdigit(expression[i])) {
                num += expression[i];
                i++;
            }
            nums.push(num);
        }
        else if (isOperator(expression[i])) {
            if (i == expression.length-1 || i == 0) {
                return "ERROR: INVALID SYNTAX";
            }
            while(!empty(operations) && precedence(top(operations)) >= expression[i]) {
                const status = evaluateSingleOperation(nums, operations);
                if (status != "SUCCESS") {
                    return status;
                }
            }
            operations.push(expression[i]);
            i++;
        }
        else {
            return "ERROR: INVALID SYNTAX";
        }
    }
    //evaluate remaining operations
    while(!empty(operations)) {
        const status = evaluateSingleOperation(nums, operations);
        if (status != "SUCCESS") {
            return status;
        }
    }
    
    if (!empty(operations) || empty(nums)) {
        return "ERROR: INVALID SYNTAX";
    }

    var result = top(nums); //multiply all the remaining numbers in nums to account for bracket multiplication (ie a(b))
    nums.pop();
    while(!empty(nums)) {
        result *= top(nums);
        nums.pop();
    }
    return result.toString();
}

//stack implementation helper functions
function top(arr) {
    return arr[arr.length-1];
}

function empty(arr) {
    return arr.length == 0;
}

//helper functions for evaluating infix
function evaluateSingleOperation(nums, operations) {
    if (empty(operations)) {
        return "ERROR: INVALID SYNTAX";
    }
    var operator = top(operations);
    operations.pop();
    var num2 = top(nums);
    nums.pop();
    if (operator == '/' && 1 + parseFloat(num2) == 1 ) {
        return "ERROR: DIVIDE BY ZERO";
    }
    if(empty(nums)) {
        return "ERROR: INVALID SYNTAX";
    }
    var num1 = top(nums);
    nums.pop();
    var result = applyOperation(num1, operator, num2);
    nums.push(result);
    return "SUCCESS";
}

function precedence(op) {
    if (op == '+' || op == '-') {
        return 0;
    } else { // * or /
        return 1;
    }
}

function isdigit(c) {
    return c >= '0' && c <= '9';
}

function isOperator(ch) {
    if (ch == '+' || ch == '-' || ch == '*' || ch == '/') {
        return true;
    } else {
        return false;
    }
}

function applyOperation(num1, op, num2) {
    var int1 = parseFloat(num1);
    var int2 = parseFloat(num2);
    if (op == '+') {
        return int1 + int2;
    }
    else if (op == '-') {
        return int1 - int2;
    }
    if (op == '*') {
        return int1 * int2;
    }
    if (op == '/') { //divide by 0 caught above
        return int1 / int2;
    }
}