/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState } from 'react'
import loginIcons from "../assest/signin.gif"
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link,useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import imageTobase64 from '../Helper/imageTobase64';
// eslint-disable-next-line no-unused-vars
import SummeryApi from '../../common';
import toast, { Toaster } from 'react-hot-toast';


const SignUp = () => {
    const [showPassword,setShowPassword]=useState(false);
    const [data,setData]=useState({
        email:"",
        password:"",
        name:"",
        confirmPassword:"",
        profilePic:""
    })
    const navigate = useNavigate();
    
    
    const fileRef=useRef(null);
    console.log(data);
    const handleOnChange=(e)=>{
        setData({
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
          if(data.password!==data.confirmPassword){
            
            throw new Error("password are not same");
          }
          const res=await fetch('https://techtronics-y2b2.onrender.com/api/signup',{
            method:"post",
            headers:{
              "content-type":"application/json"
            },
            body:JSON.stringify(data)
          }) 
         const data1=await res.json();
         console.log(data1);

         toast.success(data1.message);
        if(data1.status!=='500'){
          navigate("/login");
        }
         
        } catch (error) {
          console.log("eror from signup",error);
          toast.error(error.message);
        }
        
    }
    const handleUploadPic=async(e)=>{
      const file=e.target.files[0];
      const imagePic=await imageTobase64(file);
     
      setData({
        ...data,
        profilePic:imagePic

      })
    }
  return (
    
    <section id='signup' >
       <div className=' container p-10'>
  <div className='bg-white p-2 w-full mx-auto max-w-md '>

  <div className=' '>
    {/* <input type='file'
    onChange={handleUploadPic}
        ref={fileRef}
        className='hidden'
        accept='image/*'
        
    /> */}
   
    {/* <div>
  <img src={data?.profilePic || loginIcons} alt='login icons' />

    </div> */}
    <div className='w-20 h-20 mx-auto flex justify-center items-center'>
    {/* <img src={loginIcons} alt='login icons'/> */}
    <h1 className='font-semibold text-4xl'>SignUp</h1>
  </div>
    {/* <div onClick={()=>fileRef.current.click()} className='text-xs bg-slate-200 w-full absolute bottom-0 bg-opacity-75 pb-4 pt-2 cursor-pointer text-center'>
        upload photo
    </div> */}
  </div>
  <form onSubmit={handleSubmit} className='p-4'>
  <div className='grid'>
        <label className='m-2 font-semibold'>Username:</label>
        <div className='bg-slate-100 border border-black p-3 rounded flex justify-between'
        id='name'>
        <input
        onChange={handleOnChange}
  type="text"
  placeholder="Username...."
  className="w-full h-full outline-none bg-transparent"
  id='name'
  required
/>
        </div>
    </div>
    <div className='grid'>
        <label className='m-2 font-semibold'>Email:</label>
        <div className='bg-slate-100 border border-black p-3 rounded flex justify-between'>
        <input
        onChange={handleOnChange}
  type="email"
  placeholder="email.."
  className="w-full h-full outline-none bg-transparent"
  id='email'
  required
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
  required
/>

       <span onClick={showpassword}>
       { showPassword ? 
        <FaRegEye className='cursor-pointer' />:<FaRegEyeSlash className='cursor-pointer'/>}
       </span>
       </div>
    </div>
    <div className='grid mt-2'>
        <label className='mb-2 font-semibold'>Confirm Password:</label>
       <div className='bg-slate-100 border border-black p-3 rounded flex justify-between'>
       <input
       onChange={handleOnChange}
       type={showPassword ?  'text':'password'}
  placeholder='Password..'
  className='w-full h-full outline-none bg-transparent'
  id='confirmPassword'
  required
/>

       <span onClick={showpassword}>
       { showPassword ? 
        <FaRegEye className='cursor-pointer' />:<FaRegEyeSlash className='cursor-pointer'/>}
       </span>
       </div>
    </div>
   
    <button className='bg-green-400 p-3 w-full mt-3 rounded-full hover:scale-90 transition'>SignUp</button>
  </form>
  <p className='text-sm m-2'>Already have an acount? <Link to='/login'><span className='text-red-600 underline'>Login</span></Link> </p>
  </div>
       </div>

    </section>

  )
}

export default SignUp