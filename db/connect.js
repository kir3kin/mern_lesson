const mongoose = require('mongoose')
const config = require('config')

const dbConnect = async () => {
	try {
		await mongoose.connect(config.get('dbMongooseUrl'), {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
	} catch(e) {
		console.log('Database error:', e.message)
		process.exit(1)
	}
}

module.exports = dbConnect