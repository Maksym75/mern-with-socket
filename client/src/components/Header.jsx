import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { Box } from '@mui/material'
// import Cookies from 'js-cookies'
// import Cookie from 'js-cookie'
import Cookies from 'universal-cookie'
const Header = ({ socket, userId, setUserId }) => {
	const navigate = useNavigate()

	const [rooms, setRooms] = useState([])
	const cookies = new Cookies(null, { path: '/' })
	function createNewRoom() {
		const roomId = uuidv4()
		navigate(`/room/${roomId}`)
		socket.emit('new-room-created', { roomId, userId })
		//? will be seen already on ours page
		// setRooms([...rooms, roomId])
		// setRooms([...rooms, { roomId, name: 'Test', _id: 'Test _id' }])
	}

	useEffect(() => {
		async function fetchRooms() {
			const res = await fetch('http://localhost:4000/rooms')
			const { rooms } = await res.json()
			console.log('rooms from UseEffect', rooms)
			setRooms(rooms)
		}
		fetchRooms()
	}, [])

	useEffect(() => {
		if (!socket) return
		// socket.on('new-room-created', ({ roomId }) => {
		// 	setRooms([...rooms, roomId])
		// })
		socket.on('new-room-created', ({ room }) => {
			setRooms([...rooms, room])
		})
		socket.on('room-removed', ({ roomId }) => {
			setRooms(rooms.filter(room => room.roomId !== roomId))
		})
	}, [socket, rooms])

	function login() {
		const userId = uuidv4()
		setUserId(userId)
		//Cookies.setItem('userIds', userId)
		// Cookie.set('userId', userId)
		cookies.set('userId', userId)

		navigate('/')
	}
	function logout() {
		setUserId(null)
		//Cookies.setItem('userIds', userId)
		cookies.remove('userId')

		navigate('/')
	}

	return (
		<Card sx={{ marginTop: 5, backgroundColor: 'grey' }} raised>
			<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Box>
					<Link to='/'>
						<Button sx={{ color: 'white' }} variant='text'>
							Home
						</Button>
					</Link>
					{/* rooms.length > 0 && */}
					{rooms.map(item => (
						<Link key={item.roomId} to={`/room/${item.roomId}`}>
							<Button sx={{ color: 'white' }} variant='text'>
								{item.roomId + ' ' + item.name}
							</Button>
						</Link>
					))}
				</Box>
				<Box>
					{userId && (
						<>
							<Button sx={{ color: 'white' }} variant='text' onClick={logout}>
								Logout
							</Button>
							<Button
								sx={{ color: 'white' }}
								variant='text'
								onClick={createNewRoom}
							>
								New Room
							</Button>
						</>
					)}
					{!userId && (
						<Button sx={{ color: 'white' }} variant='text' onClick={login}>
							Login
						</Button>
					)}
				</Box>
			</Box>
		</Card>
	)
}

export default Header
