import React, { useState, useEffect } from 'react'
import Dropdown from './components/Dropdown'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import About from './pages/About'
import MainFeatures from './pages/MainFeatures'
import Home from './components/Home'
import ProductAnalyse from './Analysis/ProductAnalyse'
import GlobalStyle from './globalStyles'
import Information from './pages/Information'

import Aos from 'aos'
import 'aos/dist/aos.css'

import ReviewAnalyse from './Analysis/ReviewAnalyse'

import { Amplify } from 'aws-amplify'
import awsExports from './aws-exports'
import Quiz from './components/Quiz'
Amplify.configure(awsExports)

function App () {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    Aos.init({})
  }, [])

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Navbar toggle={toggle} />
        <Dropdown isOpen={isOpen} toggle={toggle} />
        <Routes>
          <Route path='' element={<Index />} />
          <Route path='/about' element={<About />} />
          <Route path='/productanalyse' element={<Home />} />
          <Route path='reviewanalyse' element={<ReviewAnalyse />} />
          <Route path='/knowledgetest' element={<Quiz />} />
          <Route path='/MainFeatures' element={<MainFeatures />} />
          <Route path='/PAnalyseResult' element={<ProductAnalyse />} />
          <Route path='/Information' element={<Information />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
