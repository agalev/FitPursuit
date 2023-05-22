'use client'
import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Ripple, Input, Select, initTE } from 'tw-elements'
import { GlobalState } from '../global-provider'
import StravaButton from '../components/strava_button'
import states_countries from '../misc/states_countries.json'

export default function SignUp() {
	const global = useContext(GlobalState)

	useEffect(() => {
		initTE({ Ripple, Input, Select })
	}, [])

	const states = states_countries.states
	const countries = states_countries.countries

	const router = useRouter()

	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		image: '',
		bio: '',
		city: '',
		state: '',
		country: '',
		sex: '',
		height: 0,
		weight: 0
	})

	const handleInputChange = (event) => {
		const { name, value } = event.target
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value
		}))
	}

	const handleSignup = (event) => {
		event.preventDefault()
		fetch('/api/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		}).then((res) => {
			if (res.status === 201) {
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

	if (global.state.isLoggedIn)
		return (
			<h1 className='flex justify-center text-3xl m-10'>Already logged in.</h1>
		)

	return (
		<main>
			<section className='flex justify-center'>
				<picture>
					<source
						srcSet='/svg/circle_logo_orange.svg'
						media='(prefers-color-scheme: dark)'
					/>
					<Image
						src='/svg/circle_logo_color.svg'
						width={250}
						height={100}
						alt=''
						priority
					/>
				</picture>
			</section>
			<section className='flex justify-center my-10'>
				<StravaButton />
			</section>
			<section className='relative grid justify-center'>
				<h1 className='text-2xl my-2 flex justify-center'>
					Or fill the form to register:
				</h1>
			</section>
			<form className='grid grid-cols-1 sm:grid-cols-2 gap-6 px-5'>
				<div className='relative my-2' data-te-input-wrapper-init>
					<input
						className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
						type='text'
						name='first_name'
						value={formData.first_name}
						onChange={handleInputChange}
					/>
					<label className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'>
						First Name
					</label>
				</div>
				<div className='relative my-2' data-te-input-wrapper-init>
					<input
						className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
						type='text'
						name='last_name'
						value={formData.last_name}
						onChange={handleInputChange}
					/>
					<label className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'>
						Last Name
					</label>
				</div>
				<div className='relative my-2' data-te-input-wrapper-init>
					<input
						className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
						type='email'
						name='email'
						value={formData.email}
						onChange={handleInputChange}
					/>
					<label className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'>
						Email address
					</label>
				</div>
				<div className='relative my-2' data-te-input-wrapper-init>
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
				<div className='relative my-2' data-te-input-wrapper-init>
					<input
						className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
						type='url'
						name='image'
						value={formData.image}
						onChange={handleInputChange}
					/>
					<label className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'>
						Image URL
					</label>
				</div>
				<div className='relative my-2' data-te-input-wrapper-init>
					<textarea
						className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
						rows={2}
						name='bio'
						value={formData.bio}
						onChange={handleInputChange}
					/>
					<label className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'>
						Bio
					</label>
				</div>
				<div className='relative my-2' data-te-input-wrapper-init>
					<input
						className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
						type='text'
						name='city'
						value={formData.city}
						onChange={handleInputChange}
					/>
					<label className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'>
						City
					</label>
				</div>
				<select
					name='state'
					onChange={handleInputChange}
					className='relative my-2'
					data-te-select-init
				>
					{states.map((state) => (
						<option key={state.value} value={state.value}>
							{state.label}
						</option>
					))}
				</select>
				<select
					name='country'
					onChange={handleInputChange}
					className='relative my-2'
					data-te-select-init
				>
					{countries.map((country) => (
						<option key={country} value={country}>
							{country}
						</option>
					))}
				</select>
				<select
					name='sex'
					onChange={handleInputChange}
					className='relative my-2'
					data-te-select-init
				>
					<option value=''>Select Gender</option>
					<option value='M'>Male</option>
					<option value='F'>Female</option>
					<option value='O'>Other</option>
				</select>
				<div className='relative my-2' data-te-input-wrapper-init>
					<input
						className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
						type='number'
						name='weight'
						value={formData.weight}
						onChange={handleInputChange}
					/>
					<label className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'>
						Weight in lbs
					</label>
				</div>
				<div className='relative my-2' data-te-input-wrapper-init>
					<input
						className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
						type='number'
						name='height'
						value={formData.height}
						onChange={handleInputChange}
					/>
					<label className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'>
						Height in inches
					</label>
				</div>
			</form>
			<div className='my-6 pb-1 pt-1 text-center'>
				<button
					className='w-72 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
					type='submit'
					data-te-ripple-init
					data-te-ripple-color='light'
					style={{
						backgroundImage:
							'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)'
					}}
					onClick={handleSignup}
				>
					Sign up
				</button>
			</div>
			<section className='flex items-center justify-center'>
				<p className='mb-0 mr-2'>Already have an account?</p>
				<Link href='/login'>
					<button
						type='button'
						className='mb-3 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
						style={{
							backgroundImage:
								'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)'
						}}
					>
						Login
					</button>
				</Link>
			</section>
		</main>
	)
}
