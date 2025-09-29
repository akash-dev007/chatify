import React, { useEffect, useState } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { formatMessageTime } from '../lib/utils'
import { useChatContext } from '../context/ChatContext'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'

const ChatContainer = ({}) => {

   const {messages,selectedUser,setSelectedUser,sendMessage,getAllMessages} = useChatContext()
   const {authUser,onlineUsers} = useAuthContext()
const [input,setInput] = useState('')

console.log(input)

  const scrollEnd = React.useRef(null)
 const handleMessage = async e => {
     e.preventDefault()
     if(input.trim() === '') {
      alert('write something')
      return
     }

     await sendMessage({text:input.trim()})
     setInput('')
 }

// 
 const handleSendImage = async(e) => {
  const file = e.target.files[0]
  if(!file || file.type.startsWith('image/*')) {
     toast.error('Please select a valid image' )
     return
  }
  const reader = new FileReader()
  reader.onload = async () => {
    await sendMessage({image:reader.result})
    // after send the image clear the input
    e.target.value = ''
  }
  reader.readAsDataURL(file)

 }

  // get messages
  useEffect(() => {
    if(selectedUser) {
      getAllMessages(selectedUser._id)
    }
  },[selectedUser])

  useEffect(() => {
    if(scrollEnd.current && messages) {
    scrollEnd.current?.scrollIntoView({behavior: 'smooth'})
    }
  },[messages])

  console.log(messages)


  return selectedUser ? (
    <div className='h-full overflow-y-scroll backdrop-blur-lg relative'>
      {/* header */}
      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
         <img src={selectedUser.profilePic || assets.avatar_icon} alt="" className='w-8 aspect-[1/1] rounded-full' />
         <p className='flex items-center gap-2'>{selectedUser.fullName || 'User'}
          {onlineUsers.includes(selectedUser._id)}
           <span className='w-2 h-2 rounded-full bg-green-500'></span>
         </p>
         <img onClick={() => selectedUser(null)} src={assets.arrow_icon} alt="" className='max-w-7 md:hidden'/>
         <img src={assets.help_icon} alt="" className='max-md:hidden max-w-5 ml-auto' />
      </div>

{/* chat */}
 <div className='flex flex-col overflow-scroll p-3 pb-6 h-[calc(100%-120px)]'>
   {
     messages.map((msg,i) => (
      <div key={i} className={`flex items-end justify-end gap-2 ${msg.senderId !== authUser._id && 'flex-row-reverse'}`}>
        {
          msg.image ? (<img className='max-w-[230px] border border-gray-500 rounded-lg overflow-hidden mb-8' src={msg.image}/>):(<p className={`bg-violet-500/30 p-2 rounded-lg max-w-[200px] mb-8 md:text-sm break-all ${msg.senderId === authUser._id ?'rounded-br-none':'rounded-bl-none'}`}>{msg.text}</p>)
        }
<div className='text-center text-xs'>
  <img src={msg.senderId === authUser._id ? authUser?.profilePic || assets.avatar_icon : selectedUser?.profilePic || assets.profile_martin} alt="" className='w-8 aspect-[1/1] rounded-full' />
  <p>{formatMessageTime(msg.createdAt)}</p>
</div>


      </div>
   ))}
   <div ref={scrollEnd}></div>
 </div>

 {/* bottom  */}
 <div className='absolute left-0 right-0 flex items-center bottom-0 gap-3 p-3'>
   <div className='flex-1 flex items-center bg-gray-100/12 rounded-full '>
     <input type="text" name="" id="" placeholder='Send a message' 
     className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white'
     onChange={(e) => setInput(e.target.value)}
     value={input}
     onKeyDown={(e)=> e.key === 'Enter'? handleMessage(e):null }
     />
     <input type="file" name="" id="image" accept='image/*' hidden 
     onChange={handleSendImage}
     
     />
     <label htmlFor="image">
      <img src={assets.gallery_icon} alt="" className='w-5 mr-5' />
     </label>
   </div>
   <img src={assets.send_button} alt="" className='w-7 cursor-pointer' onClick={handleMessage} />
 </div>
 
    </div>
  ):(
    <div className='flex flex-col justify-center items-center gap-4 text-gray-500 bg-white/10 max-md:hidden'>
    <img src={assets.logo_icon} alt="" className='max-w-16'/>
    <p className='font-medium text-lg text-white'>Chat anytime,anywhere</p>
    </div>
  )
}

export default ChatContainer