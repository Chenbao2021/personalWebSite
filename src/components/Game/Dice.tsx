import {
	Box,
	Slider,
	Card,
	CardContent,
	CardHeader,
	Button,
	Divider,
	CardActions,
	Dialog,
	DialogTitle,
	DialogContent,
	Typography,
} from '@mui/material'
import { useCallback, useState } from 'react'

function Dice(props: { setGameSelected: (value?: number) => void }) {
	// const { dispatch } = useAppContext()

	const [diceImageUrl, setDiceImgUrl] = useState<string | undefined>(
		listDiceGif[0].url
	)
	const [rolling, setRolling] = useState<boolean>(false)
	const [customizeChance, setCustomizeChance] = useState<number[]>([
		10, 10, 10, 10, 10, 10,
	])
	const [customizeModal, setCustomizeModal] = useState<boolean>(false)
	const openModal = useCallback(() => {
		setCustomizeModal(true)
	}, [])
	const closeModal = useCallback(() => {
		setCustomizeModal(false)
	}, [])
	const throwDice_cb = useCallback(() => {
		const dice1 = customizeChance[0]
		const dice2 = dice1 + customizeChance[1]
		const dice3 = dice2 + customizeChance[2]
		const dice4 = dice3 + customizeChance[3]
		const dice5 = dice4 + customizeChance[4]
		const dice6 = dice5 + customizeChance[5]

		const diceValue = Math.floor(Math.random() * dice6)

		if (diceValue < dice1) {
			setDiceImgUrl(listDiceGif[0 + (rolling ? 0 : 6)].url)
		} else if (diceValue < dice2) {
			setDiceImgUrl(listDiceGif[1 + (rolling ? 0 : 6)].url)
		} else if (diceValue < dice3) {
			setDiceImgUrl(listDiceGif[2 + (rolling ? 0 : 6)].url)
		} else if (diceValue < dice4) {
			setDiceImgUrl(listDiceGif[3 + (rolling ? 0 : 6)].url)
		} else if (diceValue < dice5) {
			setDiceImgUrl(listDiceGif[4 + (rolling ? 0 : 6)].url)
		} else if (diceValue < dice6) {
			setDiceImgUrl(listDiceGif[5 + (rolling ? 0 : 6)].url)
		}

		setRolling(!rolling)
	}, [customizeChance, rolling])

	const onChangeChance = useCallback(
		(_event: Event, value: number | number[]) => {
			const target = _event.target as HTMLInputElement
			if ('name' in target) {
				const tmpTab = customizeChance
				tmpTab[+target.name] = value as number
				setCustomizeChance(tmpTab)
			}
		},
		[customizeChance]
	)

	const closeGame = useCallback(() => {
		props.setGameSelected(undefined)
		// dispatch({ type: ActionEnum.setGameSelected, value: undefined })
	}, [props])

	interface IAdjustDiceLine {
		number: string
	}
	const AdjustDiceLine = useCallback(
		(props: IAdjustDiceLine) => {
			return (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						height: '60px',
					}}
				>
					<Typography variant='h5'> {props.number} </Typography>
					<Slider
						name={props.number}
						sx={{ width: '80%' }}
						onChange={onChangeChance}
						aria-label='Always visible'
						valueLabelDisplay='on'
						defaultValue={customizeChance[1]}
						min={0}
						max={100}
						step={5}
					/>
				</Box>
			)
		},
		[customizeChance, onChangeChance]
	)
	return (
		<div className='diceContainer'>
			<Card
				className='diceCardContainer'
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
					maxWidth: '500px',
					margin: '15px',
					padding: '5px',
				}}
			>
				<CardHeader title="Can't Make a choice?" />
				<CardContent>
					<img src={diceImageUrl} />
				</CardContent>
				<CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
					<Button
						variant='contained'
						fullWidth
						onClick={throwDice_cb}
						className='lanceButton'
					>
						Lancer
					</Button>
					<Divider textAlign='center'>Or</Divider>
					<Button variant='contained' fullWidth onClick={openModal}>
						Customize your dice
					</Button>
					<Button
						variant='contained'
						sx={{ mt: 1 }}
						fullWidth
						onClick={closeGame}
					>
						Back
					</Button>
				</CardActions>
			</Card>
			<Dialog fullWidth open={customizeModal} onClose={closeModal}>
				<DialogTitle marginBottom={2}>Adjust dice odds</DialogTitle>
				<DialogContent>
					<AdjustDiceLine number='1' />
					<AdjustDiceLine number='2' />
					<AdjustDiceLine number='3' />
					<AdjustDiceLine number='4' />
					<AdjustDiceLine number='5' />
					<AdjustDiceLine number='6' />
				</DialogContent>
			</Dialog>
		</div>
	)
}

const listDiceGif = [
	{
		id: 1,
		url: 'https://yuchenbao.com/assets/Game/dice1.gif',
	},
	{
		id: 2,
		url: 'https://yuchenbao.com/assets/Game/dice2.gif',
	},
	{
		id: 3,
		url: 'https://yuchenbao.com/assets/Game/dice3.gif',
	},
	{
		id: 4,
		url: 'https://yuchenbao.com/assets/Game/dice4.gif',
	},
	{
		id: 5,
		url: 'https://yuchenbao.com/assets/Game/dice5.gif',
	},
	{
		id: 6,
		url: 'https://yuchenbao.com/assets/Game/dice6.gif',
	},
	{
		id: 7,
		url: 'https://yuchenbao.com/assets/Game/dice1B.gif',
	},
	{
		id: 8,
		url: 'https://yuchenbao.com/assets/Game/dice2B.gif',
	},
	{
		id: 9,
		url: 'https://yuchenbao.com/assets/Game/dice3B.gif',
	},
	{
		id: 10,
		url: 'https://yuchenbao.com/assets/Game/dice4B.gif',
	},
	{
		id: 11,
		url: 'https://yuchenbao.com/assets/Game/dice5B.gif',
	},
	{
		id: 12,
		url: 'https://yuchenbao.com/assets/Game/dice6B.gif',
	},
]

export default Dice
