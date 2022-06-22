import React from 'react'
import type { AppProps } from 'next/app'
import { StyleProvider, ThemePicker } from 'vcc-ui'

import '../public/css/styles.css'

const App: React.FC<AppProps> = ({
  Component,
  pageProps,
}): React.ReactElement => {
  return (
    <React.StrictMode>
      <StyleProvider>
        <ThemePicker variant='light'>
          <Component {...pageProps} />
        </ThemePicker>
      </StyleProvider>
    </React.StrictMode>
  )
}

export default App
