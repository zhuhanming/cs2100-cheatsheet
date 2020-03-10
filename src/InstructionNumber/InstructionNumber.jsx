import React, { useReducer } from "react";

import "./InstructionNumber.scss";

const InstructionNumber = () => {
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    minimum: null,
    maximum: null
  });
  const handleChange = e => {
    if (e.target.value.length === 0) {
      setState({ minimum: null, maximum: null });
    }
    const input = e.target.value;
    let inputs = input
      .split(",")
      .map(x => x.trim())
      .filter(x => x !== "")
      .map(x => parseInt(x));
    inputs = inputs.sort((a, b) => a - b);
    let min = 0;
    let max = 0;
    for (let i = 0; i < inputs.length; i++) {
      const y = inputs[i];
      if (i === inputs.length - 1 && i === 0) {
        min += Math.pow(2, y);
      } else if (i === 0) {
        min += Math.pow(2, y) - 1;
      } else if (i === inputs.length - 1) {
        min += Math.pow(2, y - inputs[i - 1]);
      } else {
        min += Math.pow(2, y - inputs[i - 1]) - 1;
      }
    }
    for (let i = 0; i < inputs.length; i++) {
      const y = inputs[i];
      if (i === 0 && inputs.length === 1) {
        max += Math.pow(2, y);
      } else if (inputs.length - 1 - i > 1 && i === 0) {
        max +=
          (Math.pow(2, y) - 2) * Math.pow(2, inputs[inputs.length - 1] - y);
      } else if (inputs.length - 1 - i > 1) {
        max +=
          (Math.pow(2, y - inputs[i - 1]) - 2) *
          Math.pow(2, inputs[inputs.length - 1] - y);
      } else if (i === inputs.length - 1) {
        max += i;
      } else if (i === 0) {
        max +=
          (Math.pow(2, y) - 1) * Math.pow(2, inputs[inputs.length - 1] - y);
      } else {
        max +=
          (Math.pow(2, y - inputs[i - 1]) - 1) *
          Math.pow(2, inputs[inputs.length - 1] - y);
      }
    }
    setState({ minimum: min, maximum: max });
  };
  return (
    <div className='instruction'>
      <div className='field'>
        <label>Instruction Opcode Lengths</label>
        <div className='control'>
          <input
            className='input is-large'
            type='text'
            placeholder='Enter instruction opcode lengths separated by commas'
            onChange={handleChange}
          />
        </div>
      </div>

      <div className='instruction__results'>
        <div className='instruction__results-min'>
          Minimum
          <br />
          <span>{state.minimum ? state.minimum : "No value"}</span>
        </div>
        <div className='instruction__results-min'>
          Maximum
          <br />
          <span>{state.maximum ? state.maximum : "No value"}</span>
        </div>
      </div>
    </div>
  );
};

export default InstructionNumber;
