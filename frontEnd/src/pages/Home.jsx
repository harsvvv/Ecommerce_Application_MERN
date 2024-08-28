/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div className=''>
      <CategoryList />
      {/* <BannerProduct/> */}
      <VerticalCardProduct category={"airpods"} heading={"Top Airpodes"}/>
      <VerticalCardProduct category={"camera"} heading={"Top Camera's"}/>
     
      
      <VerticalCardProduct category={"mobiles"} heading={"Mobile's"}/>
      <VerticalCardProduct category={"watches"} heading={"Watch"}/>
    </div>
  )
}

export default Home
