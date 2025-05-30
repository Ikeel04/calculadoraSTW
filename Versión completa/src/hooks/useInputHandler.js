import { calc, safeValue } from '../utils/logicUtils'

export const useInputHandler = ({
  display, acc, op, clear,
  setDisplay, setAcc, setOp,
  setClear, reset
}) => {
  const handleInput = key => {
    if (display === 'ERROR' || key === 'C') return reset()
    if (/\d|\./.test(key)) return inputNumber(key)
    if ('+-*/%'.includes(key)) return setOperator(key)
    if (key === '=') return compute()
    if (key === '+/-') toggleSign()
    if (key === 'JP') {
      setDisplay('🐐')
      setAcc(null)
      setOp(null)
      setClear(true)
    }
  }

  const inputNumber = key => {
    if (clear || display === '0') {
      const next = key === '.' ? '0.' : key
      setDisplay(next)
      setClear(false)
    } else if (display.length < 9 && !(key === '.' && display.includes('.'))) {
      setDisplay(display + key)
    }
  }

  const setOperator = k => {
    const current = parseFloat(display)
    if (acc !== null && op !== null) {
      const result = calc(acc, current, op)
      if (result === 'ERROR') {
        setDisplay('ERROR')
        setAcc(null)
        setOp(null)
      } else {
        setDisplay(safeValue(result))
        setAcc(result)
        setOp(k)
      }
    } else {
      setAcc(current)
      setOp(k)
    }
    setClear(true)
  }

  const compute = () => {
    if (acc !== null && op) {
      const result = calc(acc, parseFloat(display), op)
      setDisplay(safeValue(result))
      setAcc(null)
      setOp(null)
      setClear(true)
    }
  }

  const toggleSign = () => {
    if (display.startsWith('-')) {
      setDisplay(display.slice(1))
    } else if (display !== '0' && display.length < 9) {
      setDisplay('-' + display)
    }
  }

  return { handleInput }
}