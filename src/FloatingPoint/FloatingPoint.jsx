import React, { useReducer } from "react";

import "./FloatingPoint.scss";

const FloatingPoint = () => {
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    originalDecimal: "",
    savedDecimal: "",
    error: "",
    binary: "",
    hex: ""
  });

  const convertHexIeeeToDec = value => {
    return (
      ((((value & 0x7fffff) | 0x800000) * 1.0) / Math.pow(2, 23)) *
      Math.pow(2, ((value >> 23) & 0xff) - 127)
    );
  };

  const assembleFloat = (sign, exponent, mantissa) => {
    return (sign << 31) | (exponent << 23) | mantissa;
  };

  const convertDecToHexIeee = value => {
    if (isNaN(value))
      // Special case: NaN
      return assembleFloat(0, 0xff, 0x1337); // Mantissa is nonzero for NaN

    var sign = value < 0 ? 1 : 0;
    value = Math.abs(value);
    if (value === 0.0)
      // Special case: +-0
      return assembleFloat(sign, 0, 0);

    var exponent = Math.floor(Math.log(value) / Math.LN2);
    if (exponent > 127 || exponent < -126)
      // Special case: +-Infinity (and huge numbers)
      return assembleFloat(sign, 0xff, 0); // Mantissa is zero for +-Infinity

    var mantissa = value / Math.pow(2, exponent);
    return assembleFloat(
      sign,
      exponent + 127,
      (mantissa * Math.pow(2, 23)) & 0x7fffff
    );
  };

  const handleDecimalChange = e => {
    const decimalValue = e.target.value;
    if (decimalValue === "" || !parseFloat(decimalValue)) {
      setState({
        originalDecimal: "",
        savedDecimal: "",
        error: "",
        binary: "",
        hex: ""
      });
      return;
    }
    let hexadecimalValue = convertDecToHexIeee(decimalValue);
    const savedDecimal = convertHexIeeeToDec(hexadecimalValue);
    const binaryValue = hexadecimalValue.toString(2).padStart(32, "0");
    hexadecimalValue = hexadecimalValue.toString(16).padStart(8, "0");
    setState({
      originalDecimal: decimalValue,
      savedDecimal: savedDecimal,
      error: parseFloat(savedDecimal) - parseFloat(decimalValue),
      binary: binaryValue,
      hex: "0x" + hexadecimalValue
    });
  };

  const handleHexadecimalChange = e => {
    if (e.target.value === "" || !parseInt(e.target.value, 16)) {
      setState({
        originalDecimal: "",
        savedDecimal: "",
        error: "",
        binary: "",
        hex: ""
      });
      return;
    }
    let hexadecimalValue = parseInt(e.target.value, 16);
    console.log(hexadecimalValue);
    const decimalValue = convertHexIeeeToDec(hexadecimalValue);
    const binaryValue = hexadecimalValue.toString(2).padStart(32, "0");
    hexadecimalValue = hexadecimalValue.toString(16).padStart(8, "0");
    setState({
      originalDecimal: decimalValue,
      savedDecimal: decimalValue,
      error: 0,
      binary: binaryValue,
      hex: "0x" + hexadecimalValue
    });
  };

  const handleBinaryChange = e => {
    if (e.target.value === "" || !parseInt(e.target.value, 2)) {
      setState({
        originalDecimal: "",
        savedDecimal: "",
        error: "",
        binary: "",
        hex: ""
      });
      return;
    }
    let binaryValue = parseInt(e.target.value, 2);
    let hexadecimalValue = parseInt(binaryValue.toString(16), 16);
    const decimalValue = convertHexIeeeToDec(hexadecimalValue);
    hexadecimalValue = hexadecimalValue.toString(16).padStart(8, "0");
    binaryValue = binaryValue.toString(2).padStart(32, "0");
    setState({
      originalDecimal: decimalValue,
      savedDecimal: decimalValue,
      error: 0,
      binary: binaryValue,
      hex: "0x" + hexadecimalValue
    });
  };

  return (
    <>
      <div className='floating__values'>
        <div className='floating__values-sign'>
          Sign
          <br />
          <span>{state.binary ? state.binary.slice(0, 1) : "No value"}</span>
        </div>
        <div className='floating__values-exponent'>
          Exponent
          <br />
          <span>{state.binary ? state.binary.slice(1, 10) : "No value"}</span>
        </div>
        <div className='floating__values-exponent'>
          Mantissa
          <br />
          <span>{state.binary ? state.binary.slice(10) : "No value"}</span>
        </div>
      </div>
      <div className='field floating'>
        <div className='control'>
          <label>Decimal Value</label>
          <input
            className='input is-large'
            type='text'
            placeholder='Decimal Floating Point'
            onBlur={handleDecimalChange}
            onChange={e => setState({ originalDecimal: e.target.value })}
            value={state.originalDecimal}
          />
        </div>
        <div className='control'>
          <label>Value actually stored</label>
          <input
            className='input is-large'
            type='text'
            placeholder='Saved Decimal Floating Point'
            readOnly
            value={state.savedDecimal}
          />
        </div>
        <div className='control'>
          <label>Error due to conversion</label>
          <input
            className='input is-large'
            type='text'
            placeholder='If any error occurs'
            readOnly
            value={state.error}
          />
        </div>
        <div className='control'>
          <label>Hexadecimal Value</label>
          <input
            className='input is-large'
            type='text'
            placeholder='Hexadecimal Value'
            onChange={e => setState({ hex: e.target.value })}
            onBlur={handleHexadecimalChange}
            value={state.hex}
          />
        </div>
        <div className='control'>
          <label>Binary Value</label>
          <input
            className='input is-large'
            type='text'
            placeholder='Binary Value'
            onChange={e => setState({ binary: e.target.value })}
            onBlur={handleBinaryChange}
            value={state.binary}
          />
        </div>
      </div>
    </>
  );
};

export default FloatingPoint;
