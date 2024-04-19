import Container from '@mui/material/Container'
import ChatWindow from './components/ChatWindow'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
function App() {
	return (
		<div>
			<Container>
				<Header />
				<Outlet />
				{/* <ChatWindow /> */}
			</Container>
		</div>
	)
}

export default App
