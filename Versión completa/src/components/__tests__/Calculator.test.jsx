import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Calculator from '../Calculator'
import { expect } from 'vitest'

describe('Calculator', () => {
  it('realiza una suma simple', () => {
    const { getByText } = render(<Calculator />)
    fireEvent.click(getByText('2'))
    fireEvent.click(getByText('+'))
    fireEvent.click(getByText('3'))
    fireEvent.click(getByText('='))
    expect(getByText('5', {selector: '.display span'})).toBeInTheDocument()
  })

  it('muestra ERROR si el resultado es negativo', () => {
    const { getByText } = render(<Calculator />)
    fireEvent.click(getByText('1'))
    fireEvent.click(getByText('-'))
    fireEvent.click(getByText('2'))
    fireEvent.click(getByText('='))
    expect(getByText('ERROR')).toBeInTheDocument()
  })

  it('ignora números después del noveno carácter', () => {
    const { getByText, container } = render(<Calculator />)
    const inputs = '1234567890'.split('')
    inputs.forEach(n => fireEvent.click(getByText(n)))
    const display = container.querySelector('.display span')
    expect(display).toHaveTextContent('123456789')
  })

  it('agrega el signo negativo con +/- si hay espacio', () => {
    const { getByText, container } = render(<Calculator />)
    fireEvent.click(getByText('1'))
    fireEvent.click(getByText('+/-'))
    const display = container.querySelector('.display span')
    expect(display).toHaveTextContent('-1')
  })

  it('no permite números mayores a 9 digitos despues de operar', () => {
    const { getByText, container } = render(<Calculator />)
    const inputs = '123456789'.split('')
    inputs.forEach(n => fireEvent.click(getByText(n)))
    fireEvent.click(getByText('*'))
    fireEvent.click(getByText('1'))
    fireEvent.click(getByText('0'))
    fireEvent.click(getByText('='))
    expect(getByText('ERROR')).toBeInTheDocument()
  })
})