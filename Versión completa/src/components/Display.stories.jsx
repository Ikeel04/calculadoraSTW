import Display from './Display'

export default {
  title: 'Components/Display',
  component: Display
}

export const Default = () => <Display value="123" />

export const Error = () => <Display value="ERROR" />