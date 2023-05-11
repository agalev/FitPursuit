import { useEffect, useRef } from 'react'

export default function ScrollContainer({ children }) {
	const outerDiv = useRef(null)
	const innerDiv = useRef(null)

	useEffect(() => {
		const outerHeight = outerDiv.current.clientHeight
		const innerHeight = innerDiv.current.clientHeight

		outerDiv.current.scrollTo({
			top: innerHeight - outerHeight,
			left: 0
		})
	}, [])

	useEffect(() => {
		const outerHeight = outerDiv.current.clientHeight
		const innerHeight = innerDiv.current.clientHeight

		outerDiv.current.scrollTo({
			top: innerHeight - outerHeight,
			left: 0,
			behavior: 'smooth'
		})
	}, [children])

	return (
		<div
			ref={outerDiv}
			style={{
				position: 'relative',
				height: '100%',
				overflow: 'scroll'
			}}
		>
			<div
				ref={innerDiv}
				style={{
					position: 'relative'
				}}
			>
				{children}
			</div>
		</div>
	)
}
