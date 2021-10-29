const bcrypt = require('bcryptjs')
const User = require('../db/models/User.js')
const jwt = require('jsonwebtoken')
const config = require('config')
const { validationResult } = require('express-validator')

const register = async (req, res) => {
	try {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: 'Incorrect entered data!'
			})
		}

		const {email, password} = req.body
		const candidate = await User.findOne({ email })

		if (candidate) {
			return res.status(400).json({ message: 'User with such email already exists!'})
		}

		const hashedPassword = await bcrypt.hash(password, 12)
		const user = new User({ email, password: hashedPassword })

		await user.save()

		res.status(201).json({ message: 'User has been created!' })

	} catch (e) {
		res.status(500).json({ message: 'Something went wrong, try again later.'})
	}
}

const login = async (req, res) => {
	try {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: 'Incorrect entered data!'
			})
		}

		const { email, password } = req.body
		const user = await User.findOne({ email })

		if (!user)
			return res.status(400).json({ message: 'User\'s not found' })

		const isMatch = await bcrypt.compare(password, user.password)

		if (!isMatch)
			return res.status(400).json({ message: 'Incorrect entered password!' })

		const token = jwt.sign(
			{ userId: user.id },
			config.get('jwtSecret'),
			{ expiresIn: '1h' }
		)

		res.json({ token, userId: user.id })

	} catch (e) {
		res.status(500).json({ message: 'Something went wrong, try again later.'})
	}
}

module.exports = {
	register,
	login
}