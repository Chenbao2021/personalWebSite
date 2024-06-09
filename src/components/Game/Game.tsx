import { useCallback } from 'react'
import { Grid, Paper, Typography, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useAppContext } from '../../context/AppContext'
// import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import './Game.less'
import Dice from './Dice'
import WhoIsSpy from './WhoIsSpy'
import { ActionEnum, IState } from '../../context/AppReducer'
// import GameCanvas from './GameCanvas'

const Item = styled(Paper)(() => ({
	height: '200px',
	textAlign: 'center',
	position: 'relative',

	backgroundColor: 'black',
	display: 'flex',
	alignItems: 'flex-end',
	justifyContent: 'flex-end',
}))

const CenterIcon = styled(PlayCircleOutlineIcon)(() => ({
	fontSize: '100px',
	color: '#dce0e0',
}))

function Game() {
	const { appData, dispatch, mobileVersion } = useAppContext()
	const mobileLayout: number = mobileVersion ? 6 : 12
	const { gameSelected } = appData as IState

	const setGameSelected = useCallback(
		(value?: number) => {
			dispatch({ type: ActionEnum.setGameSelected, value: value })
		},
		[dispatch]
	)

	const GameList = () => {
		const selectDice = useCallback(() => {
			dispatch({ type: ActionEnum.setGameSelected, value: 1 })
		}, [])

		const selectSpy = useCallback(() => {
			dispatch({ type: ActionEnum.setGameSelected, value: 2 })
		}, [])
		const selectGameCanvas = useCallback(() => {
			dispatch({ type: ActionEnum.setGameSelected, value: 3 })
		}, [])
		interface IGameThumbnail {
			backgroundImageUrl: string
			onClick: () => void
			title: string
		}
		const GameThumbnail = useCallback((props: IGameThumbnail) => {
			return (
				<Grid item xs={mobileLayout} sx={{ p: mobileVersion ? 5 : 0 }}>
					<Item
						sx={{
							flexGrow: 1,
							backgroundImage: props.backgroundImageUrl,
							display: 'flex',
							backgroundSize: '100% 100%',
							height: '100%',
							aspectRatio: 1 / 1,
						}}
					>
						<div className='border-line'>
							<IconButton onClick={props.onClick}>
								<CenterIcon />
							</IconButton>
						</div>
						<Typography variant='h3' className='gameItemColor'>
							{props.title}
						</Typography>
					</Item>
				</Grid>
			)
		}, [])
		return (
			<Grid
				container
				spacing={1}
				sx={{
					width: '100%',
					minHeight: '100vh',

					bgcolor: 'primary.dark',
					p: 1,
				}}
			>
				<GameThumbnail
					title='Roll the dice'
					backgroundImageUrl="url('https://yuchenbao.com/assets/Game/dice.png')"
					onClick={selectDice}
				/>
				<GameThumbnail
					title='Who is Spy'
					backgroundImageUrl="url('https://yuchenbao.com/assets/Game/whoIsSpy.png')"
					onClick={selectSpy}
				/>
				<GameThumbnail
					title='GameCanvas'
					backgroundImageUrl="url('https://yuchenbao.com/assets/Game/roulette.jpg')"
					onClick={selectGameCanvas}
				/>
			</Grid>
		)
	}
	return (
		<>
			{gameSelected ? (
				<>
					{gameSelected == 1 && <Dice setGameSelected={setGameSelected} />}
					{gameSelected == 2 && <WhoIsSpy setGameSelected={setGameSelected} />}
					{/* {gameSelected == 3 && <Roulette setGameSelected={setGameSelected} />} */}
					{/* {gameSelected == 3 && <GameCanvas />} */}
				</>
			) : (
				<GameList />
				// <GameCanvas />
			)}
		</>
	)
}

export default Game
