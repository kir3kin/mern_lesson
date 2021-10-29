const { check } = require('express-validator')

const registerValidator = [
	check('email', 'Incorrect email').isEmail(),
	check('password', 'Minimum 6 symbols are required')
		.isLength({ min: 6 })
]

module.exports = registerValidator