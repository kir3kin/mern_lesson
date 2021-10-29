const { Router } = require('express')
const authMiddleware = require('../middlewares/auth.middleware')

const {
	generateLink,
	getLinks,
	getLink
} = require('../controllers/links.controller.js')

const router = Router()
router.post('/generate', authMiddleware, generateLink)
router.get('/', authMiddleware, getLinks)
router.get('/:id', authMiddleware, getLink)
module.exports = router
