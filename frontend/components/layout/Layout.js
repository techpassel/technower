import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer></Footer>
    </>
  )
}

export default Layout