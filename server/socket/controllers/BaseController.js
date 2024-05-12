export default class BaseController {
	socket

	constructor(socket) {
		this.socket = socket
	}

	filterSocketBySameId = roomId => {
		let skt = this.socket.broadcast
		return (skt = roomId ? skt.to(roomId) : skt)
	}
}
