import { useCallback, useState } from 'react'
import {
	Box,
	Typography,
	Toolbar,
	IconButton,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	useMediaQuery,
} from '@mui/material'
import {
	PhotoAlbum,
	VideogameAssetRounded,
	InsertLink,
} from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/menu'
import { TypeAnimation } from 'react-type-animation'
import Snape from '../assets/snape.jpg'

import Album from './Album/Album'
import Game from './Game/Game'
import { useAppContext } from '../context/AppContext'
import { ActionEnum } from '../context/AppReducer'
import './left.less'
import Discover from './Discover/Discover'

function Left() {
	const WelcomeText = useCallback(({ fontSize }: { fontSize: string }) => {
		return (
			<Box flexGrow={1} display={'flex'} justifyContent={'center'}>
				<TypeAnimation
					sequence={[
						// Same substring at the start will only be typed out once, initially
						'Hi ! Welcome !',
						2000, // wait 1s before replacing "Mice" with "Hamsters"
						'My name is Chenbao, ',
						2000,
						'Nice to meet you!',
						2000,
						'Have a nice day :D',
						2000,
						'Best wish, Chenbao',
						2000,
					]}
					wrapper='h2'
					speed={50}
					style={{ fontSize: fontSize, display: 'inline-block' }}
				/>
			</Box>
		)
	}, [])
	// const barSelected = useSelector((state:IRootState) => state.bar.selectedBar)
	// const dispatch = useDispatch();
	const drawerWidth = 200

	const bigScreen = useMediaQuery('(min-width:500px)')

	const { appData, dispatch } = useAppContext()
	const { DrawerItemSelected, gameSelected } = appData
	const [openDrawer, setOpenDrawer] = useState<boolean>()

	const toggleDrawer = useCallback(
		(newOpen: boolean) => () => {
			setOpenDrawer(newOpen)
		},
		[]
	)
	const openGame = useCallback(() => {
		if (gameSelected !== undefined) {
			dispatch({ type: ActionEnum.setGameSelected, value: undefined })
		} else {
			dispatch({ type: ActionEnum.setDrawerItem, value: 'Game' })
		}
	}, [dispatch, gameSelected])
	const openAlbum = useCallback(() => {
		dispatch({ type: ActionEnum.setDrawerItem, value: 'Album' })
	}, [dispatch])
	const openLink = useCallback(() => {
		dispatch({ type: ActionEnum.setDrawerItem, value: 'Discover' })
	}, [dispatch])
	interface IListItemCustomized {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		Icon: any
		text: string
		first: boolean
		onClick: () => void
	}
	const ListItemCustomized = useCallback(
		(props: IListItemCustomized) => {
			return (
				<ListItem
					disablePadding
					key={props.text}
					onClick={props.onClick}
					sx={{
						bgcolor: DrawerItemSelected === props.text ? 'grey' : undefined,
						scale: props.first ? '1.05' : '1',
					}}
				>
					<ListItemButton>
						<ListItemIcon>{props.Icon}</ListItemIcon>
						<ListItemText
							primary={props.text}
							primaryTypographyProps={{
								fontWeight: props.first ? '800' : undefined,
							}}
						/>
					</ListItemButton>
				</ListItem>
			)
		},
		[DrawerItemSelected]
	)
	return (
		<Box
			component='section'
			flexGrow={3}
			display='flex'
			flexDirection='column'
			sx={{ backgroundColor: 'primary.dark', flexGrow: 1 }}
		>
			{!bigScreen && (
				<Toolbar variant='dense' sx={{ pt: 1, display: 'flex' }}>
					<Box display={'flex'} alignItems={'center'}>
						<IconButton
							onClick={() => {
								setOpenDrawer(true)
							}}
							edge='start'
							color='inherit'
							aria-label='menu'
							sx={{ mr: 2 }}
						>
							<MenuIcon />
						</IconButton>
						<Typography
							variant='subtitle1'
							sx={{ fontFamily: 'fantasy', fontSize: 35, fontWeight: 600 }}
						>
							{DrawerItemSelected}
						</Typography>
					</Box>
					<WelcomeText fontSize='3vw' />
				</Toolbar>
			)}

			<Box
				component='main'
				sx={{
					flexGrow: 1,
					width: bigScreen ? `calc(100% - ${drawerWidth}px)` : '100%',
					marginLeft: bigScreen ? `${drawerWidth}px` : '0px',
				}}
			>
				{appData.DrawerItemSelected === 'Album' && <Album />}
				{appData.DrawerItemSelected === 'Game' && <Game />}
				{appData.DrawerItemSelected === 'Discover' && <Discover />}
			</Box>
			<Drawer
				open={openDrawer}
				onClose={toggleDrawer(false)}
				anchor='left'
				variant={bigScreen ? 'permanent' : 'temporary'}
				sx={{
					display: 'block',
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
				}}
			>
				<Box
					role='presentation'
					onClick={toggleDrawer(false)}
					width={drawerWidth}
					sx={{ bgcolor: 'primary.dark', height: '100%' }}
				>
					<List>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								width: '100%',
								alignItems: 'center',
								mb: 1,
							}}
						>
							<img src={Snape} alt='Snape Icon' height={'100px'} />
							{bigScreen && <WelcomeText fontSize={'1vw'} />}
						</Box>
						<ListItemCustomized
							Icon={<PhotoAlbum />}
							text='Album'
							onClick={openAlbum}
							first
						/>
						<ListItemCustomized
							Icon={<VideogameAssetRounded />}
							text='Game'
							onClick={openGame}
							first={false}
						/>
						<ListItemCustomized
							Icon={<InsertLink />}
							text='Discover'
							onClick={openLink}
							first={false}
						/>
					</List>
				</Box>
			</Drawer>
		</Box>
	)
}

Left.propTypes = {}

export default Left
