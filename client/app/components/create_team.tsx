import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { Ripple, Input, Select, initTE } from 'tw-elements'
import { GlobalState } from '../global-provider'
import activities_list from '../misc/activities.json'

export default function CreateTeam() {
	const global = useContext(GlobalState)
	const router = useRouter()
	const activities = activities_list.activities
	const [formData, setFormData] = useState({
		name: '',
		activity_type: '',
		image: ''
	})

	useEffect(() => {
		initTE({ Ripple, Input, Select })
	}, [])

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		fetch('/api/teams', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		}).then((res) => {
			if (res.status === 201) {
				res.json().then((data) => {
					global.dispatch({ type: 'REFRESH', payload: data })
				})
				global.dispatch({
					type: 'TOAST',
					payload: { message: 'Team created successfully.', type: 'success' }
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

	return (
		<section className='grid grid-cols-1 sm:grid-cols-2 text-center'>
			<form>
				<h2 className='mb-2'>Team Details</h2>
				<div className='relative my-2' data-te-input-wrapper-init>
					<input
						className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
						type='text'
						name='name'
						value={formData.name}
						onChange={handleInputChange}
					/>
					<label className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'>
						Team Name
					</label>
				</div>
				<select
					name='activity_type'
					onChange={handleInputChange}
					className='relative my-2'
					data-te-select-init
				>
					<option value=''>Select a primary activity</option>
					{activities.map((activity) => (
						<option key={activity} value={activity}>{activity}</option>
					))}
				</select>
				<div className='relative my-2' data-te-input-wrapper-init>
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
				<button
					className='inline-block mx-auto rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
					type='submit'
					data-te-ripple-init
					data-te-ripple-color='light'
					style={{
						backgroundImage:
							'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)'
					}}
					onClick={handleSubmit}
				>
					Create Team
				</button>
			</form>
			<div>
				<h2 className='mb-2'>Preview</h2>
				<div className='flex inline-flex items-center'>
					<div className='w-32 h-32 rounded-full bg-slate-300'>
						<img
							src={formData.image || '/svg/circle_logo_color.svg'}
							className='w-full h-full rounded-full object-cover'
						/>
					</div>
					<div className='ml-2'>
						<h3 className='mt-2 text-xl font-semibold'>
							{formData.name.length > 0 ? formData.name : 'Team Name'}
						</h3>
						<p className='mt-1 text-sm text-slate-400'>
							{formData.activity_type.length > 0
								? formData.activity_type
								: 'Activity Type'}
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
