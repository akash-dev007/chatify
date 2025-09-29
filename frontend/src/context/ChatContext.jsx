import { createContext,useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { api } from "../api/user";
import toast from "react-hot-toast";


 export const ChatContext = createContext();

export const ChatProvider = ({children}) => {
 const [messages,setMessages] = useState([])
 const [users,setUsers] = useState([])
 const [selectedUser,setSelectedUser] = useState(null)
 const [unseenMessage,setUnseenMessages] = useState({})
const {socket} = useAuthContext()

 // function to get all users for sidebar
 const getAllUsers = async () => {
     try {
        const {data} = await api.get('/api/message/users')
        if(data.success) {
            setUsers(data.users)
          
            setUnseenMessages(data.unseenMessages)
        }
     } catch (error) {
        console.log(error)
        toast.error(error.message)
     }
 }

// function to get all messages for a selected user

 const getAllMessages = async (userId) => {
     try {
        const {data} = await api.get(`/api/message/${userId}`)
        if(data.success) {
            setMessages(data.messages)
        }
     } catch (error) {
        console.log(console.error)
        toast.error(error.message) 
     }
 }


// function to send message to a selected user
 const sendMessage = async (messageData) => {
     try {
         const {data} = await api.post(`/api/message/send/${selectedUser._id}`,messageData)
         if(data.success) {
             setMessages((prevMessages) => [...prevMessages,data.newMessage])
         }
     } catch (error) {
        console.log(error)
     }
 }

 // function to subscribe to messages for selected user
 const subscribeToMessages = () => {
     if(!socket) return
     socket.on('newMessage',(newMessage)=> {
        if(selectedUser && newMessage.senderId === selectedUser._id) {
            newMessage.seen = true
 setMessages((prevMessages) => [...prevMessages,newMessage])
 api.put(`/api/message/mark/${newMessage._id}`)
        } else {
            setUnseenMessages((prevUnseenMessages) => {
                return {...prevUnseenMessages,[newMessage.senderId]: prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages[newMessage.senderId] + 1 : 1}
            })
        }
     })
 }

 // function unsubscribe to messages 
  const unsbscribeMessages = () => {
     if(!socket) return
     socket.off('newMessage')
 }

 useEffect(() => {
 subscribeToMessages()
 return () => {
     unsbscribeMessages()
 }
 },[socket,selectedUser])


   const value={
      messages,
      setMessages,
      users,
      selectedUser,
      setSelectedUser,
      getAllUsers,
      getAllMessages,
      sendMessage,
      unseenMessage,
      setUnseenMessages
    }
    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>

}

export const useChatContext = () => {
    return useContext(ChatContext);
}