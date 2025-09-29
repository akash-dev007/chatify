
 const cloudinary = require('cloudinary').v2
 const fs = require('fs')
  cloudinary.config({
    cloud_name: 'dt2uigfkm', 
    api_key: '628541422353487', 
    api_secret:"eOG9ed8qDcAzBt9uWvgqPhCBKsE"

  })
  // IF YOU SEE IN TERMINAL STALE REQUEST HTTP ERROR PLEASE CHECK YOUR COMPUTER DATE TIME .FIX IT

  const uploadOnCloudinary = async (localPath) => {
      try {
        if(!localPath) return null
        const res =  await cloudinary.uploader.upload(localPath,{resource_type:'auto'})
        // file uploaded
        console.log('file uploaded on cloudinary',res.url)
        return res
      } catch (error) {
        fs.unlinkSync(localPath)
        console.log(error)
      }
  }

  module.exports = uploadOnCloudinary