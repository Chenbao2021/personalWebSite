import { Card, CardContent, CardMedia, Typography } from '@mui/material'

export default function Roulette(props: {
	setGameSelected: (value?: number) => void
}) {
	console.log(props)
	return (
		<Card sx={{ Width: 300 }}>
			<CardMedia
				sx={{ height: 300, width: 300 }}
				title='Gachapon'
				image='https://source.unsplash.com/A5rCN8626Ck'
			/>
			<CardContent>
				<Typography>Test</Typography>
			</CardContent>
		</Card>
	)
}
