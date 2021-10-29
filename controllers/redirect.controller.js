const Link = require('../db/models/Link.js')
const config = require('config')
const shortid = require('shortid')

const getLink = async (req, res) => {
	try {
		const link = await Link.findOne({ code: req.params.code })

		if (link) {
			link.clicks++
			await link.save()
			return res.redirect(link.from)
		}
		res.status(404).json({ message: 'Link\'s not found' })
	} catch (e) {
		res.status(500).json({ message: 'Something went wrong, try again later.'})
	}
}

module.exports = {
	getLink
}