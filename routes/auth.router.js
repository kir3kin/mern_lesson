const { Router } = require('express')
const registerValidator = require('../middlewares/user.register.validator.js')
const loginValidator = require('../middlewares/user.login.validator.js')

const {
	register,
	login
} = require('../controllers/auth.controller.js')

const router = Router()
router.post('/register', registerValidator, register)
router.post('/login', loginValidator, login)
module.exports = router
