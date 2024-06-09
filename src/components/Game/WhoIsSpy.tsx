import {
	Dialog,
	Paper,
	Button,
	Card,
	CardContent,
	IconButton,
	InputBase,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
	CardHeader,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	TextField,
} from '@mui/material'
import React, { useCallback, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import PersonIcon from '@mui/icons-material/Person'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

interface playerInterface {
	name: string
	id: string
}

function WhoIsSpy(props: { setGameSelected: (value?: number) => void }) {
	const [playScreen, setPlayScreen] = useState<boolean>(false)
	const [playerList, setPlayerList] = useState<playerInterface[]>([
		{ name: 'yu', id: 'yu' },
		{ name: 'chen', id: 'chen' },
	])
	const [newPlayerName, setNewPlayerName] = useState<string>('')
	const [startGame, setStartGame] = useState<boolean>(false)
	const [intru, setIntru] = useState<boolean>(false)
	// const [pairWorld, setPairWorld] = useState<number>(1)
	const [rang, setRang] = useState<number>(0)
	const [spy, setSpy] = useState<boolean>(false)
	const [worldModal, setWorldModal] = useState<boolean>(false)
	const [spyWord, setSpyWord] = useState<string>('')
	const [otherWords, setOtherWords] = useState<string>('')
	const [spyPlayerName, setSpyPlayerName] = useState<string | undefined>(
		undefined
	)

	// useEffect(() => {
	// 	setPairWorld(Math.floor(Math.random() * listWorlds.length))
	// }, [])

	const closeModal = useCallback(() => {
		setWorldModal(false)
		if (rang < playerList.length) setRang(rang + 1)
	}, [playerList.length, rang])
	const startGame_cb = useCallback(() => {
		if (spyWord !== '' && otherWords !== '') {
			setRang(0)
			setIntru(false)
			setSpyPlayerName(undefined)
			setStartGame(true)
		}
	}, [spyWord, otherWords])
	// const endGame_cb = useCallback(() => {
	//     setStartGame(false);
	// }, [])
	const handleSpyChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setSpyWord(event.target.value)
		},
		[]
	)
	const handleOtherChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setOtherWords(event.target.value)
		},
		[]
	)
	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setNewPlayerName(event.target.value)
		},
		[setNewPlayerName]
	)
	const addNewPlayer = useCallback(() => {
		setPlayerList([...playerList, { name: newPlayerName, id: newPlayerName }])
		setNewPlayerName('')
		console.log(playerList)
	}, [playerList, newPlayerName])
	const openPlayScreen = useCallback(() => {
		if (playerList.length > 0) setPlayScreen(true)
	}, [playerList.length])
	const back = useCallback(() => {
		props.setGameSelected(undefined)
	}, [props])
	const deletePlayer = useCallback(
		(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			const newList = playerList.filter(
				player => player.name != event.currentTarget.getAttribute('data-name')
			)
			setPlayerList([...newList])
		},
		[playerList]
	)
	const getWord = useCallback(() => {
		if (rang === playerList.length - 1 && !intru) {
			setSpy(true)
			setIntru(true)
			setSpyPlayerName(playerList[rang].name)
		} else if (!intru && Math.random() < 1 / playerList.length) {
			setSpy(true)
			setIntru(true)
			setSpyPlayerName(playerList[rang].name)
		} else {
			setSpy(false)
		}
		if (rang === playerList.length) {
			setStartGame(false)
		} else setWorldModal(true)
	}, [rang, playerList, intru])
	const resetGame = useCallback(() => {
		setStartGame(false)
		setRang(0)
		setIntru(false)
		setSpyPlayerName(undefined)
		setSpyWord('')
		setOtherWords('')
	}, [])

	const renderGame = useCallback(() => {
		const player =
			rang === playerList.length
				? { name: "Passez à l'animateur" }
				: playerList[rang]
		const world = {
			spy: spyWord,
			other: otherWords,
		}

		return (
			<Card
				style={{
					height: '220px',
					width: '100%',
					backgroundColor: 'white',
					marginBottom: '10px',
				}}
			>
				<CardHeader
					sx={{ textAlign: 'center' }}
					subheader='Cliquez pour connaître ton mot, puis passez a la personne suivante'
				/>
				<CardContent
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 2,
					}}
				>
					<Typography variant='h2'>{player.name}</Typography>
					<Button variant='contained' fullWidth onClick={getWord}>
						Decouvrir
					</Button>
				</CardContent>
				<Dialog open={worldModal}>
					<DialogTitle>Ton mot est:</DialogTitle>
					<DialogContent>
						<DialogContentText>
							{spy ? world?.spy : world?.other}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={closeModal}>Ok</Button>
					</DialogActions>
				</Dialog>
			</Card>
		)
	}, [
		rang,
		playerList,
		spyWord,
		otherWords,
		getWord,
		worldModal,
		spy,
		closeModal,
	])

	const renderPlayer = useCallback(
		(player: playerInterface) => {
			return (
				<ListItem
					sx={{
						width: '100%',
						height: '50px',
						backgroundColor:
							!startGame &&
							rang === playerList.length &&
							player.name === spyPlayerName
								? 'red'
								: 'white',
						my: 1,
					}}
					key={player.id}
					secondaryAction={
						<IconButton data-name={player.name} onClick={deletePlayer}>
							<DeleteIcon />
						</IconButton>
					}
				>
					<ListItemIcon>
						<PersonIcon />
					</ListItemIcon>
					<ListItemText primary={player.name} />
				</ListItem>
			)
		},
		[playerList, deletePlayer, spyPlayerName, rang, startGame]
	)
	return (
		<div className='spyContainer'>
			<Card className='spyCardContainer'>
				{!playScreen && (
					<>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<img
								src='https://yuchenbao.com/assets/Game/spy.png'
								style={{ height: 200 }}
							></img>
						</div>
						<CardContent className='cardContentContainer'>
							<Button onClick={openPlayScreen} variant='contained'>
								<Typography>COMMENCER LE JEU</Typography>
							</Button>
							<Button variant='contained' sx={{ backgroundColor: 'grey' }}>
								<Typography>COMMENT JOUER </Typography>
							</Button>
							<Button
								onClick={back}
								variant='contained'
								sx={{ backgroundColor: 'grey' }}
							>
								<Typography>BACK </Typography>
							</Button>
						</CardContent>
					</>
				)}
				{playScreen && (
					<>
						{startGame && renderGame()}
						{!startGame && (
							<>
								<Typography
									sx={{
										backgroundColor: 'white',
										width: '95%',
										textAlign: 'center',
									}}
								>
									Avant de commencer, designez les mots
								</Typography>
								<div className='WhoIsSpyStartGameContainer'>
									{/* <Divider /> */}
									{/* <Button onClick={() => {}} variant='contained' size='small'> Choose a couple </Button> 
                                        <Button onClick={() => {}} variant='contained' size='small'> Customize couple</Button> */}
									<TextField
										value={spyWord}
										onChange={handleSpyChange}
										required
										variant='outlined'
										label='Mot de Spy'
										sx={{ bgcolor: 'white', width: '40%' }}
									/>
									<TextField
										value={otherWords}
										onChange={handleOtherChange}
										required
										variant='outlined'
										label='Mot des autres'
										sx={{ bgcolor: 'white', width: '40%' }}
									/>
								</div>
							</>
						)}
						<Paper
							// component="form"
							sx={{
								// position: 'absolute', bottom: '10%',
								p: '2px 4px',
								display: 'flex',
								alignItems: 'center',
								width: '80%',
								maxWidth: '300px',
							}}
						>
							<InputBase
								placeholder='The name of new player'
								onChange={handleChange}
								value={newPlayerName}
								sx={{
									ml: 1,
									flex: 1,
								}}
							/>
							<Button onClick={addNewPlayer}>
								<AddCircleOutlineIcon
									sx={{ height: '30px', width: '30px', color: 'black' }}
								/>
							</Button>
						</Paper>

						<List
							sx={{
								width: '80%',
								maxWidth: '400px',
								maxHeight: '50%',
								overflow: 'auto',
							}}
						>
							{playerList.map(renderPlayer)}
						</List>
						<Button
							onClick={startGame_cb}
							size='large'
							variant='contained'
							sx={{ m: 1, width: '200px' }}
						>
							Commencer
						</Button>
						<Button
							onClick={resetGame}
							size='large'
							variant='contained'
							sx={{ m: 1, width: '200px' }}
						>
							Nouvelle partie
						</Button>
					</>
				)}
			</Card>
		</div>
	)
}

// const listWorlds: { spy: string; other: string }[] = [
// 	{
// 		spy: '男友 - Copin',
// 		other: '老公 - Mari',
// 	},
// 	{
// 		spy: '男友 - Copin',
// 		other: '老公 - Mari',
// 	},
// 	{
// 		spy: '男友 - Copin',
// 		other: '老公 - Mari',
// 	},
// 	{
// 		spy: '男友 - Copin',
// 		other: '老公 - Mari',
// 	},
// ]
export default WhoIsSpy
