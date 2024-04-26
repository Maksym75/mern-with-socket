import React, { useEffect } from 'react'
import { useParams, useOutletContext } from 'react-router-dom'
/// import { io } from 'socket.io-client'

const Room = () => {
	let params = useParams()

	const [socket] = useOutletContext()
	// const socket = io()

	useEffect(() => {
		if (!socket) return
		socket.emit('join-room', { roomId: params.roomId })
		console.log(params)
	}, [socket, params])
	return <h1> ROOOOOOM</h1>
}

export default Room
