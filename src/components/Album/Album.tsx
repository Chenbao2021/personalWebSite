import { useSelector, useDispatch } from 'react-redux'
import { Box, Tabs, Tab } from '@mui/material'
import { changeSelectedBar } from '../../redux/barSlice'
import { ParisAndI, VideoEditing } from '../Album/main'
import { IRootState } from '../../interfaces/IRootSate'

function Album() {
	const barSelected = useSelector((state: IRootState) => state.bar.selectedBar)
	const dispatch = useDispatch()

	return (
		<Box
			component='section'
			flexGrow={1}
			sx={{ pb: 2 }}
			display={'flex'}
			flexDirection={'column'}
			alignItems={'center'}
		>
			<Tabs
				value={barSelected}
				onChange={(_, newValue) => {
					dispatch(changeSelectedBar(newValue))
				}}
				textColor={'inherit'}
				sx={{
					// backgroundColor: 'primary.dark',
					width: '100%',
					display: 'flex',
					justifyContent: 'flex-start',
					'.Mui-selected': {
						color: '#333333',
						backgroundColor: '#f1f3f7',
					},
				}}
				TabIndicatorProps={{
					style: {
						backgroundColor: 'black',
					},
				}}
			>
				<Tab label='Paris and I' value={0} />
				<Tab label='Video Editing' value={1} />
			</Tabs>
			{barSelected === 0 && <ParisAndI />}
			{barSelected === 1 && <VideoEditing />}
		</Box>
	)
}

export default Album
