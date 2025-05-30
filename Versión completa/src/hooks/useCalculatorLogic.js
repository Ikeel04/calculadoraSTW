import { useState } from 'react'
import { useInputHandler } from './useInputHandler'

const useCalculatorLogic = () => {
  const [display, setDisplay] = useState('0')
  const [acc, setAcc] = useState(null)
  const [op, setOp] = useState(null)
  const [clear, setClear] = useState(false)

  const reset = () => {
    setDisplay('0')
    setAcc(null)
    setOp(null)
    setClear(false)
  }

  const { handleInput } = useInputHandler({
    display,
    acc,
    op,
    clear,
    setDisplay,
    setAcc,
    setOp,
    setClear,
    reset
  })

  return { display, handleInput }
}

export default useCalculatorLogic