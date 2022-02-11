Overview:
Supports basic decimal arithmetic for infix expressions.

Bracket multiplication is supported. To do negative numbers, use the '-' where appropriate.

To input your input, either type in the input field provided and press "enter", or use the buttons and click the "=" button.

Examples with valid syntax:

1(-2)
-3
4*-5
48
.9+.6
.9(.6)

Example with invalid syntax:
1(
()
4*
4(+3)
a
8()
7**7

=====================================================================

/*
components:
1. Calculator
2. Screen
3. Display
4. InputField
5. InputButton

*/

/*
Hierarchy:
Calculator
  Screen
    Input Buttons, Input Field, Evaluate Button
*/

/*
Descriptions:
// Calculator //
- Stores Calculation History
- performs calculations
  - determine correct syntax

// Screen //
- routes information and renders the display and input buttons

// Display //
- displays current characters being typed out
- Displays result of calculation by displaying the result passed in from calculator superclass

// Input Field //
- allows the user to type their expression

// Input buttons //
- gives the user another option to input their expression

// evaluation button //
- triggers calculator to evaluate whatever is in the input field

 */