import './App.css';
import * as React from "react"
import {OTPInput} from "react-otpjs"


function App() {
  const [state, setState] = React.useState({ numOfInputs: 4 });
  const [value, setValue] = React.useState('');
  
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  }
  return (
    <div className="container">
    
      <div className="sidebar">
        <div className="sidebar-wrapper">
          <div className="input-group">
            <label>Number of Inputs</label>
            <input type="number" value={state.numOfInputs} name="numOfInputs" onChange={handleOnChange} placeholder="Number of Inputs" min={0} max={10} />
          </div>
        </div>
       </div>
      <div className="demo">
        <div className="demo-wrapper">
          <OTPInput
            onChange={(otp) => {
              setValue(otp);
            }}
            value={value}
            autoFocus={true}
            isTypeNumber={false}
            numOfInputs={state.numOfInputs}
            filedClassName="input-field"
            fieldSeperator={<span>-</span>}
          />
        </div>

        <div style={{margin: '100px'}}>
          OTP Value - {value}
        </div>
        <div className="code-wrapper">
          <code>
            <pre>

            {`<OTPInput numOfInputs={${state.numOfInputs}}  />`
            }
            </pre>
          </code>

        </div>
        </div>
      
    </div>
  );
}

export default App;
