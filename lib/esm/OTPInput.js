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
import React from 'react';
var Key;
(function (Key) {
    Key["BACKSPACE"] = "Backspace";
    Key["ARROW_LEFT"] = "ArrowLeft";
    Key["ARROW_RIGHT"] = "ArrowRight";
})(Key || (Key = {}));
var defaultOTPInputProps = {
    numOfInputs: 4,
    inputFieldWidth: '50px',
    placeHolder: '*',
    fieldSeperator: '-',
    filedClassName: '',
    containerClassName: '',
    autoFocus: false,
    disabled: false,
    isError: false,
    isTypeNumber: true,
    inpuStyle: {
        border: 'none',
        outline: '2px solid gray',
        textAlign: 'center',
        width: "50px"
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
    var defaultValues = generateDefaultValue(props.numOfInputs, props.value.split(''));
    var _a = React.useState(defaultValues), inputs = _a[0], setInputs = _a[1];
    var inputRefs = React.useRef([]);
    var _b = React.useState(props.autoFocus ? 0 : null), activeInput = _b[0], setActiveInput = _b[1];
    var inputFieldType = props.isTypeNumber ? "number" : 'text';
    React.useEffect(function () {
        setInputs(defaultValues);
    }, [props.numOfInputs, props.value]);
    React.useEffect(function () {
        var input = inputRefs.current[activeInput];
        input && (input === null || input === void 0 ? void 0 : input.focus());
        (input === null || input === void 0 ? void 0 : input.value) && input.select();
    }, [activeInput]);
    var handleOnChange = function (value, index) {
        var newValues = inputs;
        newValues[index] = value;
        setInputs(newValues);
        if (index !== props.numOfInputs - 1)
            setActiveInput(index + 1);
        if (props.onChange) {
            props.onChange(inputs.join(''));
        }
    };
    var handleOnKeyDown = function (e, index) {
        var key = e.key;
        if (key === Key.BACKSPACE) {
            if (index !== -1) {
                e.preventDefault();
                var newValues = inputs;
                newValues[index] = '';
                setInputs(newValues);
                setActiveInput(index - 1);
                props.onChange(inputs.join(''));
            }
        }
        if (key === Key.ARROW_LEFT) {
            e.preventDefault();
            if (index !== 0) {
                setActiveInput(index - 1);
            }
        }
        else if (key === Key.ARROW_RIGHT) {
            e.preventDefault();
            if (index !== props.numOfInputs - 1) {
                setActiveInput(index + 1);
            }
        }
    };
    var handleOnFocus = function (e, index) {
        e.target.select();
        setActiveInput(index);
    };
    var handleOnBlur = function () { return setActiveInput(null); };
    var onInput = function (e) {
        e.currentTarget.value = e.currentTarget.value.slice(0, 1);
    };
    return (React.createElement("div", { className: props.containerClassName, style: { display: "flex", alignItems: 'center' } }, inputs.map(function (value, index) { return (React.createElement("div", { key: index, style: { display: "flex", alignItems: 'center' } },
        React.createElement("input", { ref: function (el) { return (inputRefs.current[index] = el); }, type: inputFieldType, autoComplete: "off", value: value, onChange: function (e) { return handleOnChange(e.target.value, index); }, onKeyDown: function (e) { return handleOnKeyDown(e, index); }, onFocus: function (e) { return handleOnFocus(e, index); }, onInput: function (e) { return onInput(e); }, onBlur: handleOnBlur, name: "field".concat(index), placeholder: props.placeHolder, className: props.filedClassName, disabled: props.disabled, style: Object.assign({}, props.inpuStyle, props.isError ? props.errorStyle : undefined, activeInput === index ? props.inputFocusStyle : undefined) }),
        index !== props.numOfInputs - 1 && props.fieldSeperator)); })));
};
export default OTPInput;
function generateDefaultValue(length, value) {
    if (length < 1)
        return [];
    return Array.from({ length: length }, function (_, i) { return value[i] || ''; });
}
