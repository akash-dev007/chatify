import React from 'react'
import assets, { imagesDummyData } from '../assets/assets'

const RightSidebar = ({selectedUser}) => {

  return selectedUser && (
    <div className={`bg-[#8185b2]/10 relative w-full overflow-y-scroll ${selectedUser ? 'mx-md:hidden':''}`}>
       <div className='flex flex-col items-center gap-2 font-light mx-auto pt-16 text-xs'>
         <img src={selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-20 aspect-[1/1] rounded-full' />
         <h1 className='mx-auto text-xl flex items-center px-10 gap-2'>
          <p className='w-2 h-2 rounded-full bg-green-400'></p>
          {selectedUser.fullName}</h1>
          <p className='px-10 mx-auto'>{selectedUser.bio}</p>
       </div>
       <hr className='border-[#ffffff50] my-4' />
      <div className='px-5 text-xs'>
        <p>Media</p>
        <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4'>
     {
    imagesDummyData.map((url,i)=> (
      <div className='cursor-pointer'
       key={i}
       onClick={()=> window.open(url, '_blank')}
      >
        <img src={url} alt="" className='h-full rounded' />
      </div>
    ))
     }
        </div>
      </div>
      <button className='absolute bottom-5 left-1/2 transfrom -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 px-20 rounded-full py-1 text-white border-none cursor-pointer'>Logout</button>
    </div>
  )
}

export default RightSidebar