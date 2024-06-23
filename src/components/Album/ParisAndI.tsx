import { Info, Language, Close } from '@mui/icons-material'
import {
	Pagination,
	Box,
	Card,
	CardContent,
	IconButton,
	ImageList,
	ImageListItem,
	ImageListItemBar,
	Modal,
	useMediaQuery,
	CardActions,
	Typography,
} from '@mui/material'
import { useCallback, useState } from 'react'
// import LoopIcon from '@mui/icons-material/Loop';
// import DateRangeIcon from '@mui/icons-material/DateRange';
import './ParisAndI.less'

function ParisAndI() {
	const [openModal, setOpenModal] = useState<boolean>(false)
	const [openModalImage, setOpenModalImage] = useState<photoProps | undefined>()
	const [modalPage, setModalPage] = useState<number>(1)
	const matches = useMediaQuery('(min-width:500px)')
	const setModal = useCallback((photo: photoProps) => {
		setOpenModal(true)
		setOpenModalImage(photo)
	}, [])
	const closeModal = useCallback(() => {
		setOpenModal(false)
		setModalPage(1)
	}, [])
	return (
		<div className='parisAndIContainer'>
			<Box
				flexGrow={1}
				width='100%'
				height='100%'
				display='flex'
				justifyContent='center'
				alignItems='center'
			>
				<ImageList
					className='ParisImageList'
					variant='quilted'
					cols={matches ? 4 : 3}
					rowHeight={matches ? 'auto' : 150}
					gap={3}
				>
					{itemData.map(item => (
						<ImageListItem
							key={item.img}
							cols={item.cols || 1}
							rows={item.rows || 1}
							className='imageListImage'
						>
							<img
								src={item.img}
								alt={item.title}
								loading='lazy'
								onClick={() => setModal(item)}
							/>
							<ImageListItemBar
								sx={{
									borderBottomRightRadius: '10px',
									borderBottomLeftRadius: '10px',
								}}
								title={item.title}
								subtitle={item.author}
								actionIcon={
									<IconButton
										size='large'
										sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
										aria-label={`info about ${item.title}`}
										onClick={() => setModal(item)}
									>
										<Info />
									</IconButton>
								}
							/>
						</ImageListItem>
					))}
				</ImageList>
				<Modal className='modal' open={openModal} onClose={closeModal}>
					<Card className='modalCard'>
						<Box
							sx={{
								width: '100%',
								display: 'flex',
								justifyContent: 'end',
								alignItems: 'center',
								paddingRight: '3px',
							}}
						>
							<div>
								{openModalImage?.officialWeb && (
									<IconButton href={openModalImage?.officialWeb}>
										<Language fontSize='large' sx={{ color: 'black' }} />
									</IconButton>
								)}
								<IconButton onClick={closeModal}>
									<Close fontSize='large' sx={{ color: 'black' }} />
								</IconButton>
							</div>
						</Box>
						<Typography variant='h3'>{openModalImage?.title}</Typography>
						<CardContent className='imgContainer'>
							<img
								className='modalCardHeader'
								src={openModalImage?.listImage[modalPage - 1]}
								alt={openModalImage?.title}
								loading='lazy'
							/>
						</CardContent>
						<CardActions
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'flex-end',

								flexGrow: 1,
							}}
						>
							<Pagination
								sx={{
									display: 'flex',
									justifyContent: 'center',
								}}
								shape='rounded'
								count={openModalImage?.listImage.length}
								defaultPage={modalPage}
								onChange={(_, page) => {
									setModalPage(page)
								}}
							/>
						</CardActions>
					</Card>
				</Modal>
			</Box>
		</div>
	)
}
interface photoProps {
	img: string
	listImage: string[]
	title: string
	author: string
	cols: number
	rows: number
	description?: string
	moreInformations?: string
	frequence?: string
	officialWeb?: string
}
const itemData: photoProps[] = [
	{
		img: 'https://yuchenbao.com/assets/Landscape/Berck1.jpeg',
		listImage: [
			'https://yuchenbao.com/assets/Landscape/Berck1.jpeg',
			'https://yuchenbao.com/assets/Landscape/Berck2.jpeg',
		],
		title: 'Cerf-volants Berck-sur-Mer',
		author: '# 1 fois/an',
		cols: 3,
		rows: 2,
		description:
			'Les Rencontres internationales de cerfs-volants est un événement organisé chaque année depuis 1987 sur la plage de Berck dans le Pas-de-Calais.',
		frequence: 'Annuel',
		officialWeb: 'https://www.cerf-volant-berck.com/',
	},
	{
		img: 'https://yuchenbao.com/assets/Landscape/cafe_duanwu3.jpeg',
		listImage: [
			'https://yuchenbao.com/assets/Landscape/cafe_duanwu3.jpeg',
			'https://yuchenbao.com/assets/Landscape/cafe_duanwu2.jpeg',
			'https://yuchenbao.com/assets/Landscape/cafe_duanwu1.jpeg',
			'https://yuchenbao.com/assets/Landscape/cafe_duanwu4.jpeg',
			'https://yuchenbao.com/assets/Landscape/cafe_duanwu5.jpeg',
		],
		title: 'Café franco-chinois',
		author: '# 1 fois/mois',
		cols: 1,
		rows: 1,
		description:
			'Café franco-chinois est un pôle de AJCF(Association des jeunes chinois en France), a pour but de pratiquer le français pour les sinophones, et pratiquer le chinois pour les francophones.',
		frequence: 'Annuel',
		officialWeb:
			'https://www.xiaohongshu.com/user/profile/65c2115f0000000011016f1b?xhsshare=CopyLink&appuid=65c2115f0000000011016f1b&apptime=1718568451',
	},
	{
		img: 'https://yuchenbao.com/assets/Landscape/zommbie2023.jpeg',
		listImage: [
			'https://yuchenbao.com/assets/Landscape/zombie2023.jpeg',
			'https://yuchenbao.com/assets/Landscape/zombie2.jpeg',
			'https://yuchenbao.com/assets/Landscape/zombie3.jpeg',
			'https://yuchenbao.com/assets/Landscape/zombie4.jpeg',
			'https://yuchenbao.com/assets/Landscape/zombie5.jpeg',
		],

		title: 'Zombie walk 2023',
		author: '# 1 fois/an',
		rows: 1,
		cols: 1,
		description:
			'La Zombie Walk à Paris : une déambulation effroyable et festive de morts-vivants dans les rues de la capitale.',
		frequence: 'Annuel',
		officialWeb: 'https://pariszombie.com/',
	},
	{
		img: 'https://yuchenbao.com/assets/Landscape/Rodin.jpeg',
		listImage: [
			'https://yuchenbao.com/assets/Landscape/Rodin.jpeg',
			'https://yuchenbao.com/assets/Landscape/rodin2.jpeg',
			'https://yuchenbao.com/assets/Landscape/rodin3.jpeg',
			'https://yuchenbao.com/assets/Landscape/rodin4.jpeg',
		],

		title: 'Musée Rodin - Nuit de Halloween',
		author: ' 1fois/an',
		cols: 1,
		rows: 1,
		description:
			'Le musée Rodin à Paris présente les œuvres majeures du célèbre sculpteur, offrant une expérience artistique inoubliable.',
		frequence: 'Annuel',
		officialWeb: 'https://www.musee-rodin.fr/',
	},
	{
		img: 'https://yuchenbao.com/assets/Landscape/provins.jpeg',
		listImage: [
			'https://yuchenbao.com/assets/Landscape/provins.jpeg',
			'https://yuchenbao.com/assets/Landscape/provins2.jpeg',
			'https://yuchenbao.com/assets/Landscape/provins3.jpeg',
			'https://yuchenbao.com/assets/Landscape/provins4.jpeg',
			'https://yuchenbao.com/assets/Landscape/provins5.jpeg',
		],
		title: 'Fête-Medievales Provins',
		author: '# 1 fois/an',
		cols: 2,
		rows: 2,
		description:
			"La fête médiévale de Provins vous plonge dans l'ambiance authentique du Moyen Âge avec des spectacles, des défilés costumés et des animations captivantes.",
		frequence: 'Annuel',
		officialWeb:
			'https://provins-medieval.com/#:~:text=39e%20f%C3%AAte%20m%C3%A9di%C3%A9vale%20%C3%A0,une%20exp%C3%A9rience%20hors%20du%20temps%20!',
	},

	{
		img: 'https://yuchenbao.com/assets/Landscape/grevin.jpeg',
		listImage: [
			'https://yuchenbao.com/assets/Landscape/grevin.jpeg',
			'https://yuchenbao.com/assets/Landscape/grevin2.jpeg',
			'https://yuchenbao.com/assets/Landscape/grevin3.jpeg',
			'https://yuchenbao.com/assets/Landscape/grevin4.jpeg',
			'https://yuchenbao.com/assets/Landscape/grevin5.jpeg',
		],

		title: 'Musée grévin',
		author: '# Permanent',
		cols: 1,
		rows: 1,
		description:
			'Le Musée Grévin à Paris propose une collection captivante de figures de cire représentant des personnalités célèbres du monde entier.',
		frequence: 'Permanent',
		officialWeb: 'https://www.grevin-paris.com/',
	},
	{
		img: 'https://yuchenbao.com/assets/Landscape/artForain.jpeg',
		listImage: [
			'https://yuchenbao.com/assets/Landscape/artForain.jpeg',
			'https://yuchenbao.com/assets/Landscape/forain2.jpeg',
			'https://yuchenbao.com/assets/Landscape/forain3.jpeg',
			'https://yuchenbao.com/assets/Landscape/forain4.jpeg',
			'https://yuchenbao.com/assets/Landscape/forain5.jpeg',
		],

		title: 'Musée des arts Forains',
		author: '# Permanent, réservation obligatoire',
		cols: 1,
		rows: 1,
		description:
			"Le Musée des Arts Forains à Paris offre une immersion enchantée dans l'univers magique des arts du spectacle et des manèges anciens, une expérience unique et féerique.",
		frequence: 'Permanent',
		officialWeb: 'https://arts-forains.com/',
	},
	{
		img: 'https://yuchenbao.com/assets/Landscape/nouvelanCHinois.jpeg',
		listImage: [
			'https://yuchenbao.com/assets/Landscape/nouvelanCHinois.jpeg',
			'https://yuchenbao.com/assets/Landscape/defileChinois2.jpeg',
			'https://yuchenbao.com/assets/Landscape/defileChinois3.jpeg',
		],

		title: 'Défilé nouvel an chinois',
		author: '# 1 fois/an',
		cols: 1,
		rows: 1,
		frequence: 'Annuel',
	},
	{
		img: 'https://yuchenbao.com/assets/Landscape/atelierArtEtPlastique.jpeg',
		listImage: [
			'https://yuchenbao.com/assets/Landscape/atelierArtEtPlastique.jpeg',
			'https://yuchenbao.com/assets/Landscape/atelierArt.jpeg',
		],

		title: 'Atelier de art et plastique',
		author: '# Fini',
		cols: 2,
		rows: 2,
		frequence: 'Terminé',
	},

	{
		img: 'https://yuchenbao.com/assets/Landscape/airEspace.jpeg',
		listImage: [
			'https://yuchenbao.com/assets/Landscape/airEspace.jpeg',
			'https://yuchenbao.com/assets/Landscape/airEspace2.jpeg',
			'https://yuchenbao.com/assets/Landscape/airEspace3.jpeg',
		],

		title: 'Musée de lair et de espace',
		author: '# Permanent',
		cols: 1,
		rows: 1,
		frequence: 'Permanent',
		description:
			"Le Musée de l'Air et de l'Espace à Paris : une exploration fascinante de l'aviation et de l'astronomie.",
		officialWeb: 'https://www.museeairespace.fr/',
	},
	{
		img: 'https://yuchenbao.com/assets/Landscape/expoAnimal.jpeg',
		listImage: [
			'https://yuchenbao.com/assets/Landscape/expoAnimal.jpeg',
			'https://yuchenbao.com/assets/Landscape/animalExpo2.jpeg',
			'https://yuchenbao.com/assets/Landscape/animalExpo3.jpeg',
			'https://yuchenbao.com/assets/Landscape/animalExpo4.jpeg',
			'https://yuchenbao.com/assets/Landscape/animalExpo5.jpeg',
			'https://yuchenbao.com/assets/Landscape/animalExpo6.jpeg',
		],

		title: 'Paris Animal expo',
		author: '#  1 fois/an',
		cols: 1,
		rows: 1,
		frequence: 'Annuel',
		description:
			"L'exposition Paris Animal Expo offre une immersion captivante dans le monde fascinant des animaux, offrant une expérience enrichissante pour les amoureux de la faune de tous âges.",
		officialWeb: 'https://www.animal-expo.com/',
	},
	{
		img: 'https://yuchenbao.com/assets/Landscape/nouvel_an1.jpeg',
		listImage: [
			'https://yuchenbao.com/assets/Landscape/nouvel_an1.jpeg',
			'https://yuchenbao.com/assets/Landscape/nouvel_an2.jpeg',
			'https://yuchenbao.com/assets/Landscape/nouvel_an3.jpeg',
		],

		title: 'Nouvel an Arc Triomphe',
		author: '# 1 fois/an',
		cols: 1,
		rows: 1,
		frequence: 'Annuel',
	},
	{
		img: 'https://yuchenbao.com/assets/Landscape/playParis1.jpeg',
		listImage: [
			'https://yuchenbao.com/assets/Landscape/playParis1.jpeg',
			'https://yuchenbao.com/assets/Landscape/playParis2.jpeg',
			'https://yuchenbao.com/assets/Landscape/playParis3.jpeg',
			'https://yuchenbao.com/assets/Landscape/playParis4.jpeg',
		],

		title: 'Let us play Paris',
		author: '# 1 fois/an',
		cols: 1,
		rows: 1,
		frequence: 'Inconnu',
		description:
			'Let’s Play Paris : le nouveau rendez-vous dédié aux jeux vidéo, animés et mangas débarque à Paris !',
		officialWeb: 'https://www.lejapon.paris/salon/lets-play-paris/',
	},
]

export default ParisAndI
