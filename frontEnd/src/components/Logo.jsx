/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React from 'react'
import logo from '../logo/logo.jpg';

const Logo = ({w,h}) => {
  return (
    <img style={{ width: `${w}px`, height: `${h}px` }} src={logo} alt='TechTronics' />
  )
}

export default Logo