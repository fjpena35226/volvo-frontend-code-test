import { FC, ReactElement, useState, ChangeEvent, useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { Logo, TextInput } from 'vcc-ui'

import styles from './styles.module.css'

type LayoutProps = {
  children: ReactElement
  title?: string
  metaDescription?: string
}

const Layout: FC<LayoutProps> = ({ children, title, metaDescription }) => {
  const [searchBodyType, setSearchBodyType] = useState('')

  const onChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    setSearchBodyType(value)
  }

  useEffect(() => {
    if (searchBodyType) {
      Router.push(`?bodyType=${searchBodyType}`)
    } else {
      Router.push('/')
    }
  }, [searchBodyType])

  return (
    <>
      <Head>
        <title>{title || 'Volvo Cars'}</title>
        <meta name='description' content={metaDescription || ''} />
      </Head>
      <div className={styles.layout}>
        <div className={styles.navbar}>
          <Logo type='spreadmark' height={16} />
          <div className={styles.searchInput}>
            <TextInput
              value={searchBodyType}
              label='Search by Body Type'
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  )
}

export default Layout
