import React from "react"
import Button from './Button'

const keys = [['C', '%', '+/-', '/'], ['7', '8', '9', '*'], ['4', '5', '6', '-'], ['1', '2', '3', '+'], ['JP', '0', '.', '=']]

const Keyboard = ({ onKeyPress }) => {
  return (
    <div className='keyboard'>
      {keys.flat().map(key => (
        <Button
          key={key}
          label={key}
          onClick={onKeyPress}
        />
      ))}
    </div>
  )
}

export default Keyboard