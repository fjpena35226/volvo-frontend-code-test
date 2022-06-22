import { ParsedUrlQuery } from 'querystring'
import { Car } from './Car'

export type CarsPageProps = {
  cars: Array<Car>
}

export type CarsQuery = {
  query: ParsedUrlQuery
}
