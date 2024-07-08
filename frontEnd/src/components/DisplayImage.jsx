/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { IoMdClose } from "react-icons/io";

const DisplayImage = ({
    imgUrl,
    onclose
}) => {
  return (
    <div className='fixed flex justify-center items-center bottom-0 top-0 right-0 left-0'>
    <div className='bg-white shadow-lg rounded max-w-[5xl] mx-auto '>
    <div className="w-fit ml-auto cursor-pointer text-lg hover:text-red-600 p-4">
            <IoMdClose onClick={onclose} />
          </div>
    <div className='flex justify-center p-4 max-w-[70vh] max-h-[80vh]'>
        <img src={imgUrl} className='h-full w-full'/>
    </div>
    </div>
    </div>

   
  )
}

export default DisplayImage