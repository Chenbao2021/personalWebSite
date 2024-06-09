import { useCallback } from 'react'
import { IUrlDetail } from '../../interfaces/IUrlDetail'
import {
	Grid,
	Link,
	Card,
	CardMedia,
	CardContent,
	Typography,
} from '@mui/material'
import { useAppContext } from '../../context/AppContext'
interface ICustomedGrid {
	backgroundImageUrl: string
	listUrl: IUrlDetail[]
}
export default function CustomedGrid(props: ICustomedGrid) {
	const { mobileVersion } = useAppContext()
	const CustomedTypography = useCallback(
		(props: IUrlDetail) => {
			return (
				<Typography
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<b>{props.title} :</b>
					<em>{mobileVersion ? props.description : ''} </em>
					<Link href={props.url}>前往</Link>
				</Typography>
			)
		},
		[mobileVersion]
	)
	return (
		<Grid item xs={6}>
			<Card variant='outlined' sx={{}}>
				<CardMedia sx={{ height: 150 }} image={props.backgroundImageUrl} />
				<CardContent>
					{props.listUrl.map(e => {
						return (
							<CustomedTypography
								title={e.title}
								description={e.description}
								url={e.url}
								key={e.title}
							/>
						)
					})}
				</CardContent>
			</Card>
		</Grid>
	)
}
