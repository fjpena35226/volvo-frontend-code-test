import React from 'react'
import { screen } from '@testing-library/react'

import { renderComponent } from 'context/RenderComponent'
import CarCard from './CarCard'

describe('CarCarousel', () => {
  test('Render CarCarousel component', () => {
    const car = {
      id: 'xc90-recharge',
      modelName: 'XC90 Recharge',
      bodyType: 'suv',
      modelType: 'plug-in hybrid',
      imageUrl: '/images/xc90_recharge.jpg',
    }

    renderComponent(<CarCard car={car} />)

    expect(screen.getByText(car.modelName)).toBeInTheDocument()
  })
})
