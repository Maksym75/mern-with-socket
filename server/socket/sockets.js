import MessageController from './controllers/MessageController.js'
import RoomController from './controllers/RoomController.js'
import TypingController from './controllers/TypingController.js'

const sockets = socket => {
	console.log('Connection is ready')

	const typingController = new TypingController(socket)

	const roomController = new RoomController(socket)

	const messageController = new MessageController(socket)

	// let skt = socket.broadcast

	// function applyRoomFilter(roomId) {
	// 	return (skt = roomId ? skt.to(roomId) : skt)
	// }
	socket.on('send-message', messageController.sendMessage)
	socket.on('typing-started', typingController.typingStarted)
	socket.on('typing-stopped', typingController.typingStopped)
	socket.on('join-room', roomController.joinRoom)

	socket.on('disconnect', () => {
		console.log('User Left')
	})
}
export default sockets
