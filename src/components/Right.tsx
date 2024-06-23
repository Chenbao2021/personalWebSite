import React from 'react'
import { Box, IconButton, Paper } from '@mui/material'
import Fingerprint from '@mui/icons-material/Fingerprint'
import ReactPlayer from 'react-player'
import axios from 'axios'

function Right() {
	const fetchBasicData = React.useCallback(() => {
		const headers = {
			Host: 'bfa-login.basic-fit.com',
			'content-type': 'application/json',
			accept: 'application/json',
			'user-agent': 'Basic Fit App/1.3.1.0 (iOS)',
			'accept-language': 'en-GB,en;q=0.9',
		}
		axios
			.post(
				'https://auth.basic-fit.com/login',
				{
					data: {
						email: 'yuchenbao2015@gmail.com',
						password: 'ycb20171819',
						keepLoggedIn: false,
					},
				},
				{ headers: headers }
			)
			.then(response => {
				console.log(response)
			})
	}, [])

	return (
		<Box
			component='section'
			flexGrow={1}
			flexShrink={0}
			maxWidth={'25%'}
			minWidth={'25%'}
			maxHeight={'100vh'}
			sx={{ backgroundColor: 'primary.light', position: 'relative' }}
		>
			<Paper
				elevation={10}
				sx={{ position: 'absolute', top: '0.5vh', left: 0 }}
			>
				<Box
					bgcolor={'black'}
					style={{
						width: '24.5%',
						height: '99vh',
						position: 'fixed',
					}}
					sx={{
						border: 3,
						borderRadius: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						mr: 1,
					}}
				>
					<Box
						sx={{
							flexGrow: 1,
						}}
						order={1}
					></Box>
					<Box
						sx={{
							bgcolor: 'grey',
							height: '98%',
							width: '95%',
							flexGrow: 0,
							borderRadius: '2%',
							display: 'flex',
							flexDirection: 'column',
						}}
						order={2}
					>
						<Box
							sx={{
								flexGrow: 1,
								bgcolor: 'black',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<ReactPlayer
								url='https://www.youtube.com/watch?v=ALZHF5UqnU4'
								height={'100%'}
								width={'100%'}
							/>
						</Box>
					</Box>
					<Box
						sx={{
							flexGrow: 1,
						}}
						order={3}
					></Box>
					<IconButton
						aria-label='fingerprint'
						color='secondary'
						sx={{
							position: 'absolute',
							bottom: '5vh',
						}}
						onClick={fetchBasicData}
					>
						<Fingerprint
							sx={{
								fontSize: '10vh',
								color: 'white',
							}}
						/>
					</IconButton>
				</Box>
			</Paper>
		</Box>
	)
}

Right.propTypes = {}

export default Right
