import { Box, Grid, Divider } from '@mui/material'
import CustomedGrid from './CustomedGrid'
import { IUrlDetail } from '../../interfaces/IUrlDetail'

export default function Discover() {
	const movies: IUrlDetail[] = [
		{
			title: 'Olevod',
			description: '无广告， 高清',
			url: 'https://www.olevod.tv/index.html',
		},
		{
			title: 'IYF',
			description: '有弹幕，评论多',
			url: 'https://www.iyf.tv/',
		},
	]
	const forum: IUrlDetail[] = [
		{
			title: '华人街',
			description: '使用人数非常多',
			url: 'https://faguo.huarenjie.com/#google_vignette',
		},
		{
			title: '新欧洲',
			description: '老牌法国华人论坛',
			url: 'https://bbs.xineurope.com/fenlei.html',
		},
	]
	const associations: IUrlDetail[] = [
		{
			title: 'AJCF',
			description: '法国华裔青年协会',
			url: 'https://www.lajcf.fr/',
		},
		{
			title: 'Boyan',
			description: '汉服协会',
			url: 'https://www.facebook.com/AssoBoyan/',
		},
	]
	return (
		<Box sx={{ width: '95%' }}>
			{/* Life */}
			<Grid container spacing={1} sx={{ p: 2 }}>
				<CustomedGrid
					listUrl={movies}
					backgroundImageUrl='https://www.cia-france.fr/media/1492/les-films-incontournables-du-cinema-w_2524x884.jpg'
				/>
				<CustomedGrid
					listUrl={forum}
					backgroundImageUrl='https://www.austinwilliams.com/wp-content/uploads/2021/08/BlogImage_OtherOnlineCommunities.jpg'
				/>
				<CustomedGrid
					listUrl={associations}
					backgroundImageUrl='https://www.belin-beliet.fr/medias/2019/04/associations.jpg'
				/>
			</Grid>
			<Divider />

			{/* <Typography variant='h4'>Study</Typography>
			<Divider /> */}
			{/* <Typography variant='h4'>Activity</Typography>
			<Divider /> */}
		</Box>
	)
}
