import { FC, useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { Text, useTheme, View } from 'vcc-ui'
import classNames from 'classnames'

import CarCard from 'components/carCard/CarCard'
import { Car } from 'types/Car'
import ChevronSmallIcon from 'icons/ChevronSmallIcon'
import styles from './styles.module.css'

type CarCarouselProps = {
  cars: Car[]
  scrollItems?: number
}

const CarCarousel: FC<CarCarouselProps> = ({ cars, scrollItems = 1 }) => {
  const { breakpoints } = useTheme()
  const [position, setPosition] = useState(0)
  const [selectedIndicator, setSelectedIndicator] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const indicators = Array.from(Array(cars.length / scrollItems).keys())

  const calcScroll = (offSet: number, items: number) => {
    return cardRef?.current?.offsetWidth
      ? cardRef?.current?.offsetWidth * items + items * offSet
      : 430
  }

  const moveToRightHandler = () => {
    setPosition((prev) => Math.min(prev + 1, cars.length - 1))
  }

  const moveToLeftHandler = () => {
    setPosition((prev) => Math.max(prev - 1, 0))
  }

  const moveTo = (i: number) => {
    setPosition((prev) => (prev === i && i === 0 ? -1 : i))
  }

  const getCurrentPosition = useCallback(() => {
    const scroll = carouselRef?.current?.scrollLeft || 0
    const scrollWidth = carouselRef?.current?.scrollWidth || 0
    const width = carouselRef?.current?.clientWidth || 0
    const maxScrollLeft = scrollWidth - width

    if (scroll >= maxScrollLeft) {
      return cars.length - 1
    } else {
      const pos = cardRef?.current?.offsetWidth
        ? Math.floor(scroll / cardRef?.current?.offsetWidth)
        : 0
      return pos
    }
  }, [cars.length])

  const scrollListener = useCallback(() => {
    if (screen?.width <= 1024) {
      const pos = getCurrentPosition()
      setSelectedIndicator(pos)
    }
  }, [getCurrentPosition])

  useEffect(() => {
    carouselRef.current?.addEventListener('scroll', scrollListener)
  }, [scrollListener])

  useEffect(() => {
    if (carouselRef && carouselRef.current) {
      if (screen?.width <= 1024) {
        carouselRef.current.scrollLeft = position * calcScroll(18, 1)
      } else
        carouselRef.current.scrollLeft = position * calcScroll(36, scrollItems)
    }
  }, [position, scrollItems])

  return cars && cars.length > 0 ? (
    <div className={styles.carouselContainer}>
      <div ref={carouselRef} className={`no-scrollbar ${styles.carousel}`}>
        {cars?.map((car, i) => (
          <CarCard
            ref={cardRef}
            key={`${car.id}-${i}`}
            car={car}
            extend={{
              '@media (min-width: 2000px)': {
                minWidth: '430px',
                maxWidth: '430px',
              },
              [breakpoints.fromXL]: {
                minWidth: '22vw',
              },
              '@media (min-width: 1200px) and (max-width: 1537px)': {
                minWidth: '21vw',
              },
              '@media (min-width: 1024px) and (max-width: 1200px)': {
                minWidth: '20vw',
              },
              [breakpoints.onlyM]: {
                minWidth: '38vw',
              },
              [breakpoints.untilM]: {
                minWidth: '70vw',
              },
            }}
          />
        ))}
      </div>
      <div className={styles.carouselIndicators}>
        {indicators.map((_, i) => (
          <div
            key={`indicator-${i}`}
            onClick={(evt) => moveTo(i)}
            className={classNames({
              [styles.active]: selectedIndicator === i,
              [styles.carouselIndicator]: true,
            })}
          ></div>
        ))}
      </div>
      <div className={styles.carouselControls}>
        <ChevronSmallIcon
          className={`${styles.carouselControl} ${styles.back} ${classNames({
            [styles.disabled]: position < 1,
          })}`}
          onClick={moveToLeftHandler}
        />
        <ChevronSmallIcon
          className={`${styles.carouselControl} ${classNames({
            [styles.disabled]: position >= 4 / scrollItems,
          })}`}
          onClick={moveToRightHandler}
        />
      </div>
    </div>
  ) : (
    <View extend={{ width: '100%' }}>
      <Text variant='cook' subStyle='emphasis' extend={{ textAlign: 'center' }}>
        We do not have cars to show at this time.
      </Text>
    </View>
  )
}

export default CarCarousel
