import React, { ReactElement, FC } from 'react'
import { render } from '@testing-library/react'
import { StyleProvider, ThemePicker } from 'vcc-ui'

const AllTheProviders: FC = ({ children }) => {
  return (
    <StyleProvider>
      <ThemePicker variant='light'>{children} </ThemePicker>
    </StyleProvider>
  )
}

const renderComponent = (ui: ReactElement, options?: object) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { renderComponent }
