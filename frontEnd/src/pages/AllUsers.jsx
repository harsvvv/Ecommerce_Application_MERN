/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import moment from 'moment'
import { MdEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
  const [allUser,setallUser]=useState([]);
  const [openUpdateRole,setOpenUpdateRole]=useState(false);
const [updateUserDetails,setUpdateUserDetails]=useState({
  email: '',
  name: '',
  role: '',
  _id: '',
})
const fetchAlluser=async()=>{
  const fetchData=await fetch("/api/all-user",{
    method:"GET",
    credentials:'include'
  })
  const dataResponse=await fetchData.json();
  if(dataResponse.success){
    setallUser(dataResponse.data)
  }
  if(dataResponse.error){
    toast.error(dataResponse.error)
  }
}
  useEffect(()=>{
    fetchAlluser()
  },[])
  return (
    <div>
      <table className='w-full border  border-black border-collapse'>
        <thead>
          <tr className='bg-red-200 text-black'>
          <th className=' w-10 p-4 border border-collapse border-black'>sr</th>
          <th className='border border-collapse border-black'>Name</th>
          <th className='w-[30%] border border-collapse border-black'>Email</th>
          <th className='border border-collapse border-black'>Role</th>
          <th className='w-[20%] border border-collapse border-black'>Created At</th>
          <th className='w-[10%] border border-collapse border-black'>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            allUser.map((element,index)=>{
              return (
                <tr key={element._id}>
                  <td className='p-4 text-center border border-collapse border-black'>{index+1}</td>
                  <td className='p-4 text-center border border-collapse border-black'>{element?.name}</td>
                  <td className='p-4 text-center border border-collapse border-black'>{element?.email}</td>
                  <td className='p-4 text-center border border-collapse border-black'>{element?.role}</td>
                  <td className='p-4 text-center border border-collapse border-black'>{moment(element?.createdAt).format('l')}</td>
                  <td className=' p-4 text-center border border-collapse border-black'>
                    <button className='w-10 h-10 bg-green-400 rounded-full flex justify-center items-center ' 
                    onClick={()=>{
                      setUpdateUserDetails(element)
                      setOpenUpdateRole(true)}}><MdEdit /></button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {
        openUpdateRole && (
          <ChangeUserRole onClose={()=>setOpenUpdateRole(false)}
            name={updateUserDetails.name}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
               userId={updateUserDetails._id}
               callfunc={fetchAlluser}
          />
        )
      }
      
    </div>
  )
}

export default AllUsers