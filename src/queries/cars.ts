import { Car } from 'types/Car'
import { CarsQuery } from 'types/Cars'

export const getCars = async ({ query }: CarsQuery) => {
  if (!process.env.API_URL) {
    throw new Error('Api url not found')
  }

  const data = await fetch(`${process.env.API_URL}`)
  let cars: Array<Car> = await data.json()

  if (query?.bodyType) {
    const bodyType: string = Array.isArray(query?.bodyType)
      ? query?.bodyType?.join('')
      : query?.bodyType
    cars = cars.filter((car) =>
      car.bodyType.includes(bodyType.toLocaleLowerCase())
    )
  }

  return cars
}
