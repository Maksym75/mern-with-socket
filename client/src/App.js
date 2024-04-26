import Container from '@mui/material/Container'
import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { io } from 'socket.io-client'
function App() {
	const [socket, setSocket] = useState(null)
	useEffect(() => {
		setSocket(io('http://localhost:4000'))
	}, [])
	return (
		<div>
			<Container>
				<Header />
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<Outlet context={[socket, setSocket]} />
				</Box>
			</Container>
		</div>
	)
}

export default App
