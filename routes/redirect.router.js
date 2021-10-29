const {Router} = require('express')
const router = Router()

const {
	getLink
} = require('../controllers/redirect.controller.js')

router.get('/:code', getLink)
module.exports = router
