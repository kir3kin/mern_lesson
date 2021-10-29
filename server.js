const express = require('express')
const http = require('http')
const app = express()
// const cors = require('cors')
const path = require('path')

const config = require('config')
const PORT = config.get('port') || 5000
const dbConnect = require('./db/connect.js')
const authRouter = require('./routes/auth.router.js')
const linksRouter = require('./routes/links.router.js')
const redirectRouter = require('./routes/redirect.router.js')

// app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routers
dbConnect()
app.use('/api/auth', authRouter)
app.use('/api/link', linksRouter)
app.use('/t', redirectRouter)

if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static(path.join(__dirname, 'client', 'build', 'index.html')))
}

const httpServer = http.createServer(app)
httpServer.listen(PORT, () => {
	console.log(`server has been started on ${PORT}...`)
})