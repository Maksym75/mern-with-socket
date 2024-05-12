import Room from '../../models/Room.js'
import BaseController from './BaseController.js'
export default class RoomController extends BaseController {
	// socket
	// constructor(socket) {
	// 	this.socket = socket
	// }
	joinRoom = ({ roomId }) => {
		this.socket.join(roomId)

		//console.log('Joining Room')
	}
	newRoomCreated = ({ roomId, userId }) => {
		const room = new Room({
			name: 'Test',
			roomId,
			userId,
		})
		room.save()
		// this.socket.broadcast.emit('new-room-created', { roomId })
		this.socket.emit('new-room-created', { room })
	}

	roomRemoved = async ({ roomId }) => {
		await Room.deleteOne({ roomId })
		this.socket.emit('room-removed', { roomId })
	}
}
