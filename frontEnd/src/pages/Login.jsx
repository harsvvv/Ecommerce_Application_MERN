/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
// import loginIcons from "../assest/signin.gif"
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import Context from '../context';


const Login = () => {
    const [showPassword,setShowPassword]=useState(false);
    const [data,setdata]=useState({
        email:"",
        password:""
    })
    const navigate=useNavigate()
    const {fetchUserDetails,fetchUserAddToCart}=useContext(Context);
    
   
    const handleOnChange=(e)=>{
        setdata({
            ...data,
            [e.target.id]:e.target.value,
        })
    }
    
    const showpassword=()=>{
    setShowPassword((prev)=>!prev);
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
          
          const res=await fetch('/api/login',{
            method:'POST',
            headers:{
              "content-type":"application/json"
            },
            body:JSON.stringify(data)
          }) 
          const data1=await res.json();
          console.log(data1);
          if(data1.statuscode===200){
            toast.success(data1.message);
            
            navigate('/');
            fetchUserDetails();
            fetchUserAddToCart()
          }else{
            toast.error(data1.message)
          }
        } catch (error) {
          toast.error(error.message);
        }
    }
  return (
    
    <section id='login' >
       <div className=' container p-10'>
  <div className='bg-white p-2 w-full mx-auto max-w-md '>
  <div className='w-20 h-20 mx-auto flex justify-center items-center'>
    {/* <img src={loginIcons} alt='login icons'/> */}
    <h1 className='font-semibold text-4xl'>Login</h1>
  </div>
  <form onSubmit={handleSubmit} className='p-4'>
    <div className='grid'>
        <label className='m-2 font-semibold'>Email:</label>
        <div className='bg-slate-100 border border-black p-3 rounded flex justify-between'>
        <input
        onChange={handleOnChange}
  type="email"
  placeholder="email.."
  className="w-full h-full outline-none bg-transparent"
  id='email'
/>
        </div>
    </div>
    <div className='grid mt-2'>
        <label className='mb-2 font-semibold'>Password:</label>
       <div className='bg-slate-100 border border-black p-3 rounded flex justify-between'>
       <input
       onChange={handleOnChange}
  type={showPassword ?  'text':'password'}
  placeholder='Password..'
  className='w-full h-full outline-none bg-transparent'
  id='password'
/>

       <span onClick={showpassword}>
       { showPassword ?
        <FaRegEye className='cursor-pointer' />:<FaRegEyeSlash className='cursor-pointer'/>}
       </span>
       </div>
    </div>
    <Link to='/forgot-password'>
        <p className='text-red-300 text-sm underline m-1 hover:text-red-500'>forget password ?</p>
    </Link>
    <button className='bg-green-400 p-3 w-full mt-3 rounded-full hover:scale-90 transition'>Login</button>
  </form>
  <p className='text-sm m-2'>don't have an acount? <Link to='/signup'><span className='text-red-600 underline'>Signup</span></Link> </p>
  </div>
       </div>

    </section>

  )
}

export default Login