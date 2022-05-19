import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { IoMdArrowRoundForward } from 'react-icons/io'
import HomeOne from '../images/Product.png'
import HomeTwo from '../images/Review.png'

const Section = styled.section`
  width: 100%;
  height: 100%;
  padding: 4rem calc((100vw - 1300px) / 2);
  background-color:#f2f2f5;
`

const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 1rem 1rem;
`

const Heading = styled.div`
  font-size: 1.5rem;
  padding: 1rem 1rem;

  @media screen and (max-width: 768px) {
    text-align: start;
  }
`

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 1rem 0rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

const InfoWrap = styled.div`
  padding: 0rem 1rem;
  min-height: 550px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;

  h2 {
    margin-bottom: 1rem;
    font-weight: 400;
  }

  @media screen and (max-width: 768px) {
    margin-bottom: 1rem;
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  max-width: 600px;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 1rem;
`

const InfoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000d1a;
  width: 140px;
  transition: 0.3s;

  &:hover {
    transform: translateY(-2px);
  }
`

const Arrow = styled(IoMdArrowRoundForward)`
  margin-left: 10px;
`

const Listings = () => {
  return (
    <Section>
      <Container>
        <Heading>
          <h1
            data-aos='fade-right'
            data-aos-duration='1000'
            data-aos-once='true'
            data-aos-anchor-placement='center bottom'
          >
            Stop being bothered by fake reviews
          </h1>
        </Heading>
        <InfoRow>
          <InfoWrap
            data-aos='zoom-out-up'
            data-aos-duration='1200'
            data-aos-once='true'
            data-aos-anchor-placement='center bottom'
          >
            <Image src={HomeOne} alt='product analyse' />
            <h2>Product Analyser</h2>
            <InfoLink to='/productanalyse'>
              <p>View Details</p>
              <Arrow />
            </InfoLink>
          </InfoWrap>
          <InfoWrap
            data-aos='zoom-out-down'
            data-aos-duration='1200'
            data-aos-once='true'
            data-aos-anchor-placement='center bottom'
          >
            <Image
              src={HomeTwo}
              alt='Review Analyse'
              css={`
                margin-top: 100px;
                @media screen and (max-width: 768px) {
                  margin-top: 0px;
                }
              `}
            />
            <h2>Review Analyser</h2>
            <InfoLink to='/reviewanalyse'>
              <p>View Details</p>
              <Arrow />
            </InfoLink>
          </InfoWrap>
        </InfoRow>
      </Container>
    </Section>
  )
}

export default Listings
