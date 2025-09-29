import React, { useEffect, useState } from 'react'
import assets, { userDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { useChatContext } from '../context/ChatContext'
const Sidebar = ({}) => {

const [search,setSearch] = useState(false)
const {getAllUsers,users,selectedUser,setSelectedUser,unseenMessage,setUnseenMessages} = useChatContext()
console.log(search)
    const navigate = useNavigate()
    const {logout,onlineUsers} = useAuthContext()
     const filteredUsers = search ? users.filter((user) =>  user.fullName.toLowerCase().includes(search.toLowerCase())) : users  

 useEffect(() => {
    getAllUsers()
 },[onlineUsers])


  return (
    <div className={`bg-[#8185B2]/10 h-full overflow-y-scroll rounded-r-xl text-white p-5 ${selectedUser ? "max-md:hidden":""}`}>
    <div className='pb-5'>
        <div className='flex justify-between items-center'>
            <img src={assets.logo} alt="logo" className='max-w-40' />
            <div className='group relative py-2'>
                <img src={assets.menu_icon} alt="user" className='max-h-5 cursor-pointer' />
                <div className='absolute w-32 bg-[#282142] p-3 rounded-lg top-full right-0 z-10 border  border-gray-600 text-[#F6F3F4] hidden group-hover:block'>
                    <p onClick={()=> navigate('/profile')} className='text-sm cursor-pointer'>Edit profile</p>
                    <hr className='my-2 border-t border-slate-500' />
                    <p className='text-sm cursor-pointer' onClick={logout}>Logout</p>
                </div>
            </div>
        </div>

        {/* search */}
        <div className='bg-[#282142] flex items-center gap-2 py-2 px-4 rounded-full mt-5'>
            <img src={assets.search_icon} alt="search" className='w-3' />
            <input type="text" className='bg-transparent border-none outline-none text-sm placeholder-[#c8c8c8] flex-1' placeholder='Search User...'
            onChange={(e) => setSearch(e.target.value)}
            
            />
        </div>
        {/* user list */}
         <div className='flex flex-col mt-5'>
          {
            filteredUsers.map((user,i) => {
                return <div onClick={() => {setSelectedUser(user);setUnseenMessages((prev) => (
                    {
                        ...prev,
                        [user._id]:0
                    }
                ))}} key={i} className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${selectedUser?._id === user._id && "bg-[#282142]/70"} `}>
                    <img src={user?.profilePic || assets.avatar_icon} alt="user" className='w-[35px] aspect-[1/1] rounded-full' />
                    <div className='flex flex-col leading-5'>
                        <p>{user.fullName}</p>
                        {
                            onlineUsers.includes(user._id) ? <span className='text-green-500 text-sm'>Online</span>:<span className='text-neutral-500 text-sm'>Ofline</span>
                        }

                        {
                            unseenMessage[user._id] > 0 && <spa className='absolute top-4 right-4 w-5 h-5 flex justify-center items-center rounded-full bg-violet-500/50 '>{i}</spa>
                        }
                    </div>
                </div>
            })
          }
         </div>
    </div>
    </div>
  )
}

export default Sidebar