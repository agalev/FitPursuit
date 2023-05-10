'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { initTE, Ripple } from 'tw-elements'

export default function CTA() {
	useEffect(() => {
		initTE({ Ripple })
	}, [])

	return (
		<main
			className='absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-cover'
			style={{
				backgroundPosition: '50%',
				backgroundImage: "url('/front_page_CTA.jpg')"
			}}
		>
			<div
				className='absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed'
				style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
			>
				<div className='flex justify-center items-center h-full'>
					<div className='text-center text-white max-w-2xl'>
						<h2
							className='text-3xl font-bold my-4 bg-gradient-to-r bg-clip-text text-transparent 
            from-pink-500 via-red-500 to-yellow-500
            animate-text'
						>
							What is FP?
						</h2>
						<p className='mb-4 text-xl font-light leading-relaxed'>
							FitPursuit is a web application dedicated to empowering fitness
							enthusiasts by seamlessly integrating with Strava and providing
							comprehensive activity logging and data analysis features.
						</p>
						<p className='mb-4 text-xl font-light leading-relaxed hidden sm:flex'>
							FitPursuit strives to create a vibrant and supportive fitness
							ecosystem where individuals can thrive, challenge themselves, and
							embrace an active lifestyle. Our mission is to inspire and
							motivate individuals to achieve their fitness goals through
							friendly competition and community engagement. Users can join
							teams and participate in organized competitions, fostering a sense
							of camaraderie and encouraging healthy lifestyle choices.
						</p>
						<h2
							className='text-3xl font-bold my-4 bg-gradient-to-r bg-clip-text text-transparent 
            from-pink-500 via-red-500 to-yellow-500
            animate-text'
						>
							Are you ready
							<br />
							<span>for a workout?</span>
						</h2>
						<Link
							href='/login'
							type='button'
							data-te-ripple-init
							data-te-ripple-color='light'
							className='bg-gradient-to-r
				from-pink-500
				via-red-500
				to-yellow-500
				background-animate
        border-2
        border-amber-500
        rounded-lg
        p-2
        text-xs
        text-white'
						>
							Get Started
						</Link>
					</div>
				</div>
			</div>
		</main>
	)
}
