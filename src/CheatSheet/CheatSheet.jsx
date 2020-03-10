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
        <p className='subtitle'>
          Everything you need for the AY19/20 Sem 2 Midterms
        </p>

        {/* <h2 className='cheatsheet__header'>Hardware/Software Stack</h2>
        <img src={StackImage} alt='Stack' /> */}
        <h2 className='cheatsheet__header'>Base Conversion</h2>
        <BaseConverter />

        {/* <h2 className='cheatsheet__header'>Evaluate Expression</h2> */}

        <h2 className='cheatsheet__header'>Number of Instructions</h2>
        <InstructionNumber />
        <h2 className='cheatsheet__header'>
          IEEE 754 Single-Precision Floating Point
        </h2>
        <FloatingPoint />
      </div>
    </div>
  );
};

export default CheatSheet;