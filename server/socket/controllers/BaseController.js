export default class BaseController {
	socket

	constructor(socket) {
		this.socket = socket
	}

	applyRoomFilter = roomId => {
		let skt = this.socket.broadcast
		return (skt = roomId ? skt.to(roomId) : skt)
	}
}
