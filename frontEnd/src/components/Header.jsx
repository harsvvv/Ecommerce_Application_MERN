/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import Logo from './Logo'
import { CiSearch } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-hot-toast'
import { setUserDetails } from '../store/userSlice';
import ROLE from '../../common/role';
import Context from '../context';


const Header = () => {
  const {user}=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  const [menuDisplay,setMenuDisplay]=useState(false);
  const navigate=useNavigate();
  
  const context=useContext(Context)
  
  
  const handleLogout=async()=>{
    try {
      const fetchData =await fetch("https://techtronics-y2b2.onrender.com/api/userLogout",{
        method:"GET",
        credentials:'include'
      })
      const data=await fetchData.json();
      if(data.success){
        toast.success("Logged out successfully");
        dispatch(setUserDetails(null));
      }
      
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleSearch=(e)=>{
  const value=e.target.value;
  if(value){
    navigate(`/search?q=${value}`);
  }else{
    navigate("/");
  }
  }
  return (
    <header className='h-16 fixed w-full z-10    shadow-md bg-white border-b-2 border-black'>
    <div className='h-full min-w-full flex items-center container mx-auto px-4 justify-between' >
    <div className=''>
      <Link to="/">
      <Logo w={150} h={50}/>
      </Link>
    </div>
    <div className='hidden   lg:flex  border-black  flex items-center w-full justify-between max-w-sm focus-within:shadow-md'>
      <input type='text' placeholder='search...' className='w-full border-2 border-black h-10 rounded-md p-3  outline-none' onChange={handleSearch}/>
      <div className='text-lg min-w-[50px] w-13 h-10 rounded-r-md rounded-l-md bg-black text-white flex items-center justify-center '>
      <CiSearch style={{ fontWeight: 'bold', fontSize: '24px' }} />
      </div>
    </div>
    <div className="flex items-center gap-4">
   <div className='relative  flex justify-center'>
   {
    user?._id && (
      <div className='text-2xl cursor-pointer' onClick={() => setMenuDisplay(prev => !prev)}>
  {
    user?.profilePic ? (
      <img src={user.profilePic} className='w-10 h-10 rounded-full' alt={user?.name || 'User'} />
    ) : (
      <FaUser />
    )
  }
</div>
    )
   }



    {
      menuDisplay && (
        <div className='  bg-green-300 p-2 bottom-0 top-11 h-fit absolute shadow-lg rounded'>
      <nav>
      {
        user?.role===ROLE.ADMIN &&(
          <Link className=' hidden md:block whitespace-nowrap p-2 border-b-2 hover:bg-orange-200' to="/admin-panel/all-products">Admin panel</Link>
        )
      }
       
      </nav>
    </div>
      )
    }
   </div>
   {
    user?._id && (
     
    <Link to={"/cart"} className='text-2xl relative cursor-pointer'>
      <span>< FaShoppingCart/> </span>
      
      <div className='bg-red-600 text-white w-5 p-1 h-5 rounded-full absolute  top-0 left-4 bottom-7 flex items-center justify-center'>
        <p className='text-xs text-white'>{context.cartProductCount}</p>
      </div>
    </Link>
    )
   }
    <div >
    {
       user?._id ?(
        <Link to="/login">
    <button onClick={handleLogout} className='px-3 py-1 text-black hover:opacity-90 rounded-lg hover:bg-black hover:text-white border-2 border-black'>
   
    LogOut
    
    </button>
    </Link>
      ):(   <Link to="/login">
    <button  className='px-3 py-1 text-black hover:opacity-90 rounded-lg border-2 border-black'>
   
    LogIn
    
    </button>
    </Link>)
    }
     
    </div>
    </div>

    </div>
    </header>
  )
}

export default Header