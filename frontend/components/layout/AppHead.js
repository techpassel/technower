import Head from 'next/head'
import React from 'react'

const AppHead = ({title, description}) => {
  return (
    <div>
        <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/images/technower.ico" />
      </Head>
    </div>
  )
}

export default AppHead