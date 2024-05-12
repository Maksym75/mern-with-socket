import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

import sockets from './socket/sockets.js'

import mongoose from 'mongoose'

import router from './Api/routes.js'
import cors from 'cors'

await mongoose.connect(
	'mongodb+srv://mern-socket123:mern-socket123@cluster0.qrdp1pk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
)
//'mongodb+srv://mern-socket123:mern-socket123@cluster0.qrdp1pk.mongodb.net/'
// 'mongodb+srv://mern-socket123:mern-socket123@cluster0.qrdp1pk.mongodb.net'
// 'mongodb+srv://mern-socket123:mern-socket123@cluster0.qrdp1pk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
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

app.use(cors())

app.get('/', (req, res) => {
	res.sendFile(join(__dirname, 'index.html'))
})

app.use('/', router)

io.on('connection', sockets)

httpServer.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`)
})
