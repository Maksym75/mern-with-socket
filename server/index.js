import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const app = express()

const PORT = 4000

const httpServer = createServer(app)

const io = new Server(httpServer, {
	cors: {
		origin: '*',
	},
})
const __dirname = dirname(fileURLToPath(import.meta.url))
app.get('/', (req, res) => {
	res.sendFile(join(__dirname, 'index.html'))
})

io.on('connection', socket => {
	console.log('Connection is ready')
})

httpServer.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`)
})
