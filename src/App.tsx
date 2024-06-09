import { Stack } from '@mui/material'
import { Left } from './components/main'
import { AppProvider } from './context/AppProvider'
import './App.css'
import './components/Game/Game.less'

function App() {
	return (
		<>
			<Stack useFlexGap width='100vw' height={'100vh'}>
				<AppProvider>
					<Left />
				</AppProvider>
			</Stack>
		</>
	)
}

export default App
