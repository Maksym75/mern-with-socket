import React from 'react'
import { Link } from 'react-router-dom'

import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
const Header = () => {
	return (
		<Card sx={{ marginTop: 5, backgroundColor: 'grey' }} raised>
			<Link to='/'>
				<Button sx={{ color: 'white' }} variant='text'>
					Home
				</Button>
			</Link>
			<Link to='/chats'>
				<Button sx={{ color: 'white' }} variant='text'>
					Chats
				</Button>
			</Link>
		</Card>
	)
}

export default Header
