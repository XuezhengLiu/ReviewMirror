import React from 'react'
import styled, { css } from 'styled-components/macro'
import { IoMdArrowRoundDown } from 'react-icons/io'
import {
  // FaInstagram,
  // FaFacebookF,
  // FaLinkedinIn,
  FaYoutube
} from 'react-icons/fa'

const Section = styled.section`
  background: #000d1a;
  color: #fff;
  width: 100%;
  min-height: 300px;
  padding: 3rem calc((100vw - 1300px) / 2);
`

const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 2rem;
`

const FooterTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 4rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

const Quote = styled.div`
  flex: 1;
  padding: 2rem 0rem;

  h3 {
    font-size: clamp(2rem, 8vw, 5rem);
  }
`

const FooterInfo = styled.div`
  padding: 2rem;
  line-height: 3;
  display: flex;
  flex-direction: column;

  a {
    color: #fff;
    text-decoration: none;
  }

  @media screen and (max-width: 768px) {
    padding: 1rem 0rem;
  }
`

const FooterBottom = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

const SocialIcons = styled.div`
  display: flex;
  width: 50%;

  @media screen and (max-width: 768px) {
    margin-bottom: 2rem;
    width: 100%;
  }
`

const Icons = css`
  font-size: clamp(2rem, 6vw, 4rem);
  margin-right: 1.5rem;
  color: #cd853f;
`

// const Instagram = styled(FaInstagram)`
//   ${Icons}
// `

// const Facebook = styled(FaFacebookF)`
//   ${Icons}
// `

// const LinkedIn = styled(FaLinkedinIn)`
//   ${Icons}
// `

const Youtube = styled(FaYoutube)`
  ${Icons}
`

const Footer = () => {
  return (
    <Section>
      <Container>
        <FooterTop>
          <div>
            <Quote>
              <h3>
                Let’s just say no  <br /> to fake reviews!
              </h3>
            </Quote>

            <FooterBottom>
              <h4><IoMdArrowRoundDown />View our Product Video Here!</h4>
              <SocialIcons>
                <a
                  href='https://youtu.be/vIdHktHbnig'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  <Youtube />
                </a>
              </SocialIcons>
            </FooterBottom>
          </div>
          <FooterInfo>
            <br></br>
            <br></br>
            <h4>Created by Team SLYNG</h4>
            <h4>Copyright © 2022 Team SLYNG. All rights reserved.</h4>
          </FooterInfo>
        </FooterTop>
      </Container>
    </Section>
  )
}

export default Footer
