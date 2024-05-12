import Container from '@mui/material/Container'
import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { io } from 'socket.io-client'

// import Cookies from 'js-cookies'
import Cookie from 'js-cookie'
import Cookies from 'universal-cookie'

function App() {
	const [socket, setSocket] = useState(null)
	const [userId, setUserId] = useState(null)
	const cookies = new Cookies(null, { path: '/' })

	useEffect(() => {
		setSocket(io('http://localhost:4000'))
		//const _userIds = Cookies.getItem('userIds')
		//if (_userIds) setUserId(_userIds)
		// const _userId = Cookie.get('userId')
		// if (_userId) setUserId(_userId)
		const _userId = cookies.get('userId')
		if (_userId) setUserId(_userId)
	}, [])
	return (
		<div>
			<Container>
				<Header socket={socket} userId={userId} setUserId={setUserId} />
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<Outlet context={{ socket, userId }} />
				</Box>
			</Container>
		</div>
	)
}

export default App
