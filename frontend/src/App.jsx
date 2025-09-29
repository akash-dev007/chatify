import React, { useEffect } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import ProfilePage from './pages/ProfilePage'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext'
const App = () => {
  const {authUser,checkAuth} = useAuthContext()
  //  useEffect(() => {
  //    checkAuth()
  //  },[])
  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain">
    
     <Routes>
        <Route path="/" element={authUser ? <Home />:<Navigate to='/login'/>} />
        <Route path='/login' element={!authUser ? <Login/> : <Navigate to='/'/>}/>
        <Route path='/profile' element={authUser ? <ProfilePage/> :<Navigate to='/login' /> }/>

     </Routes>
    
    
    </div>
  )
}

export default App