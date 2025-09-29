import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import { useChatContext } from '../context/ChatContext'

const Home = () => {
   const {selectedUser, setSelectedUser} = useChatContext();
    
  return (
    <div className='w-full h-screen border sm:px-[15%] sm:py-[5%]'>

 <div className={`backdrop-blur-xl grid grid-cols-1 border-2 border-slate-600 text-white rounded-2xl h-[100%] relative overflow-hidden ${selectedUser ? "md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]":"md:grid-cols-2"} `}>
  <Sidebar 
  />
  <ChatContainer />
  <RightSidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>

 </div>


    </div>
  )
}

export default Home