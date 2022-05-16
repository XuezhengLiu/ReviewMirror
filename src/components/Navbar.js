import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components/macro'
import { Link, useLocation } from 'react-router-dom'
import { menuData } from '../data/MenuData'
import { motion } from 'framer-motion'
import Bars from '../images/bars.svg'
import '../css/Navbar.css'

const Nav = styled.nav`
  height: 60px;
  display: flex;
  justify-content: space-around;
  z-index: 100;
  position: fixed;
  width: 100%;
`

const NavLink = css`
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  text-decoration: none;
`

const Logo = styled(Link)`
  ${NavLink}
  font-style: italic;

  :hover{
    color:#fff;
    text-decoration: none;
  }
  
`

const MenuBars = styled.i`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    background-image: url(${Bars});
    background-size: contain;
    height: 40px;
    width: 40px;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-50%, 25%);
  }
`

const NavMenu = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-right: -48px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const NavMenuLinks = styled(Link)`
  ${NavLink}

  :hover{
    color:#fff;
    text-decoration: none;
    transform: scale(1.05);
    transition: 0.4s;
  }
  
`

const NavBtn = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`
const Button = styled(motion.button)`
  padding: 0.7rem 1rem;
  font-size: 1.5rem;
  border: 2px solid #fff;
  border-radius: 0;
  outline: none;
  cursor: pointer;
  background: transparent;
  color: #fff;
`

const Navbar = ({ toggle }) => {
  const [navbar, setNavbar] = useState(false)
  const location = useLocation()

  const changeBackground = () => {
    if (window.pageYOffset >= 200) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }

  useEffect(() => {
    const watchScroll = () => {
      window.addEventListener('scroll', changeBackground)
    }

    watchScroll()

    return () => {
      window.removeEventListener('scroll', changeBackground)
    }
  }, [])

  let style = {
    opacity:
      navbar || location.pathname !== '/' ? 1 : 0,
    visibility:
      navbar || location.pathname !== '/' ? 'visible' : 'hidden',
    backgroundColor:
      navbar || location.pathname !== '/' ? '#000032' : 'transparent',
    transition: '0.4s'
  }

  return (
    <Nav style={style} transition='1s'>
      <Logo to='/' style={{ textDecoration: 'none', color: '#fff' }}>REVIEW MIRROR</Logo>
      <MenuBars onClick={toggle} />
      <NavMenu>
        {menuData.map((item, index) => (
          <NavMenuLinks className='test' to={item.link} key={index} style={{ textDecoration: 'none', color: '#fff' }}>
            {item.title}
          </NavMenuLinks>
        ))}
      </NavMenu>
      <NavBtn>
        <div style={{ height: '58px', width: '196px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Link to='/about'>
            <Button primary='false'
              whileHover={{ backgroundColor: '#fff', color: 'black', scale: 1.05, transition: { duration: 0.3 } }}
              whileTap={{
                scale: 0.95,
                backgroundColor: '#fff',
                border: 'none',
                color: '#000',
                transition: { duration: 0.3 }
              }}>
              How to Use
            </Button>
          </Link>
        </div>
      </NavBtn>
    </Nav>
  )
}

export default Navbar
