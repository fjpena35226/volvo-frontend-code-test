import { forwardRef } from 'react'
import { Flex, Link as VLink, Text, useTheme } from 'vcc-ui'
import Image from 'next/image'
import Link from 'next/link'

import { Car } from 'types/Car'
import styles from './styles.module.css'

type CarCardProps = {
  car: Car
  extend?: object
}

const CarCard = forwardRef<HTMLDivElement, CarCardProps>(
  ({ car, extend }, ref) => {
    return (
      <div ref={ref}>
        <Flex
          extend={{
            flexDirection: 'column',
            ...extend,
          }}
        >
          <Text
            extend={{
              textTransform: 'uppercase',
              color: '#707070',
            }}
            subStyle='emphasis'
            variant='hillary'
          >
            {car?.bodyType || ''}
          </Text>
          <Text
            subStyle='emphasis'
            variant='hillary'
            extend={{
              marginBottom: '1.55rem',
              display: 'flex',
              '@media (max-width: 1281px)': {
                flexDirection: 'column',
              },
            }}
          >
            {car?.modelName || ''}
            <Text
              subStyle='standard'
              extend={{
                color: '#707070',
                '@media (min-width: 1281px)': {
                  marginLeft: '5px',
                },
              }}
            >
              {car?.modelType || ''}
            </Text>
          </Text>
          <Link href={`/shop/${car.id}`} passHref>
            <div className={styles.imageBox}>
              <Image
                src={car?.imageUrl || ''}
                alt={`${car?.modelType || ''}`}
                width={431}
                height={322}
              />
            </div>
          </Link>
          <Flex
            extend={{
              flexDirection: 'row',
              justifyContent: 'center',
              columnGap: '40px',
              fontSize: '1.75rem',
              marginTop: '45px',
            }}
          >
            <VLink href={`/learn/${car?.id || ''}`} arrow='right'>
              {'Learn '}
            </VLink>
            <VLink href={`/shop/${car?.id || ''}`} arrow='right'>
              {'Shop '}
            </VLink>
          </Flex>
        </Flex>
      </div>
    )
  }
)

CarCard.displayName = 'CarCard'

export default CarCard
