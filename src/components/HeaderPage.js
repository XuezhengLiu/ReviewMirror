import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import PlanetOne from '../images/review-analysis.svg'
import PlanetTwo from '../images/product-analysis.svg'
import PlanetThree from '../images/information.svg'
import PlanetFour from '../images/test-knowledge.svg'
import { Link } from 'react-router-dom'


import { API } from 'aws-amplify'

const Section = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #131313;

  @media screen and (max-width: 768px) {
    height: 160vh;
    align-items: start;
  }
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  padding: 3rem calc((100vw - 1300px) / 2);

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ColumnLeft = styled.div`
  display: flex;
  color: #fff;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 5rem 2rem;

  h1 {
    margin-bottom: 0.5rem;
    font-size: 3rem;
  }

  p {
    margin: 2rem 0;
    font-size: 7rem;
    line-height: 1.1;
  }
`

const Button = styled(motion.button)`
  padding: 1rem 3rem;
  font-size: 2rem;
  border: 2px solid #fff;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  background: transparent;
  color: #fff;
`

const Image = styled(motion.img)`
  position: relative;
  width: 250%;
  max-width: 250px;
  max-height: 250px;

  @media screen and (max-width: 1024px) {
    max-width: 200px;
    max-height: 200px;
  }

  @media screen and (max-width: 912px) {
    max-width: 150px;
    max-height: 150px;
  }
`

const ColumnRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;

  ${Image}#childOne {
    top: -25vh;
    left: -7vw;
  }

  ${Image}#childTwo {
    width: 150%;
    top: 10vh;
    left: -12vw;
  }

  ${Image}#childThree {
    width: 180%;
    top: -12vh;
    left: 2vw;
  }

  ${Image}#childFour {
    width: 170%;
    top: 19vh;
    left: -13vw;
  }
`

const HeaderPage = () => {
  const [isLoaded1, setIsLoaded1] = useState(false)
  const [isLoaded2, setIsLoaded2] = useState(false)
  const [isLoaded3, setIsLoaded3] = useState(false)
  const [isLoaded4, setIsLoaded4] = useState(false)
  const [allLoaded, setAllLoaded] = useState(false)

  const loadingStatus1 = () => {
    setIsLoaded1(true)
    if (isLoaded2 === true && isLoaded3 === true && isLoaded4 === true) {
      setAllLoaded(true)
    }
  }
  const loadingStatus2 = () => {
    setIsLoaded2(true)
    if (isLoaded1 === true && isLoaded3 === true && isLoaded4 === true) {
      setAllLoaded(true)
    }
  }
  const loadingStatus3 = () => {
    setIsLoaded3(true)
    if (isLoaded1 === true && isLoaded2 === true && isLoaded4 === true) {
      setAllLoaded(true)
    }
  }
  const loadingStatus4 = () => {
    setIsLoaded4(true)
    if (isLoaded1 === true && isLoaded2 === true && isLoaded3 === true) {
      setAllLoaded(true)
    }
  }


  const ServerRun = async () => {

    const params = { 'review': 'Good Product' }
    console.log(params)
    await API.get('Iteration1API', '/Analysis', { queryStringParameters: params })
      .then(response => {
        console.log('Running')
      })
      .catch(error => {
        ServerRun()
      })
  }

  const fadeLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <Section onLoad={ServerRun}>
      <Container>
        <ColumnLeft>
          <motion.h1
            variants={fadeLeft}
            initial='hidden'
            animate={{ opacity: allLoaded ? 1 : 0, x: allLoaded ? 0 : -100, transition: { duration: 1 } }}
          >
            Welcome to Review Mirror
          </motion.h1>
          <motion.p
            variants={fadeLeft}
            initial='hidden'
            animate={{ opacity: allLoaded ? 1 : 0, x: allLoaded ? 0 : -100, transition: { duration: 1 } }}
          >
            Journey to Truth
          </motion.p>
          <div style={{ height: '58px', width: '196px', display: 'flex', alignItems: 'center' }}>
            <Link to='/MainFeatures'>
              <Button
                variants={fadeLeft}
                initial='hidden'
                animate={{ opacity: allLoaded ? 1 : 0, x: allLoaded ? 0 : -100, transition: { duration: 1 } }}
                whileHover={{
                  backgroundColor: '#67F6E7',
                  border: 'none',
                  color: '#000', scale: 1.05, transition: { duration: 0.3 }
                }}
                whileTap={{
                  scale: 0.95,

                  transition: { duration: 0.3 }
                }}
              >
                Get Started
              </Button>
            </Link>
          </div>
        </ColumnLeft>
        <ColumnRight>
          <Link to='/productanalyse'>
            <Image
              id='childOne'
              src={PlanetTwo}
              alt='planet'
              onLoad={loadingStatus1}
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.9 }}
              drag={true}
              dragConstraints={{ left: 0, right: 250, top: 0, bottom: 50 }}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: allLoaded ? 1 : 0, x: allLoaded ? 0 : -100, transition: { duration: 1 } }}
            />
          </Link>
          <Link to='/reviewanalyse'>
            <Image
              id='childTwo'
              src={PlanetOne}
              alt='planet'
              onLoad={loadingStatus2}
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.6 }}
              drag={true}
              dragConstraints={{ left: 50, right: 0, top: 0, bottom: 50 }}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: allLoaded ? 1 : 0, y: allLoaded ? 0 : 100, transition: { duration: 1 } }}
            />
          </Link>
          <Link to='/Information'>
            <Image
              id='childThree'
              src={PlanetThree}
              alt='planet'
              onLoad={loadingStatus3}
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.8 }}
              drag={true}
              dragConstraints={{ left: 0, right: 250, top: 0, bottom: 50 }}
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: allLoaded ? 1 : 0, y: allLoaded ? 0 : -100, transition: { duration: 1 } }}
            />
          </Link>
          <Link to='/knowledgetest'>
            <Image
              id='childFour'
              src={PlanetFour}
              alt='planet'
              onLoad={loadingStatus4}
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.9 }}
              drag={true}
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: allLoaded ? 1 : 0, x: allLoaded ? 0 : 100, transition: { duration: 1 } }}
            />
          </Link>
        </ColumnRight>
      </Container>
    </Section>
  )
}

export default HeaderPage
