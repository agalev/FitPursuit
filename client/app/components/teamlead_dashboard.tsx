'use client'
import { useState, useEffect, useContext } from 'react'
import { Ripple, Input, Select, initTE } from 'tw-elements'
import { GlobalState } from '../global-provider'

export default function UserProfile() {
	const global = useContext(GlobalState)

	const [editMode, setEditMode] = useState(false)

	useEffect(() => {
		initTE({ Ripple, Input, Select })
	}, [editMode])

	const [formData, setFormData] = useState({})

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = () => {
		fetch(`/api/users/${global.state.profile.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		}).then((res) => {
			if (res.status === 200) {
				res.json().then((data) => {
					global.dispatch({ type: 'REFRESH', payload: data })
					global.dispatch({
						type: 'TOAST',
						payload: { message: 'Profile edited successfully', type: 'success' }
					})
					setEditMode(false)
				})
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

	const handleCancel = () => {
		setEditMode(false)
		setFormData({})
	}


	const handleLeave = () => {
		fetch('/api/teams/leave', {
			method: 'DELETE'
		}).then((res) => {
			if (res.ok) {
				res.json().then((data) => {
					global.dispatch({ type: 'REFRESH', payload: data })
					global.dispatch({
						type: 'TOAST',
						payload: { message: 'Left team successfully.', type: 'success' }
					})
				})
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

	return (
		<section
			className='rounded-lg p-4 mx-2 text-center text-white'
			style={{
				backgroundImage:
					'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)'
			}}
		>
			<div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
				<div>
					{editMode ? (
						<>
							<div className='relative mb-2' data-te-input-wrapper-init>
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
							<div className='relative mb-2' data-te-input-wrapper-init>
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
							<div className='relative mb-2' data-te-input-wrapper-init>
								<input
									className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
									type='text'
									name='bio'
									value={formData.bio}
									onChange={handleInputChange}
								/>
								<label className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'>
									Short Bio
								</label>
							</div>
							<div className='relative mb-2' data-te-input-wrapper-init>
								<input
									className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
									type='text'
									name='image'
									value={formData.image}
									onChange={handleInputChange}
								/>
								<label className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'>
									Image
								</label>
							</div>
						</>
					) : (
						<>
							<h2 className='text-2xl'>
								{global.state.profile.first_name}{' '}
								{global.state.profile.last_name}
							</h2>
							<p className='text-xs font-semibold my-1'>
								{global.state.profile.bio}
							</p>
							<p className='max-w-xs m-auto font-bold border-2 rounded-lg bg-amber-500 border-amber-500 shadow-2xl text-red-700'>
								{' '}
								Wealth: {global.state.profile.FPcoins} FPcoins
							</p>
							<img
								className='w-32 h-32 rounded-full my-2 mx-auto border-2 border-amber-500 shadow-2xl'
								src={global.state.profile.image || '/avatar.jpg'}
								alt='avatar'
							/>
							{global.state.profile.strava_connected ? (
								<button
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
									onClick={SyncActivities}
								>
									SYNC WITH STRAVA
								</button>
							) : (
								<StravaButton />
							)}
						</>
					)}
				</div>
				{editMode ? (
					<section>
						<div className='relative mb-2' data-te-input-wrapper-init>
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
							defaultValue={global.state.profile.state}
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
							defaultValue={global.state.profile.country}
						>
							{countries.map((country) => (
								<option key={country} value={country}>
									{country}
								</option>
							))}
						</select>
					</section>
				) : (
					<div className='m-auto'>
						{global.state.profile.team && (
							<>
								Team: {global.state.profile.team.name}
								<button
									className='bg-sky-700 ml-1 px-1 py-1 rounded-lg text-xs text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
									onClick={handleLeave}
								>
									Leave Team
								</button>
							</>
						)}
						<h3 className='text-lg font-semibold mt-2'>Location</h3>

						<p>City: {global.state.profile.city}</p>
						<p>State: {global.state.profile.state}</p>
						<p>Country: {global.state.profile.country}</p>
					</div>
				)}
				{editMode ? (
					<section>
						<select
							name='sex'
							onChange={handleInputChange}
							className='relative my-2'
							data-te-select-init
							defaultValue={global.state.profile.sex}
						>
							<option value=''>Select Gender</option>
							<option value='M'>Male</option>
							<option value='F'>Female</option>
							<option value='N'>Nonbinary</option>
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
					</section>
				) : (
					<div className='m-auto'>
						<h3 className='text-lg font-semibold'>Bio</h3>
						<p>Gender: {gender}</p>
						<p>
							Height:{' '}
							{global.state.profile.height
								? `${global.state.profile.height} inches`
								: 'Not specified'}
						</p>
						<p>
							Weight:{' '}
							{global.state.profile.weight
								? `${Math.ceil(global.state.profile.weight)} lbs`
								: 'Not specified'}
						</p>
					</div>
				)}
			</div>

			{editMode ? (
				<>
					<button
						className='inline-block px-2 w-48 bg-red-500 rounded pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
						data-te-ripple-init
						data-te-ripple-color='light'
						onClick={() => handleCancel()}
					>
						Cancel Edit
					</button>
					<button
						className='inline-block px-2 w-48 bg-green-500 rounded pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
						data-te-ripple-init
						data-te-ripple-color='light'
						onClick={() => handleSubmit()}
					>
						Submit
					</button>
				</>
			) : (
				<button
					className='inline-block px-2 w-48 bg-amber-500 rounded pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
					data-te-ripple-init
					data-te-ripple-color='light'
					onClick={() => setEditMode(true)}
				>
					Edit Profile Details
				</button>
			)}
		</section>
	)
}
