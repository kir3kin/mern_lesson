const Link = require('../db/models/Link.js')
const config = require('config')
const shortid = require('shortid')

const getLinks = async (req, res) => {
	try {
		const links = await Link.find({ owner: req.user.userId })
		res.json(links)

	} catch (e) {
		res.status(500).json({ message: 'Something went wrong, try again later.'})
	}
}

const getLink = async (req, res) => {
	try {
		const link = await Link.findById(req.params.id)
		res.json(link)

	} catch (e) {
		res.status(500).json({ message: 'Something went wrong, try again later.'})
	}
}

const generateLink = async (req, res) => {
	try {
			const baseUrl = config.get('baseUrl')
		const { from } = req.body
		const code = shortid.generate()
		const existing = await Link.findOne({ from })

		if (existing) {
			return res.json({ link: existing })
		}

		const to = baseUrl + '/t/' + code
		const link = new Link({
			code, to, from, owner: req.user.userId
		})

		await link.save()

		res.status(201).json({ link })

	} catch (e) {
		res.status(500).json({ message: 'Something went wrong, try again later.'})
	}
}

module.exports = {
	generateLink,
	getLinks,
	getLink
}