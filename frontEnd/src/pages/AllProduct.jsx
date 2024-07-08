/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct,setOpenUploadProduct]=useState(false);
  const [allProduct,setAllProduct]=useState([]);
  const fetchAllProduct=async()=>{
    const response=await fetch("/api/get-product");
    const responseData=await response.json();
    setAllProduct(responseData?.data || []);
  }

  useEffect(()=>{
    fetchAllProduct()
  },[])
  return (
    <div className='px-4 py-2'>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg '>all product</h2>
        <button className='py-2 px-4 rounded-full border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all' onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
      </div>
      <div className='flex items-center h-[calc(100vh-200px)] bg-red-300 overflow-y-scroll flex-wrap gap-5 py-4'>
      {
  allProduct.map((product, index) => {
    return (
      <AdminProductCard data={product} key={index+"allProduct"} fetchData={fetchAllProduct}/>
    );
  })
}

      </div>
      {
        openUploadProduct && (
       <UploadProduct onclose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
        )
      }

      
    </div>
  )
}

export default AllProducts