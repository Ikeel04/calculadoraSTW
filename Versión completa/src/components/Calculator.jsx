import React from 'react'
import Display from './Display'
import Keyboard from './Keyboard'
import useCalculatorLogic from '../hooks/useCalculatorLogic'

const Calculator = () => {
  const { display, handleInput } = useCalculatorLogic()

  return (
    <div className='calculator'>
      <Display value={display} />
      <Keyboard onKeyPress={handleInput} />
    </div>
  )
}

export default Calculator