var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React from 'react';
var Key;
(function (Key) {
    Key["BACKSPACE"] = "Backspace";
    Key["ARROW_LEFT"] = "ArrowLeft";
    Key["ARROW_RIGHT"] = "ArrowRight";
    Key["ARROW_DOWN"] = "ArrowDown";
    Key["ARROW_UP"] = "ArrowUp";
})(Key || (Key = {}));
var KeyCode;
(function (KeyCode) {
    KeyCode[KeyCode["BACKSPACE"] = 8] = "BACKSPACE";
    KeyCode[KeyCode["LEFT_ARROW"] = 37] = "LEFT_ARROW";
    KeyCode[KeyCode["RIGHT_ARROW"] = 39] = "RIGHT_ARROW";
    KeyCode[KeyCode["DELETE"] = 46] = "DELETE";
    KeyCode[KeyCode["SPACEBAR"] = 32] = "SPACEBAR";
})(KeyCode || (KeyCode = {}));
var defaultOTPInputProps = {
    numOfInputs: 4,
    placeHolder: '*',
    fieldSeperator: '-',
    filedClassName: '',
    containerClassName: '',
    fieldWidth: '50px',
    fieldHeight: '50px',
    autoFocus: false,
    disabled: false,
    isError: false,
    isTypeNumber: true,
    inpuStyle: {
        border: 'none',
        outline: '2px solid gray',
        textAlign: 'center',
    },
    errorStyle: {
        outline: '2px solid red',
        border: 'none',
    },
    inputFocusStyle: {
        outline: '2px solid green',
    }
};
var OTPInput = function (otpInputProps) {
    var props = __assign(__assign({}, defaultOTPInputProps), otpInputProps);
    var defaultValues = __spreadArray([], Array(props.numOfInputs).fill(''), true);
    var _a = React.useState(defaultValues), inputs = _a[0], setInputs = _a[1];
    var inputRefs = React.useRef([]);
    var _b = React.useState(props.autoFocus ? 0 : null), activeInput = _b[0], setActiveInput = _b[1];
    var inputFieldType = props.isTypeNumber ? 'tel' : 'text';
    React.useEffect(function () {
        setInputs(defaultValues);
    }, [props.numOfInputs]);
    React.useEffect(function () {
        var input = inputRefs.current[activeInput];
        input && (input === null || input === void 0 ? void 0 : input.focus());
    }, [activeInput, inputRefs.current]);
    var handleFieldOnChange = function (value, index) {
        if (isFieldValid(value)) {
            addNewValues(value, index);
            chnageActiveInput(activeInput + 1);
        }
    };
    var handleOnKeyDown = function (e, index) {
        var key = e.key, keyCode = e.keyCode;
        if (key === Key.BACKSPACE || keyCode === KeyCode.BACKSPACE) {
            e.preventDefault();
            addNewValues('', index);
            chnageActiveInput(index - 1);
        }
        if (key === Key.ARROW_LEFT || keyCode === KeyCode.RIGHT_ARROW) {
            e.preventDefault();
            chnageActiveInput(index - 1);
        }
        else if (key === Key.ARROW_RIGHT || keyCode === KeyCode.LEFT_ARROW) {
            e.preventDefault();
            chnageActiveInput(index + 1);
        }
        else if (key === Key.ARROW_UP || key === Key.ARROW_DOWN) {
            e.preventDefault();
        }
    };
    var addNewValues = function (newValue, index) {
        var oldArray = inputs;
        oldArray[index] = newValue;
        setInputs(oldArray);
        handleOnChange(inputs);
    };
    var chnageActiveInput = function (index) {
        var active = Math.max(Math.min(props.numOfInputs - 1, index), 0);
        setActiveInput(active);
    };
    var isFieldValid = function (value) {
        var isValid = props.isTypeNumber ? !isNaN(parseInt(value)) : typeof value === 'string';
        return isValid && value.trim().length === 1;
    };
    var handleOnFocus = function (e, index) {
        e.target.select();
        chnageActiveInput(index);
    };
    var handleOnBlur = function () { return setActiveInput(null); };
    var handleOnChange = function (otp) {
        props.onChange(otp.join(''));
    };
    return (React.createElement("div", { className: props.containerClassName, style: { display: "flex", alignItems: 'center' } }, inputs.map(function (value, index) { return (React.createElement("div", { key: index },
        React.createElement("input", { ref: function (el) { return (inputRefs.current[index] = el); }, type: inputFieldType, autoComplete: "off", value: value, onChange: function (e) { return handleFieldOnChange(e.target.value, index); }, onKeyDown: function (e) { return handleOnKeyDown(e, index); }, onFocus: function (e) { return handleOnFocus(e, index); }, onBlur: handleOnBlur, name: "field".concat(index), placeholder: props.placeHolder, className: props.filedClassName, disabled: props.disabled, maxLength: 1, style: Object.assign({}, props.inpuStyle, props.isError ? props.errorStyle : undefined, activeInput === index ? props.inputFocusStyle : undefined, { width: props.fieldWidth, height: props.fieldHeight }) }),
        index !== props.numOfInputs - 1 && props.fieldSeperator)); })));
};
export default OTPInput;
