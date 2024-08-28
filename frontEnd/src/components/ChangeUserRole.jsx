/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import ROLE from '../../common/role'
import { IoCloseSharp } from "react-icons/io5";
import {toast} from 'react-hot-toast'

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callfunc
}) => {
    const [userRole,setUserRole]=useState("")

    const handleOnChange=(e)=>{
      setUserRole(e.target.value);
      console.log(e.target.value)
    }
    const updateUserRole=async()=>{
      const fetchResponse=await fetch('https://techtronics-y2b2.onrender.com/api/update-user',
        {
          method:"POST",
          credentials: 'include',
          headers:{
            "content-type" : "application/json"
          },
          body: JSON.stringify({
            userId:userId,
            role: userRole
          })
        }
      
      )
      const responseData=await fetchResponse.json();
      if(responseData.success){
        toast.success(responseData.message);
        
        callfunc()
      }
      console.log("role updated",responseData)
    }
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 flex justify-center bg-slate-200 bg-opacity-40 items-center  w-full h-full z-10'>
        <div className='w-full max-w-sm p-4 mx-auto bg-white shadow-md'>
        <button className='block ml-auto' onClick={onClose}>
            <IoCloseSharp/>
        </button>
           <h1 className='pb-4 text-lg font-medium'> ChangeUserRole</h1>
           <p>Name: {name}</p>
           <p>Email : {email}</p>
          <div className='flex my-4 items-center justify-between'>
          <p>Role:</p>
           <select className='border px-4 py-1' value={userRole} onChange={handleOnChange}>
            {
                Object.values(ROLE).map(el=>{
                    return (
                        <option value={el} key={el}>{el}</option>
                    )
                })
            }
           </select>
          </div>
          <button className='w-fit mx-auto block py-1 px-3 bg-red-600 text-white hover:bg-red-700 rounded-full' onClick={updateUserRole}>Change Role</button>
        </div>
    </div>
  )
}

export default ChangeUserRole