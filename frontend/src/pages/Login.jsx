import React, { useState } from 'react'
import assets from '../assets/assets'
import { useAuthContext } from '../context/AuthContext'

const Login = () => {
  const [currentState,setCurrentState] = useState('Signup')
  const [data,setData] = useState({
    fullName:'',
    email:'',
    password:'',
    bio:''
  })
  const [isDataSubmitted,setIsDataSubmitted] = useState(false) 
  const {login,authUser} = useAuthContext()
const handleSubmit = e => {
   e.preventDefault()
  if(currentState ==='Signup' && !isDataSubmitted){
    setIsDataSubmitted(true)
    return
  }
  login(currentState,data)
  
}
console.log(authUser)
 const handleChange = e => {
    setData({...data,[e.target.name]:e.target.value})
 }
  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center backdrop-blur-lg sm:justify-evenly max-sm:flex-col text-white gap-8'>

   <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)]' />
  
   <form action="" onSubmit={handleSubmit} className='flex flex-col gap-4 border-2 border-gray-600 bg-white/8 rounded shadow-lg p-6'>

    <h2 className='font-medium text-2xl flex justify-between items-center'>{currentState}
{
  isDataSubmitted &&  <img onClick={()=> setIsDataSubmitted(false)} src={assets.arrow_icon} alt="arrow" className='w-4 cursor-pointer' />
}
 

    </h2>


{
   currentState === 
   'Signup' && !isDataSubmitted && <input type="text" name='fullName'
   value={data.fullName}
   onChange={handleChange}
   className='p-2 border rounded-md focus:outline-none border-slate-400 '
   placeholder='fullName'
   />
} 

{

  !isDataSubmitted && (
    <>
    <input type="email" name='email'
   value={data.email}
   onChange={handleChange}
   className='p-2 border rounded-md focus:outline-none border-slate-400 '
   placeholder='Enter Enail'
   />

<input type="password" name='password'
   value={data.password}
   onChange={handleChange}
   className='p-2 border rounded-md focus:outline-none border-slate-400 '
   placeholder='password'
   />
    </>
  )
}
{
  currentState === 'Signup' && isDataSubmitted && (
    <textarea name="bio" id=""
    rows={4}
    className='p-2 border rounded-md focus:outline-none border-slate-400 focus:ring-2 focus:ring-indigo-500'
    placeholder='provide short bio...'
    required
    onChange={handleChange}
    value={data.bio}
    ></textarea>
  )
}

   <button className='w-full bg-gradient-to-r from-purple-400 to-violet-600 rounded-md p-2 cursor-pointer'>{
    
     currentState === 'Signup' ? 'Create Account':'Login Now'
    }</button>
 <div className='flex gap-3 items-center'>
   <input type="checkbox" name="" id="" />
   <p>Agree to the terms use & privacy policy</p>
 </div>

  <div className="flex flex-col gap-3 items-center">
    {
      currentState === 'Signup' ? <p>Already have an account? <span className='text-blue-500 cursor-pointer' onClick={() => {setCurrentState('Login');setIsDataSubmitted(false)}}>Login Here</span></p> : <p>Don't have an account? <span className='text-blue-500 cursor-pointer' onClick={() => setCurrentState('Sign up')}>Sign up</span></p>
    }
  </div>
   </form>
  
    </div>
  )
}

export default Login