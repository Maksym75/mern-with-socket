import React from 'react'
import { useOutletContext } from 'react-router-dom'
import Typography from '@mui/material/Typography'

const Home = () => {
	const { socket } = useOutletContext()
	console.log(socket)
	return <Typography>Welcome to my App</Typography>
}

export default Home
