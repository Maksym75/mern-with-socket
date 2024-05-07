import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

import sockets from './socket/sockets.js'

const app = express()

const PORT = 4000

const httpServer = createServer(app)

const io = new Server(httpServer, {
	cors: {
		//* тут 3000 потому что наш фронтенд на нем
		origin: ['http://localhost:3000'],
	},
})
const __dirname = dirname(fileURLToPath(import.meta.url))
app.get('/', (req, res) => {
	res.sendFile(join(__dirname, 'index.html'))
})

io.on('connection', sockets)

httpServer.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`)
})
