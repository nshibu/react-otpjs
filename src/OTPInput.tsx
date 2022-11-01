import React, { ReactNode, KeyboardEvent, CSSProperties } from 'react'

enum Key {
    BACKSPACE = "Backspace",
    ARROW_LEFT = "ArrowLeft",
    ARROW_RIGHT ="ArrowRight",
    ARROW_DOWN ="ArrowDown",
    ARROW_UP ="ArrowUp",
}

enum KeyCode {

 BACKSPACE = 8,
 LEFT_ARROW = 37,
 RIGHT_ARROW = 39,
 DELETE = 46,
 SPACEBAR = 32,
}

type OTPInputProps= {
    numOfInputs: number,
    placeHolder?: string,
    fieldSeperator?: ReactNode,
    filedClassName?: string,
    fieldWidth?: string,
    fieldHeight?:string,
    containerClassName?: string
    autoFocus?: boolean,
    disabled?: boolean,
    isError?: boolean,
    isTypeNumber?: boolean,
    errorStyle?: Object, 
    inpuStyle?: Object,
    inputFocusStyle?: Object,
    onChange: (otp: string) => void,

}

const defaultOTPInputProps = {
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

}


const OTPInput = (otpInputProps: OTPInputProps) => {
    const props = {  ...defaultOTPInputProps, ...otpInputProps };
    const defaultValues = [...Array(props.numOfInputs).fill('')];
    const [inputs, setInputs] = React.useState<Array<string>>(defaultValues);
    const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);
    const [activeInput, setActiveInput] = React.useState<number | null>(props.autoFocus ? 0 : null);
    const inputFieldType = props.isTypeNumber ? 'tel' : 'text';
    React.useEffect(() => {
        setInputs(defaultValues);
    },[props.numOfInputs])

    React.useEffect(() => {
        const input = inputRefs.current[activeInput!];
        input && input?.focus();
    }, [activeInput,inputRefs.current]);


    const handleFieldOnChange = (value: string,index: number): void => {
        if (isFieldValid(value)) {   
            addNewValues(value,index);
            chnageActiveInput(activeInput! + 1);
        }
    }

    const handleOnKeyDown=(e: KeyboardEvent<HTMLInputElement>,index: number):void=> {
        const { key,keyCode } = e;
        if (key === Key.BACKSPACE || keyCode === KeyCode.BACKSPACE) {
            e.preventDefault();
            addNewValues( '',index);
            chnageActiveInput(index - 1);
        }
        if (key === Key.ARROW_LEFT || keyCode === KeyCode.RIGHT_ARROW) {
            e.preventDefault();
            chnageActiveInput(index -1);
        }
        else if (key === Key.ARROW_RIGHT || keyCode === KeyCode.LEFT_ARROW) {
            e.preventDefault();
            chnageActiveInput(index + 1);
        } else if (key === Key.ARROW_UP || key === Key.ARROW_DOWN) {
            e.preventDefault();
        }

    }

    const addNewValues=(newValue: string,index: number) => {
        let oldArray = inputs;
        oldArray[index] = newValue;
        setInputs(oldArray);
        handleOnChange(inputs);
       
    }

    const chnageActiveInput = (index: number) => {
        const active = Math.max(Math.min(props.numOfInputs - 1, index), 0);
         setActiveInput(active);
    }

    const isFieldValid = (value: string): boolean => {
        const isValid = props.isTypeNumber ? !isNaN(parseInt(value)) : typeof value === 'string';
        return isValid && value.trim().length === 1;
    }

   
    const  handleOnFocus=(e: React.FocusEvent<HTMLInputElement, Element>, index: number): void =>{
        e.target.select();
        chnageActiveInput(index);  
    }

    const handleOnBlur = () => setActiveInput(null);
    
    const handleOnChange = (otp :Array<string>) => {
        props.onChange(otp.join(''));    
    }

  return (
      <div  className={props.containerClassName} style={{ display: "flex", alignItems: 'center' }}>{
          inputs.map((value, index) => (
              <div key={index}>
                  <input ref={el => (inputRefs.current[index] = el)}
                      type={inputFieldType}
                      autoComplete="off"
                      value={value}
                      onChange={e => handleFieldOnChange(e.target.value,index)}
                      onKeyDown={(e) => handleOnKeyDown(e,index)}
                      onFocus={(e) => handleOnFocus(e, index)}
                      onBlur={handleOnBlur}
                      name={`field${index}`}
                      placeholder={props.placeHolder}
                      className={props.filedClassName}
                      disabled={props.disabled}
                      maxLength={1}
                      
                      style={Object.assign({}, props.inpuStyle, props.isError ? props.errorStyle : undefined, activeInput === index ? props.inputFocusStyle: undefined,{width: props.fieldWidth,height:props.fieldHeight} )}
        
                  />
                  {index !== props.numOfInputs - 1 && props.fieldSeperator}
              </div>
          ))
      }</div>
  )
}


export default OTPInput;
