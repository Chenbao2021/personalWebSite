import {
	Box,
	ImageList,
	ImageListItem,
	ImageListItemBar,
	IconButton,
	useMediaQuery,
} from '@mui/material'
import { Info } from '@mui/icons-material'
import ReactPlayer from 'react-player'

function VideoEditing() {
	const matches = useMediaQuery('(min-width:500px)')

	return (
		<Box sx={{ width: '100%' }} flexGrow={1}>
			<ImageList
				sx={{ width: '100%' }}
				variant='masonry'
				cols={matches ? 2 : 1}
				rowHeight={matches ? 400 : 300}
			>
				{VideoLink.map(item => (
					<ImageListItem
						key={item.link}
						cols={item.cols || 1}
						rows={item.rows || 1}
					>
						<ReactPlayer url={item.link} height={'100%'} width={'100%'} />
						<ImageListItemBar
							title={item.title}
							subtitle={item.author}
							actionIcon={
								<IconButton
									sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
									aria-label={`info about ${item.title}`}
								>
									<Info />
								</IconButton>
							}
						/>
					</ImageListItem>
				))}
			</ImageList>
		</Box>
	)
}

const VideoLink = [
	{
		link: 'https://youtu.be/7HaL5toAzSw',
		title: 'Cerf volant',
	},
	{
		link: 'https://www.youtube.com/watch?v=xiwOrRjrEgI',
		title: 'Sacré coeur',
	},
	{
		link: 'https://www.youtube.com/watch?v=8Q3Y45PBI64',
		title: 'Randonnée Bouffémont',
		featured: true,
	},
	{
		link: 'https://www.youtube.com/watch?v=IymPe2OGMY4',
		title: 'Randonnée Survillier Fosse',
		author: '# Défilé gratuit de zombie, 1 fois/an',
		rows: 1,
		cols: 1,
	},
	{
		link: 'https://www.youtube.com/watch?v=mu3L4uws-_8',
		title: 'Année de dragon',
		rows: 1,
		cols: 1,
	},
	{
		link: 'https://www.youtube.com/watch?v=cQqjovFQs4I',
		title: 'Musée de Rodin - La nuit de Halloween ',
		cols: 1,
		rows: 1,
	},
	{
		link: 'https://www.youtube.com/watch?v=D4vnQiGD3WY',
		title: 'Musée de Grevin',
		rows: 1,
		cols: 1,
		featured: true,
	},
]
export default VideoEditing
