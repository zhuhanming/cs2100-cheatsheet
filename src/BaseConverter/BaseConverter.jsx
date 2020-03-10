/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useReducer } from "react";
import { toast } from "react-toastify";

import "./BaseConverter.scss";

const BaseConverter = () => {
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    inputBase: 10,
    inputValue: null,
    outputBase: 2,
    outputValue: null,
    isDropdownActive: false,
    complement: 2,
    isError: false
  });

  const getResult = () => {
    if (state.isError) {
      return "Error!";
    }
    if (!(state.inputBase && state.inputValue && state.outputBase)) {
      return "";
    }
    if (!parseInt(state.inputValue, state.inputBase)) {
      return "Check your inputs!";
    }
    if (state.outputBase !== 2) {
      return parseInt(state.inputValue, state.inputBase).toString(
        state.outputBase
      );
    }
    let origValue = parseInt(state.inputValue, state.inputBase).toString(
      state.outputBase
    );
    if (state.complement === 3) {
      return origValue;
    }
    if (!origValue.startsWith("-")) {
      while (parseInt(origValue, 2) > Math.pow(2, origValue.length - 1) - 1) {
        origValue = "0" + origValue;
      }
      return origValue;
    }
    let result = "";
    for (let i = 1; i < origValue.length; i++) {
      if (origValue.charAt(i) === "0") {
        result += "1";
      } else {
        result += "0";
      }
    }
    if (state.complement === 1) {
      return "1" + result;
    }
    let n = 0;
    let curr = parseInt(state.inputValue, state.inputBase);
    while (curr < -Math.pow(2, n - 1)) {
      n += 1;
    }
    return (Math.pow(2, n) + parseInt(curr))
      .toString(state.outputBase)
      .replace("-", "");
  };

  return (
    <>
      <div className='field base-converter'>
        <div className='control base-converter__base'>
          <label>Base</label>
          <input
            className='input is-large'
            type='text'
            placeholder='Base'
            defaultValue={state.inputBase}
            onChange={e => {
              const value = parseInt(e.target.value);
              if (value <= 32 && value >= 2) {
                setState({ inputBase: value, isError: false });
              }
            }}
            onBlur={e => {
              const value = parseInt(e.target.value);
              if (value > 32 || value < 2) {
                toast.error("Only bases between 2 and 32 are supported!");
                setState({ isError: true });
                return;
              }
              return;
            }}
          />
        </div>
        &nbsp;&nbsp;
        <div className='control base-converter__value'>
          <label>Value to convert</label>
          <input
            className='input is-large'
            type='text'
            placeholder='Enter number here'
            onChange={e => {
              setState({ inputValue: e.target.value });
            }}
          />
        </div>
      </div>
      <div className='field base-converter'>
        <div className='control base-converter__base'>
          <label>Base</label>
          <input
            className='input is-large'
            type='text'
            placeholder='Base'
            defaultValue={state.outputBase}
            onChange={e => {
              const value = parseInt(e.target.value);
              if (value <= 32 && value >= 2) {
                setState({ outputBase: value, isError: false });
              }
            }}
            onBlur={e => {
              const value = parseInt(e.target.value);
              if (value > 32 || value < 2) {
                toast.error("Only bases between 2 and 32 are supported!");
                setState({ isError: true });
                return;
              }
              return;
            }}
          />
        </div>
        &nbsp;&nbsp;
        <div className='control base-converter__value'>
          <label>Result</label>
          <div className='base-converter__input'>
            <input
              className='input is-large'
              type='text'
              placeholder='Result will show here'
              value={getResult()}
              readOnly
            />
            {state.outputBase === 2 && (
              <div className='dropdown is-right is-hoverable'>
                <div className='dropdown-trigger'>
                  <button
                    className='button'
                    aria-haspopup='true'
                    aria-controls='dropdown-menu'
                  >
                    <span>
                      {state.complement === 1
                        ? "1s"
                        : state.complement === 2
                        ? "2s"
                        : "N"}
                    </span>
                    <span className='icon is-small'>
                      <i className='fas fa-angle-down' aria-hidden='true'></i>
                    </span>
                  </button>
                </div>

                <div className='dropdown-menu' id='dropdown-menu' role='menu'>
                  <div className='dropdown-content'>
                    <a
                      onClick={() => {
                        setState({ complement: 1 });
                      }}
                      className={`dropdown-item ${
                        state.complement === 1 ? "is-active" : ""
                      }`}
                    >
                      1s
                    </a>
                    <a
                      onClick={() => {
                        setState({ complement: 2 });
                      }}
                      className={`dropdown-item ${
                        state.complement === 2 ? "is-active" : ""
                      }`}
                    >
                      2s
                    </a>
                    <a
                      onClick={() => {
                        setState({ complement: 3 });
                      }}
                      className={`dropdown-item ${
                        state.complement === 3 ? "is-active" : ""
                      }`}
                    >
                      Neither
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BaseConverter;
