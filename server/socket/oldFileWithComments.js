const sockets = socket => {
	console.log('Connection is ready')

	let skt = socket.broadcast

	function applyRoomFilter(roomId) {
		return (skt = roomId ? skt.to(roomId) : skt)
	}
	socket.on('send-message', ({ message, roomId }) => {
		// let skt = socket.broadcast
		// skt = roomId ? skt.to(roomId) : skt
		// skt.emit('message-from-server', { message, roomId })
		applyRoomFilter(roomId).emit('message-from-server', { message, roomId })
		// console.log(`Message received`, data)
	})
	//? On Back we listen "typing" from Front & emit another event "typing-from-server" & broadcasting everybody without ourself
	socket.on('typing-started', ({ roomId }) => {
		// let skt = socket.broadcast
		// skt = roomId ? skt.to(roomId) : skt
		// skt.emit('typing-started-from-server')
		applyRoomFilter(roomId).emit('typing-started-from-server')
		// console.log('typing-from-server')
	})
	socket.on('typing-stopped', ({ roomId }) => {
		// let skt = socket.broadcast
		// skt = roomId ? skt.to(roomId) : skt
		// skt.emit('typing-stopped-from-server')
		applyRoomFilter(roomId).emit('typing-stopped-from-server')
		// socket.broadcast.emit('typing-stopped-from-server')
	})
	socket.on('join-room', ({ roomId }) => {
		socket.join(roomId)
		console.log('Joining Room')
	})

	socket.on('disconnect', () => {
		console.log('User Left')
	})
}
