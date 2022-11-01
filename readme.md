# react-otpjs
[![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)](https://opensource.org/licenses/MIT) [![Generic badge](https://img.shields.io/badge/Version-0.0.2-<COLOR>.svg)](https://shields.io/)



A react-otpjs is a simple fully customizable react OTP field component.

## Demo
| [Codesandbox Demo](https://codesandbox.io/s/react-otpjs-g02w4s?file=/src/App.js) | [Interactive Demo](http://shibu.dev) |
|--|--|



## Installation

#### To install the latest stable version:

Using yarn

    yarn add react-otpjs

Using npm

    npm i react-otpjs
## Basic Usage

    import React, { useState } from 'react';
    import  { OTPInput } from "react-otpjs";
    const App = () => {
    const [value, setValue] = useState('');
    return (
          <OTPInput
          value={value}
          onChange={(otp)=>setValue(otp)}
          numInputs={4}
          />
       );
     };
           

## API
|Name| Type | Required | Default
|--|--|--| --|
| numOfInputs | number  |true| 
|fieldWidth|string|false| 50px
|fieldHeight|sring|false|50px
|placeHolder|string|false|*
|fieldSeperator|ReactNode|false| -
|filedClassName|string| false| 
|containerClassName|string|false|
|autoFocus|boolean|false|false
|disabled|boolean|false|false
|isError|boolean|false|false
|isTypeNumber|boolean|false|true
|errorStyle|Object|false| [Visit Documentation](https://shibu.dev)`
|inpuStyle|Object|false| [Visit Documentation](https://shibu.dev)`
|inputFocusStyle|Object|false| [Visit Documentation](https://shibu.dev)`
|onChange|Function |true|[Visit Documentation](https://shibu.dev)`

