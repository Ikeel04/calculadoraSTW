export const calc = (a, b, op) => {
  try {
    switch (op) {
      case '+': return a + b
      case '-': return a - b
      case '*': return a * b
      case '/': return b === 0 ? 'ERROR' : a / b
      case '%': return b === 0 ? 'ERROR' : a % b
      default: return 'ERROR'
    }
  } catch {
    return 'ERROR'
  }
}

export const safeValue = value => {
  if (value < 0 || value > 999999999) return 'ERROR'
  return value.toString().slice(0, 9)
}