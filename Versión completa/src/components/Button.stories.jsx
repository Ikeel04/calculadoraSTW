import Button from './Button'

export default {
  title: 'Components/Button',
  component: Button
}

export const Default = () => (
  <Button label="5" onClick={() => alert('Presionado 5')} />
)
