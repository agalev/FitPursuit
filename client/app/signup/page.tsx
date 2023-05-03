'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { Input, Ripple, Select, initTE } from 'tw-elements'

export default function SignUp() {
	useEffect(() => {
		initTE({ Input, Ripple, Select })
	}, [])

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
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
	}

	return (
		<>
			<section className='relative grid justify-center'>
				<Image src='/500x200_motto.svg' width={500} height={200} alt='logo' />
				<h1 className='text-2xl my-2 flex justify-center'>
					Fill the form to register
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
						value={formData.email}
						onChange={(e) =>
							setFormData({
								...formData,
								email: e.target.value
							})
						}
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
					<option value=''>Select State</option>
					<option value='AL'>Alabama</option>
					<option value='AK'>Alaska</option>
					<option value='AZ'>Arizona</option>
					<option value='AR'>Arkansas</option>
					<option value='CA'>California</option>
					<option value='CO'>Colorado</option>
					<option value='CT'>Connecticut</option>
					<option value='DE'>Delaware</option>
					<option value='DC'>District Of Columbia</option>
					<option value='FL'>Florida</option>
					<option value='GA'>Georgia</option>
					<option value='HI'>Hawaii</option>
					<option value='ID'>Idaho</option>
					<option value='IL'>Illinois</option>
					<option value='IN'>Indiana</option>
					<option value='IA'>Iowa</option>
					<option value='KS'>Kansas</option>
					<option value='KY'>Kentucky</option>
					<option value='LA'>Louisiana</option>
					<option value='ME'>Maine</option>
					<option value='MD'>Maryland</option>
					<option value='MA'>Massachusetts</option>
					<option value='MI'>Michigan</option>
					<option value='MN'>Minnesota</option>
					<option value='MS'>Mississippi</option>
					<option value='MO'>Missouri</option>
					<option value='MT'>Montana</option>
					<option value='NE'>Nebraska</option>
					<option value='NV'>Nevada</option>
					<option value='NH'>New Hampshire</option>
					<option value='NJ'>New Jersey</option>
					<option value='NM'>New Mexico</option>
					<option value='NY'>New York</option>
					<option value='NC'>North Carolina</option>
					<option value='ND'>North Dakota</option>
					<option value='OH'>Ohio</option>
					<option value='OK'>Oklahoma</option>
					<option value='OR'>Oregon</option>
					<option value='PA'>Pennsylvania</option>
					<option value='RI'>Rhode Island</option>
					<option value='SC'>South Carolina</option>
					<option value='SD'>South Dakota</option>
					<option value='TN'>Tennessee</option>
					<option value='TX'>Texas</option>
					<option value='UT'>Utah</option>
					<option value='VT'>Vermont</option>
					<option value='VA'>Virginia</option>
					<option value='WA'>Washington</option>
					<option value='WV'>West Virginia</option>
					<option value='WI'>Wisconsin</option>
					<option value='WY'>Wyoming</option>
				</select>
				<div className='relative my-2' data-te-input-wrapper-init>
					<input
						className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
						type='text'
						name='country'
						value={formData.country}
						onChange={handleInputChange}
					/>
					<label className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'>
						Country
					</label>
				</div>
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
					className='w-72 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
					type='submit'
					data-te-ripple-init
					data-te-ripple-color='light'
					style={{
						backgroundImage:
							'linear-gradient(to right, #0f4c81, #1d5088, #2b548f, #395896, #475c9d, #5560a4, #6667ab, #745f9d, #82578f, #904f81, #9e4773, #ac3f65, #be3455)'
					}}
					onClick={handleSignup}
				>
					Sign up
				</button>
				<p className='my-3'>or:</p>
				<button
					className='w-72 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
					type='button'
					data-te-ripple-init
					data-te-ripple-color='light'
					style={{
						backgroundImage:
							'linear-gradient(to right, #0f4c81, #1d5088, #2b548f, #395896, #475c9d, #5560a4, #6667ab, #745f9d, #82578f, #904f81, #9e4773, #ac3f65, #be3455)'
					}}
					onClick={() => {
						signIn('strava')
					}}
				>
					Sign up with your Strava
				</button>
			</div>
			<section className='flex items-center justify-around'>
				<p className='mb-0 mr-2'>Already have an account?</p>
				<Link href='/login'>
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
						Login
					</button>
				</Link>
			</section>
		</>
	)
}
