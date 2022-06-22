import { ReactElement } from 'react'
import type { NextPage, GetServerSideProps } from 'next'

import { getCars } from 'queries/cars'
import { CarsPageProps } from 'types/Cars'
import CarCarousel from 'components/carCarousel/CarCarousel'
import Layout from 'components/layout/Layout'

const Home: NextPage<CarsPageProps> = ({ cars }): ReactElement => {
  return (
    <Layout>
      <CarCarousel cars={cars} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=15, stale-while-revalidate=59'
  )

  const cars = await getCars({ query })

  return {
    props: {
      cars,
    },
  }
}

export default Home
