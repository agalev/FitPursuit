'use client'
import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { GlobalState } from '../global-provider'
import StravaButton from '../components/strava_button'

export default function Login() {
	const global = useContext(GlobalState)
	const router = useRouter()
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	})

	useEffect(() => {
		async function init() {
			const te = await import('tw-elements')
			await te.initTE({ Ripple: te.Ripple, Input: te.Input })
		}
		init()
	}, [])

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
		}).then((res) => {
			if (res.status === 200) {
				res.json().then((data) => {
					global.dispatch({ type: 'LOGIN', payload: data.profile })
				})
				router.push('/dashboard')
			} else {
				res.json().then((error) => {
					global.dispatch({
						type: 'TOAST',
						payload: { message: error.error, type: 'error' }
					})
				})
			}
		})
	}

	if (global.state.isLoggedIn) {
		return (
			<h1 className='flex justify-center text-3xl m-10'>Already logged in.</h1>
		)
	}
	return (
		<main>
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
						<picture>
							<source
								srcSet='/svg/circle_logo_orange.svg'
								media='(prefers-color-scheme: dark)'
							/>
							<Image
								className='my-2 mx-auto'
								src='/svg/circle_logo_color.svg'
								width={250}
								height={100}
								alt=''
								priority
							/>
						</picture>
						<StravaButton />
						<p className='my-3'>or login:</p>
						<form>
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
									className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
									type='password'
									name='password'
									value={formData.password}
									onChange={handleInputChange}
								/>
								<label className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'>
									Password
								</label>
							</div>
							<button
								className='inline-block w-72 rounded pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
								type='submit'
								data-te-ripple-init
								data-te-ripple-color='light'
								style={{
									backgroundImage:
										'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)'
								}}
								onClick={handleLogin}
							>
								Log in
							</button>
						</form>
						<div className='mb-12 pb-1 pt-1 text-center'></div>
						<section className='flex items-center justify-between'>
							<p className='mb-0 mr-2'>Don&apos;t have an account?</p>
							<Link href='/signup'>
								<button
									type='button'
									className='mb-3 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
									style={{
										backgroundImage:
											'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)'
									}}
								>
									Sign up
								</button>
							</Link>
						</section>
					</div>
				</div>
			</div>
		</main>
	)
}
