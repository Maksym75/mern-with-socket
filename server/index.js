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
		//* тут 3000 потому что наш фронтенд на нем
		origin: ['http://localhost:3000'],
	},
})
const __dirname = dirname(fileURLToPath(import.meta.url))
app.get('/', (req, res) => {
	res.sendFile(join(__dirname, 'index.html'))
})

io.on('connection', socket => {
	console.log('Connection is ready')
	socket.on('send-message', data => {
		socket.broadcast.emit('message-from-server', data)
		// console.log(`Message received`, data)
	})
	//? On Back we listen "typing" from Front & emit another event "typing-from-server" & broadcasting everybody without ourself
	socket.on('typing-started', () => {
		socket.broadcast.emit('typing-started-from-server')
		console.log('typing-from-server')
	})
	socket.on('typing-stopped', () => {
		socket.broadcast.emit('typing-stopped-from-server')
	})
	socket.on('join-room', ({ roomId }) => {
		socket.join(roomId)
		console.log('Joining Room')
	})

	socket.on('disconnect', () => {
		console.log('User Left')
	})
})

httpServer.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`)
})
