// src/components/GameCanvas.tsx
import React, { useRef, useEffect, useState, useCallback } from 'react'
import horse from './horse.png'
import dice from './dice.png'
import spy from './spy.png'

interface Position {
	x: number
	y: number
}

const GameCanvas: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const [position, setPosition] = useState<Position>({
		x: 5,
		y: 5,
	})

	const drawChessboard = useCallback(
		(ctx: any, width: number, height: number) => {
			const squareSize = 100
			const widthSquare = width / squareSize
			const heightSquare = height / squareSize
			for (let row = 0; row < widthSquare; row++) {
				for (let col = 0; col < heightSquare; col++) {
					const isBlack = (row + col) % 2 === 1
					ctx.fillStyle = isBlack ? 'black' : 'white'
					ctx.fillRect(
						col * squareSize,
						row * squareSize,
						squareSize,
						squareSize
					)
				}
			}
		},
		[]
	)

	useEffect(() => {
		const backImage = new Image()
		backImage.src =
			'https://lh3.googleusercontent.com/proxy/LdtuViWZoczDEVTGDyf_X5fKmZz--HZFd9bNOdIGw3pmRwHySI4huCsQAnScAZNtIYHjX8YK3lnIJ_G2yOtZ'
		const shipImage = new Image()
		const diceImage = new Image()
		const spyImage = new Image()
		shipImage.src = horse
		diceImage.src = dice
		spyImage.src = spy
		const canvas = canvasRef.current
		if (!canvas) return
		const context = canvas.getContext('2d')
		if (!context) return

		const draw = () => {
			if (canvas) {
				const parentElement = canvas.parentElement
				if (parentElement) {
					const { width, height } = parentElement.getBoundingClientRect()
					canvas.width = width * 0.8 // 80% of the parent width
					canvas.height = height * 0.8 // 80% of the parent height
					const ctx = canvas.getContext('2d')
					if (ctx) {
						drawChessboard(ctx, width, height)
						context.drawImage(diceImage, 100, 200, 90, 90)
						context.drawImage(spyImage, 200, 100, 90, 90)
						context.drawImage(shipImage, position.x, position.y, 90, 90)
					}
				}
			}
		}
		const handleKeyDown = (e: KeyboardEvent) => {
			let newX = position.x
			let newY = position.y
			const move = 100
			switch (e.key) {
				case 'ArrowUp':
					newY -= move
					break
				case 'ArrowDown':
					newY += move
					break
				case 'ArrowLeft':
					newX -= move
					break
				case 'ArrowRight':
					newX += move
					break
			}

			setPosition({ x: newX, y: newY })
		}

		window.addEventListener('keydown', handleKeyDown)

		const onLoad = () => {
			draw()
		}

		// Only draw when both images are loaded
		backImage.onload = onLoad
		shipImage.onload = onLoad

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [drawChessboard, position])

	// useEffect(() => {
	// 	const canvas = canvasRef.current
	// 	if (canvas) {
	// 		const ctx = canvas.getContext('2d')
	// 		if (ctx) {
	// 			drawChessboard(ctx)
	// 		}
	// 	}
	// }, [drawChessboard])
	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',

				// backgroundColor: 'black',
			}}
		>
			<canvas
				ref={canvasRef}
				style={{
					width: '80%',
					height: '80%',
				}} // Set width and height via CSS
			/>
		</div>
	)
}

export default GameCanvas
