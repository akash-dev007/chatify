import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/user";
import {io} from 'socket.io-client'
import toast from "react-hot-toast";
export const AuthContext = createContext()


export const AuthProvider = ({children}) => {
 const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [token,setToken] = useState(localStorage.getItem('token'))
 const [authUser,setAuthUser] = useState(null)
 const [onlineUsers,setOnlineUsers] = useState([])
const [socket,setSocket] = useState(null)


const checkAuth = async () => {
    try {
        const {data} = await api.get('/api/user/check-auth')
        console.log(data)
        setAuthUser(data.user)
        connectSocket(data.user)
    } catch (error) {
        console.log(error)
    }
}

// login function to handle user authentication and socket connection 

 const login = async(state,credientials) => {
    try {
        const {data} = await api.post(`/api/user/${state}`,credientials)
        console.log(data)
        if(data.success) {
        setAuthUser(data.user)
        api.defaults.headers.common['token'] = data.token
        setToken(data.token)
        localStorage.setItem('token',data.token)
        
        connectSocket(data.user)
        toast.success(data.message)
    }

    } catch (error) {
        console.log(error)
    }
 }


// logout
const logout = async () => {
    localStorage.removeItem('token')
    setToken(null)
    setAuthUser(null)
    setOnlineUsers([])
    api.defaults.headers.common['token'] = null
    toast.success('logout successfully')
    socket.disconnect()
}

// update profile

const updateProfile = async (body) => {
    try {
        const {data} = await api.put('/api/user/update-profile',body)
        console.log(data)
        if(data.success) {
            setAuthUser(data.user)
            toast.success(data.message)
        }
    } catch (error) {
        console.log(error)
    }
}


// connect socket function to handle socket connection and online usrs update
const connectSocket = async (userData) => {
    if(!userData || socket?.connected) return
 const newSocket = io(backendUrl,{
    query:{
        userId:userData._id
    }
 })
 newSocket.connect()
 setSocket(newSocket)
 newSocket.on('getOnlineUsers',usersId => {
    setOnlineUsers(usersId)
 })

}

useEffect(() => {
    
    if(token) {
        // api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        api.defaults.headers.common['token'] = token
    }
  checkAuth()
},[]) 


 const value = {

  token,
  authUser,
  onlineUsers,
  socket,
  login,
  logout,
  updateProfile,
  checkAuth
 }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuthContext = () => {
    return useContext(AuthContext)
}