const { check } = require('express-validator')

const loginValidator = [
	check('email', 'Enter correct email').normalizeEmail().isEmail(),
	check('password', 'Enter password').exists()
]

module.exports = loginValidator