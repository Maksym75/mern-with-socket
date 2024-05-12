import React, { useEffect } from 'react'
import { useParams, useOutletContext } from 'react-router-dom'
import ChatWindow from '../components/ChatWindow'
/// import { io } from 'socket.io-client'

const Room = () => {
	let params = useParams()

	const { socket } = useOutletContext()
	// const socket = io()

	useEffect(() => {
		if (!socket) return
		socket.emit('join-room', { roomId: params.roomId })
		// console.log(params)
	}, [socket, params])
	return <ChatWindow />
}

export default Room
