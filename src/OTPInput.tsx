import React, { ReactNode, KeyboardEvent, CSSProperties } from 'react'

enum Key {
    BACKSPACE = "Backspace",
    ARROW_LEFT = "ArrowLeft",
    ARROW_RIGHT ="ArrowRight"
}

type OTPInputProps= {
    numOfInputs?: number,
    inputFieldWidth?: string,
    placeHolder?: string,
    fieldSeperator?: ReactNode,
    filedClassName?: string,
    containerClassName?: string
    autoFocus?: boolean,
    disabled?: boolean,
    isError?: boolean,
    isTypeNumber?: boolean,
    errorStyle?: Object, 
    inpuStyle?: Object,
    inputFocusStyle?: Object,
    onChange: (arg0: string) => string,
    value : string

}

const defaultOTPInputProps = {
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

}


const OTPInput = (otpInputProps: OTPInputProps) => {
    const props = {  ...defaultOTPInputProps, ...otpInputProps };
    const defaultValues = generateDefaultValue(props.numOfInputs, props.value.split(''));
    const [inputs, setInputs] = React.useState<Array<string>>(defaultValues);
    const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);
    const [activeInput, setActiveInput] = React.useState<number | null>(props.autoFocus ? 0 : null);
    const inputFieldType = props.isTypeNumber ? "number" : 'text';

    React.useEffect(() => {
        setInputs(defaultValues);
    },[props.numOfInputs,props.value])

    React.useEffect(() => {
        const input = inputRefs.current[activeInput!];
        input && input?.focus();
        input?.value && input.select();
    }, [activeInput]);


    const handleOnChange = (value: string, index: number): void => {

        let newValues = inputs;  
            newValues[index] = value;
        setInputs(newValues);
        if(index !== props.numOfInputs-1)
        setActiveInput(index + 1);
        
        if (props.onChange) {
            props.onChange(inputs.join(''))
        }
        
    }

    const handleOnKeyDown=(e: KeyboardEvent<HTMLInputElement>, index: number):void=> {
        
        const { key } = e;
        if (key === Key.BACKSPACE) {
            if (index !==-1) {
                e.preventDefault();
                let newValues = inputs;
                newValues[index] = '';
                setInputs(newValues);
                setActiveInput(index - 1);
                props.onChange(inputs.join(''))
                    
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

    }

    const  handleOnFocus=(e: React.FocusEvent<HTMLInputElement, Element>, index: number): void =>{
        e.target.select();
        setActiveInput(index);
        
    }

    const handleOnBlur=() => setActiveInput(null);
    


    const onInput = (e: React.FormEvent<HTMLInputElement>) => {
        e.currentTarget.value = e.currentTarget.value.slice(0, 1);
    }

  return (
      <div  className={props.containerClassName} style={{ display: "flex", alignItems: 'center' }}>{
          inputs.map((value, index) => (
              <div key={index} style={{ display: "flex", alignItems: 'center' }}>
                  <input ref={el => (inputRefs.current[index] = el)}
                      type={inputFieldType}
                      autoComplete="off"
                      value={value}
                      onChange={e => handleOnChange(e.target.value, index)}
                      onKeyDown={(e) => handleOnKeyDown(e, index)}
                      onFocus={(e) => handleOnFocus(e, index)}
                      onInput={e => onInput(e)}
                      onBlur={handleOnBlur}
                      name={`field${index}`}
                      placeholder={props.placeHolder}
                      className={props.filedClassName}
                      disabled={props.disabled}
                      style={Object.assign({}, props.inpuStyle, props.isError ? props.errorStyle : undefined, activeInput === index ? props.inputFocusStyle: undefined )}
        
                  />
                  {index !== props.numOfInputs - 1 && props.fieldSeperator}
              </div>
          ))
      }</div>
  )
}


export default OTPInput;


function generateDefaultValue(length: number, value: Array<string>) {
    if (length < 1) return []; 
    return Array.from({ length }, (_, i) => value[i] || '');
}