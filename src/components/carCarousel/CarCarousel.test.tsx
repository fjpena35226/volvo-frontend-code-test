import React from 'react'
import { screen } from '@testing-library/react'

import CarCarousel from './CarCarousel'
import { renderComponent } from 'context/RenderComponent'

describe('CarCarousel', () => {
  test('Render CarCarousel component', () => {
    const cars = [
      {
        id: 'xc90-recharge',
        modelName: 'XC90 Recharge',
        bodyType: 'suv',
        modelType: 'plug-in hybrid',
        imageUrl: '/images/xc90_recharge.jpg',
      },
    ]

    const carName = cars[0].modelName

    renderComponent(<CarCarousel cars={cars}/>)

    expect(screen.getByText(carName)).toBeInTheDocument()
  })

  test('Render CarCarousel empty', () => {
    renderComponent(<CarCarousel cars={[]}/>)

    expect(screen.getByText('We do not have cars to show at this time.')).toBeInTheDocument()
  })
})
