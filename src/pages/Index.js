import React from 'react'
import Features from '../components/Features'
// import Hero from '../components/Hero'
import Listings from '../components/Listings'
import Features2 from '../components/Features2'
import HeaderPage from '../components/HeaderPage'
import Home from '../components/Home'

const Index = () => {
  return (
    <div>
      <HeaderPage />
      <Home />
      <Listings />
      <Features />
      <Features2 />
    </div>
  )
}

export default Index
