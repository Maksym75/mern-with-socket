import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import SendIcon from '@mui/icons-material/Send'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import { v4 as uuidv4 } from 'uuid'
import { useOutletContext, useParams, useNavigate } from 'react-router-dom'
// import { io } from 'socket.io-client'

const ChatWindow = () => {
	const { socket } = useOutletContext()
	const { roomId } = useParams()
	const [message, setMessage] = useState('')
	const [chat, setChat] = useState([])
	const [typing, setTyping] = useState(false)
	const [typingTimeout, setTypingTimeout] = useState(null)

	const navigate = useNavigate()

	//* тут 4000 потому что наш Backend на нем
	// useEffect(() => {
	// 	setSocket(io('http://localhost:4000'))
	// }, [])
	useEffect(() => {
		if (!socket) return
		socket.on('message-from-server', data => {
			setChat(prev => [
				...prev,
				{ message: data.message, received: true, id: uuidv4() },
			])
			// console.log(`Messssage received back`, data, 'Chat--', chat)
		})
		socket.on('typing-started-from-server', () => setTyping(true))
		socket.on('typing-stopped-from-server', () => setTyping(false))
	}, [socket])

	const handleForm = e => {
		e.preventDefault()
		socket.emit('send-message', { message, roomId })
		setChat(prev => [...prev, { message, received: false, id: uuidv4() }])

		setMessage('')
	}
	const handleInput = e => {
		setMessage(e.target.value)
		socket.emit('typing-started', { roomId })
		if (typingTimeout) clearTimeout(typingTimeout)
		setTypingTimeout(
			setTimeout(() => {
				socket.emit('typing-stopped', { roomId })
			}, 1000)
		)
	}

	async function removeRoom() {
		// const res = await fetch(`http://localhost:4000/rooms/${roomId}`, {
		// 	method: 'DELETE',
		// })
		socket.emit('room-removed', { roomId })
		navigate('/')
	}
	return (
		<Card
			sx={{
				padding: 2,
				marginTop: 10,
				width: '60%',
				backgroundColor: 'gray',
			}}
		>
			<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
				{roomId && <Typography>Room {roomId}</Typography>}
				{roomId && (
					<Button
						size='small'
						variant='text'
						sx={{ color: 'orange' }}
						onClick={removeRoom}
					>
						Delete room
					</Button>
				)}
			</Box>

			<Box sx={{ marginBottom: 10 }}>
				{chat.map(data => (
					<Typography
						sx={{ textAlign: !data.received ? 'right' : 'left' }}
						key={data.id}
					>
						{data.message}
					</Typography>
				))}
			</Box>
			<Box component='form' onSubmit={handleForm}>
				{typing && (
					<InputLabel sx={{ color: 'white' }} shrink htmlFor='message-input'>
						Typing...
					</InputLabel>
				)}

				<OutlinedInput
					// <TextField
					sx={{
						backgroundColor: 'white',
					}}
					size='small'
					fullWidth
					id='message-input'
					placeholder='Write your message'
					value={message}
					inputProps={{ 'aria-label': 'search google maps' }}
					onChange={handleInput}
					endAdornment={
						<InputAdornment position='end'>
							<IconButton type='submit' edge='end'>
								<SendIcon />
							</IconButton>
						</InputAdornment>
					}
				/>
			</Box>
		</Card>
	)
}

export default ChatWindow
