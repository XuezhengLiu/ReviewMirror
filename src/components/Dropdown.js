import React from 'react'
import styled from 'styled-components'
import { menuData } from '../data/MenuData'
import { Button } from './Button'
import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'

const DropdownContainer = styled.div`
  position: fixed;
  z-index: 999;
  width: 70%;
  height: 100%;
  background: #f7f7f7;
  display: grid;
  align-items: center;
  top: 0;
  right: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
`

const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
`

const CloseIcon = styled(FaTimes)`
  color: #fff;
`

const DropdownWrapper = styled.div``

const DropdownMenu = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, 80px);
  text-align: center;
  margin-bottom: 4rem;

  @media screen and (max-width: 480px) {
    grid-template-rows: repeat(4, 60px);
  }
`

const DropdownLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    background: #F1EEE9;
    text-decoration: none;
  }
`

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
`

const Dropdown = ({ isOpen, toggle }) => {
  return (
    <DropdownContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle} style={{
        backgroundColor: '#06113C', width: '100%', height: '60px',
        paddingRight: '15px',
        position: 'absolute',
        top: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}>
        <CloseIcon />
      </Icon>
      <DropdownWrapper>
        <DropdownMenu>
          {menuData.map((item, index) => (
            <DropdownLink to={item.link} key={index}>
              {item.title}
            </DropdownLink>
          ))}
        </DropdownMenu>
        <BtnWrap>
          <Button primary='true' round='true' big='true' to='/about'>
            How to Use
          </Button>
        </BtnWrap>
      </DropdownWrapper>
    </DropdownContainer>
  )
}

export default Dropdown
