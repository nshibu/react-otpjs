# react-otpjs
[![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)](https://opensource.org/licenses/MIT) [![Generic badge](https://img.shields.io/badge/Version-0.0.0-<COLOR>.svg)](https://shields.io/)



A react-otpjs is a simple fully customizable react OTP field component.

## Installation

#### To install the latest stable version:

Using yarn

    yarn add react-otpjs

Using npm

    npm i react-otpjs
## Basic Usage

    import React, { useState } from 'react';
    import OTPInput from 'react-otpjs';
    const App = () => {
    const [value, setValue] = useState('');
    return (
          <OTPInput
          value={value}
          onChange={setValue}
          numInputs={4}
          />
       );
     };
           



