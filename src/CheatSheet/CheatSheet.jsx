import React from "react";

// import StackImage from "../images/stack.png";
import BaseConverter from "../BaseConverter";
import InstructionNumber from "../InstructionNumber";

import "./CheatSheet.scss";
import FloatingPoint from "../FloatingPoint";

const CheatSheet = () => {
  return (
    <div className='cheatsheet columns is-centered is-paddingless is-marginless'>
      <div className='column is-full-mobile is-two-thirds-desktop'>
        <h1 className='cheatsheet__title'>CS2100 Cheatsheet</h1>
        <p className='subtitle'>Every tool you might need for this module.</p>

        {/* <h2 className='cheatsheet__header'>Hardware/Software Stack</h2>
        <img src={StackImage} alt='Stack' /> */}

        <h2 className='cheatsheet__header'>Base Conversion</h2>
        <BaseConverter />

        <h2 className='cheatsheet__header'>
          IEEE 754 Single-Precision Floating Point
        </h2>
        <FloatingPoint />

        {/* <h2 className='cheatsheet__header'>Evaluate Expression</h2> */}

        <h2 className='cheatsheet__header'>Number of Instructions</h2>
        <InstructionNumber />

        <footer className='cheatsheet__footer'>
          <p>
            Project by{" "}
            <a
              href='https://github.com/zhuhanming'
              target='_blank'
              rel='noopener noreferrer'
            >
              zhuhanming
            </a>
          </p>
          <p>For NUS CS2100.</p>
        </footer>
      </div>
    </div>
  );
};

export default CheatSheet;
