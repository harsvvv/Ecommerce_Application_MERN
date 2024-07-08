/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { FaUser } from "react-icons/fa";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../../common/role';

const AdminPanel = () => {
    const {user}=useSelector((state)=>state.user);
    const navigate=useNavigate()
    useEffect(()=>{
     if(user?.role!==ROLE.ADMIN){
      navigate("/");
     }
    },[])
  return (
    <div className='min-h-[calc(100vh-120px)] md:flex  hidden '>
  <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
<div className='h-28  flex flex-col justify-center items-center'>
<div className='text-6xl cursor-pointer relative flex justify-center' >
  {
    user?.profilePic ? (
      <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name || 'User'} />
    ) : (
      <FaUser />
    )
  }
</div>
<p className='capitalize text-lg font-semibold'>{user?.name}</p>
<p>{user?.role}</p>
</div>
<div className=''>
    <nav className='grid p-4'>
    <Link to="all-users" className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
    <Link to="all-products" className='px-2 py-1 hover:bg-slate-100'>All products</Link>
    </nav>

</div>
  </aside>
  <main className='w-full h-full'>
<Outlet/>
  </main>
    </div>
  )
}

export default AdminPanel