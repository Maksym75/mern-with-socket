import BaseController from './BaseController.js'

export default class RoomController extends BaseController {
	// socket
	// constructor(socket) {
	// 	this.socket = socket
	// }
	joinRoom = ({ roomId }) => {
		this.socket.join(roomId)
		console.log('Joining Room')
	}
}
