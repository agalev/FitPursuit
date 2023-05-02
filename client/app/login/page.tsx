'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Input, Ripple, initTE } from 'tw-elements'

export default function Login() {
	useEffect(() => {
		initTE({ Input, Ripple })
	}, [])

	const [formData, setFormData] = useState({
		email: '',
		password: ''
	})

	const handleInputChange = (event) => {
		const { name, value } = event.target
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value
		}))
	}

	const handleLogin = (event) => {
		event.preventDefault()
		fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.then(() => {
				fetch('/api/auth')
					.then((res) => res.json())
					.then((data) => console.log(data))
			})
	}

	return (
		<>
			<video
				className='absolute object-cover w-full h-full -mt-12'
				src='/bg_video.mp4'
				muted
				autoPlay
				loop
			/>
			<div className='absolute inset-x-[15%] bottom-5 text-center text-white md:block'>
				<div className='g-6 flex h-full flex-wrap items-center justify-center'>
					<div className='rounded-lg bg-neutral-400 shadow-lg dark:bg-neutral-800 bg-opacity-70 dark:bg-opacity-70 px-5'>
						<div className='text-center'>
							<h1 className='text-3xl my-2'>FitPursuit</h1>
							<Image
								className='my-2'
								src='/500x200_motto.svg'
								width={500}
								height={200}
								alt='logo'
							/>
						</div>
						<form>
							<p className='my-2'>Please login to your account</p>
							<div className='relative mb-4' data-te-input-wrapper-init>
								<input
									className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
									type='text'
									name='email'
									value={formData.email}
									onChange={handleInputChange}
								/>
								<label className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'>
									Email address
								</label>
							</div>
							<div className='relative mb-4' data-te-input-wrapper-init>
								<input
									type='password'
									className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
									name='password'
									value={formData.password}
									onChange={handleInputChange}
								/>
								<label className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'>
									Password
								</label>
							</div>
						</form>

						<div className='mb-12 pb-1 pt-1 text-center'>
							<button
								className='mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
								type='button'
								data-te-ripple-init
								data-te-ripple-color='light'
								style={{
									backgroundImage:
										'linear-gradient(to right, #0f4c81, #1d5088, #2b548f, #395896, #475c9d, #5560a4, #6667ab, #745f9d, #82578f, #904f81, #9e4773, #ac3f65, #be3455)'
								}}
								onClick={handleLogin}
							>
								Log in
							</button>
						</div>
						<section className='flex items-center justify-between'>
							<p className='mb-0 mr-2'>Don't have an account?</p>
							<Link href='/signup'>
								<button
									type='button'
									className='mb-3 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
									data-te-ripple-init
									data-te-ripple-color='light'
									style={{
										backgroundImage:
											'linear-gradient(to right, #0f4c81, #1d5088, #2b548f, #395896, #475c9d, #5560a4, #6667ab, #745f9d, #82578f, #904f81, #9e4773, #ac3f65, #be3455)'
									}}
								>
									Register
								</button>
							</Link>
						</section>
					</div>
				</div>
			</div>
		</>
	)
}
