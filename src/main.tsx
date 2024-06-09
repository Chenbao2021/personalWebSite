import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './redux/store.ts'
import { Provider } from 'react-redux'

import App from './App.tsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { grey } from '@mui/material/colors'

import './App.css'

const theme = createTheme({
	palette: {
		primary: {
			dark: grey[400],
			main: grey[100],
			light: grey[50],
		},
		secondary: {
			main: '#ff4081',
		},
	},
	typography: {
		fontFamily: 'Quicksand, sans-serif',
		h1: {
			fontSize: '2.5rem',
			fontWeight: 300,
		},
		h2: {
			fontSize: '2rem',
			fontWeight: 300,
		},
		h3: {
			fontSize: '1.5rem',
			fontWeight: 300,
		},
		h4: {
			fontSize: '1.1rem',
			fontWeight: 500,
		},
		body1: {
			fontSize: '1rem',
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 8,
					textTransform: 'none',
				},
			},
		},
		MuiImageListItem: {
			styleOverrides: {
				root: {
					borderRadius: '16px',
					overflow: 'hidden',
				},
			},
		},
	},
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>
)
