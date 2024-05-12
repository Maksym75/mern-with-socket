import mongoose from 'mongoose'
const { Schema, model } = mongoose

const roomsSchema = new Schema({
	name: String, // String is shorthand for {type: String}
	roomId: String,
	userId: String,
})
export default model('Room', roomsSchema)
