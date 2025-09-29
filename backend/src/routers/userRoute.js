const { createAccount, login, logout, updateProfile, checkAuth, getAuthUser } = require('../controllers/userController')
const authenticate = require('../middleware/auth')

const router = require('express').Router()
 
router.post('/signup',createAccount)
router.post('/login',login)
router.post('/logout',logout)
router.put('/update-profile',authenticate,updateProfile)
router.get('/check-auth',authenticate,getAuthUser)

module.exports = router