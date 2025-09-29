const router = require('express').Router()
 const userRouter = require('./userRoute')
 // all routes defines
 
  router.use('/api/user',userRouter)
  





 module.exports = router;
