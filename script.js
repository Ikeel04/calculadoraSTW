class Calculator {
  constructor() {
    this.display = '0'
    this.firstOperand = null
    this.waitingForSecondOperand = false
    this.operator = null
    this.MAX_DIGITS = 9
  }

  inputDigit(digit) {
    if (this.display === 'ERROR') return
    
    if (this.waitingForSecondOperand) {
      this.display = digit
      this.waitingForSecondOperand = false
    } else {
      if (this.display.length >= this.MAX_DIGITS) return
      this.display = this.display === '0' ? digit : this.display + digit
    }
    this.updateDisplay()
  }

  inputDecimal() {
    if (this.waitingForSecondOperand) {
      this.display = '0.'
      this.waitingForSecondOperand = false
      this.updateDisplay()
      return
    }
    
    if (!this.display.includes('.') && this.display.length < this.MAX_DIGITS) {
      this.display += '.'
      this.updateDisplay()
    }
  }

  toggleSign() {
    if (this.display !== '0' && this.display !== 'ERROR') {
      if (this.display.startsWith('-')) {
        this.display = this.display.substring(1)
      } else if (this.display.length < this.MAX_DIGITS) {
        this.display = '-' + this.display
      }
      this.updateDisplay()
    }
  }

  clearAll() {
    this.display = '0'
    this.firstOperand = null
    this.waitingForSecondOperand = false
    this.operator = null
    this.updateDisplay()
  }

  handleOperator(nextOperator) {
    const inputValue = parseFloat(this.display)
    
    if (this.operator && this.waitingForSecondOperand) {
      this.operator = nextOperator
      return
    }

    if (this.firstOperand === null) {
      this.firstOperand = inputValue
    } else if (this.operator) {
      const result = this.calculate(this.firstOperand, inputValue, this.operator)
      
      if (result === 'ERROR') {
        this.display = 'ERROR'
      } else {
        this.display = String(result).slice(0, this.MAX_DIGITS)
      }
      
      this.firstOperand = result
    }

    this.waitingForSecondOperand = true
    this.operator = nextOperator
    this.updateDisplay()
  }

  calculate(first, second, op) {
    let result
    switch (op) {
      case '+': result = first + second; break
      case '-': result = first - second; break
      case '*': result = first * second; break
      case '/': result = first / second; break
      case '%': result = first % second; break
      default: return second
    }

    if (result > 999999999 || result < 0 || isNaN(result)) return 'ERROR'
    return result
  }

  updateDisplay() {
    document.querySelector('.display').value = this.display
  }
}

// Inicialización
const calculator = new Calculator()

// Event listeners
document.querySelectorAll('[data-number]').forEach(button => {
  button.addEventListener('click', () => {
    calculator.inputDigit(button.dataset.number)
  })
})

document.querySelector('[data-decimal]').addEventListener('click', () => {
  calculator.inputDecimal()
})

document.querySelector('[data-toggle]').addEventListener('click', () => {
  calculator.toggleSign()
})

document.querySelector('[data-clear]').addEventListener('click', () => {
  calculator.clearAll()
})

document.querySelectorAll('[data-operation]').forEach(button => {
  button.addEventListener('click', () => {
    calculator.handleOperator(button.dataset.operation)
  })
})

document.querySelector('[data-equals]').addEventListener('click', () => {
  calculator.handleOperator('=')
})